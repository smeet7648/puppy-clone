import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Heart } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const WalkingPuppy = () => {
  const { getWhatsAppLink } = useSettings();
  const [posX, setPosX] = useState(-80);
  const [direction, setDirection] = useState(1); // 1 = walking right, -1 = walking left
  const [isPaused, setIsPaused] = useState(false);
  const [speech, setSpeech] = useState('');
  const [pawPrints, setPawPrints] = useState([]);
  const [barkCount, setBarkCount] = useState(0);
  const [isSleeping, setIsSleeping] = useState(false);

  const speeches = [
    "Woof! Did someone say cuddles? 🐾",
    "I'm heading to the Dubai showroom! 🏙️",
    "Every puppy is family! ❤️",
    "Click me to chat on WhatsApp! 📱",
    "Looking for a Korean Teacup Maltipoo? 🐶",
    "I love belly rubs! ✨",
  ];

  // Walking loop
  useEffect(() => {
    if (isPaused || isSleeping) return;

    const interval = setInterval(() => {
      setPosX(prev => {
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const nextX = prev + (direction * 1.8);

        // Drop a paw print every ~40px
        if (Math.abs(nextX % 45) < 2) {
          setPawPrints(old => [
            ...old.slice(-8),
            { id: Date.now() + Math.random(), x: nextX + (direction === 1 ? -10 : 70), y: Math.random() * 4 }
          ]);
        }

        // Boundary checks: turn around
        if (direction === 1 && nextX > screenWidth + 20) {
          setDirection(-1);
          return screenWidth + 10;
        } else if (direction === -1 && nextX < -120) {
          setDirection(1);
          return -110;
        }

        return nextX;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [direction, isPaused, isSleeping]);

  // Clean old paw prints
  useEffect(() => {
    const cleaner = setInterval(() => {
      setPawPrints(old => old.filter(p => Date.now() - p.id < 3000));
    }, 1000);
    return () => clearInterval(cleaner);
  }, []);

  const handlePuppyClick = () => {
    setIsPaused(true);
    const randomSpeech = speeches[barkCount % speeches.length];
    setSpeech(randomSpeech);
    setBarkCount(c => c + 1);

    // Auto resume walking after 4 seconds unless clicked to WhatsApp
    setTimeout(() => {
      setIsPaused(false);
      setSpeech('');
    }, 4500);
  };

  const handleWhatsAppDirect = (e) => {
    e.stopPropagation();
    window.open(getWhatsAppLink("Hi TeddyPups! The cute walking puppy told me to say hello! 🐶"), '_blank', 'noopener,noreferrer');
  };

  if (isSleeping) {
    return (
      <button
        onClick={() => setIsSleeping(false)}
        className="fixed bottom-24 left-4 z-40 bg-milk/90 hover:bg-honey/30 text-cocoa text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-honey/40 flex items-center gap-1.5 transition"
        title="Wake up walking puppy"
      >
        <span>Wake pup 🐾</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-12 md:bottom-2 left-0 w-full pointer-events-none z-30 overflow-hidden h-28">
      {/* Dropped Paw Prints Trail */}
      {pawPrints.map(paw => (
        <span
          key={paw.id}
          className="absolute text-honey/60 text-xs pointer-events-none animate-fade-out select-none"
          style={{
            left: `${paw.x}px`,
            bottom: `${14 + paw.y}px`,
            opacity: 0.6,
            transition: 'opacity 2s ease-out'
          }}
        >
          🐾
        </span>
      ))}

      {/* The Animated Walking Puppy Container */}
      <div
        className="absolute bottom-2 pointer-events-auto cursor-pointer transition-transform duration-75 select-none"
        style={{
          left: `${posX}px`,
          transform: `scaleX(${direction})`,
        }}
        onClick={handlePuppyClick}
      >
        {/* Speech Bubble */}
        {speech && (
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-cocoa font-bold text-xs px-3.5 py-2 rounded-2xl shadow-lift border border-honey/40 whitespace-nowrap flex items-center gap-2 animate-in zoom-in-75 duration-200"
            style={{ transform: `scaleX(${direction})` }}
          >
            <span>{speech}</span>
            <button
              onClick={handleWhatsAppDirect}
              className="bg-[#25D366] text-white p-1 rounded-full hover:scale-110 transition"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        )}

        {/* Pup Sleep / Close mini button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSleeping(true);
          }}
          className="absolute -top-3 -right-2 bg-cocoa/80 hover:bg-cocoa text-milk rounded-full p-0.5 opacity-0 hover:opacity-100 transition shadow-xs"
          title="Take a nap (hide puppy)"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Custom Cute Animated SVG Puppy */}
        <div className={`w-20 h-16 relative ${isPaused ? 'animate-bounce' : ''}`}>
          <svg
            viewBox="0 0 100 80"
            className="w-full h-full drop-shadow-md"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tail */}
            <path
              d="M 22 42 Q 10 32 12 22"
              fill="none"
              stroke="#c2622b"
              strokeWidth="7"
              strokeLinecap="round"
              className={isPaused ? 'animate-wiggle-fast' : 'animate-tail-wag'}
              style={{ transformOrigin: '22px 42px' }}
            />

            {/* Back Legs */}
            <path
              d="M 32 50 L 30 72"
              stroke="#a24a1a"
              strokeWidth="6"
              strokeLinecap="round"
              className={!isPaused ? 'animate-leg-back-left' : ''}
              style={{ transformOrigin: '32px 50px' }}
            />
            <path
              d="M 40 50 L 42 72"
              stroke="#c2622b"
              strokeWidth="6"
              strokeLinecap="round"
              className={!isPaused ? 'animate-leg-back-right' : ''}
              style={{ transformOrigin: '40px 50px' }}
            />

            {/* Fluffy Body */}
            <ellipse cx="48" cy="46" rx="22" ry="16" fill="#c2622b" />
            <ellipse cx="48" cy="46" rx="18" ry="13" fill="#f2be6b" opacity="0.4" />

            {/* Front Legs */}
            <path
              d="M 60 50 L 58 72"
              stroke="#a24a1a"
              strokeWidth="6"
              strokeLinecap="round"
              className={!isPaused ? 'animate-leg-front-left' : ''}
              style={{ transformOrigin: '60px 50px' }}
            />
            <path
              d="M 68 50 L 70 72"
              stroke="#c2622b"
              strokeWidth="6"
              strokeLinecap="round"
              className={!isPaused ? 'animate-leg-front-right' : ''}
              style={{ transformOrigin: '68px 50px' }}
            />

            {/* Head Group (bobs up and down when walking) */}
            <g className={!isPaused ? 'animate-head-bob' : ''} style={{ transformOrigin: '72px 30px' }}>
              {/* Back Ear */}
              <ellipse cx="64" cy="20" rx="8" ry="14" fill="#a24a1a" transform="rotate(-15 64 20)" />

              {/* Head */}
              <circle cx="72" cy="30" r="17" fill="#c2622b" />

              {/* Snout */}
              <ellipse cx="82" cy="34" rx="9" ry="7" fill="#fffdf8" />
              <ellipse cx="84" cy="32" rx="3.5" ry="2.5" fill="#2a170e" />
              <path d="M 83 35 Q 85 37 87 35" fill="none" stroke="#2a170e" strokeWidth="1.5" strokeLinecap="round" />

              {/* Eye */}
              <circle cx="76" cy="26" r="3.5" fill="#2a170e" />
              <circle cx="77.5" cy="25" r="1.2" fill="#ffffff" />

              {/* Blush Cheek */}
              <circle cx="75" cy="34" r="3" fill="#f9cdbf" opacity="0.8" />

              {/* Front Floppy Ear */}
              <ellipse cx="66" cy="24" rx="7" ry="13" fill="#c2622b" transform="rotate(-10 66 24)" />
              <ellipse cx="66" cy="24" rx="4" ry="9" fill="#fbe3b4" transform="rotate(-10 66 24)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
