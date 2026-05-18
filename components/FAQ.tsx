import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSiteData } from './SiteDataContext';

export const FAQ: React.FC = () => {
  const { faqs } = useSiteData();
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (id: string) => setOpen(prev => (prev === id ? null : id));

  return (
    <section id="faq" className="py-20 bg-stone-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-stone-500 text-sm">Answers to some common questions before you reach out.</p>
        </div>

        <div className="divide-y divide-stone-200">
          {faqs.map(faq => (
            <div key={faq.id}>
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between py-5 text-left gap-6 group"
              >
                <span className="text-stone-800 text-sm font-medium group-hover:text-stone-900 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-sage-500 shrink-0 transition-transform duration-300 ${open === faq.id ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${open === faq.id ? 'max-h-96 pb-5' : 'max-h-0'}`}
              >
                <p className="text-stone-500 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
