import { AnimatePresence, motion } from 'framer-motion';
import { weddingConfig as cfg } from '../data/weddingConfig';
import { useCountdown } from '../hooks/useCountdown';
import { eventStart } from '../utils/calendar';
import Reveal from './Reveal';

export default function Countdown() {
  const { done, days, hours, minutes, seconds } = useCountdown(eventStart(cfg.wedding));
  const units = [['Days', days], ['Hours', hours], ['Minutes', minutes], ['Seconds', seconds]];

  return (
    <section id="countdown" className="section section--dark" aria-labelledby="countdown-title">
      <Reveal>
        <h2 id="countdown-title" className="section__title script">{done ? 'We are married!' : 'Counting down'}</h2>
        {!done && (
          <ul className="countdown" aria-label="Time left until the wedding">
            {units.map(([label, value]) => (
              <li key={label} className="countdown__unit">
                <span className="countdown__box">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={value}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {String(value).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="countdown__label">{label}</span>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  );
}
