import React from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Images/4G4A7600_web.jpg"
          alt="Unhurried, grounding bodywork in warm natural light"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-stone-900 opacity-[0.90] mix-blend-multiply"></div>
        {/* Sage tint */}
        <div className="absolute inset-0 bg-sage-900/25"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-tight">
          Honoring Your Body <br />
          <span className="italic text-sage-200">As A Temple</span>
        </h1>
        <span className="block text-stone-200 tracking-[0.3em] text-sm md:text-base uppercase mb-4 font-medium">
          Based in Ōtepoti, Dunedin
        </span>
        <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Sensual, therapeutic bodywork for all bodies and genders, based in Ōtepoti Dunedin. A trauma-aware practice of worship and devotion - supporting nervous system regulation, embodiment, and a deeper relationship with pleasure and self.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#pricing"
            className="bg-sage-500 hover:bg-sage-400 text-white px-8 py-3 uppercase tracking-widest text-sm transition-all duration-300 border border-sage-500"
          >
            Session Options
          </a>
          <a
            href="#overview"
            className="bg-transparent hover:bg-white/10 text-white px-8 py-3 uppercase tracking-widest text-sm transition-all duration-300 border border-white"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <a href="#overview" aria-label="Scroll down">
          <ArrowDown className="text-white/70 w-6 h-6" />
        </a>
      </div>
    </section>
  );
};
