import React from 'react';
import { motion } from 'framer-motion';

/**
 * CartoonSection - Wraps any section or element with bouncy cartoon physics
 * Directions: 'left', 'right', 'pop', 'drop'
 */
export const CartoonSection = ({
  children,
  direction = 'left',
  delay = 0,
  className = ''
}) => {
  const getVariants = () => {
    switch (direction) {
      case 'left':
        return {
          hidden: { opacity: 0, x: -90, rotate: -2, scale: 0.95 },
          visible: {
            opacity: 1,
            x: 0,
            rotate: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 130,
              damping: 14,
              mass: 0.8,
              delay
            }
          }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: 90, rotate: 2, scale: 0.95 },
          visible: {
            opacity: 1,
            x: 0,
            rotate: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 130,
              damping: 14,
              mass: 0.8,
              delay
            }
          }
        };
      case 'pop':
        return {
          hidden: { opacity: 0, scale: 0.8, y: 30 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 180,
              damping: 12,
              delay
            }
          }
        };
      case 'drop':
        return {
          hidden: { opacity: 0, y: -60, scale: 0.9 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 160,
              damping: 13,
              delay
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay }
          }
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={getVariants()}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
