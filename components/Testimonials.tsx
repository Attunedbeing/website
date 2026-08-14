import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteData } from './SiteDataContext';
import type { Testimonial } from './SiteDataContext';
import { CollapsibleSection } from './CollapsibleSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, rotate: -1 },
  visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: "spring" as const, stiffness: 50, damping: 20, mass: 1.2 } },
};

const TestimonialsList: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => (
  <motion.div
    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
  >
    {testimonials.map((testimonial) => (
      <motion.div key={testimonial.id} variants={itemVariants} className="bg-white p-8 shadow-sm border border-sage-200 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
        <div className="mb-6 text-sage-300">
          <Quote className="w-10 h-10 fill-current opacity-50" />
        </div>
        <p className="text-stone-600 italic mb-6 flex-grow leading-relaxed">"{testimonial.message}"</p>
        <div className="mt-auto">
          <p className="font-serif text-stone-900 text-lg">{testimonial.name}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export const Testimonials: React.FC = () => {
  const { testimonials, loading } = useSiteData();

  return (
    <CollapsibleSection
      id="testimonials"
      title="Testimonials"
      subtitle="Words from those who have journeyed with me."
      sectionClassName="py-16 bg-stone-50 overflow-hidden"
      containerClassName="max-w-6xl"
      background={
        <img
          src="Images/IMG_2675_HD.JPG"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.18] pointer-events-none hidden md:block"
        />
      }
    >
      {loading ? (
        <p className="text-stone-500 text-center py-8">Loading stories...</p>
      ) : (
        <TestimonialsList testimonials={testimonials} />
      )}
    </CollapsibleSection>
  );
};
