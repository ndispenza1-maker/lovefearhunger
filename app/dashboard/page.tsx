"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  user: { id: number; email: string } | null;
  subscription: {
    tier: string;
    status: string;
    started_at: string;
    current_period_end: string;
    loyalty_eligible: boolean;
  } | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((d) => {
        if (!d.user) {
          router.push("/login");
          return;
        }
        setData(d);
        setLoading(false);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    const res = await fetch("/api/checkout", { method: "POST" });
    const result = await res.json();
    if (result.url) {
      window.location.href = result.url;
    } else {
      alert(result.error || "Failed to start checkout");
      setCheckoutLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F5F1] flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  const sub = data?.subscription;
  const isActive = sub?.status === "active";

  return (
    <main className="min-h-screen bg-[#F7F5F1] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">
              Your Dashboard
            </h1>
            <p className="text-gray-600">{data?.user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Log out
          </button>
        </div>

        {/* Subscription Status */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Subscription
          </h2>

          {isActive ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  Active
                </span>
                <span className="text-gray-600">
                  Broad System &mdash; $49.99/month
                </span>
              </div>

              {sub?.started_at && (
                <p className="text-sm text-gray-500 mb-1">
                  Member since{" "}
                  {new Date(sub.started_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}

              {sub?.loyalty_eligible && (
                <div className="mt-4 p-4 bg-[#FFF3E0] border border-[#E85D27] rounded-lg">
                  <p className="text-[#E85D27] font-semibold">
                    🎉 Loyalty Unlock Available!
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    You&rsquo;ve been with us 3+ months. Lock in lifetime access
                    to the Garage + YouTube channel for{" "}
                    <strong>$14.99/month</strong> &mdash; $10 cheaper than
                    separate.
                  </p>
                  <button className="mt-3 bg-[#E85D27] hover:bg-[#d54d17] text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors">
                    Lock In Lifetime Rate
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                {sub?.status === "past_due"
                  ? "Your payment is past due. Update your payment method to regain access."
                  : sub?.status === "cancelled"
                  ? "Your subscription has been cancelled."
                  : "You don't have an active subscription yet."}
              </p>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="bg-[#E85D27] hover:bg-[#d54d17] text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {checkoutLoading
                  ? "Loading..."
                  : "Subscribe — $49.99/month"}
              </button>
            </div>
          )}
        </div>

        {/* Course Access */}
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            The Broad System Course
          </h2>

          {isActive ? (
            <div className="space-y-4">
              <a
                href="/course"
                className="block p-4 border border-gray-200 rounded-lg hover:border-[#E85D27] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Episode 1 &mdash; Welcome to the Restoration Garage
                    </p>
                    <p className="text-sm text-gray-500">
                      Full walkthrough: signup, login, room tour
                    </p>
                  </div>
                  <span className="text-[#E85D27]">&rarr;</span>
                </div>
              </a>

              <a
                href="/course"
                className="block p-4 border border-gray-200 rounded-lg hover:border-[#E85D27] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Episode 2 &mdash; Love as a Force
                    </p>
                    <p className="text-sm text-gray-500">
                      Using the Board Room with Letty
                    </p>
                  </div>
                  <span className="text-[#E85D27]">&rarr;</span>
                </div>
              </a>

              <a
                href="/course"
                className="block p-4 border border-gray-200 rounded-lg hover:border-[#E85D27] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Episode 3 &mdash; Fear as a Force
                    </p>
                    <p className="text-sm text-gray-500">
                      The instrument, not the enemy
                    </p>
                  </div>
                  <span className="text-[#E85D27]">&rarr;</span>
                </div>
              </a>

              <a
                href="/course"
                className="block p-4 border border-gray-200 rounded-lg hover:border-[#E85D27] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Episode 4 &mdash; Hunger as a Force
                    </p>
                    <p className="text-sm text-gray-500">
                      What moves when the system won&rsquo;t
                    </p>
                  </div>
                  <span className="text-[#E85D27]">&rarr;</span>
                </div>
              </a>
            </div>
          ) : (
            <p className="text-gray-500">
              Subscribe to unlock the 4-episode Broad System course and full
              access to the Restoration Garage.
            </p>
          )}
        </div>

        {/* Links */}
        <div className="mt-8 flex gap-6 justify-center">
          <a
            href="https://restorationgarage.io"
            className="text-gray-600 hover:text-[#E85D27] transition-colors"
          >
            Restoration Garage
          </a>
          <a
            href="https://www.theenvarlocal.com"
            className="text-gray-600 hover:text-[#E85D27] transition-colors"
          >
            The Envar Local
          </a>
          <a
            href="/"
            className="text-gray-600 hover:text-[#E85D27] transition-colors"
          >
            Home
          </a>
        </div>
      </div>
    </main>
  );
}
