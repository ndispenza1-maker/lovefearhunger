"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  user: { id: number; email: string } | null;
  subscription: {
    tier: string;
    status: string;
    course_access: boolean;
    tools_active: boolean;
    tools_access_end: string;
    started_at: string;
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
  const hasCourse = sub?.course_access;
  const hasTools = sub?.tools_active;

  const daysLeft = sub?.tools_access_end
    ? Math.max(0, Math.ceil((new Date(sub.tools_access_end).getTime() - Date.now()) / 86400000))
    : 0;

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
          <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700 text-sm">
            Log out
          </button>
        </div>

        {/* Purchase / Access Status */}
        <div className="bg-white p-8 rounded-lg border border-gray-200 mb-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            Your Access
          </h2>

          {hasCourse ? (
            <div>
              {/* Course access */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  Course Unlocked
                </span>
                <span className="text-gray-600">
                  The Broad System &mdash; 4 episodes
                </span>
              </div>

              {/* Tools access */}
              {hasTools ? (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <p className="text-blue-800 font-semibold">
                    Restoration Garage + YouTube &mdash; {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    Your 30-day access to the Garage and YouTube channel is active.
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
                  <p className="text-gray-700 font-semibold">
                    Garage + YouTube access expired
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Your 30-day tools window has ended. Subscribe to continue using
                    the Restoration Garage and YouTube channel.
                  </p>
                  {sub?.loyalty_eligible && (
                    <div className="mt-3 p-3 bg-[#FFF3E0] border border-[#E85D27] rounded-lg">
                      <p className="text-[#E85D27] font-semibold text-sm">
                        🎉 Loyalty rate available &mdash; $14.99/month lifetime
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                Get the 4-episode Broad System course + 30 days of Restoration
                Garage and YouTube channel access.
              </p>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="bg-[#E85D27] hover:bg-[#d54d17] text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {checkoutLoading ? "Loading..." : "Get the Course \u2014 $49.99"}
              </button>
            </div>
          )}
        </div>

        {/* Course */}
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
            The Broad System Course
          </h2>

          {hasCourse ? (
            <div className="space-y-4">
              {[
                { n: 1, title: "Welcome to the Restoration Garage", sub: "Full walkthrough: signup, login, room tour" },
                { n: 2, title: "Love as a Force", sub: "Using the Board Room with Letty" },
                { n: 3, title: "Fear as a Force", sub: "The instrument, not the enemy" },
                { n: 4, title: "Hunger as a Force", sub: "What moves when the system won\u2019t" },
              ].map((ep) => (
                <a
                  key={ep.n}
                  href="/course"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-[#E85D27] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Episode {ep.n} &mdash; {ep.title}
                      </p>
                      <p className="text-sm text-gray-500">{ep.sub}</p>
                    </div>
                    <span className="text-[#E85D27]">&rarr;</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Purchase the course to unlock all 4 episodes and 30 days of tools
              access.
            </p>
          )}
        </div>

        {/* Links */}
        <div className="mt-8 flex gap-6 justify-center">
          <a href="https://restorationgarage.io" className="text-gray-600 hover:text-[#E85D27] transition-colors">
            Restoration Garage
          </a>
          <a href="https://www.theenvarlocal.com" className="text-gray-600 hover:text-[#E85D27] transition-colors">
            The Envar Local
          </a>
          <a href="/" className="text-gray-600 hover:text-[#E85D27] transition-colors">
            Home
          </a>
        </div>
      </div>
    </main>
  );
}
