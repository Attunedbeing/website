import React, { createContext, useContext, useEffect, useState } from 'react';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  duration: string;
  price: string;
  featured: boolean;
  desc: string;
  features: string[];
  order: number;
  active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  message: string;
  featured: boolean;
  order: number;
}

export const FALLBACK_FAQS: FAQItem[] = [
  { id: 'f1', question: 'What should I expect from a session?', answer: 'Each session begins with a conversation to understand what you are hoping for and to establish clear consent. The massage itself is unhurried and fully clothed at first - you will be guided to undress to your comfort level. Afterwards there is time to rest and integrate before you leave.', order: 1 },
  { id: 'f2', question: 'Is this a sexual service?', answer: 'No. This is a therapeutic and somatic practice. While the work may include the full body with your explicit consent, it is not a sexual service. There is no reciprocal touch, no kissing, and no sexual acts of any kind.', order: 2 },
  { id: 'f3', question: 'Who is this work for?', answer: 'This work is open to all adults regardless of gender, body type, or background. It is particularly supportive for people experiencing stress, disconnection from their body, sexual shame, trauma, or those simply curious about somatic and tantric practices.', order: 3 },
  { id: 'f4', question: 'How do I prepare for a session?', answer: "Arrive freshly showered if possible, avoid a heavy meal beforehand, and give yourself space afterwards - don't schedule anything demanding right after. Most importantly, come with openness and no specific agenda.", order: 4 },
  { id: 'f5', question: 'Is a deposit required?', answer: 'A $50 deposit is preferred to secure your booking. This can be arranged after your initial enquiry.', order: 5 },
  { id: 'f6', question: 'Where are sessions held?', answer: 'Sessions are held in a private, comfortable space designed for this work. Location details are shared after booking confirmation.', order: 6 },
];

export const FALLBACK_PACKAGES: PricingPackage[] = [
  { id: 'fallback-1', name: 'The Ember', duration: '60 min', price: '$180', featured: false, desc: 'A gentle introduction. Space to arrive, breathe, and begin to soften into the body.', features: ['Full body massage', 'Breathwork guidance', 'Integration time'], order: 1, active: true },
  { id: 'fallback-2', name: 'The Flame', duration: '90 min', price: '$250', featured: true, desc: 'The heart of the work. Deeper presence, more time, and room for the ritual to fully unfold.', features: ['Full body massage', 'Breathwork guidance', 'Somatic release work', 'Integration time', 'Post-session support'], order: 2, active: true },
  { id: 'fallback-3', name: 'The Hearth', duration: '2 hr', price: '$340', featured: false, desc: 'For those ready to go deep. Unhurried, expansive, and fully held from beginning to end.', features: ['Full body massage', 'Breathwork guidance', 'Somatic release work', 'Energy work', 'Extended integration', 'Post-session support'], order: 3, active: true },
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id: 'fallback-1', name: 'S.M.', message: 'I came in feeling disconnected from my body after years of stress and chronic tension. What I experienced was unlike anything I had tried before - I left feeling like I had come home to myself.', featured: true, order: 1 },
  { id: 'fallback-2', name: 'T.R.', message: 'The session was held with such care and professionalism. I felt completely safe to let go. The breathwork combined with the bodywork created a genuinely transformative experience.', featured: false, order: 2 },
  { id: 'fallback-3', name: 'J.K.', message: 'I was nervous at first, but the space created was so warm and non-judgmental. I released something I had been carrying for a very long time. I cannot recommend this work highly enough.', featured: false, order: 3 },
];

export const GENERAL_ENQUIRY = 'General Enquiry';

/** Label used both for the contact form options and the Book buttons. */
export const packageLabel = (pkg: PricingPackage) => pkg.name;

interface SiteData {
  faqs: FAQItem[];
  packages: PricingPackage[];
  testimonials: Testimonial[];
  loading: boolean;
  /** Currently selected "Interested Service" in the contact form. */
  interest: string;
  setInterest: (value: string) => void;
}

const SiteDataContext = createContext<SiteData>({
  faqs: FALLBACK_FAQS,
  packages: FALLBACK_PACKAGES,
  testimonials: FALLBACK_TESTIMONIALS,
  loading: true,
  interest: GENERAL_ENQUIRY,
  setInterest: () => {},
});

export const useSiteData = () => useContext(SiteDataContext);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState({
    faqs: FALLBACK_FAQS,
    packages: FALLBACK_PACKAGES,
    testimonials: FALLBACK_TESTIMONIALS,
    loading: true,
  });
  const [interest, setInterest] = useState(GENERAL_ENQUIRY);

  useEffect(() => {
    fetch('/api/site-data')
      .then(res => res.json())
      .then(({ faqs, packages, testimonials }) => {
        setData({
          faqs: Array.isArray(faqs) && faqs.length > 0 ? faqs : FALLBACK_FAQS,
          packages: Array.isArray(packages) && packages.length > 0 ? packages : FALLBACK_PACKAGES,
          testimonials: Array.isArray(testimonials) && testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS,
          loading: false,
        });
      })
      .catch(() => {
        setData({ faqs: FALLBACK_FAQS, packages: FALLBACK_PACKAGES, testimonials: FALLBACK_TESTIMONIALS, loading: false });
      });
  }, []);

  return (
    <SiteDataContext.Provider value={{ ...data, interest, setInterest }}>
      {children}
    </SiteDataContext.Provider>
  );
};
