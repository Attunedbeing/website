import React from 'react';

export const Ritual: React.FC = () => {
  const steps = [
    {
      number: "1",
      title: "Desire Mapping & Agreement",
      desc: "Crafting your session together, getting clear on intentions, desires, what feels safe for you, and what I can offer. This helps us create a mutual agreement for each tailored experience."
    },
    {
      number: "2",
      title: "Full Body Oil Massage",
      desc: "Beginning with a steamy warm shower, you’ll receive a decadent full body massage with warm oil and check-ins throughout. Lead by the wisdom of your pleasure, supported by Nala's intuitive touch."

    },
    {
      number: "3",
      title: "Closing & Aftercare",
      desc: "Space to soak up your experience. This might include resting in stillness, reflective conversation or cuddles to support integration."
    }
  ];

  return (
    <section id="ritual" className="py-20 bg-stone-900 text-stone-50 relative overflow-hidden">
      {/* Abstract Background element */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sage-900 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sage-800 rounded-full filter blur-3xl opacity-10 translate-x-1/2 translate-y-1/2"></div>
      <img
        src="Images/Nala-6.JPEG"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.40] pointer-events-none md:block"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-transparent to-stone-900 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-sage-100 mb-4">The Ritual</h2>
          <p className="text-stone-400 max-w-xl mx-auto">Every session is a unique ritual, co‑created to honour your comfort, your desires, and your boundaries.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative p-8 border border-stone-800 bg-stone-950/50">
              <span className="absolute -top-1 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-5xl font-serif text-sage-200 font-regular z-0 opacity-50 md:opacity-100 select-none">
                {step.number}
              </span>
              <div className="relative z-10 mt-4 text-center">
                <h3 className="text-xl font-serif text-sage-200 mb-4">{step.title}</h3>
                <p className="text-stone-400 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
