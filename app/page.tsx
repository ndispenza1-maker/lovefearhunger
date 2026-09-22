import SubscribeButton from '@/components/SubscribeButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F5F1]">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          The Framework You've Been Using Since Birth. Now Learn to Control It.
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
          Love doesn't mean soft. Fear doesn't mean weak. Hunger doesn't mean greedy. 
          You just don't know the order yet.
        </p>
        <SubscribeButton 
          tier="broad"
          className="bg-[#E85D27] hover:bg-[#d54d17] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
        >
          Join the Waitlist
        </SubscribeButton>
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
              That's the order of operation for being human. Not philosophy. Not theory. 
              The actual sequence your system runs every single time you make a decision.
            </p>
            <p>
              Think of it like breathing. Inhale → pause → exhale → pause. Your body runs this cycle 
              thousands of times a day without you thinking about it. The sequence works whether you're 
              aware of it or not.
            </p>
            <p>
              But once you become aware, you can control it. You can slow it down. Speed it up. 
              Use it deliberately.
            </p>
            <p>
              Your emotions work the same way. There's an order. It's already running. 
              Most people just don't know they can take the wheel.
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
              <p className="text-gray-600 mb-6 text-lg">
                Self-maintenance via the Restoration Garage
              </p>

              <div className="space-y-3 text-gray-700 mb-8">
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">•</span>
                  <span>Full access to the Restoration Garage diagnostic tool</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">•</span>
                  <span>Written guides on recognizing Love, Fear, and Hunger in your decisions</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">•</span>
                  <span>Case studies from real-world application</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">•</span>
                  <span>Self-paced — no calls, no mandatory check-ins</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6 italic">
                "Get in. Run the diagnostic. Fix what's broken. Move on."
              </p>

              <SubscribeButton 
                tier="broad"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Join Waitlist - Broad
              </SubscribeButton>
            </div>

            {/* Focus Tier */}
            <div className="bg-white p-8 rounded-lg border-4 border-[#E85D27] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#E85D27] text-white px-6 py-2 rounded-full text-sm font-semibold">
                WHERE THE WORK LIVES
              </div>

              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-2 mt-2">
                Focus
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                LFH applied to markets and wealth generation
              </p>

              <div className="space-y-3 text-gray-700 mb-8">
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">•</span>
                  <span className="font-semibold">Everything in Broad, plus:</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">•</span>
                  <span>Trading bot breakdowns — how LFH maps to price action, volume, volatility</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">•</span>
                  <span>Macro regime analysis (TLT/USO/UUP/SPY → market structure)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">•</span>
                  <span>Real-time or weekly: what the bot saw, why it moved, the LFH map</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#E85D27] mr-3 text-xl">•</span>
                  <span>Watch the pattern work in systems, not just in yourself</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6 italic">
                "The numbers don't lie. Watch LFH extract from the system."
              </p>

              <SubscribeButton 
                tier="focus"
                className="w-full bg-[#E85D27] hover:bg-[#d54d17] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Join Waitlist - Focus
              </SubscribeButton>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-8">
            First cohort pricing and launch dates will be announced to the waitlist first.
          </p>
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
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LFH Productions LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
