'use client';

import { useState } from 'react';

export default function SubscribeButton({ 
  tier, 
  children, 
  className 
}: { 
  tier: 'free' | 'broad';
  children: React.ReactNode;
  className?: string;
}) {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message);
        setEmail('');
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
          setMessage('');
        }, 3000);
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>

            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
              {tier === 'broad' ? 'Join the Waitlist' : 'Start Free'}
            </h3>

            {isSuccess ? (
              <div className="text-center py-8">
                <div className="text-[#E85D27] text-5xl mb-4">✓</div>
                <p className="text-gray-700">{message}</p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  {tier === 'broad'
                    ? 'Limited to 10 people. Enter your email to apply.'
                    : 'Get instant access to the LFH framework introduction.'}
                </p>

                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-[#E85D27] focus:outline-none"
                    disabled={isLoading}
                  />

                  {message && !isSuccess && (
                    <p className="text-red-600 text-sm mb-4">{message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#E85D27] hover:bg-[#d54d17] text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Submitting...' : tier === 'broad' ? 'Join Waitlist' : 'Get Started'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
