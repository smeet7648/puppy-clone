import React, { useState, useEffect } from 'react';

export const AnnouncementStrip = () => {
  const [showPawPrints, setShowPawPrints] = useState(true);

  useEffect(() => {
    // Hide transient paw walk after 6 seconds
    const timer = setTimeout(() => setShowPawPrints(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside
      aria-label="Announcement"
      className="bg-cocoa text-milk py-2 px-4 text-center text-xs md:text-sm font-medium tracking-wide border-b border-cocoa-soft/20 transition-colors relative overflow-hidden"
    >
      {/* Transient Paw Prints Walking Across Announcement Strip */}
      {showPawPrints && (
        <div className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-40 select-none">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="text-honey text-xs animate-bounce"
              style={{ animationDelay: `${i * 150}ms`, animationDuration: '1.2s' }}
            >
              🐾
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 relative z-10">
        <span className="inline-block w-2 h-2 rounded-full bg-honey animate-pulse" />
        <span className="font-scrawl text-honey text-sm md:text-base">every puppy is family</span>
        <span className="hidden sm:inline text-milk/60">·</span>
        <span className="hidden sm:inline text-milk/80 text-xs tracking-wider uppercase">Dubai Showroom & Worldwide Concierge</span>
      </div>
    </aside>
  );
};
