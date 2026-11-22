import React from 'react';

export const AnnouncementStrip = () => {
  return (
    <aside
      aria-label="Announcement"
      className="bg-cocoa text-milk py-2 px-4 text-center text-xs md:text-sm font-medium tracking-wide border-b border-cocoa-soft/20 transition-colors relative overflow-hidden"
    >
      <div className="flex items-center justify-center gap-2 relative z-10">
        <span className="inline-block w-2 h-2 rounded-full bg-honey animate-pulse" />
        <span className="font-scrawl text-honey text-sm md:text-base">every puppy is family</span>
        <span className="hidden sm:inline text-milk/60">·</span>
        <span className="hidden sm:inline text-milk/80 text-xs tracking-wider uppercase">Dubai Showroom & Worldwide Concierge</span>
      </div>
    </aside>
  );
};
