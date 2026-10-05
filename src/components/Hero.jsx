import { motion } from 'framer-motion';
import { weddingConfig as cfg } from '../data/weddingConfig';
import { formatDate } from '../utils/calendar';
import Petals from './Petals';

const GOLD = 'var(--gold-light, #e9cf9b)';
const GOLD_DEEP = 'var(--gold, #c9a24b)';

// Thin gold line with a small diamond in the middle
function Ornament({ width = '9rem' }) {
  return (
    <span
      aria-hidden="true"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width }}
    >
      <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
      <span style={{ width: 7, height: 7, background: GOLD, transform: 'rotate(45deg)' }} />
      <span style={{ flex: 1, height: 1, background: `linear-gradient(270deg, transparent, ${GOLD})` }} />
    </span>
  );
}

export default function Hero() {
  const date = formatDate(cfg.wedding.date, { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Petals />
      <p className="hero__lead">We are getting married</p>
      <h1 id="hero-title" className="hero__names script">
        <span>{cfg.groom.name}</span>
        <span className="hero__amp">&amp;</span>
        <span>{cfg.bride.name}</span>
      </h1>
      <p className="hero__date">{date}</p>
      {/* "\n" in venue.city breaks the line; pre-line + center keeps both lines centered */}
      <p className="hero__city" style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
        {cfg.venue.city}
      </p>

      {/* Scroll prompt: fully inline-styled so it never gets squeezed by other CSS */}
      <motion.a
        href="#countdown"
        aria-label="Scroll down To Join us on the beautiful day of us, by Jislin Leoj"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.7rem',
          width: 'min(90vw, 22rem)',
          height: 'auto',
          overflow: 'visible',
          margin: '2rem auto 0',
          padding: '0.5rem 0.5rem 0',
          textAlign: 'center',
          textDecoration: 'none',
          color: GOLD
        }}
      >
        <Ornament />

        <span
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            fontWeight: 700,
            paddingLeft: '0.42em'
          }}
        >
          ✦ Scroll down ✦
        </span>

        {/* Shimmering gold script line */}
        <motion.span
          className="script"
          animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{
            display: 'block',
            fontSize: 'clamp(1.7rem, 8vw, 2.2rem)',
            lineHeight: 1.2,
            textWrap: 'balance',
            backgroundImage: `linear-gradient(100deg, ${GOLD_DEEP} 0%, #fff4d6 25%, ${GOLD} 50%, #fff4d6 75%, ${GOLD_DEEP} 100%)`,
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            textShadow: '0 0 18px rgba(233, 207, 155, 0.25)'
          }}
        >
          To join us on our beautiful day 
        </motion.span>

        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.9rem',
            letterSpacing: '0.14em',
            fontStyle: 'italic',
            color: '#fff7e6'
          }}
        >
          <span aria-hidden="true" style={{ width: '1.6rem', height: 1, background: GOLD, opacity: 0.8 }} />
          by {cfg.groom.name}
          <span aria-hidden="true" style={{ width: '1.6rem', height: 1, background: GOLD, opacity: 0.8 }} />
        </span>

        {/* Soft pulsing gold dot with a travelling line, hints at scrolling without an arrow */}
        <span aria-hidden="true" style={{ position: 'relative', width: 2, height: '2.6rem', marginTop: '0.4rem' }}>
          <span style={{ position: 'absolute', inset: 0, background: `linear-gradient(${GOLD}, transparent)`, opacity: 0.35 }} />
          <motion.span
            animate={{ y: [0, 34, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: -3,
              top: 0,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: GOLD,
              boxShadow: `0 0 10px 2px ${GOLD}`
            }}
          />
        </span>
      </motion.a>
    </section>
  );
}