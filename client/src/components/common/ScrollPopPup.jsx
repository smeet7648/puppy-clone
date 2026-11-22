import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Heart } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const ScrollPopPup = () => {
  const { getWhatsAppLink } = useSettings();
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [closed, setClosed] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [bounced, setBounced] = useState(false);

  const peekMessages = [
    { title: "Peek-a-boo! 🐾", text: "Looking for a teacup puppy in Dubai?", cta: "Chat on WhatsApp" },
    { title: "In Our Showroom! 🏙️", text: "Meet Max, Coco & Bella in Downtown Dubai today!", cta: "Book a Visit" },
    { title: "Korea to Dubai ✈️", text: "Exclusive doll-face imports with certified passports!", cta: "See Imports" },
    { title: "24/7 Concierge Support ❤️", text: "Every puppy is family. We're here for life!", cta: "Say Hello" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (closed) return;

      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      // Pop up when user scrolls past 15%
      if (scrollPercent > 12) {
        setVisible(true);

        // Update message depending on scroll depth
        if (scrollPercent < 35) {
          setMessageIndex(0);
        } else if (scrollPercent < 60) {
          setMessageIndex(1);
        } else if (scrollPercent < 85) {
          setMessageIndex(2);
        } else {
          setMessageIndex(3);
        }
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [closed]);

  const handlePuppyTap = () => {
    setBounced(true);
    setTimeout(() => setBounced(false), 1000);
    const msg = peekMessages[messageIndex];
    window.open(getWhatsAppLink(`Hi TeddyPups! The peeking puppy says: "${msg.text}". Can you share available puppies?`), '_blank', 'noopener,noreferrer');
  };

  if (!visible || closed) return null;

  const currentMsg = peekMessages[messageIndex];

  return (
    <div className="fixed bottom-14 md:bottom-6 left-4 sm:left-8 z-40 select-none">
      {/* Speech bubble */}
      {!minimized && (
        <div className="mb-2 bg-white/95 backdrop-blur-md p-3.5 rounded-3xl shadow-lift border border-honey/40 max-w-[240px] text-cocoa animate-in fade-in slide-in-from-bottom-3 duration-300 relative">
          <button
            onClick={() => setClosed(true)}
            className="absolute top-2 right-2 text-cocoa-soft/60 hover:text-cocoa p-1 rounded-full hover:bg-honey/20 transition"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold text-toffee mb-1">
            <span className="w-2 h-2 rounded-full bg-honey animate-ping" />
            <span>{currentMsg.title}</span>
          </div>

          <p className="text-[11px] text-cocoa-soft leading-snug mb-2.5">
            {currentMsg.text}
          </p>

          <button
            onClick={handlePuppyTap}
            className="w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-bold py-1.5 px-3 rounded-full shadow-xs transition hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-3 h-3 fill-current" />
            <span>{currentMsg.cta}</span>
          </button>
        </div>
      )}

      {/* Peeking Dog Illustration (resting on screen edge) */}
      <div
        onClick={handlePuppyTap}
        className={`cursor-pointer group relative flex flex-col items-center transition-transform ${bounced ? 'animate-bounce' : 'hover:-translate-y-2'}`}
        title="Click to cuddle & chat on WhatsApp!"
      >
        {/* Floating Heart / Sparkle on hover */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-red-500 flex items-center gap-1 bg-white px-2 py-0.5 rounded-full shadow-xs border border-honey/30">
          <span>Bark! ❤️</span>
        </div>

        {/* Peeking Puppy Face */}
        <div className="w-20 h-20 relative drop-shadow-lg">
          <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Floppy Left Ear */}
            <ellipse cx="25" cy="35" rx="14" ry="24" fill="#c2622b" transform="rotate(-20 25 35)" />
            <ellipse cx="25" cy="35" rx="8" ry="16" fill="#fbe3b4" transform="rotate(-20 25 35)" />

            {/* Floppy Right Ear */}
            <ellipse cx="75" cy="35" rx="14" ry="24" fill="#c2622b" transform="rotate(20 75 35)" />
            <ellipse cx="75" cy="35" rx="8" ry="16" fill="#fbe3b4" transform="rotate(20 75 35)" />

            {/* Head */}
            <circle cx="50" cy="52" r="32" fill="#c2622b" />
            <circle cx="50" cy="52" r="28" fill="#d97736" opacity="0.4" />

            {/* Muzzle */}
            <ellipse cx="50" cy="62" rx="18" ry="14" fill="#fffdf8" />
            <ellipse cx="50" cy="57" rx="5" ry="4" fill="#2a170e" />
            <path d="M 46 64 Q 50 67 54 64" fill="none" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />

            {/* Eyes */}
            <circle cx="38" cy="48" r="4.5" fill="#2a170e" />
            <circle cx="40" cy="46" r="1.5" fill="#ffffff" />
            <circle cx="62" cy="48" r="4.5" fill="#2a170e" />
            <circle cx="64" cy="46" r="1.5" fill="#ffffff" />

            {/* Cheeks */}
            <circle cx="32" cy="58" r="4" fill="#f9cdbf" opacity="0.8" />
            <circle cx="68" cy="58" r="4" fill="#f9cdbf" opacity="0.8" />

            {/* Cute Front Paws Peeking Over Bottom Edge */}
            <ellipse cx="32" cy="85" rx="8" ry="6" fill="#fffdf8" stroke="#f2be6b" strokeWidth="2" />
            <ellipse cx="68" cy="85" rx="8" ry="6" fill="#fffdf8" stroke="#f2be6b" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};
