import React from 'react';
import { Heart, Sun, Wind, Anchor, Eye, ShieldCheck, Sparkles, PersonStanding, HeartHandshake } from 'lucide-react';

export const Overview: React.FC = () => {
  const benefits = [
    { icon: <PersonStanding className="w-5 h-5" />, title: "Reconnect with yourself", desc: "Explore a deeper connection to your body, senses, and innate sensuality." },
    { icon: <Sun className="w-5 h-5" />, title: "Experience non-goal-oriented pleasure", desc: "Discover pleasure without pressure or performance, making room for presence, connection, and expanded states of bliss." },
    { icon: <Heart className="w-5 h-5" />, title: "Deepen your capacity to feel", desc: "Gently broaden your ability to experience a wider range of sensations and emotions. We can slowly reawaken senses that may have been dulled by stress through the mindful use of breath, sound, and movement." },
    { icon: <Eye className="w-5 h-5" />, title: "Cultivate self-attunement", desc: "Grow a clearer awareness and understanding of your own needs and desires." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Embrace agency over your pleasure", desc: "Learn skills to notice and express your desires and limits." },
    { icon: <HeartHandshake className="w-5 h-5" />, title: "Release shame and guilt", desc: "Discover freedom from societal conditioning and past experiences that may have created shame or guilt around pleasure." },
    { icon: <Sparkles className="w-5 h-5" />, title: "Heal with a trauma-aware approach", desc: "Receive support in a safe and understanding environment that acknowledges and respects the uniqueness of your path." },
  ];

  return (
    <section id="overview" className="py-20 md:py-28 bg-stone-25">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-stretch">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-8">

            {/* Massage Table Image */}
            <div className="relative flex-1 min-h-[200px]">
              <div className="absolute inset-0 border border-sage-300 rounded-sm"></div>
              <img
                src="Images/PXL_20260222_233928026~2_HD.jpeg"
                alt="Massage table in a warm, inviting treatment space"
                className="relative z-10 w-full h-full object-cover rounded-sm transform -translate-x-3 -translate-y-3"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6">Overview</h2>
              <p className="text-stone-600 leading-relaxed">
                <strong className="text-sage-600">Tantric massage</strong> is a sensual, therapeutic bodywork practice of worship, offered in service to honouring your whole being. Inviting you to experience deep relaxation, grounding, joy, arousal, pleasure and beyond.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif text-stone-800 mb-4">The Experience</h3>
              <p className="text-stone-600 leading-relaxed mb-6">
                In these sessions, we slow everything right down. Think warm oil, unhurried touch, and plenty of time for your body to arrive.
                Your body is welcomed as a temple, exactly as it is today {"\u2013"} no pressure to relax quickly, feel aroused, or {"\u201C"}have a big breakthrough.{"\u201D"}
                <br /><br />
                We co{"\u2011"}create a safe space where your yes, no, and maybes are all honoured, and where you can gently explore what feels good to you.
                This is an invitation to practice receiving {"\u2013"} care, pleasure, and attention {"\u2013"} without needing to perform or give anything back.
              </p>
            </div>

          </div>

          {/* Right: Benefits Grid */}
          <div className="bg-white p-8 shadow-sm border border-sage-300 rounded-sm">
            <h4 className="text-l uppercase tracking-widest text-sage-600 mb-8 text-center font-medium">In this experience, you're invited to</h4>
            <ul className="space-y-10">
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
