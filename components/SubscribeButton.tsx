'use client';

import { useState } from 'react';

interface SubscribeButtonProps {
  tier: 'broad' | 'focus';
  children: React.ReactNode;
  className?: string;
}

export default function SubscribeButton({ tier, children, className }: SubscribeButtonProps) {
  const [email, setEmail] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('You\'re on the list! Check your email to confirm.');
        setEmail('');
        setTimeout(() => {
          setShowInput(false);
          setStatus('idle');
          setMessage('');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Check your connection.');
    }
  };

  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className={className}
      >
        {children}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E85D27] disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`${className} disabled:opacity-50 whitespace-nowrap`}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {message && (
        <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
