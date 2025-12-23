import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';

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

export const Pricing: React.FC = () => {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = new Airtable({ apiKey: 'patDZntiPxTURbGRB.a20381bd6390e4815fbd22e39bf5489212a32728fe20ef6316f8d7167b0668f3' }).base('appR5ETzMTA0JNTPH');

    base('Prices').select({
      view: "Grid view",
      sort: [{ field: "Order", direction: "asc" }]
    }).eachPage(function page(records, fetchNextPage) {
      const fetchedPackages: PricingPackage[] = records.map(record => ({
        id: record.id,
        name: record.get('Package Name') as string,
        duration: record.get('Duration') as string,
        price: record.get('Price') as string,
        featured: record.get('Featured') === true,
        desc: record.get('Description') as string,
        features: (record.get('Features') as string || '').split('\n').filter(f => f.trim() !== ''),
        order: record.get('Order') as number,
        active: record.get('Active') === true, // Default to true if undefined/null, or check explicitly if it's a checkbox
      }));
      setPackages(fetchedPackages);
      setLoading(false);
      fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); setLoading(false); return; }
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
    </section >
  );
};
