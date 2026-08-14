import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'subscribe_popup_dismissed';
const DELAY_MS = 2 * 60 * 1000;

export const SubscribePopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

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
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      setStatus('error');
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-stone-900/40" onClick={dismiss} />
      <div className="relative bg-white shadow-xl max-w-sm w-full p-8">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <h3 className="font-serif text-xl text-stone-900 mb-2">Thank you</h3>
            <p className="text-stone-500 text-sm">You'll hear from me when something new is happening.</p>
          </div>
        ) : (
          <>
            <h3 className="font-serif text-xl text-stone-900 mb-2">Stay in the loop</h3>
            <p className="text-stone-500 text-sm mb-6">
              New offerings, events, and updates — sent occasionally, never spammy.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border-b-2 border-stone-200 p-3 focus:outline-none focus:border-sage-500 transition-colors text-stone-800 text-sm"
              />
              {status === 'error' && (
                <p className="text-red-500 text-xs">Something went wrong — please try again.</p>
              )}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-stone-900 text-white py-3 uppercase tracking-widest text-xs hover:bg-sage-600 transition-all duration-300 disabled:opacity-50"
              >
                {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="w-full text-stone-400 text-xs hover:text-stone-600 transition-colors"
              >
                No thanks
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
