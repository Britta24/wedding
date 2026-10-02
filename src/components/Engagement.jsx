import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { weddingConfig as cfg } from '../data/weddingConfig';
import { getImage } from '../utils/images';
import { formatDate } from '../utils/calendar';
import Reveal from './Reveal';
import Divider from './Divider';
import Lightbox from './Lightbox';

export default function Engagement() {
  const { title, date, message, photos } = cfg.engagement;
  const images = photos.map(getImage).filter(Boolean);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(null);

  const onScroll = () => {
    const el = trackRef.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goTo = (i) => trackRef.current?.scrollTo({ left: i * trackRef.current.clientWidth, behavior: 'smooth' });

  return (
    <section className="section section--cream" aria-labelledby="eng-title">
      <Divider />
      <Reveal>
        <span className="badge">Celebrated</span>
        <h2 id="eng-title" className="section__title script">
          {title} – {formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' })}
        </h2>
      </Reveal>

      {images.length > 0 && (
        <Reveal className="carousel">
          <div className="carousel__track" ref={trackRef} onScroll={onScroll} tabIndex={0} aria-label="Engagement photos, swipe to browse">
            {images.map((src, i) => (
              <button type="button" key={src} className="carousel__slide" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} full screen`}>
                <img src={src} alt={`Engagement photo ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
          <div className="carousel__dots">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel__dot${i === active ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === active}
              />
            ))}
          </div>
        </Reveal>
      )}

      <Reveal><p className="section__lead">{message}</p></Reveal>

      <AnimatePresence>
        {open !== null && <Lightbox images={images} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
