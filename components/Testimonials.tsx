import React, { useState } from 'react';
import { ChevronDown, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteData } from './SiteDataContext';
import type { Testimonial } from './SiteDataContext';

const PREVIEW_COUNT = 3;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, rotate: -1 },
  visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: "spring" as const, stiffness: 50, damping: 20, mass: 1.2 } },
};

// Longer testimonials claim more of the grid: short = 1 column, medium = 2,
// long = the full row. grid-flow-dense back-fills gaps so it tiles neatly.
const spanClass = (message: string) => {
  const len = message.length;
  if (len > 320) return 'md:col-span-2 lg:col-span-3';
  if (len > 150) return 'md:col-span-2 lg:col-span-2';
  return '';
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <motion.div
    variants={itemVariants}
    className={`bg-white p-8 shadow-sm border border-sage-200 flex flex-col h-full hover:shadow-md transition-shadow duration-300 ${spanClass(testimonial.message)}`}
  >
    <div className="mb-6 text-sage-300">
      <Quote className="w-10 h-10 fill-current opacity-50" />
    </div>
    <p className="text-stone-600 italic mb-6 flex-grow leading-relaxed">"{testimonial.message}"</p>
    <div className="mt-auto">
      <p className="font-serif text-stone-900 text-lg">{testimonial.name}</p>
    </div>
  </motion.div>
);

export const Testimonials: React.FC = () => {
  const { testimonials, loading } = useSiteData();
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? testimonials : testimonials.slice(0, PREVIEW_COUNT);
  const hasMore = testimonials.length > PREVIEW_COUNT;

  return (
    <section id="testimonials" className="relative py-16 bg-stone-50 overflow-hidden">
      <img
        src="Images/IMG_2675_HD.JPG"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.18] pointer-events-none hidden md:block"
      />
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2">Testimonials</h2>
          <p className="text-stone-500 text-sm">Words from those who have journeyed with me.</p>
        </div>

        {loading ? (
          <p className="text-stone-500 text-center py-8">Loading stories...</p>
        ) : (
          <>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 grid-flow-dense gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {visible.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </motion.div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAll(s => !s)}
                  className="inline-flex items-center gap-3 border border-sage-400 bg-white/80 px-8 py-3 text-xs uppercase tracking-[0.2em] text-sage-700 cursor-pointer transition-colors duration-300 hover:bg-sage-500 hover:border-sage-500 hover:text-white"
                >
                  {showAll ? 'Show less' : 'See more'}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
