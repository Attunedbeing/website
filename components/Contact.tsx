import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('FullName') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    const interest = (form.elements.namedItem('interest') as HTMLSelectElement).value;

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, interest }),
      });

      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-stone-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-8 md:p-12 shadow-lg shadow-stone-200/50">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Begin Your Journey</h2>
            <p className="text-stone-600">
              If you feel called to this work, please reach out below. I will respond to your enquiry shortly.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-sage-100 border border-sage-200 text-sage-800 p-8 text-center animate-fade-in">
              <h3 className="text-xl font-serif mb-2">Thank you for reaching out.</h3>
              <p>Your message has been received. I will be in touch soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-sm underline hover:text-sage-600"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="FullName" className="text-xs uppercase tracking-widest text-stone-500 font-bold">Name</label>
                  <input
                    type="text"
                    id="FullName"
                    name="FullName"
                    className="w-full bg-stone-25 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-sage-500 transition-colors text-stone-800"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-stone-500 font-bold">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-stone-25 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-sage-500 transition-colors text-stone-800"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="text-xs uppercase tracking-widest text-stone-500 font-bold">Interested Service</label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full bg-stone-25 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-sage-500 transition-colors text-stone-800"
                >
                  <option>Taster: 60 Minutes (Unavailable)</option>
                  <option>Indulgence: 90 Minutes</option>
                  <option>Immersion: 2 Hours</option>
                  <option>General Enquiry</option>
                  <option>Meet & Greet</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-stone-500 font-bold">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-stone-25 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-sage-500 transition-colors text-stone-800"
                  placeholder="Share a little about what brings you here..."
                ></textarea>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-stone-900 text-white px-10 py-4 uppercase tracking-widest text-sm hover:bg-sage-600 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 mx-auto"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
