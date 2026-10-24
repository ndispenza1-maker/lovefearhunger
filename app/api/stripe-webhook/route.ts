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

      if (userId) {
        // Calculate 1 month access window for Garage + YouTube
        const accessEnd = new Date();
        accessEnd.setDate(accessEnd.getDate() + 30);

        const existing = await pool.query(
          "SELECT id FROM subscriptions WHERE user_id = $1",
          [userId]
        );

        if (existing.rows.length > 0) {
          await pool.query(
            `UPDATE subscriptions 
             SET stripe_customer_id = $1, 
                 status = 'active', tier = $2, started_at = NOW(), 
                 tools_access_end = $3, course_access = TRUE, updated_at = NOW()
             WHERE user_id = $4`,
            [customerId, tier, accessEnd.toISOString(), userId]
          );
        } else {
          await pool.query(
            `INSERT INTO subscriptions 
             (user_id, tier, stripe_customer_id, status, started_at, tools_access_end, course_access, updated_at)
             VALUES ($1, $2, $3, 'active', NOW(), $4, TRUE, NOW())`,
            [userId, tier, customerId, accessEnd.toISOString()]
          );
        }
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object;
      await pool.query(
        "UPDATE subscriptions SET status = 'expired', updated_at = NOW() WHERE stripe_customer_id = $1",
        [sub.customer]
      );
      break;
    }
  }

  return NextResponse.json({ received: true });
}
