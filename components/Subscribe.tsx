import React, { useState } from 'react';

export const Subscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="subscribe" className="py-16 bg-stone-900 border-t border-stone-800">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">Stay in the loop</h2>
        <p className="text-stone-400 text-sm mb-8">
          New offerings, events, and updates from Nala's world - sent occasionally, never spammy.
        </p>

        {status === 'success' ? (
          <p className="text-sage-200 text-sm">
            Thank you - you'll hear from me when something new is happening.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-grow max-w-md bg-transparent border-b-2 border-stone-700 p-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-sage-500 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-sage-500 text-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-sage-400 transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-400 text-xs mt-3">Something went wrong - please try again.</p>
        )}
      </div>
    </section>
  );
};
