import React from 'react';
import { Heart, Sun, Wind, Anchor, Eye, ShieldCheck, Sparkles, PersonStanding, HeartHandshake } from 'lucide-react';

export const Overview: React.FC = () => {
  const benefits = [
    { icon: <PersonStanding className="w-5 h-5" />, title: "Reconnect with yourself", desc: "Explore a deeper connection to your body, senses, and innate sensuality." },
    { icon: <Sun className="w-5 h-5" />, title: "Experience non-goal-oriented pleasure", desc: "Discover pleasure without pressure, allowing for presence, connection, and expanded states of bliss." },
    { icon: <Heart className="w-5 h-5" />, title: "Deepen your capacity to feel", desc: "Gently broaden your ability to experience a wider range of sensations and emotions. We can slowly reawaken senses that may have been dulled by stress through the mindful use of breath, sound, and movement." },
    { icon: <Eye className="w-5 h-5" />, title: "Cultivate self-attunement", desc: "Develop a stronger awareness and understanding of your own needs and desires." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Embrace agency over your pleasure", desc: "Learn skills to identify and express your desires and limits." },
    { icon: <HeartHandshake className="w-5 h-5" />, title: "Release shame and guilt", desc: "Explore dissolving societal conditioning and past experiences that may have created shame or guilt around pleasure." },
    { icon: <Sparkles className="w-5 h-5" />, title: "Heal with a trauma-aware approach", desc: "Receive support in a safe and understanding environment that acknowledges and respects your unique journey." },
  ];

  return (
    <section id="overview" className="py-20 md:py-28 bg-stone-25">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">Overview</h2>
              <p className="text-stone-600 leading-relaxed text-lg">
                <strong className="text-sage-600">Tantric massage</strong> is a sensual, therapeutic bodywork practice of worship, offered in service to honouring your whole being. Inviting you to experience deep relaxation, grounding, joy, arousal, pleasure and beyond.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-stone-800 mb-4">The Experience</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
               In these sessions, we slow everything right down. Think warm oil, unhurried touch, and plenty of time for your body to arrive.  
Your body is welcomed as a temple, exactly as it is today – no pressure to relax quickly, feel aroused, or “have a big breakthrough.”  
We co‑create a safe space where your yes, no, and maybes are all honoured, and where you can gently explore what feels good to you.  
This is an invitation to practice receiving – care, pleasure, and attention – without needing to perform or give anything back.
              </p>
            </div>
          </div>

          {/* Right: Benefits Grid */}
          <div className="bg-white p-8 shadow-sm border border-sage-300 rounded-sm">
            <h4 className="text-l uppercase tracking-widest text-sage-600 mb-8 text-center font-medium">In this experience, you are invited to</h4>
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
