import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Calm, once-only fade-up as a section scrolls into view. */
export default function Reveal({ children, delay = 0, y = 24, className = '' }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
