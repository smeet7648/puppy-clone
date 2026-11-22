import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Sparkles, X } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

/**
 * RandomDogPopups - Random cartoon puppy popups across ALL pages
 * Pops up with a cartoon bounce, stays for 2 SECONDS, and vanishes!
 */
export const RandomDogPopups = () => {
  const { getWhatsAppLink } = useSettings();
  const [activePopup, setActivePopup] = useState(null);
  const timerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const breeds = ['maltipoo', 'pomeranian', 'poodle', 'cavapoo', 'shihtzu'];
  const positions = ['bottom-right', 'bottom-left', 'mid-right', 'mid-left', 'bottom-center'];
  const sayings = [
    'Woof! Did someone say puppy? 🐾',
    'Downtown Dubai showroom is open! 🏙️',
    'Cuddles are my superpower! ❤️',
    'Korean teacup doll-face! ✈️',
    'Every puppy is family! ✨',
    'Belly rubs requested! 🦴',
    'Peek-a-boo! I see you! 🐶'
  ];

  useEffect(() => {
    const triggerRandomPup = () => {
      // Pick random parameters
      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
      const randomPos = positions[Math.floor(Math.random() * positions.length)];
      const randomSaying = sayings[Math.floor(Math.random() * sayings.length)];
      const id = Date.now();

      setActivePopup({
        id,
        breed: randomBreed,
        position: randomPos,
        saying: randomSaying
      });

      // EXACTLY 2 SECONDS LIFETIME: gone in 2 seconds!
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        setActivePopup(null);
      }, 2000);
    };

    // First appearance after 4 seconds
    const firstTimer = setTimeout(triggerRandomPup, 4000);

    // Then pop up randomly every 7 to 11 seconds
    const interval = setInterval(() => {
      triggerRandomPup();
    }, 8500);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleClick = () => {
    if (!activePopup) return;
    window.open(
      getWhatsAppLink(`Hi TeddyPups! The cute pop-up puppy said: "${activePopup.saying}"! 🐾`),
      '_blank',
      'noopener,noreferrer'
    );
    setActivePopup(null);
  };

  if (!activePopup) return null;

  // Positioning classes
  const getPosClasses = (pos) => {
    switch (pos) {
      case 'bottom-right':
        return 'bottom-16 sm:bottom-6 right-4 sm:right-8';
      case 'bottom-left':
        return 'bottom-16 sm:bottom-6 left-4 sm:left-8';
      case 'mid-right':
        return 'top-1/2 -translate-y-1/2 right-4 sm:right-6';
      case 'mid-left':
        return 'top-1/2 -translate-y-1/2 left-4 sm:left-6';
      case 'bottom-center':
        return 'bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2';
      default:
        return 'bottom-6 right-8';
    }
  };

  return (
    <AnimatePresence>
      {activePopup && (
        <motion.div
          key={activePopup.id}
          initial={{ scale: 0, opacity: 0, y: 50, rotate: -15 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: 1,
            y: 0,
            rotate: [15, -6, 0]
          }}
          exit={{ scale: 0, opacity: 0, y: 35, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 350, damping: 18 }}
          className={`fixed z-50 pointer-events-auto cursor-pointer select-none ${getPosClasses(
            activePopup.position
          )}`}
          onClick={handleClick}
          title="Click to chat with our concierge!"
        >
          {/* Cartoon Speech Bubble */}
          <motion.div
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-xl border-2 border-honey/50 text-cocoa text-xs font-bold whitespace-nowrap flex items-center gap-1.5 max-w-[220px]"
          >
            <span className="text-sm">💬</span>
            <span className="font-scrawl text-toffee leading-tight truncate">
              {activePopup.saying}
            </span>
          </motion.div>

          {/* Cartoon Puppy Head Vector */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 drop-shadow-2xl group hover:scale-110 transition-transform">
            <svg viewBox="0 0 100 90" className="w-full h-full overflow-visible">
              <defs>
                <radialGradient id="popMaltiFur" cx="45%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#fff8ed" />
                  <stop offset="50%" stopColor="#f7d5a5" />
                  <stop offset="100%" stopColor="#c2622b" />
                </radialGradient>
                <radialGradient id="popPomFur" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#fef3e2" />
                  <stop offset="100%" stopColor="#f9dfb6" />
                </radialGradient>
                <radialGradient id="popPoodleFur" cx="45%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#f8ad86" />
                  <stop offset="60%" stopColor="#c2622b" />
                  <stop offset="100%" stopColor="#873510" />
                </radialGradient>
              </defs>

              {/* Ears */}
              {activePopup.breed === 'pomeranian' ? (
                <g>
                  <polygon points="26,28 34,10 42,26" fill="#f9dfb6" />
                  <polygon points="30,26 34,14 38,26" fill="#fbe8cc" />
                  <polygon points="58,26 66,10 74,28" fill="#f9dfb6" />
                  <polygon points="62,26 66,14 70,26" fill="#fbe8cc" />
                </g>
              ) : (
                <g>
                  <ellipse cx="26" cy="32" rx="10" ry="18" fill="#c2622b" transform="rotate(-18 26 32)" />
                  <ellipse cx="26" cy="32" rx="5" ry="12" fill="#f7d5a5" transform="rotate(-18 26 32)" />
                  <ellipse cx="74" cy="32" rx="10" ry="18" fill="#c2622b" transform="rotate(18 74 32)" />
                  <ellipse cx="74" cy="32" rx="5" ry="12" fill="#f7d5a5" transform="rotate(18 74 32)" />
                </g>
              )}

              {/* Fluffy Head */}
              <circle
                cx="50"
                cy="42"
                r="24"
                fill={
                  activePopup.breed === 'pomeranian'
                    ? 'url(#popPomFur)'
                    : activePopup.breed === 'poodle'
                    ? 'url(#popPoodleFur)'
                    : 'url(#popMaltiFur)'
                }
              />

              {/* Forehead fluff puffs */}
              <circle cx="44" cy="22" r="6" fill="#fff8ed" />
              <circle cx="50" cy="20" r="7" fill="#fff8ed" />
              <circle cx="56" cy="22" r="6" fill="#fff8ed" />

              {/* Muzzle */}
              <ellipse cx="50" cy="50" rx="13" ry="10" fill="#fffdf8" />
              <ellipse cx="50" cy="46" rx="4" ry="3" fill="#2a170e" />
              <circle cx="49" cy="45" r="1.2" fill="#ffffff" />
              <path d="M 46 51 Q 50 54 54 51" fill="none" stroke="#2a170e" strokeWidth="1.5" strokeLinecap="round" />

              {/* Big shining eyes with double catchlights */}
              <circle cx="40" cy="38" r="4.2" fill="#2a170e" />
              <circle cx="41.2" cy="36.8" r="1.8" fill="#ffffff" />
              <circle cx="39" cy="39" r="0.8" fill="#ffffff" />

              <circle cx="60" cy="38" r="4.2" fill="#2a170e" />
              <circle cx="61.2" cy="36.8" r="1.8" fill="#ffffff" />
              <circle cx="59" cy="39" r="0.8" fill="#ffffff" />

              {/* Rosy Cheeks */}
              <circle cx="34" cy="46" r="3.5" fill="#f9cdbf" opacity="0.85" />
              <circle cx="66" cy="46" r="3.5" fill="#f9cdbf" opacity="0.85" />

              {/* Two cute front paws */}
              <ellipse cx="34" cy="68" rx="7" ry="5.5" fill="#fffdf8" stroke="#f7d5a5" strokeWidth="1.5" />
              <ellipse cx="66" cy="68" rx="7" ry="5.5" fill="#fffdf8" stroke="#f7d5a5" strokeWidth="1.5" />
            </svg>

            {/* Sparkle puff on spawn */}
            <div className="absolute -top-2 -right-2 text-amber-400 text-sm animate-bounce">
              ✨
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
