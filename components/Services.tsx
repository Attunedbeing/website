import React from 'react';
import { CheckCircle2, XCircle, Shield } from 'lucide-react';

export const Services: React.FC = () => {
  const offered = [
    "Full‑body massage, including genitals (with your clear consent)",
    "Prostate massage (if desired and agreed)",
    "Energetic connection and presence",
    "Cuddles and soothing touch (if wanted)"
  ];

  const notOffered = [
    "Reciprocal touch of any kind",
    "Kissing", 
    "Oral sex",
    "Reciprocal sex of any kind"
  ];

  return (
    <section id="services" className="py-20 bg-stone-25">
      <div className="container mx-auto px-6 max-w-5xl">

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Offered */}
          <div>
            <h3 className="text-2xl font-serif text-stone-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-sage-500"></span>
              I welcome all bodies and genders into this work, and am available for:
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
          <div className="bg-stone-200 p-8 border-l-4 border-sage-300">
            <h3 className="text-2xl font-serif text-stone-800 mb-6 flex items-center gap-3 opacity-75">
              I am not available for
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
        <div className="bg-stone-200 rounded-sm p-8 md:p-12 border border-sage-300 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white rounded-full text-sage-600">
              <Shield className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-2xl font-serif text-stone-800 mb-4">A Note on Safety</h3>
          <p className="text-stone-700 max-w-2xl mx-auto leading-relaxed">
            As a commitment to your physical and emotional well‑being – and my own – safety, care, and respect are part of every interaction.
This means I prioritise discretion, clear communication, and shared agreements. To protect your nervous system and ensure you can fully feel and consent, please do not use drugs (unless medically required) or alcohol within 12 hours of your session.
You’re also invited to shower as part of our time together, so your body can arrive feeling fresh and relaxed.
          </p>
        </div>

      </div>
    </section>
  );
};
