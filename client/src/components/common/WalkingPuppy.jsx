import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Heart } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const WalkingPuppy = () => {
  const { getWhatsAppLink } = useSettings();
  const [posX, setPosX] = useState(-80);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isPaused, setIsPaused] = useState(false);
  const [action, setAction] = useState('walk'); // 'walk', 'hop', 'sniff'
  const [speech, setSpeech] = useState('');
  const [pawPrints, setPawPrints] = useState([]);
  const [isSleeping, setIsSleeping] = useState(false);
  const [celebration, setCelebration] = useState(false);

  const speeches = [
    "Woof! Did someone say cuddles? 🐾",
    "I'm heading to our Dubai showroom! 🏙️",
    "Every puppy is family! ❤️",
    "Tap me to chat with our concierge! 📱",
    "Looking for a Korean teacup baby? 🐶",
    "Belly rubs are my absolute favorite! ✨",
  ];

  // Walking and periodic hop/sniff behavior loop
  useEffect(() => {
    if (isPaused || isSleeping) return;

    let stepCount = 0;

    const interval = setInterval(() => {
      stepCount++;

      // Trigger a periodic cute hop every 120 steps (~3.6s)
      if (stepCount % 120 === 0 && action === 'walk') {
        setAction('hop');
        setTimeout(() => setAction('walk'), 600);
      }

      setPosX(prev => {
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const speed = action === 'hop' ? 2.4 : 1.8;
        const nextX = prev + (direction * speed);

        // Drop paw prints
        if (Math.abs(nextX % 50) < 2.5) {
          setPawPrints(old => [
            ...old.slice(-10),
            { id: Date.now() + Math.random(), x: nextX + (direction === 1 ? -15 : 75), y: Math.random() * 5 }
          ]);
        }

        // Screen boundary checks with smooth turnaround
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
  }, [direction, isPaused, isSleeping, action]);

  // Clean old paw prints
  useEffect(() => {
    const cleaner = setInterval(() => {
      setPawPrints(old => old.filter(p => Date.now() - p.id < 3000));
    }, 1000);
    return () => clearInterval(cleaner);
  }, []);

  const handlePuppyClick = () => {
    setIsPaused(true);
    setCelebration(true);
    const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)];
    setSpeech(randomSpeech);

    setTimeout(() => {
      setCelebration(false);
      setIsPaused(false);
      setSpeech('');
    }, 4500);
  };

  const handleWhatsAppDirect = (e) => {
    e.stopPropagation();
    window.open(getWhatsAppLink("Hi TeddyPups! The little walking puppy told me to say hello! 🐾"), '_blank', 'noopener,noreferrer');
  };

  if (isSleeping) {
    return (
      <button
        onClick={() => setIsSleeping(false)}
        className="fixed bottom-24 left-4 z-40 bg-white/90 hover:bg-honey/30 text-cocoa text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-honey/40 flex items-center gap-1.5 transition select-none"
        title="Wake up walking puppy"
      >
        <span>Wake pup 🐾</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-12 md:bottom-2 left-0 w-full pointer-events-none z-30 overflow-hidden h-32">
      {/* Dropped Paw Prints Trail */}
      {pawPrints.map(paw => (
        <span
          key={paw.id}
          className="absolute text-honey/70 text-xs pointer-events-none animate-fade-out select-none"
          style={{
            left: `${paw.x}px`,
            bottom: `${16 + paw.y}px`,
            opacity: 0.7,
            transition: 'opacity 2.5s ease-out'
          }}
        >
          🐾
        </span>
      ))}

      {/* Walking Puppy Unit */}
      <div
        className="absolute bottom-2 pointer-events-auto cursor-pointer transition-transform duration-75 select-none"
        style={{
          left: `${posX}px`,
          transform: `scaleX(${direction})`,
        }}
        onClick={handlePuppyClick}
      >
        {/* Playful Fluttering Butterfly Leading the Way */}
        <div
          className="absolute -top-6 text-sm animate-butterfly-flutter pointer-events-none"
          style={{
            left: direction === 1 ? '85px' : '-20px',
            transform: direction === 1 ? 'scaleX(1)' : 'scaleX(-1)'
          }}
        >
          🦋
        </div>

        {/* Speech Bubble */}
        {speech && (
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white text-cocoa font-bold text-xs px-4 py-2.5 rounded-3xl shadow-2xl border-2 border-honey/40 whitespace-nowrap flex items-center gap-2 animate-in zoom-in-75 duration-200"
            style={{ transform: `scaleX(${direction})` }}
          >
            <span>{speech}</span>
            <button
              onClick={handleWhatsAppDirect}
              className="bg-[#25D366] text-white p-1.5 rounded-full hover:scale-110 shadow-xs transition"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        )}

        {/* Celebration Confetti Burst on Click */}
        {celebration && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none animate-bounce">
            <span className="text-red-500 text-sm">❤️</span>
            <span className="text-amber-500 text-sm">✨</span>
            <span className="text-emerald-500 text-sm">🦴</span>
          </div>
        )}

        {/* Pup Nap Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSleeping(true);
          }}
          className="absolute -top-3 -right-2 bg-cocoa/80 hover:bg-cocoa text-milk rounded-full p-1 opacity-0 hover:opacity-100 transition shadow-xs"
          title="Take a nap (hide puppy)"
        >
          <X className="w-3 h-3" />
        </button>

        {/* ULTRA-DETAILED ANIMATED LUXURY PUPPY */}
        <div className={`w-24 h-20 relative ${action === 'hop' ? 'animate-hop-jump' : celebration ? 'animate-spin-once' : ''}`}>
          <svg
            viewBox="0 0 110 90"
            className="w-full h-full drop-shadow-lg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="pupBodyGrad" cx="45%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fdf0d5" />
                <stop offset="40%" stopColor="#f2be6b" />
                <stop offset="85%" stopColor="#c2622b" />
                <stop offset="100%" stopColor="#a24a1a" />
              </radialGradient>

              <radialGradient id="earFurGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#f2be6b" />
                <stop offset="60%" stopColor="#c2622b" />
                <stop offset="100%" stopColor="#8e3f15" />
              </radialGradient>

              <linearGradient id="collarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>

              <radialGradient id="goldBellGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="45%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#ca8a04" />
              </radialGradient>
            </defs>

            {/* Fluffy Tail with Energetic Wag */}
            <g className={isPaused ? 'animate-wiggle-fast' : 'animate-tail-wag'} style={{ transformOrigin: '24px 46px' }}>
              <path
                d="M 24 46 Q 8 36 10 22 Q 18 16 22 28 Q 24 38 26 44 Z"
                fill="url(#pupBodyGrad)"
              />
              <circle cx="12" cy="20" r="5" fill="#fbe3b4" />
            </g>

            {/* Back Legs (Articulated Trot) */}
            <g className={!isPaused ? 'animate-leg-back-left' : ''} style={{ transformOrigin: '32px 52px' }}>
              <path d="M 32 52 Q 28 64 30 78" stroke="#a24a1a" strokeWidth="7" strokeLinecap="round" />
              <ellipse cx="30" cy="78" rx="5" ry="3" fill="#fffdf8" />
            </g>

            <g className={!isPaused ? 'animate-leg-back-right' : ''} style={{ transformOrigin: '42px 52px' }}>
              <path d="M 42 52 Q 44 64 42 78" stroke="#c2622b" strokeWidth="7" strokeLinecap="round" />
              <ellipse cx="42" cy="78" rx="5" ry="3" fill="#fffdf8" />
            </g>

            {/* Fluffy Body (Plush Maltipoo Shape) */}
            <ellipse cx="50" cy="50" rx="25" ry="18" fill="url(#pupBodyGrad)" />
            {/* Soft tummy curls */}
            <circle cx="42" cy="50" r="10" fill="#fffdf8" opacity="0.3" />
            <circle cx="56" cy="52" r="11" fill="#fffdf8" opacity="0.25" />

            {/* Front Legs (Articulated Trot) */}
            <g className={!isPaused ? 'animate-leg-front-left' : ''} style={{ transformOrigin: '64px 54px' }}>
              <path d="M 64 54 Q 60 66 62 78" stroke="#a24a1a" strokeWidth="7" strokeLinecap="round" />
              <ellipse cx="62" cy="78" rx="5" ry="3" fill="#fffdf8" />
            </g>

            <g className={!isPaused ? 'animate-leg-front-right' : ''} style={{ transformOrigin: '72px 54px' }}>
              <path d="M 72 54 Q 74 66 73 78" stroke="#c2622b" strokeWidth="7" strokeLinecap="round" />
              <ellipse cx="73" cy="78" rx="5" ry="3" fill="#fffdf8" />
            </g>

            {/* Red Collar with Dangling Golden Bell */}
            <ellipse cx="72" cy="46" rx="6" ry="12" fill="url(#collarGrad)" transform="rotate(-15 72 46)" />
            <circle cx="73" cy="56" r="4" fill="url(#goldBellGrad)" stroke="#a16207" strokeWidth="0.8" className="animate-wiggle-fast" style={{ transformOrigin: '73px 52px' }} />

            {/* Head Group with Natural Bobbing & Fluffy Ears */}
            <g className={!isPaused ? 'animate-head-bob' : ''} style={{ transformOrigin: '78px 34px' }}>
              {/* Back Ear */}
              <g transform="rotate(-15 68 22)">
                <ellipse cx="68" cy="22" rx="9" ry="17" fill="url(#earFurGrad)" />
                <ellipse cx="68" cy="22" rx="5" ry="11" fill="#fbe3b4" />
              </g>

              {/* Head Circle */}
              <circle cx="78" cy="34" r="19" fill="url(#pupBodyGrad)" />

              {/* Forehead fluff puffs */}
              <circle cx="72" cy="18" r="6" fill="#fbe3b4" />
              <circle cx="78" cy="16" r="7" fill="#fbe3b4" />
              <circle cx="84" cy="18" r="6" fill="#fbe3b4" />

              {/* White Muzzle / Snout */}
              <ellipse cx="89" cy="38" rx="11" ry="8" fill="#fffdf8" />
              {/* Button Nose */}
              <ellipse cx="91" cy="35" rx="4.5" ry="3.5" fill="#2a170e" />
              <circle cx="90" cy="34" r="1.2" fill="#ffffff" />

              {/* Cute smiling mouth & little panting tongue */}
              <path d="M 87 40 Q 90 43 93 40" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeLinecap="round" />
              <ellipse cx="90" cy="43" rx="2.5" ry="3.5" fill="#f43f5e" className={!isPaused ? 'animate-pulse' : ''} />

              {/* Shining Glass Eyes with Double Catchlights */}
              <circle cx="82" cy="30" r="4.2" fill="#2a170e" />
              <circle cx="83.5" cy="28.5" r="1.8" fill="#ffffff" />
              <circle cx="81" cy="31.5" r="0.8" fill="#ffffff" />

              {/* Rosy Cheek */}
              <circle cx="80" cy="38" r="3.5" fill="#f9cdbf" opacity="0.8" />

              {/* Front Floppy Ear */}
              <g transform="rotate(-8 71 27)">
                <ellipse cx="71" cy="27" rx="9" ry="17" fill="url(#earFurGrad)" />
                <ellipse cx="71" cy="27" rx="5" ry="11" fill="#fbe3b4" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
