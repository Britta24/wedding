import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

// Fades and lifts its children into place the first time they scroll into view.
export default function Reveal({ children, delay = 0, className = '' }) {
  const [ref, seen] = useInView();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={seen ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
