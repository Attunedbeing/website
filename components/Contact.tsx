import React, { useState } from 'react';
import { Send } from 'lucide-react';
import 'airtable';
import Airtable from 'airtable';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    var base = new Airtable({apiKey: 'patnrMwxc5FYwR2to.35d49f87eb5258e3d0331a55472de8292344579bc3bbd41f34c5d4615c8a17c6'}).base('appejvcJAdzQcbKAV');
    
    base('Orders').create([
      {
        "fields": {
          "Customer": [
            "recylHLKDexSG3RQZ"
          ],
          "Status": "Ordered",
          "Date Required": "2025-11-12",
          "Delivered": "2025-11-16",
          "Amount": 5,
          "Revenue": 60,
          "Payment": true
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    });
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-sage-50">
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
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-stone-500 font-bold">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full bg-stone-50 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-sage-500 transition-colors text-stone-800"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-stone-500 font-bold">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full bg-stone-50 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-sage-500 transition-colors text-stone-800"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="interest" className="text-xs uppercase tracking-widest text-stone-500 font-bold">Interested Service</label>
                <select 
                  id="interest" 
                  className="w-full bg-stone-50 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-sage-500 transition-colors text-stone-800"
                >
                  <option>Introductory Session</option>
                  <option>Deep Immersion</option>
                  <option>Sacred Expand</option>
                  <option>Other / General Enquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-stone-500 font-bold">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  required
                  className="w-full bg-stone-50 border-b-2 border-stone-200 p-3 focus:outline-none focus:border-sage-500 transition-colors text-stone-800"
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