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
  /** Rendered behind the expanded content (e.g. a background image). */
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
          className="w-full flex items-center justify-between gap-6 text-left group"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-2 group-hover:text-stone-700 transition-colors">
              {title}
            </h2>
            {subtitle && <p className="text-stone-500 text-sm">{subtitle}</p>}
          </div>
          <ChevronDown
            className={`w-6 h-6 text-sage-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="relative pt-10">
                {background}
                <div className="relative z-10">{children}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
