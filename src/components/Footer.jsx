import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Share2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { weddingConfig as cfg } from '../data/weddingConfig';
import { shareInvitation, whatsappShareUrl } from '../utils/share';
import Reveal from './Reveal';

const GOLD = 'var(--gold-light, #e9cf9b)';
const GOLD_DEEP = 'var(--gold, #c9a24b)';

// Pop-up shown once when the guest scrolls down to the Thank you section
function ThanksPopup({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const sparkles = [
    { top: '8%', left: '10%', delay: 0 },
    { top: '14%', right: '12%', delay: 0.6 },
    { bottom: '22%', left: '8%', delay: 1.1 },
    { bottom: '12%', right: '10%', delay: 0.3 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left))',
        background: 'rgba(30, 4, 8, 0.72)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="thanks-popup-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        style={{
          position: 'relative',
          width: 'min(92vw, 22rem)',
          padding: '2.2rem 1.5rem 1.8rem',
          textAlign: 'center',
          borderRadius: '1.5rem',
          color: '#fff7e6',
          background: 'linear-gradient(160deg, #7a1424 0%, #4a0b15 100%)',
          border: `1px solid ${GOLD}`,
          boxShadow: `0 0 0 5px rgba(233,207,155,0.12), 0 20px 50px rgba(0,0,0,0.5)`,
          overflow: 'hidden'
        }}
      >
        {sparkles.map((s, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: s.delay }}
            style={{ position: 'absolute', color: GOLD, fontSize: '1rem', ...s }}
          >
            ✦
          </motion.span>
        ))}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close message"
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            color: GOLD,
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>

        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ fontSize: '2rem', lineHeight: 1 }}
        >
          💛
        </motion.div>

        <h3
          id="thanks-popup-title"
          className="script"
          style={{
            margin: '0.6rem 0 0.3rem',
            fontSize: 'clamp(2rem, 9vw, 2.5rem)',
            lineHeight: 1.1,
            color: GOLD
          }}
        >
          Thank you!
        </h3>

        <p style={{ margin: '0 0 1.1rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Thanks for seeing the invitation patiently.
        </p>

        <span
          aria-hidden="true"
          style={{ display: 'block', width: '4rem', height: 1, margin: '0 auto 0.9rem', background: GOLD, opacity: 0.8 }}
        />

        <p
          className="script"
          style={{ margin: 0, fontSize: 'clamp(1.5rem, 7vw, 1.9rem)', lineHeight: 1.2, color: '#f3dca8' }}
        >
          by {cfg.groom.name}
        </p>
        <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD }}>
          (the don)
        </p>

        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: '1.4rem',
            minHeight: 44,
            padding: '0.6rem 2rem',
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '1rem',
            color: '#4a0b15',
            background: `linear-gradient(135deg, #f3dca8, ${GOLD_DEEP})`
          }}
        >
          See you at the wedding
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Footer() {
  const [status, setStatus] = useState('');
  const [showThanks, setShowThanks] = useState(false);
  const footerRef = useRef(null);
  const title = `${cfg.groom.name} & ${cfg.bride.name} | Wedding Invitation`;
  const text = `You are invited to the wedding of ${cfg.groom.name} & ${cfg.bride.name}.`;

  // Show the pop-up once when the Thank you section scrolls into view
  useEffect(() => {
    const el = footerRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setShowThanks(true), 500);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const share = async () => {
    const result = await shareInvitation({ title, text, url: cfg.siteUrl });
    if (result === 'copied') setStatus('Link copied. Paste it anywhere to share.');
    else if (result === 'failed') setStatus('');
    if (result === 'copied') setTimeout(() => setStatus(''), 3000);
  };

  return (
    <footer ref={footerRef} className="section section--dark footer">
      <Reveal>
        <h2 className="section__title script">Thank you</h2>
        <p className="section__lead">Your presence and blessings will make our day complete.</p>
        <p className="footer__tag">{cfg.hashtag}</p>
        <div className="btn-row btn-row--center">
          <button type="button" className="btn btn--gold" onClick={share}>
            <Share2 size={18} aria-hidden="true" /> Share this invitation
          </button>
          <a className="btn btn--ghost-light" href={whatsappShareUrl(text, cfg.siteUrl)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden="true" /> WhatsApp
          </a>
        </div>
        <p className="footer__status" role="status">{status}</p>
      </Reveal>

      <AnimatePresence>
        {showThanks && <ThanksPopup onClose={() => setShowThanks(false)} />}
      </AnimatePresence>
    </footer>
  );
}