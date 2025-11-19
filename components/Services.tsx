import React from 'react';
import { CheckCircle2, XCircle, Shield } from 'lucide-react';

export const Services: React.FC = () => {
  const offered = [
    "Full body and genital massage (including prostate if desired)",
    "Energetic connection",
    "Cuddles",
    "Body slides"
  ];

  const notOffered = [
    "French kissing",
    "Penetrative sex",
    "Oral sex"
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Offered */}
          <div>
            <h3 className="text-2xl font-serif text-stone-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-sage-500"></span>
              Services Offered
            </h3>
            <ul className="space-y-4">
              {offered.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-sage-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Offered */}
          <div className="bg-stone-50 p-8 border-l-4 border-stone-300">
            <h3 className="text-2xl font-serif text-stone-800 mb-6 flex items-center gap-3 opacity-75">
              Services Not Offered
            </h3>
            <ul className="space-y-4">
              {notOffered.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-stone-500">
                  <XCircle className="w-5 h-5 text-stone-400 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Safety Section */}
        <div className="bg-sage-50 rounded-sm p-8 md:p-12 border border-sage-100 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white rounded-full text-sage-600">
              <Shield className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-2xl font-serif text-stone-800 mb-4">Safety and Respect</h3>
          <p className="text-stone-700 max-w-2xl mx-auto leading-relaxed">
            I prioritize discretion, clear communication, and the use of protective barriers (e.g., gloves) when appropriate. Showers are also part of our sessions to ensure physical and emotional well-being for everyone involved.
          </p>
        </div>

      </div>
    </section>
  );
};