import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteData } from './SiteDataContext';
import type { Testimonial } from './SiteDataContext';

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
// Longer testimonials claim more of the 3-column grid. Rather than fixed
// spans (which leave ragged gaps when the mix doesn't divide evenly), cards
// are packed into rows that each sum to exactly 3 columns: a long card gets
// a row to itself, a medium pairs with a short, shorts run three abreast.
// Leftovers get promoted a size so no row is ever left with a hole.
type Span = 1 | 2 | 3;
const desiredSpan = (len: number): Span => (len > 500 ? 3 : len > 300 ? 2 : 1);

function packRows(testimonials: Testimonial[]): { testimonial: Testimonial; span: Span }[][] {
  const ones: Testimonial[] = [];
  const twos: Testimonial[] = [];
  const threes: Testimonial[] = [];
  for (const t of testimonials) {
    const s = desiredSpan(t.message.length);
    (s === 1 ? ones : s === 2 ? twos : threes).push(t);
  }

  const fullRows = threes.map(t => [{ testimonial: t, span: 3 as Span }]);
  const pairRows: { testimonial: Testimonial; span: Span }[][] = [];
  for (const t of twos) {
    const short = ones.shift();
    if (short) pairRows.push([{ testimonial: t, span: 2 }, { testimonial: short, span: 1 }]);
    else fullRows.push([{ testimonial: t, span: 3 }]); // no short partner — take the row
  }
  const shortRows: { testimonial: Testimonial; span: Span }[][] = [];
  while (ones.length >= 3) {
    shortRows.push(ones.splice(0, 3).map(t => ({ testimonial: t, span: 1 as Span })));
  }
  if (ones.length === 2) {
    pairRows.push([{ testimonial: ones[0], span: 2 }, { testimonial: ones[1], span: 1 }]);
  } else if (ones.length === 1) {
    fullRows.push([{ testimonial: ones[0], span: 3 }]);
  }

  // Interleave row types so sizes feel scattered rather than grouped
  const rows: { testimonial: Testimonial; span: Span }[][] = [];
  const sources = [pairRows, shortRows, fullRows];
  let i = 0;
  while (sources.some(s => s.length)) {
    const src = sources[i % sources.length];
    if (src.length) rows.push(src.shift()!);
    i++;
  }
  return rows;
}

const SPAN_CLASS: Record<Span, string> = {
  1: '',
  2: 'md:col-span-2 lg:col-span-2',
  3: 'md:col-span-2 lg:col-span-3',
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');

const TestimonialCard: React.FC<{ testimonial: Testimonial; span: Span }> = ({ testimonial, span }) => (
  <motion.div
    variants={itemVariants}
    className={`bg-white p-8 shadow-sm border border-sage-200 flex flex-col h-full hover:shadow-md transition-shadow duration-300 ${SPAN_CLASS[span]}`}
  >
    <Quote className="w-5 h-5 text-sage-400 fill-current mb-5 rotate-180" aria-hidden="true" />
    <p className="text-stone-700 flex-grow leading-relaxed">{testimonial.message}</p>
    <div className="mt-6 pt-5 border-t border-stone-200/70 flex items-center gap-3">
      <span className="w-9 h-9 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center font-serif text-sm shrink-0">
        {initials(testimonial.name)}
      </span>
      <p className="font-serif text-stone-900">{testimonial.name}</p>
    </div>
  </motion.div>
);

export const Testimonials: React.FC = () => {
  const { testimonials, loading } = useSiteData();

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
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 grid-flow-dense gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {packRows(testimonials)
              .flat()
              .map(({ testimonial, span }) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} span={span} />
              ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
