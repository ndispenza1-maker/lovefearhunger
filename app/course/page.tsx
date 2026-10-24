"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CoursePage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push("/login");
          return;
        }
        if (data.subscription?.status !== "active") {
          router.push("/dashboard");
          return;
        }
        setAuthorized(true);
        setLoading(false);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F5F1] flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  if (!authorized) return null;

  const episodes = [
    {
      number: 1,
      title: "Welcome to the Restoration Garage",
      subtitle: "Full walkthrough: signup, login, room tour",
      description:
        "Your introduction to the tool. We walk through every room in the Restoration Garage — what each one is for, how to navigate, and how to start running your first diagnostic.",
      available: false,
    },
    {
      number: 2,
      title: "Love as a Force",
      subtitle: "Using the Board Room with Letty",
      description:
        "Love leads. Not the greeting card version — the engineering version. We use the Board Room to map what Love actually does when it's running in sequence. The spec. The blueprint. The thing it's supposed to be doing.",
      available: false,
    },
    {
      number: 3,
      title: "Fear as a Force",
      subtitle: "The instrument, not the enemy",
      description:
        "Fear informs. It's not the wall — it's the flag. We map what happens when fear runs in order vs out of order, and why most people are stuck because they let fear decide instead of inform.",
      available: false,
    },
    {
      number: 4,
      title: "Hunger as a Force",
      subtitle: "What moves when the system won't",
      description:
        "Hunger moves. The dark hunger, the clean hunger, and what happens when hunger fires without Love's spec or Fear's data. This is where the work gets real.",
      available: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F5F1] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <a href="/dashboard" className="text-[#E85D27] hover:underline text-sm">
            &larr; Back to Dashboard
          </a>
        </div>

        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">
          The Broad System
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          4 episodes. The framework. The tool. The work is yours.
        </p>

        <div className="space-y-6">
          {episodes.map((ep) => (
            <div
              key={ep.number}
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#E85D27] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {ep.number}
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">
                    {ep.title}
                  </h2>
                  <p className="text-[#E85D27] text-sm font-semibold mb-3">
                    {ep.subtitle}
                  </p>
                  <p className="text-gray-600 mb-4">{ep.description}</p>

                  {ep.available ? (
                    <button className="bg-[#E85D27] hover:bg-[#d54d17] text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors">
                      Watch Episode
                    </button>
                  ) : (
                    <span className="inline-block bg-gray-100 text-gray-500 text-sm font-medium px-4 py-2 rounded-lg">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Course content is being recorded. Episodes will unlock as they&rsquo;re
            ready.
          </p>
          <a
            href="https://restorationgarage.io"
            className="inline-block mt-4 text-[#E85D27] hover:underline"
          >
            Open the Restoration Garage &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
