export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F5F1]">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          The Framework You&rsquo;ve Been Using Since Birth. Now Learn to Control It.
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
          Love doesn&rsquo;t mean Sex. Fear doesn&rsquo;t mean Scared. Hunger doesn&rsquo;t mean you want Food.
        </p>
        <a
          href="/signup"
          className="inline-block bg-[#E85D27] hover:bg-[#d54d17] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
        >
          Get Started
        </a>
      </section>

      {/* What is LFH Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            What is LFH?
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p className="text-2xl font-semibold text-[#E85D27]">
              Love leads. Fear informs. Hunger moves.
            </p>
            <p>
              That&rsquo;s the order of operation for being human. Not philosophy. Not theory.
              The actual sequence your system runs every single time you make a decision.
            </p>
            <p>
              Think of it like breathing. Inhale &rarr; pause &rarr; exhale &rarr; pause. Your body runs this cycle
              thousands of times a day without you thinking about it. The sequence works whether you&rsquo;re
              aware of it or not.
            </p>
            <p>
              But once you become aware, you can control it. You can slow it down. Speed it up.
              Use it deliberately.
            </p>
            <p>
              Your emotions work the same way. There&rsquo;s an order. It&rsquo;s already running.
              Most people just don&rsquo;t know they can take the wheel.
            </p>
          </div>
        </div>
      </section>

      {/* Two Tiers Section */}
      <section className="px-6 py-16 bg-[#F7F5F1]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Two Ways to Use LFH
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            The framework works in yourself and in systems. Pick the application that fits where you are.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Broad Tier */}
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-2">
                Broad
              </h3>
              <p className="text-[#E85D27] font-semibold text-lg mb-1">
                $49.99 one-time
              </p>
              <p className="text-gray-600 mb-6">
                The course + 30 days of tools access
              </p>

              <div className="space-y-3 text-gray-700 mb-8">
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">&bull;</span>
                  <span>4-episode video course &mdash; Love, Fear, and Hunger as forces</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">&bull;</span>
                  <span>Full access to the Restoration Garage diagnostic tool</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">&bull;</span>
                  <span>YouTube Premium channel &mdash; teaching videos and lectures</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">&bull;</span>
                  <span>30 days of Restoration Garage + YouTube channel access included</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">&bull;</span>
                  <span>Self-paced &mdash; the course teaches, the Garage is where you work</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6 italic">
                &ldquo;Get in. Run the diagnostic. Fix what&rsquo;s broken. Move on.&rdquo;
              </p>

              <a
                href="/signup"
                className="block text-center w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Get the Course &mdash; $49.99
              </a>
            </div>

            {/* Focus Tier */}
            <div className="bg-white p-8 rounded-lg border-4 border-[#E85D27] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#E85D27] text-white px-6 py-2 rounded-full text-sm font-semibold">
                WHERE THE WORK LIVES
              </div>

              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-2 mt-2">
                Focused Systems
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                LFH consulting and problem-solving &mdash; applied to your niche
              </p>

              <div className="space-y-3 text-gray-700 mb-8">
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">&bull;</span>
                  <span className="font-semibold">Everything in Broad, plus the system&rsquo;s full attention on your domain</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">&bull;</span>
                  <span>Pick your niche &mdash; markets, science, business, operations, whatever you&rsquo;re building</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">&bull;</span>
                  <span>First consult maps your gap &mdash; where the order of operations breaks in your world</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">&bull;</span>
                  <span>Custom engagement built around what you actually need, not a one-size package</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">&bull;</span>
                  <span>For buyers, builders, and anyone who senses something they can&rsquo;t see and doesn&rsquo;t have time to dig</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">&bull;</span>
                  <span>Available for teams &mdash; offer it to your people</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6 italic">
                &ldquo;Drop a systems thinker into any operation. Find where it breaks. Build the bridge.&rdquo;
              </p>

              <a
                href="/signup"
                className="block text-center w-full bg-[#E85D27] hover:bg-[#d54d17] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Get Started &mdash; Contact for Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
            <a href="https://www.theenvarlocal.com" className="text-gray-600 hover:text-[#E85D27] transition-colors">
              The Envar Local
            </a>
            <a href="https://restorationgarage.io" className="text-gray-600 hover:text-[#E85D27] transition-colors">
              Restoration Garage
            </a>
            <a href="/login" className="text-gray-600 hover:text-[#E85D27] transition-colors">
              Log In
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LFH Productions LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
