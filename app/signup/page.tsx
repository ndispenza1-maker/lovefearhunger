"use client";

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to email list when ready
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#F7F5F1] flex items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        <div className="text-6xl mb-6">🔧</div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          The Course Is Coming
        </h1>
        <p className="text-xl text-gray-700 mb-2 leading-relaxed">
          Love leads. Fear informs. Hunger moves.
        </p>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The 4-episode LFH course is being recorded now. Drop your email and
          you&rsquo;ll be the first to know when the doors open.
        </p>

        {submitted ? (
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <p className="text-2xl font-semibold text-gray-900 mb-2">You&rsquo;re on the list.</p>
            <p className="text-gray-600">We&rsquo;ll reach out when it&rsquo;s live.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border border-gray-200 space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E85D27] text-center"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#E85D27] hover:bg-[#d54d17] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Notify Me When It&rsquo;s Live
            </button>
          </form>
        )}

        <p className="text-gray-500 text-sm mt-8">
          Already have an account?{" "}
          <a href="/login" className="text-[#E85D27] hover:underline">Log in</a>
        </p>
      </div>
    </main>
  );
}
