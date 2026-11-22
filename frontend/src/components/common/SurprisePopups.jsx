import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Heart } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const SurprisePopups = () => {
  const { getWhatsAppLink } = useSettings();

  // State for side peeker
  const [sidePeeker, setSidePeeker] = useState({
    active: false,
    side: 'right', // 'right' or 'left'
    pupType: 'maltipoo',
    message: "Psst! 🐾 Want to see live video calls of our puppies?"
  });

  // State for floating balloon puppy
  const [balloonPuppy, setBalloonPuppy] = useState({
    active: false,
    x: -100,
    y: 120,
    popped: false
  });

  // Random side peeker timer
  useEffect(() => {
    const triggerPeeker = () => {
      const messages = [
        "Psst! 🐾 Our Downtown Dubai showroom is open today!",
        "Did you see Max? He's the cutest teacup Maltipoo! 🐶",
        "All our puppies come with official health passports! 🩺",
        "We deliver door-to-door across the UAE! 🚙💨",
        "Rare Korean teacup lines available for reservation! ✈️",
        "Looking for a hypoallergenic teddy-bear pup? ❤️"
      ];

      const side = Math.random() > 0.5 ? 'right' : 'left';
      const pupType = Math.random() > 0.5 ? 'maltipoo' : 'pomeranian';
      const msg = messages[Math.floor(Math.random() * messages.length)];

      setSidePeeker({
        active: true,
        side,
        pupType,
        message: msg
      });

      // Auto hide after 6 seconds
      setTimeout(() => {
        setSidePeeker(prev => ({ ...prev, active: false }));
      }, 6000);
    };

    // First appearance after 5 seconds, then every 22 seconds
    const firstTimer = setTimeout(triggerPeeker, 5000);
    const interval = setInterval(triggerPeeker, 24000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  // Floating balloon puppy drift timer
  useEffect(() => {
    let animFrame;
    const launchBalloon = () => {
      setBalloonPuppy({
        active: true,
        x: -80,
        y: Math.random() * 140 + 80,
        popped: false
      });
    };

    // First balloon after 14 seconds, then every 45 seconds
    const firstBalloon = setTimeout(launchBalloon, 12000);
    const balloonInterval = setInterval(launchBalloon, 48000);

    return () => {
      clearTimeout(firstBalloon);
      clearInterval(balloonInterval);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  // Balloon animation loop
  useEffect(() => {
    if (!balloonPuppy.active || balloonPuppy.popped) return;

    let posX = balloonPuppy.x;
    const speed = 1.2;

    const moveBalloon = () => {
      posX += speed;
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

      if (posX > screenWidth + 100) {
        setBalloonPuppy(prev => ({ ...prev, active: false }));
      } else {
        setBalloonPuppy(prev => ({ ...prev, x: posX }));
        requestAnimationFrame(moveBalloon);
      }
    };

    const animId = requestAnimationFrame(moveBalloon);
    return () => cancelAnimationFrame(animId);
  }, [balloonPuppy.active, balloonPuppy.popped]);

  const popBalloon = () => {
    setBalloonPuppy(prev => ({ ...prev, popped: true }));
    window.open(getWhatsAppLink("Hi TeddyPups! I popped the flying balloon puppy! 🎈 Can you tell me more about your teacup puppies?"), '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setBalloonPuppy(prev => ({ ...prev, active: false }));
    }, 1500);
  };

  const handleSideClick = () => {
    window.open(getWhatsAppLink(`Hi TeddyPups! The cute surprise puppy said: "${sidePeeker.message}".`), '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* 1. SURPRISE SIDE-PEEKER PUPPY */}
      {sidePeeker.active && (
        <div
          className={`fixed top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ease-out flex items-center gap-3 ${
            sidePeeker.side === 'right' ? 'right-0 flex-row-reverse animate-slide-in-right' : 'left-0 flex-row animate-slide-in-left'
          }`}
        >
          {/* Peeker Dog Head */}
          <div
            onClick={handleSideClick}
            className="cursor-pointer group relative drop-shadow-xl hover:scale-110 transition-transform"
            title="Click to chat on WhatsApp!"
          >
            {/* SVG Dog peeking around border */}
            <div className="w-24 h-24 relative select-none">
              <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="pupFurGrad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#fbe3b4" />
                    <stop offset="50%" stopColor="#f2be6b" />
                    <stop offset="100%" stopColor="#c2622b" />
                  </radialGradient>
                  <radialGradient id="earGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#f2be6b" />
                    <stop offset="100%" stopColor="#8e3f15" />
                  </radialGradient>
                </defs>

                {/* Floppy Left Ear with cute spring twitch */}
                <ellipse cx="25" cy="30" rx="14" ry="22" fill="url(#earGrad)" transform="rotate(-15 25 30)" className="animate-ear-twitch" />
                <ellipse cx="25" cy="30" rx="8" ry="14" fill="#fbe3b4" transform="rotate(-15 25 30)" />

                {/* Floppy Right Ear */}
                <ellipse cx="75" cy="30" rx="14" ry="22" fill="url(#earGrad)" transform="rotate(15 75 30)" className="animate-ear-twitch" />
                <ellipse cx="75" cy="30" rx="8" ry="14" fill="#fbe3b4" transform="rotate(15 75 30)" />

                {/* Head Body */}
                <circle cx="50" cy="52" r="32" fill="url(#pupFurGrad)" />

                {/* Cute forehead fluff curls */}
                <circle cx="44" cy="24" r="7" fill="#fbe3b4" />
                <circle cx="50" cy="22" r="8" fill="#fbe3b4" />
                <circle cx="56" cy="24" r="7" fill="#fbe3b4" />

                {/* Snout Muzzle */}
                <ellipse cx="50" cy="62" rx="17" ry="13" fill="#fffdf8" />
                <ellipse cx="50" cy="57" rx="5" ry="4" fill="#2a170e" />
                <circle cx="48.5" cy="55.5" r="1.2" fill="#ffffff" />
                <path d="M 45 63 Q 50 67 55 63" fill="none" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />

                {/* Big Shining Eyes */}
                <circle cx="37" cy="46" r="5.5" fill="#2a170e" />
                <circle cx="39" cy="44" r="2.2" fill="#ffffff" />
                <circle cx="35.5" cy="48" r="1" fill="#ffffff" />

                <circle cx="63" cy="46" r="5.5" fill="#2a170e" />
                <circle cx="65" cy="44" r="2.2" fill="#ffffff" />
                <circle cx="61.5" cy="48" r="1" fill="#ffffff" />

                {/* Cheeks */}
                <circle cx="31" cy="57" r="4.5" fill="#f9cdbf" opacity="0.8" />
                <circle cx="69" cy="57" r="4.5" fill="#f9cdbf" opacity="0.8" />

                {/* Front Paws Holding Screen Border */}
                <g fill="#fffdf8" stroke="#f2be6b" strokeWidth="2">
                  <ellipse cx="26" cy="78" rx="7" ry="6" />
                  <ellipse cx="74" cy="78" rx="7" ry="6" />
                </g>
              </svg>

              {/* Heart floating above head */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-sm animate-bounce">
                🐾
              </div>
            </div>
          </div>

          {/* Dialogue Speech Card */}
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border-2 border-honey/40 max-w-[220px] text-cocoa relative select-none animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSidePeeker(prev => ({ ...prev, active: false }))}
              className="absolute top-2 right-2 text-cocoa-soft/60 hover:text-cocoa p-1 rounded-full hover:bg-honey/20 transition"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5 text-xs font-bold text-toffee mb-1">
              <span className="w-2 h-2 rounded-full bg-honey animate-ping" />
              <span>Surprise Pup! 🐶</span>
            </div>

            <p className="text-xs text-cocoa-soft leading-snug mb-3">
              {sidePeeker.message}
            </p>

            <button
              onClick={handleSideClick}
              className="w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold py-2 px-3 rounded-full shadow-lift transition hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. FLOATING BALLOON PUPPY ACROSS UPPER SCREEN */}
      {balloonPuppy.active && (
        <div
          className="fixed z-40 pointer-events-auto cursor-pointer select-none"
          style={{
            left: `${balloonPuppy.x}px`,
            top: `${balloonPuppy.y}px`,
            transition: balloonPuppy.popped ? 'opacity 0.5s ease-out' : 'none',
            opacity: balloonPuppy.popped ? 0 : 1
          }}
          onClick={popBalloon}
          title="Click to pop & chat on WhatsApp!"
        >
          {balloonPuppy.popped ? (
            <div className="flex flex-col items-center animate-ping">
              <span className="text-2xl">🎉</span>
              <span className="text-xs font-bold text-toffee bg-white px-2 py-0.5 rounded-full shadow-md">
                POP! 🐾
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center group hover:scale-110 transition-transform">
              {/* Balloon */}
              <div className="relative">
                <div className="w-14 h-16 rounded-full bg-gradient-to-t from-red-500 via-rose-400 to-pink-300 shadow-lift flex items-center justify-center border border-white/50 animate-pulse">
                  <span className="text-white text-xs font-bold">VIP 🐾</span>
                  <div className="absolute top-2 left-3 w-3 h-4 bg-white/40 rounded-full rotate-45 blur-[0.5px]" />
                </div>
                {/* Balloon Tie & String */}
                <div className="w-1 h-1 bg-rose-600 mx-auto" />
                <div className="w-0.5 h-6 bg-cocoa-soft/40 mx-auto" />
              </div>

              {/* Tiny Puppy Suspended by String */}
              <div className="w-12 h-12 -mt-1 relative animate-wiggle-fast">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  <ellipse cx="25" cy="30" rx="10" ry="18" fill="#c2622b" />
                  <ellipse cx="75" cy="30" rx="10" ry="18" fill="#c2622b" />
                  <circle cx="50" cy="50" r="28" fill="#f2be6b" />
                  <ellipse cx="50" cy="58" rx="14" ry="10" fill="#fffdf8" />
                  <circle cx="50" cy="54" r="3.5" fill="#2a170e" />
                  <circle cx="40" cy="46" r="3.5" fill="#2a170e" />
                  <circle cx="41" cy="44" r="1.2" fill="#ffffff" />
                  <circle cx="60" cy="46" r="3.5" fill="#2a170e" />
                  <circle cx="61" cy="44" r="1.2" fill="#ffffff" />
                  <ellipse cx="38" cy="74" rx="6" ry="5" fill="#fffdf8" />
                  <ellipse cx="62" cy="74" rx="6" ry="5" fill="#fffdf8" />
                </svg>
              </div>

              {/* Small Tag */}
              <span className="bg-white/95 text-cocoa font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-xs border border-honey/30 mt-1 whitespace-nowrap">
                Tap to pop me! 🎈
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};
