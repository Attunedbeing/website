import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
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
    className={`bg-white p-6 shadow-sm border border-sage-200 flex flex-col h-full hover:shadow-md transition-shadow duration-300 ${SPAN_CLASS[span]}`}
  >
    <p className="text-stone-700 flex-grow leading-relaxed">
      <span aria-hidden="true" className="font-serif text-4xl leading-none text-sage-400 mr-1.5 align-[-0.35em] select-none">
        &ldquo;
      </span>
      {testimonial.message}
    </p>
    <div className="mt-5 pt-4 border-t border-stone-200 flex items-center gap-3">
      <span className="w-8 h-8 rounded-full bg-sage-100 border border-sage-200 text-sage-700 flex items-center justify-center font-serif text-xs shrink-0">
        {initials(testimonial.name)}
      </span>
      <p className="font-serif text-stone-800">{testimonial.name}</p>
    </div>
  </motion.div>
);

const PREVIEW_CARDS = 3;

export const Testimonials: React.FC = () => {
  const { testimonials, loading } = useSiteData();
  const [showAll, setShowAll] = useState(false);

  // Split at packed-row boundaries so the preview looks identical to the
  // top of the full grid; the extra rows live in their own animated block.
  const rows = packRows(testimonials);
  const previewRows: typeof rows = [];
  const restRows: typeof rows = [];
  let count = 0;
  for (const row of rows) {
    if (count < PREVIEW_CARDS) {
      previewRows.push(row);
      count += row.length;
    } else {
      restRows.push(row);
    }
  }

  return (
    <section id="testimonials" className="relative py-16 bg-stone-900 overflow-hidden">
      <img
        src="Images/IMG_2675_HD.JPG"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.35] blur-md scale-105 pointer-events-none hidden md:block"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-transparent to-stone-900 pointer-events-none"></div>
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-sage-100 mb-2">Testimonials</h2>
          <p className="text-stone-400 text-sm">Words from those who have journeyed with me.</p>
        </div>

        {loading ? (
          <p className="text-stone-400 text-center py-8">Loading stories...</p>
        ) : (
          <>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 grid-flow-dense gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {previewRows.flat().map(({ testimonial, span }) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} span={span} />
              ))}
            </motion.div>

            <AnimatePresence initial={false}>
              {showAll && restRows.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 grid-flow-dense gap-6 pt-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {restRows.flat().map(({ testimonial, span }) => (
                      <TestimonialCard key={testimonial.id} testimonial={testimonial} span={span} />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {restRows.length > 0 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(s => !s)}
                  className="inline-flex items-center gap-3 border border-sage-300 bg-transparent px-8 py-3 text-xs uppercase tracking-[0.2em] text-sage-100 cursor-pointer transition-colors duration-300 hover:bg-sage-500 hover:border-sage-500 hover:text-white"
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
