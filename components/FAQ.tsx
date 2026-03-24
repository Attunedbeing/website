import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

const FALLBACK_FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'What should I expect from a session?',
    answer: 'Each session begins with a conversation to understand what you are hoping for and to establish clear consent. The massage itself is unhurried and fully clothed at first — you will be guided to undress to your comfort level. Afterwards there is time to rest and integrate before you leave.',
    order: 1,
  },
  {
    id: 'f2',
    question: 'Is this a sexual service?',
    answer: 'No. This is a therapeutic and somatic practice. While the work may include the full body with your explicit consent, it is not a sexual service. There is no reciprocal touch, no kissing, and no sexual acts of any kind.',
    order: 2,
  },
  {
    id: 'f3',
    question: 'Who is this work for?',
    answer: 'This work is open to all adults regardless of gender, body type, or background. It is particularly supportive for people experiencing stress, disconnection from their body, sexual shame, trauma, or those simply curious about somatic and tantric practices.',
    order: 3,
  },
  {
    id: 'f4',
    question: 'How do I prepare for a session?',
    answer: 'Arrive freshly showered if possible, avoid a heavy meal beforehand, and give yourself space afterwards — don\'t schedule anything demanding right after. Most importantly, come with openness and no specific agenda.',
    order: 4,
  },
  {
    id: 'f5',
    question: 'Is a deposit required?',
    answer: 'A $50 deposit is preferred to secure your booking. This can be arranged after your initial enquiry.',
    order: 5,
  },
  {
    id: 'f6',
    question: 'Where are sessions held?',
    answer: 'Sessions are held in a private, comfortable space designed for this work. Location details are shared after booking confirmation.',
    order: 6,
  },
];

export const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/faqs')
      .then(res => res.json())
      .then(data => {
        setFaqs(Array.isArray(data) && data.length > 0 ? data : FALLBACK_FAQS);
      })
      .catch(() => {
        setFaqs(FALLBACK_FAQS);
      });
  }, []);

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
