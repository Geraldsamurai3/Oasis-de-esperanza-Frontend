// src/InformativePage/animations/globalVariants.js
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      ease: 'easeOut',
    },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
