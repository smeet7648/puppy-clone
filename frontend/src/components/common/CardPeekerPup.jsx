import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * High-definition Card Peeker Pup
 * Peeks up from BEHIND cards while the user is scrolling!
 * When scrolling stops, smoothly ducks back behind the card.
 */
export const CardPeekerPup = ({
  breed = 'maltipoo',
  position = 'top-right', // 'top-right' | 'top-left' | 'top-center'
  className = ''
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 550); // Keep peeking for 550ms after scroll tick
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Determine horizontal alignment
  const posClasses = {
    'top-right': 'right-6 sm:right-10',
    'top-left': 'left-6 sm:left-10',
    'top-center': 'left-1/2 -translate-x-1/2'
  }[position] || 'right-8';

  // Breeds definition
  const normalizedBreed = (breed || '').toLowerCase();
  let pupType = 'maltipoo';
  if (normalizedBreed.includes('pom')) pupType = 'pomeranian';
  else if (normalizedBreed.includes('poodle')) pupType = 'poodle';
  else if (normalizedBreed.includes('cava')) pupType = 'cavapoo';
  else if (normalizedBreed.includes('shih')) pupType = 'shihtzu';

  return (
    <motion.div
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      className={`absolute top-0 ${posClasses} pointer-events-none z-0 select-none ${className}`}
    >
      <motion.div
        initial={{ y: 55, opacity: 0 }}
        animate={{
          y: isScrolling && inView ? -38 : 50,
          opacity: isScrolling && inView ? 1 : 0,
          scale: isScrolling && inView ? 1 : 0.85
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 22,
          mass: 0.8
        }}
        className="relative w-20 h-20 sm:w-22 sm:h-22 will-change-transform drop-shadow-md"
      >
        <svg
          viewBox="0 0 100 80"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Maltipoo Warm Apricot */}
            <radialGradient id={`maltiGrad-${position}`} cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fff8ed" />
              <stop offset="50%" stopColor="#f7d5a5" />
              <stop offset="100%" stopColor="#c2622b" />
            </radialGradient>

            {/* Pomeranian Cream */}
            <radialGradient id={`pomGrad-${position}`} cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="65%" stopColor="#fef3e2" />
              <stop offset="100%" stopColor="#f9dfb6" />
            </radialGradient>

            {/* Poodle Curly Red */}
            <radialGradient id={`poodleGrad-${position}`} cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f8ad86" />
              <stop offset="60%" stopColor="#c2622b" />
              <stop offset="100%" stopColor="#873510" />
            </radialGradient>

            {/* Cavapoo Ruby Golden */}
            <radialGradient id={`cavaGrad-${position}`} cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fde0b2" />
              <stop offset="55%" stopColor="#c86d35" />
              <stop offset="100%" stopColor="#7a3411" />
            </radialGradient>

            {/* Shih Tzu Tri-color */}
            <radialGradient id={`shihGrad-${position}`} cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#fbe8cc" />
              <stop offset="100%" stopColor="#3d2114" />
            </radialGradient>
          </defs>

          {/* 1. MALTIPOO */}
          {pupType === 'maltipoo' && (
            <g>
              {/* Left Floppy Ear */}
              <ellipse cx="26" cy="32" rx="10" ry="18" fill="#c2622b" transform="rotate(-18 26 32)" />
              <ellipse cx="26" cy="32" rx="5" ry="12" fill="#f7d5a5" transform="rotate(-18 26 32)" />

              {/* Right Floppy Ear */}
              <ellipse cx="74" cy="32" rx="10" ry="18" fill="#c2622b" transform="rotate(18 74 32)" />
              <ellipse cx="74" cy="32" rx="5" ry="12" fill="#f7d5a5" transform="rotate(18 74 32)" />

              {/* Head */}
              <circle cx="50" cy="42" r="24" fill={`url(#maltiGrad-${position})`} />

              {/* Forehead Fluff Curls */}
              <circle cx="44" cy="22" r="6" fill="#fff8ed" />
              <circle cx="50" cy="20" r="7" fill="#fff8ed" />
              <circle cx="56" cy="22" r="6" fill="#fff8ed" />

              {/* Muzzle */}
              <ellipse cx="50" cy="50" rx="13" ry="10" fill="#fffdf8" />
              <ellipse cx="50" cy="46" rx="4" ry="3" fill="#2a170e" />
              <circle cx="49" cy="45" r="1" fill="#ffffff" />
              <path d="M 46 51 Q 50 54 54 51" fill="none" stroke="#2a170e" strokeWidth="1.5" strokeLinecap="round" />

              {/* Eyes */}
              <circle cx="40" cy="38" r="3.8" fill="#2a170e" />
              <circle cx="41.2" cy="36.8" r="1.5" fill="#ffffff" />
              <circle cx="60" cy="38" r="3.8" fill="#2a170e" />
              <circle cx="61.2" cy="36.8" r="1.5" fill="#ffffff" />

              {/* Rosy Cheeks */}
              <circle cx="35" cy="46" r="3" fill="#f9cdbf" opacity="0.8" />
              <circle cx="65" cy="46" r="3" fill="#f9cdbf" opacity="0.8" />

              {/* Two Paws Hooked Over Card Edge */}
              <ellipse cx="34" cy="68" rx="7" ry="5.5" fill="#fffdf8" stroke="#f7d5a5" strokeWidth="1.5" />
              <ellipse cx="66" cy="68" rx="7" ry="5.5" fill="#fffdf8" stroke="#f7d5a5" strokeWidth="1.5" />
            </g>
          )}

          {/* 2. POMERANIAN */}
          {pupType === 'pomeranian' && (
            <g>
              {/* Fluffy Cloud Cheeks */}
              <circle cx="30" cy="42" r="14" fill="#ffffff" />
              <circle cx="70" cy="42" r="14" fill="#ffffff" />

              {/* Pointy Fox Ears */}
              <polygon points="26,30 34,12 42,28" fill="#f9dfb6" />
              <polygon points="30,28 34,16 38,28" fill="#fbe8cc" />
              <polygon points="58,28 66,12 74,30" fill="#f9dfb6" />
              <polygon points="62,28 66,16 70,28" fill="#fbe8cc" />

              {/* Fluffy Head */}
              <circle cx="50" cy="40" r="23" fill={`url(#pomGrad-${position})`} />

              {/* Tiny Fox Muzzle */}
              <ellipse cx="50" cy="46" rx="9" ry="7" fill="#ffffff" />
              <ellipse cx="50" cy="44" rx="3.5" ry="2.5" fill="#2a170e" />
              <path d="M 47 48 Q 50 50 53 48" fill="none" stroke="#2a170e" strokeWidth="1.2" strokeLinecap="round" />

              {/* Big Dark Eyes */}
              <circle cx="41" cy="36" r="3.6" fill="#2a170e" />
              <circle cx="42" cy="35" r="1.4" fill="#ffffff" />
              <circle cx="59" cy="36" r="3.6" fill="#2a170e" />
              <circle cx="60" cy="35" r="1.4" fill="#ffffff" />

              {/* Rosy Cheeks */}
              <circle cx="34" cy="44" r="3.2" fill="#f9cdbf" opacity="0.8" />
              <circle cx="66" cy="44" r="3.2" fill="#f9cdbf" opacity="0.8" />

              {/* Front Paws */}
              <ellipse cx="35" cy="66" rx="6.5" ry="5" fill="#ffffff" stroke="#f9dfb6" strokeWidth="1.2" />
              <ellipse cx="65" cy="66" rx="6.5" ry="5" fill="#ffffff" stroke="#f9dfb6" strokeWidth="1.2" />
            </g>
          )}

          {/* 3. POODLE */}
          {pupType === 'poodle' && (
            <g>
              {/* Curly Ears */}
              <ellipse cx="25" cy="34" rx="9" ry="17" fill="#c2622b" transform="rotate(-15 25 34)" />
              <ellipse cx="25" cy="34" rx="5" ry="11" fill="#f8ad86" transform="rotate(-15 25 34)" />
              <ellipse cx="75" cy="34" rx="9" ry="17" fill="#c2622b" transform="rotate(15 75 34)" />
              <ellipse cx="75" cy="34" rx="5" ry="11" fill="#f8ad86" transform="rotate(15 75 34)" />

              {/* Topknot Puff */}
              <circle cx="50" cy="18" r="10" fill={`url(#poodleGrad-${position})`} />
              <circle cx="44" cy="18" r="6" fill="#f8ad86" />
              <circle cx="56" cy="18" r="6" fill="#f8ad86" />

              {/* Head */}
              <circle cx="50" cy="40" r="22" fill={`url(#poodleGrad-${position})`} />

              {/* Snout */}
              <ellipse cx="50" cy="48" rx="10" ry="8" fill="#fffdf8" />
              <ellipse cx="50" cy="45" rx="3.5" ry="2.8" fill="#2a170e" />
              <path d="M 47 49 Q 50 51 53 49" fill="none" stroke="#2a170e" strokeWidth="1.4" strokeLinecap="round" />

              {/* Eyes */}
              <circle cx="42" cy="36" r="3.5" fill="#2a170e" />
              <circle cx="43" cy="35" r="1.4" fill="#ffffff" />
              <circle cx="58" cy="36" r="3.5" fill="#2a170e" />
              <circle cx="59" cy="35" r="1.4" fill="#ffffff" />

              {/* Paws */}
              <ellipse cx="36" cy="66" rx="6.5" ry="5" fill="#fffdf8" stroke="#c2622b" strokeWidth="1.2" />
              <ellipse cx="64" cy="66" rx="6.5" ry="5" fill="#fffdf8" stroke="#c2622b" strokeWidth="1.2" />
            </g>
          )}

          {/* 4. CAVAPOO */}
          {pupType === 'cavapoo' && (
            <g>
              {/* Long Wavy Ears */}
              <ellipse cx="24" cy="34" rx="10" ry="19" fill="#7a3411" transform="rotate(-15 24 34)" />
              <ellipse cx="24" cy="34" rx="5" ry="13" fill="#fde0b2" transform="rotate(-15 24 34)" />
              <ellipse cx="76" cy="34" rx="10" ry="19" fill="#7a3411" transform="rotate(15 76 34)" />
              <ellipse cx="76" cy="34" rx="5" ry="13" fill="#fde0b2" transform="rotate(15 76 34)" />

              {/* Head */}
              <circle cx="50" cy="40" r="23" fill={`url(#cavaGrad-${position})`} />
              {/* White forehead star patch */}
              <ellipse cx="50" cy="28" rx="4" ry="7" fill="#fffdf8" />

              {/* Muzzle */}
              <ellipse cx="50" cy="48" rx="11" ry="9" fill="#fffdf8" />
              <ellipse cx="50" cy="45" rx="3.8" ry="3" fill="#2a170e" />
              <path d="M 47 50 Q 50 53 53 50" fill="none" stroke="#2a170e" strokeWidth="1.4" strokeLinecap="round" />

              {/* Doe Eyes */}
              <circle cx="41" cy="37" r="3.8" fill="#2a170e" />
              <circle cx="42.2" cy="35.8" r="1.6" fill="#ffffff" />
              <circle cx="59" cy="37" r="3.8" fill="#2a170e" />
              <circle cx="60.2" cy="35.8" r="1.6" fill="#ffffff" />

              {/* Cheeks */}
              <circle cx="34" cy="46" r="3.2" fill="#f9cdbf" opacity="0.8" />
              <circle cx="66" cy="46" r="3.2" fill="#f9cdbf" opacity="0.8" />

              {/* Paws */}
              <ellipse cx="35" cy="67" rx="7" ry="5.5" fill="#fffdf8" stroke="#c86d35" strokeWidth="1.4" />
              <ellipse cx="65" cy="67" rx="7" ry="5.5" fill="#fffdf8" stroke="#c86d35" strokeWidth="1.4" />
            </g>
          )}

          {/* 5. SHIH TZU */}
          {pupType === 'shihtzu' && (
            <g>
              {/* Silky Ears */}
              <path d="M 28 26 C 20 38 22 54 28 62 C 32 54 30 38 30 28 Z" fill="#3d2114" />
              <path d="M 72 26 C 80 38 78 54 72 62 C 68 54 70 38 70 28 Z" fill="#3d2114" />

              {/* Topknot Ribbon Bow */}
              <g transform="translate(45, 10)">
                <ellipse cx="2" cy="3" rx="4" ry="2.5" fill="#ef4444" transform="rotate(-30 2 3)" />
                <ellipse cx="8" cy="3" rx="4" ry="2.5" fill="#ef4444" transform="rotate(30 8 3)" />
                <circle cx="5" cy="3" r="2" fill="#facc15" />
              </g>

              {/* Head */}
              <circle cx="50" cy="38" r="22" fill={`url(#shihGrad-${position})`} />

              {/* Mustache & Beard */}
              <ellipse cx="50" cy="47" rx="14" ry="10" fill="#ffffff" />
              <ellipse cx="50" cy="42" rx="4.2" ry="3.2" fill="#2a170e" />
              <circle cx="49" cy="41" r="1.2" fill="#ffffff" />
              <path d="M 46 46 Q 50 49 54 46" fill="none" stroke="#2a170e" strokeWidth="1.4" strokeLinecap="round" />

              {/* Inquisitive Eyes */}
              <circle cx="41" cy="35" r="4.2" fill="#2a170e" />
              <circle cx="42.5" cy="33.5" r="1.8" fill="#ffffff" />
              <circle cx="59" cy="35" r="4.2" fill="#2a170e" />
              <circle cx="60.5" cy="33.5" r="1.8" fill="#ffffff" />

              {/* Front Paws */}
              <ellipse cx="36" cy="65" rx="6.5" ry="5" fill="#ffffff" stroke="#fbe8cc" strokeWidth="1.2" />
              <ellipse cx="64" cy="65" rx="6.5" ry="5" fill="#ffffff" stroke="#fbe8cc" strokeWidth="1.2" />
            </g>
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
};
