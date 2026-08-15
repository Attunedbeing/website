import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';

interface GalleryPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink?: string;
}

const STATIC_PHOTOS: GalleryPost[] = [
  { id: 's1', imageUrl: 'Images/Nala-10.jpg', caption: '' },
  { id: 's2', imageUrl: 'Images/Nala-6.JPEG', caption: '' },
  { id: 's3', imageUrl: 'Images/Nala-8.JPEG', caption: '' },
  { id: 's4', imageUrl: 'Images/IMG_2673.jpg', caption: '' },
  { id: 's5', imageUrl: 'Images/IMG_2675_HD.JPG', caption: '' },
  { id: 's6', imageUrl: 'Images/IMG_2724_HD.jpeg', caption: '' },
  { id: 's7', imageUrl: 'Images/PXL_20260222_233928026~2_HD.jpeg', caption: '' },
  { id: 's8', imageUrl: 'Images/PXL_20260222_235629533.PORTRAIT_HD.jpeg', caption: '' },
];

const CARD_HEIGHT = 380;
const CARD_GAP = 14;
const EST_CARD_WIDTH = 300; // layout estimate until the real set width is measured
const DRIFT_SPEED = 30; // px per second while idle

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const Modal: React.FC<{ post: GalleryPost; onClose: () => void }> = ({ post, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-stone-900/80" />
      <motion.div
        className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-stone-400 hover:text-stone-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <img src={post.imageUrl} alt="" className="w-full object-cover" />
        {post.caption && (
          <div className="p-6">
            <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">{post.caption}</p>
            {post.permalink && (
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-xs uppercase tracking-widest text-stone-400 hover:text-sage-600 transition-colors"
              >
                View on Instagram
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export const Gallery: React.FC = () => {
  const [posts, setPosts] = useState<GalleryPost[]>(STATIC_PHOTOS);
  const [selected, setSelected] = useState<GalleryPost | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    fetch('/api/instagram-posts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setPosts(data);
      })
      .catch(() => {});
  }, []);

  // Cards keep each photo's natural aspect ratio, so the width of one full
  // set of posts is only known once rendered — measure it from the first copy.
  const [setWidth, setSetWidth] = useState(posts.length * (EST_CARD_WIDTH + CARD_GAP));
  const firstSetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = firstSetRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.scrollWidth;
      if (w > 0) setSetWidth(w + CARD_GAP);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [posts]);

  // Enough copies of the post set to cover any viewport, so the loop is seamless
  const [copies, setCopies] = useState(2);
  useEffect(() => {
    const update = () =>
      setCopies(Math.max(2, Math.ceil((window.innerWidth + EST_CARD_WIDTH) / setWidth) + 1));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [setWidth]);

  // Marquee position lives in a motion value; wrapping keeps it bounded forever
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, v => wrap(-setWidth, 0, v));

  const restingRef = useRef(false); // hover or keyboard focus
  const draggingRef = useRef(false);
  const modalRef = useRef(false);
  useEffect(() => {
    modalRef.current = selected !== null;
  }, [selected]);

  const speedRef = useRef(0);
  useAnimationFrame((_, delta) => {
    const target =
      prefersReducedMotion || restingRef.current || draggingRef.current || modalRef.current
        ? 0
        : DRIFT_SPEED;
    // ease toward the target so the drift starts and stops softly
    speedRef.current += (target - speedRef.current) * Math.min(1, delta / 400);
    if (speedRef.current > 0.01) baseX.set(baseX.get() - speedRef.current * (delta / 1000));
  });

  const dragState = useRef<{ pointerId: number; startX: number; startBase: number } | null>(null);
  const movedRef = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragState.current = { pointerId: e.pointerId, startX: e.clientX, startBase: baseX.get() };
    movedRef.current = 0;
    draggingRef.current = true;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragState.current;
    if (!d || e.pointerId !== d.pointerId) return;
    const dx = e.clientX - d.startX;
    movedRef.current = Math.max(movedRef.current, Math.abs(dx));
    // once it's clearly a drag, capture the pointer so card clicks don't fire
    if (movedRef.current > 4) e.currentTarget.setPointerCapture(e.pointerId);
    baseX.set(d.startBase + dx);
  };

  const endDrag = () => {
    dragState.current = null;
    draggingRef.current = false;
  };

  const openPost = (post: GalleryPost) => {
    if (movedRef.current > 8) return;
    setSelected(post);
  };

  return (
    <section id="gallery" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3">Gallery</h2>
          <p className="text-stone-500 text-sm">A glimpse into the work and the space.</p>
        </div>
      </div>

      <div
        className="relative overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-y' }}
        onMouseEnter={() => (restingRef.current = true)}
        onMouseLeave={() => (restingRef.current = false)}
        onFocusCapture={() => (restingRef.current = true)}
        onBlurCapture={() => (restingRef.current = false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <motion.div className="flex py-2" style={{ x, gap: CARD_GAP, width: 'max-content' }}>
          {Array.from({ length: copies }).map((_, c) => (
            <div
              key={c}
              ref={c === 0 ? firstSetRef : undefined}
              className="flex shrink-0"
              style={{ gap: CARD_GAP }}
            >
              {posts.map(post => (
                <button
                  key={`${c}-${post.id}`}
                  onClick={() => openPost(post)}
                  className="group relative shrink-0 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
                  style={{ height: CARD_HEIGHT }}
                  tabIndex={c === 0 ? 0 : -1}
                  aria-hidden={c > 0 || undefined}
                >
                  <img
                    src={post.imageUrl}
                    alt=""
                    draggable={false}
                    loading="lazy"
                    className="h-full w-auto max-w-none saturate-[0.92] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {post.caption && (
                    <p className="absolute bottom-0 left-0 right-0 p-5 text-left text-white/90 text-sm leading-snug line-clamp-2 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {post.caption}
                    </p>
                  )}
                </button>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <Modal post={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};
