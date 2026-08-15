import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSiteData } from './SiteDataContext';
import { CollapsibleSection } from './CollapsibleSection';

export const FAQ: React.FC = () => {
  const { faqs } = useSiteData();
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (id: string) => setOpen(prev => (prev === id ? null : id));

  return (
    <CollapsibleSection
      id="faq"
      title="Frequently Asked Questions"
      subtitle="Answers to some common questions before you reach out."
      sectionClassName="py-16 bg-stone-50"
      containerClassName="max-w-3xl"
    >
      <div className="divide-y divide-stone-200">
        {faqs.map(faq => (
          <div key={faq.id}>
            <button
              onClick={() => toggle(faq.id)}
              aria-expanded={open === faq.id}
              className="w-full flex items-center justify-between py-5 text-left gap-6 group cursor-pointer px-3 -mx-3 rounded transition-colors duration-200 hover:bg-stone-100/70"
            >
              <span className="text-stone-800 text-base font-medium group-hover:text-stone-900 transition-colors">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-sage-500 shrink-0 transition-transform duration-300 ${open === faq.id ? 'rotate-180' : ''}`}
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
    </CollapsibleSection>
  );
};
