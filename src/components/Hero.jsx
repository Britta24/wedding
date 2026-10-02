import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { weddingConfig as cfg } from '../data/weddingConfig';
import { formatDate } from '../utils/calendar';
import Petals from './Petals';

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
      <p className="hero__city">{cfg.venue.city}</p>
      <motion.a
        href="#countdown"
        className="hero__scroll"
        aria-label="Scroll down"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
