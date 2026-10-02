import { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingConfig as cfg } from '../data/weddingConfig';

// Initials shown on the envelope (edit these two letters anytime)
const GROOM_INITIAL = 'J';
const BRIDE_INITIAL = 'B';

// Full-screen envelope. Tap: flap opens, letter rises, then the invitation is revealed.
export default function Splash({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const initials = `${GROOM_INITIAL} & ${BRIDE_INITIAL}`;

  const open = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1700);
  };

  return (
    <motion.div className="splash" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <p className="splash__title">You are invited</p>

      <button type="button" className="envelope" onClick={open} aria-label="Open the invitation">
        <motion.div
          className="envelope__letter"
          animate={opening ? { y: '-62%' } : { y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
        >
          <span className="script">{initials}</span>
          <span className="envelope__date">19 . 10 . 2026</span>
        </motion.div>
        <div className="envelope__front" />
        <motion.div
          className="envelope__flap"
          animate={opening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 3 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
        <motion.span className="envelope__seal" animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: 0.3 }}>
          {GROOM_INITIAL}{BRIDE_INITIAL}
        </motion.span>
      </button>

      <motion.p className="splash__hint" animate={{ opacity: opening ? 0 : [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: opening ? 0 : Infinity }}>
        Tap to open
      </motion.p>
    </motion.div>
  );
}