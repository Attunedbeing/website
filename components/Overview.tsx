import React from 'react';
import { Heart, Sun, Wind, Anchor, Eye, ShieldCheck, Sparkles } from 'lucide-react';

export const Overview: React.FC = () => {
  const benefits = [
    { icon: <Anchor className="w-5 h-5" />, title: "Reconnect with Yourself", desc: "Explore a deeper connection to your body, senses, and innate sensuality." },
    { icon: <Sun className="w-5 h-5" />, title: "Non-Goal-Oriented Pleasure", desc: "Discover pleasure without pressure, allowing for presence, connection, and bliss." },
    { icon: <Heart className="w-5 h-5" />, title: "Deepen Capacity to Feel", desc: "Gently broaden your ability to experience a wider range of emotions and sensations." },
    { icon: <Eye className="w-5 h-5" />, title: "Cultivate Self-Attunement", desc: "Develop a stronger awareness and understanding of your own needs and desires." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Agency & Boundaries", desc: "Learn skills to identify and express your desires and limits clearly." },
    { icon: <Wind className="w-5 h-5" />, title: "Release Shame", desc: "Dissolve societal conditioning and past experiences creating shame around pleasure." },
    { icon: <Sparkles className="w-5 h-5" />, title: "Trauma-Aware Healing", desc: "Receive support in a safe environment that respects your unique journey." },
  ];

  return (
    <section id="overview" className="py-20 md:py-28 bg-stone-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">Overview</h2>
              <p className="text-stone-600 leading-relaxed text-lg">
                <strong className="text-sage-600">Tantric massage</strong> is a sensual, therapeutic bodywork practice of worship, offered in service to honoring your whole being. It invites you to experience deep relaxation, grounding, joy, arousal, compassion, pleasure, and beyond.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-serif text-stone-800 mb-4">The Experience</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                I bring presence and slow, rhythmic touch, acknowledging your body as a temple to be revered with acceptance, respect, and non-judgment. My intention is to offer you full permission to discover, freely express, and explore your desires within a safe container. This space provides an opportunity to practice truly receiving by gently reconnecting to your sensuality and senses.
              </p>
              <p className="text-stone-600 italic font-serif border-l-2 border-sage-500 pl-4">
                "During the session, you are invited to simply be."
              </p>
            </div>
          </div>

          {/* Right: Benefits Grid */}
          <div className="bg-white p-8 shadow-sm border border-stone-100 rounded-sm">
            <h3 className="text-xl uppercase tracking-widest text-sage-600 mb-8 text-center font-medium">Your Invitation</h3>
            <ul className="space-y-6">
              {benefits.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start group">
                  <div className="mt-1 text-sage-500 group-hover:text-sage-700 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm uppercase tracking-wide mb-1">{item.title}</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};