import { NextResponse } from "next/server";
import { getSession, getSubscription } from "@/lib/auth";

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const sub = await getSubscription(user.id);

  return NextResponse.json({
    user: { id: user.id, email: user.email },
    subscription: sub
      ? {
          tier: sub.tier,
          status: sub.status,
          course_access: sub.course_access,
          tools_active: sub.tools_active,
          tools_access_end: sub.tools_access_end,
          started_at: sub.started_at,
          loyalty_eligible: sub.loyalty_eligible,
        }
      : null,
  });
}
