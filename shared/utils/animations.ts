// Framer Motion animation variants for WEPOSE Premium Tools
import { Variants } from 'framer-motion';

// Fade in/out
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Slide up from bottom
export const slideUp: Variants = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { y: 100, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

// Slide horizontal (for quiz questions)
export const slideHorizontal: Variants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { x: -60, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

// Scale in (for modals)
export const scaleIn: Variants = {
  initial: { scale: 0.92, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { scale: 0.92, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

// Stagger children
export const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Child item for stagger
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

// Fade in up
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2, ease: 'easeIn' } },
};
