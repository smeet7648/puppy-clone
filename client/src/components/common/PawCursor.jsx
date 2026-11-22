import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PawCursor renders an interactive, luxury dog paw cursor follower
 * on desktop devices with fine pointer controls.
 * It features:
 *  - Smooth trailing follower with toffee/honey colors
 *  - Interactive scale on clickable hover (buttons, links, inputs)
 *  - Adorable momentary paw print ripple stamps on click!
 *  - Automatically disabled on touch / coarse devices.
 */
export const PawCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [stamps, setStamps] = useState([]);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Check if the device uses a fine pointer (mouse / trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) return () => mediaQuery.removeEventListener('change', handleMediaChange);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over an interactive element
      const target = e.target;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .clickable');
        setIsHovered(!!interactive);
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onMouseDown = (e) => {
      setIsClicking(true);
      // Spawn an adorable paw stamp where clicked
      const newStamp = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        angle: (Math.random() - 0.5) * 30
      };
      setStamps((prev) => [...prev.slice(-6), newStamp]);
    };

    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isVisible]);

  // Clean up old stamps after 900ms
  useEffect(() => {
    if (stamps.length === 0) return;
    const timer = setTimeout(() => {
      setStamps((prev) => prev.slice(1));
    }, 900);
    return () => clearTimeout(timer);
  }, [stamps]);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Click Paw Stamps that fade away playfully */}
      <AnimatePresence>
        {stamps.map((stamp) => (
          <motion.div
            key={stamp.id}
            initial={{ opacity: 0.65, scale: 0.7, rotate: stamp.angle }}
            animate={{ opacity: 0, scale: 1.25, y: -12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
            style={{ left: stamp.x, top: stamp.y }}
          >
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="text-toffee/50">
              <path
                d="M16 15C13 15 10 17.5 10.5 21C11 24.5 13.8 25.5 16 25C18.2 25.5 21 24.5 21.5 21C22 17.5 19 15 16 15Z"
                fill="currentColor"
              />
              <ellipse cx="8.5" cy="14" rx="2.4" ry="3.5" transform="rotate(-30 8.5 14)" fill="currentColor" />
              <ellipse cx="12.5" cy="9.5" rx="2.5" ry="3.8" transform="rotate(-10 12.5 9.5)" fill="currentColor" />
              <ellipse cx="19.5" cy="9.5" rx="2.5" ry="3.8" transform="rotate(10 19.5 9.5)" fill="currentColor" />
              <ellipse cx="23.5" cy="14" rx="2.4" ry="3.5" transform="rotate(30 23.5 14)" fill="currentColor" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Paw Follower */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
          animate={{
            x: position.x + (isHovered ? 12 : 8),
            y: position.y + (isHovered ? 12 : 8),
            scale: isClicking ? 0.75 : isHovered ? 1.25 : 1,
            rotate: isHovered ? 15 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 24,
            mass: 0.4
          }}
        >
          <div className="relative">
            {/* Glowing subtle ring on hover */}
            {isHovered && (
              <span className="absolute -inset-2 rounded-full bg-honey/30 blur-xs animate-ping" />
            )}
            <svg
              width="26"
              height="26"
              viewBox="0 0 32 32"
              fill="none"
              className="drop-shadow-md select-none"
            >
              <g>
                {/* Main Pad */}
                <path
                  d="M16 15C13 15 10 17.5 10.5 21C11 24.5 13.8 25.5 16 25C18.2 25.5 21 24.5 21.5 21C22 17.5 19 15 16 15Z"
                  fill={isHovered ? '#c2622b' : '#c2622b'}
                  stroke="#ffffff"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <ellipse cx="16" cy="19.5" rx="3.5" ry="2" fill="#f2be6b" opacity="0.8" />
                {/* Toe Beans */}
                <ellipse cx="8.5" cy="14" rx="2.4" ry="3.5" transform="rotate(-30 8.5 14)" fill={isHovered ? '#f2be6b' : '#c2622b'} stroke="#ffffff" strokeWidth="1.4" />
                <ellipse cx="12.5" cy="9.5" rx="2.5" ry="3.8" transform="rotate(-10 12.5 9.5)" fill={isHovered ? '#f2be6b' : '#c2622b'} stroke="#ffffff" strokeWidth="1.4" />
                <ellipse cx="19.5" cy="9.5" rx="2.5" ry="3.8" transform="rotate(10 19.5 9.5)" fill={isHovered ? '#f2be6b' : '#c2622b'} stroke="#ffffff" strokeWidth="1.4" />
                <ellipse cx="23.5" cy="14" rx="2.4" ry="3.5" transform="rotate(30 23.5 14)" fill={isHovered ? '#f2be6b' : '#c2622b'} stroke="#ffffff" strokeWidth="1.4" />
                {/* Sparkle on hover */}
                {isHovered && (
                  <path
                    d="M26 4L26.8 6.2L29 7L26.8 7.8L26 10L25.2 7.8L23 7L25.2 6.2L26 4Z"
                    fill="#f2be6b"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                  />
                )}
              </g>
            </svg>
          </div>
        </motion.div>
      )}
    </>
  );
};
