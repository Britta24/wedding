import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Full-screen photo viewer: swipe, arrow buttons, Esc to close.
export default function Lightbox({ images, index, onClose, onChange }) {
  const last = images.length - 1;
  const prev = () => onChange(index === 0 ? last : index - 1);
  const next = () => onChange(index === last ? 0 : index + 1);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  });

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button type="button" className="icon-btn lightbox__close" onClick={onClose} aria-label="Close photo viewer">
        <X size={26} />
      </button>
      <motion.img
        key={index}
        src={images[index]}
        alt={`Engagement photo ${index + 1} of ${images.length}`}
        className="lightbox__img"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDragEnd={(_, { offset }) => {
          if (offset.x < -70) next();
          else if (offset.x > 70) prev();
        }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
      />
      {images.length > 1 && (
        <>
          <button type="button" className="icon-btn lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous photo">
            <ChevronLeft size={28} />
          </button>
          <button type="button" className="icon-btn lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next photo">
            <ChevronRight size={28} />
          </button>
          <p className="lightbox__count">{index + 1} / {images.length}</p>
        </>
      )}
    </motion.div>
  );
}
