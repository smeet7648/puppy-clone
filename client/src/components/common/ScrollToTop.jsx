import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop guarantees that whenever a user clicks any navigation link
 * or changes routes, the viewport resets immediately to the very top (0, 0),
 * or smoothly scrolls to a target anchor tag if a hash is present (e.g. #delivery).
 */
export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If navigating to an anchor hash (like #delivery), scroll smoothly to that element
    if (hash) {
      const targetId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }

    // Immediately reset window scroll position
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // Reset Lenis smooth scroll instance if initialized
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(0, { immediate: true });
    }

    // Backup requestAnimationFrame to account for any React Router / Framer Motion layout shift
    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { immediate: true });
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname, search, hash]);

  return null;
};
