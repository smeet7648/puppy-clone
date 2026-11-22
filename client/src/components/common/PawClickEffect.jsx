import React, { useState, useEffect } from 'react';

export const PawClickEffect = () => {
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger if clicked on an input, button, or link directly to avoid distraction
      const target = e.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const icons = ['🐾', '❤️', '🐶', '✨', '🐾'];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];

      const newClick = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        icon: randomIcon
      };

      setClicks(prev => [...prev.slice(-10), newClick]);

      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== newClick.id));
      }, 1200);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {clicks.map(c => (
        <span
          key={c.id}
          className="absolute text-base sm:text-lg animate-float-fade select-none drop-shadow-sm"
          style={{
            left: `${c.x - 12}px`,
            top: `${c.y - 14}px`,
          }}
        >
          {c.icon}
        </span>
      ))}
    </div>
  );
};
