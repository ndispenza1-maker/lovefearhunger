import SubscribeButton from '@/components/SubscribeButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F5F1]">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          The Framework You've Been Living Without Knowing
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
              Think of it like a refrigeration cycle: compression → condensation → expansion → evaporation. 
              Miss a step or run them out of order, and the whole system breaks down. 
              You don't get cold air. You get noise and heat and wasted energy.
            </p>
            <p>
              Your emotions work the same way. There's an order. Most people are running it backwards.
            </p>
          </div>
        </div>
      </section>

      {/* Two Tiers Section */}
      <section className="px-6 py-16 bg-[#F7F5F1]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Choose Your Path
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                Free
              </h3>
              <p className="text-gray-600 mb-6">
                Get a taste of the framework
              </p>
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start">
                  <span className="text-[#E85D27] mr-2">•</span>
                  <span>Introduction to LFH principles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E85D27] mr-2">•</span>
                  <span>Sample Restoration Garage exercises</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E85D27] mr-2">•</span>
                  <span>Selected essays from The Envar Local</span>
                </li>
              </ul>
              <SubscribeButton 
                tier="free"
                className="w-full border-2 border-[#E85D27] text-[#E85D27] hover:bg-[#E85D27] hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Start Free
              </SubscribeButton>
            </div>

            {/* Broad Tier */}
            <div className="bg-white p-8 rounded-lg border-4 border-[#E85D27] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#E85D27] text-white px-4 py-1 rounded-full text-sm font-semibold">
                LIMITED TO 10
              </div>
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                Broad
              </h3>
              <p className="text-gray-600 mb-6">
                The full implementation course
              </p>
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start">
                  <span className="text-[#E85D27] mr-2">•</span>
                  <span>Self-paced core modules</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E85D27] mr-2">•</span>
                  <span>Monthly mandatory accountability calls</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E85D27] mr-2">•</span>
                  <span>Full Restoration Garage access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E85D27] mr-2">•</span>
                  <span>Private community</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E85D27] mr-2">•</span>
                  <span className="font-semibold">Real accountability — you can be failed</span>
                </li>
              </ul>
              <SubscribeButton 
                tier="broad"
                className="w-full bg-[#E85D27] hover:bg-[#d54d17] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Apply Now
              </SubscribeButton>
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
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LFH Productions LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
