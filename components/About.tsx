import React from 'react';
import { Award } from 'lucide-react';

export const About: React.FC = () => {
  const certifications = [
    { year: "2025", title: "Sacred Touch Immersion", org: "Sacred Being" },
    { year: "2024", title: "Spinal Attunement Certified Practitioner", org: "SomaMystica" },
    { year: "2023", title: "Equity in Health Workshop", org: "WellSouth" },
    { year: "2022", title: "Comprehensive First Aid", org: "Red Cross" },
    { year: "2022", title: "100hr YACEP Trauma Informed Yin", org: "SomaPsych" },
    { year: "2021", title: "250hr Yoga Teacher Training", org: "Zero Point Yoga" },
    { year: "2015", title: "Certified Reiki Practitioner", org: "" },
    { year: "2015", title: "Certified Massage Therapist", org: "Elly Lukas College" },
  ];

  return (
    <section id="about" className="py-20 bg-stone-50">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Top: Image + Bio in 2 columns */}
        <div className="grid md:grid-cols-2 gap-12 items-stretch mb-16">

          {/* Image Column */}
          <div className="relative">
            {/* Image Frame */}
            <div className="absolute inset-0 border-2 border-sage-500 transform translate-x-4 translate-y-4"></div>
            <img
              src="Images/PXL_20260222_233928026~2_HD.jpeg"
              alt="Practitioner Portrait"
              className="relative z-10 w-full h-full object-cover"
            />
          </div>

          {/* Bio Text Column */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-serif text-stone-900 mb-8">About Nala</h2>
            <div className="prose prose-stone text-stone-700 leading-loose">
              <p className="mb-4">
                I'm devoted to the path of embodiment {"\u2013"} deepening my understanding of what it means to live fully in this body, in relationship with others, and with the wider world. I've been working one{"\u2011"}to{"\u2011"}one and in group therapeutic settings since 2015, and I'm a committed lifelong learner with a personal practice of ongoing self{"\u2011"}inquiry.
              </p>
              <p className="mb-4">
                Led by compassion, curiosity, and love, I weave the different threads of wisdom I've received into experiences of attuned being and tender, sensual care.
              </p>
              <p className="mb-4">
                My expression is wide and a little wild {"\u2013"} often playful and nurturing, sometimes quiet and deeply still.
              </p>
              <p className="mb-4">
                I adore human connection, singing, dancing, nourishing food, reading, destigmatising conversations about bodies and pleasure, and exploring all things wellness (among many more small joys).
              </p>
              <p>
                In session, you can expect warmth, honesty, a little humour, and a lot of respect for your boundaries and your timing.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Training & Certifications - Full Width */}
        <div>
          <h3 className="text-xl uppercase tracking-widest text-sage-600 mb-6 font-bold flex items-center gap-2">
            <Award className="w-5 h-5" /> Training & Certifications
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex gap-4 items-baseline border-b border-stone-200 pb-2">
                <span className="text-sage-600 font-bold text-sm">{cert.year}</span>
                <div>
                  <p className="text-stone-800 font-medium leading-tight">{cert.title}</p>
                  {cert.org && <p className="text-stone-500 text-xs mt-1">{cert.org}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
