import React from 'react';
import { Award } from 'lucide-react';

export const About: React.FC = () => {
  const certifications = [
    { year: "2025", title: "Attuned Being Immersion", org: "Attuned Being" },
    { year: "2024", title: "Spinal Attunement Certified Practitioner", org: "Somamystica" },
    { year: "2023", title: "Equity in Health Workshop", org: "WellSouth" },
    { year: "2022", title: "Comprehensive First Aid", org: "Red Cross" },
    { year: "2022", title: "100hr YACEP Trauma Informed Yin", org: "SomaPsych" },
    { year: "2021", title: "250hr Yoga Teacher Training", org: "Zero Point Yoga" },
    { year: "2015", title: "Certified Reiki Practitioner", org: "" },
    { year: "2015", title: "Certified Massage Therapist", org: "Elly Lukas College" },
  ];

  return (
    <section id="about" className="py-20 bg-stone-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Image Column */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Image Frame */}
              <div className="absolute inset-0 border-2 border-sage-500 transform translate-x-4 translate-y-4"></div>
              <img 
                src= "Images/Anonymous.webp"
                alt="Practitioner Portrait" 
                className="relative z-10 w-full h-[700px] object-cover"
              />
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7">
            <h2 className="text-4xl font-serif text-stone-900 mb-8">About Me</h2>
            
            <div className="prose prose-stone text-stone-700 mb-12 leading-loose">
              <p className="mb-4">
                I am devoted to the path of embodiment through the navigation of self and the collective being. I have been working one-on-one and in group therapeutic settings since 2015.
              </p>
              <p className="mb-4">
                I am a committed life-long learner with an ever-evolving personal practice of self-enquiry, led by compassion, curiosity, and love.
              </p>
              <p>
                My expression is wide, dominant in playful and nurturing energy, and I adore human connection, singing, dancing, nourishing food, reading, and wellness among many more.
              </p>
            </div>

            <div>
              <h3 className="text-xl uppercase tracking-widest text-sage-600 mb-6 font-bold flex items-center gap-2">
                <Award className="w-5 h-5" /> Training & Certifications
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
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

        </div>
      </div>
    </section>
  );
};