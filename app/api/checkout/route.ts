import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import pool, { initDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await initDB();
    const user = await getSession();
    if (!user) {
      return NextResponse.json({ error: "Must be logged in" }, { status: 401 });
    }

    const origin = request.headers.get("origin") || "https://lovefearhunger.com";

    // Check for existing Stripe customer
    const existing = await pool.query(
      "SELECT stripe_customer_id FROM subscriptions WHERE user_id = $1 AND stripe_customer_id IS NOT NULL LIMIT 1",
      [user.id]
    );

    let customerId = existing.rows[0]?.stripe_customer_id;

    if (!customerId) {
      const customer = await getStripe().customers.create({
        email: user.email,
        metadata: { lfh_user_id: String(user.id) },
      });
      customerId = customer.id;
    }

    const priceId = process.env.STRIPE_BROAD_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: "Price not configured" }, { status: 500 });
    }

    const session = await getStripe().checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/dashboard?checkout=cancelled`,
      metadata: { lfh_user_id: String(user.id), tier: "broad" },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
