import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  sectionClassName?: string;
  containerClassName?: string;
  defaultOpen?: boolean;
  /** Rendered full-bleed behind the expanded content (e.g. a background image). */
  background?: React.ReactNode;
  children: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  subtitle,
  sectionClassName = 'py-16 bg-stone-50',
  containerClassName = 'max-w-3xl',
  defaultOpen = false,
  background,
  children,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = `${id}-content`;

  // Expand when navigated to via anchor link (e.g. navbar)
  useEffect(() => {
    const check = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, [id]);

  return (
    <section id={id} className={sectionClassName}>
      <div className={`container mx-auto px-6 ${containerClassName}`}>
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls={contentId}
          className="w-full flex items-center justify-between gap-6 text-left group cursor-pointer rounded-lg -m-3 p-3 transition-colors duration-300 hover:bg-stone-100/70"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2 group-hover:text-stone-700 transition-colors">
              {title}
            </h2>
            {subtitle && <p className="text-stone-500 text-sm">{subtitle}</p>}
          </div>
          <span className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline text-xs uppercase tracking-[0.2em] text-sage-600 transition-colors group-hover:text-sage-700">
              {open ? 'Close' : 'Open'}
            </span>
            <span className="w-11 h-11 rounded-full border border-sage-300 bg-white flex items-center justify-center text-sage-600 shadow-sm transition-all duration-300 group-hover:bg-sage-500 group-hover:border-sage-500 group-hover:text-white">
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              />
            </span>
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {/* Background spans the full section width; only the content is boxed */}
            <div className="relative mt-8">
              {background}
              <div
                className={`relative z-10 container mx-auto px-6 ${containerClassName} ${
                  background ? 'py-12' : 'py-2'
                }`}
              >
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
