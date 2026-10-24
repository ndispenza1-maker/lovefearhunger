import { NextResponse } from "next/server";
import pool, { initDB } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  await initDB();
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.lfh_user_id;
      const tier = session.metadata?.tier || "broad";
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      if (userId) {
        // Upsert subscription
        const existing = await pool.query(
          "SELECT id FROM subscriptions WHERE user_id = $1",
          [userId]
        );

        if (existing.rows.length > 0) {
          await pool.query(
            `UPDATE subscriptions 
             SET stripe_customer_id = $1, stripe_subscription_id = $2, 
                 status = 'active', tier = $3, started_at = NOW(), updated_at = NOW()
             WHERE user_id = $4`,
            [customerId, subscriptionId, tier, userId]
          );
        } else {
          await pool.query(
            `INSERT INTO subscriptions (user_id, tier, stripe_customer_id, stripe_subscription_id, status, started_at, updated_at)
             VALUES ($1, $2, $3, $4, 'active', NOW(), NOW())`,
            [userId, tier, customerId, subscriptionId]
          );
        }
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object;
      const customerId = invoice.customer as string;
      const periodEnd = invoice.lines?.data?.[0]?.period?.end;

      await pool.query(
        `UPDATE subscriptions 
         SET status = 'active', 
             current_period_end = to_timestamp($1),
             updated_at = NOW()
         WHERE stripe_customer_id = $2`,
        [periodEnd, customerId]
      );

      // Check loyalty eligibility (3+ months)
      await pool.query(
        `UPDATE subscriptions 
         SET loyalty_eligible = TRUE, updated_at = NOW()
         WHERE stripe_customer_id = $1 
           AND started_at <= NOW() - INTERVAL '90 days'
           AND loyalty_eligible = FALSE`,
        [customerId]
      );
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      await pool.query(
        "UPDATE subscriptions SET status = 'past_due', updated_at = NOW() WHERE stripe_customer_id = $1",
        [invoice.customer]
      );
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object;
      await pool.query(
        "UPDATE subscriptions SET status = 'cancelled', updated_at = NOW() WHERE stripe_subscription_id = $1",
        [sub.id]
      );
      break;
    }
  }

  return NextResponse.json({ received: true });
}
