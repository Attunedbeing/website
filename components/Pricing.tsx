import React from 'react';

export const Pricing: React.FC = () => {
  // Placeholder pricing based on industry standards since specific prices weren't provided in the content text.
  const packages = [
    {
      name: "Introductory",
      duration: "90 Mins",
      price: "$250", // Placeholder
      desc: "Perfect for first-time visitors. Includes consultation, full body massage, and integration.",
      features: ["Consultation (15m)", "Massage Ritual (60m)", "Integration (15m)"]
    },
    {
      name: "Deep Immersion",
      duration: "2 Hours",
      price: "$350", // Placeholder
      desc: "A deeper journey allowing for more extensive bodywork and slower rhythmic touch.",
      featured: true,
      features: ["Consultation (15m)", "Extended Ritual (90m)", "Integration (15m)", "Full Body Slides"]
    },
    {
      name: "Sacred Expand",
      duration: "3 Hours",
      price: "$500", // Placeholder
      desc: "The ultimate unhurried experience. Plenty of space for deep relaxation and energetic connection.",
      features: ["Consultation (20m)", "Deep Ritual (140m)", "Integration (20m)", "Breathwork & Sound"]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-stone-900 text-stone-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Investment</h2>
          <p className="text-sage-200">Honoring the exchange of energy and time.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 align-stretch">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 flex flex-col justify-between border ${
                pkg.featured 
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

              <a 
                href="#contact" 
                className={`block w-full text-center py-3 uppercase tracking-widest text-xs transition-colors ${
                  pkg.featured 
                    ? 'bg-sage-500 text-white hover:bg-sage-400' 
                    : 'border border-stone-600 text-stone-300 hover:border-sage-500 hover:text-white'
                }`}
              >
                Book This Ritual
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-stone-500 text-sm italic">
            * Please note: A deposit is required to secure all bookings. 
          </p>
        </div>
      </div>
    </section>
  );
};