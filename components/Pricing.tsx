import React, { useEffect, useState } from 'react';

interface PricingPackage {
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

const FALLBACK_PACKAGES: PricingPackage[] = [
  {
    id: 'fallback-1',
    name: 'The Ember',
    duration: '60 min',
    price: '$180',
    featured: false,
    desc: 'A gentle introduction. Space to arrive, breathe, and begin to soften into the body.',
    features: ['Full body massage', 'Breathwork guidance', 'Integration time'],
    order: 1,
    active: true,
  },
  {
    id: 'fallback-2',
    name: 'The Flame',
    duration: '90 min',
    price: '$250',
    featured: true,
    desc: 'The heart of the work. Deeper presence, more time, and room for the ritual to fully unfold.',
    features: ['Full body massage', 'Breathwork guidance', 'Somatic release work', 'Integration time', 'Post-session support'],
    order: 2,
    active: true,
  },
  {
    id: 'fallback-3',
    name: 'The Hearth',
    duration: '2 hr',
    price: '$340',
    featured: false,
    desc: 'For those ready to go deep. Unhurried, expansive, and fully held from beginning to end.',
    features: ['Full body massage', 'Breathwork guidance', 'Somatic release work', 'Energy work', 'Extended integration', 'Post-session support'],
    order: 3,
    active: true,
  },
];

export const Pricing: React.FC = () => {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pricing')
      .then(res => res.json())
      .then(data => {
        const result = Array.isArray(data) && data.length > 0 ? data : FALLBACK_PACKAGES;
        setPackages(result);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setPackages(FALLBACK_PACKAGES);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="pricing" className="py-24 bg-stone-900 text-stone-50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <p className="text-sage-200">Loading investment options...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 bg-stone-900 text-stone-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-left mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Investment</h2>
          <p className="text-sage-200">Because a happy nervous system is a gift that ripples far beyond you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 align-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative p-8 flex flex-col justify-between border ${pkg.featured
                ? 'border-sage-500 bg-stone-800 scale-105 z-10 shadow-2xl shadow-sage-900/20'
                : 'border-stone-700 bg-stone-900/50'
                }`}
            >
              {pkg.featured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sage-500 text-white text-xs uppercase tracking-widest py-1 px-4 font-bold">
                  Recommended
                </div>
              )}

              <div>
                <h3 className="text-2xl font-serif mb-2 text-white">{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-light text-sage-300">{pkg.price}</span>
                  <span className="text-stone-500 text-sm uppercase">{pkg.duration}</span>
                </div>
                <p className="text-stone-400 text-sm mb-8 leading-relaxed">
                  {pkg.desc}
                </p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-sm text-stone-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-sage-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                {!pkg.active ? (
                  <a
                    className={`block w-full text-center py-3 uppercase tracking-widest text-xs transition-colors ${pkg.featured
                      ? 'bg-stone-700 text-stone-400 cursor-not-allowed'
                      : 'border border-stone-700 text-stone-500 cursor-not-allowed'
                      }`}
                  >
                    Not available
                  </a>
                ) : (
                  <a
                    href="#contact"
                    className={`block w-full text-center py-3 uppercase tracking-widest text-xs transition-colors ${pkg.featured
                      ? 'bg-sage-500 text-white hover:bg-sage-400'
                      : 'border border-stone-600 text-stone-300 hover:border-sage-500 hover:text-white'
                      }`}
                  >
                    Book This Ritual
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-stone-500 text-sm italic">
            * Please note: A deposit of $50 is preferred to secure all bookings.
          </p>
        </div>
      </div>
    </section>
  );
};
