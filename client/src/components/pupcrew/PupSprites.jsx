import React from 'react';

/**
 * High-definition, lightweight SVG vector illustrations for the Pup Crew
 * Breeds: Maltipoo, Pomeranian, Poodle, Cavapoo, Shih Tzu
 */

// Common Gradients Definition
export const PupGradients = () => (
  <svg width="0" height="0" className="absolute pointer-events-none">
    <defs>
      {/* Maltipoo Warm Apricot Gradient */}
      <radialGradient id="maltiFur" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fff8ed" />
        <stop offset="45%" stopColor="#f7d5a5" />
        <stop offset="85%" stopColor="#d9894e" />
        <stop offset="100%" stopColor="#b66127" />
      </radialGradient>

      {/* Pomeranian Fluffy White/Cream Gradient */}
      <radialGradient id="pomFur" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#fef3e2" />
        <stop offset="100%" stopColor="#f9dfb6" />
      </radialGradient>

      {/* Poodle Deep Red/Apricot Gradient */}
      <radialGradient id="poodleFur" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#e89569" />
        <stop offset="60%" stopColor="#c2622b" />
        <stop offset="100%" stopColor="#873510" />
      </radialGradient>

      {/* Cavapoo Ruby Golden Gradient */}
      <radialGradient id="cavaFur" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fde0b2" />
        <stop offset="55%" stopColor="#c86d35" />
        <stop offset="100%" stopColor="#7a3411" />
      </radialGradient>

      {/* Shih Tzu Tri-Color Gradient */}
      <radialGradient id="shihFur" cx="45%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="45%" stopColor="#fbe8cc" />
        <stop offset="80%" stopColor="#b86b3b" />
        <stop offset="100%" stopColor="#2a170e" />
      </radialGradient>

      {/* Gold Tag Gradient */}
      <radialGradient id="goldTag" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#a16207" />
      </radialGradient>
    </defs>
  </svg>
);

// 1. MALTIPOO (Dog 1)
export const MaltipooSprite = ({ pose = 'idle', className = 'w-20 h-20' }) => {
  if (pose === 'sleep') {
    return (
      <div className={`relative ${className}`}>
        <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md">
          {/* Sleeping curled body */}
          <ellipse cx="50" cy="50" rx="32" ry="20" fill="url(#maltiFur)" />
          {/* Curled paws */}
          <ellipse cx="32" cy="62" rx="7" ry="5" fill="#fffdf8" />
          <ellipse cx="68" cy="62" rx="7" ry="5" fill="#fffdf8" />
          {/* Sleeping Head */}
          <circle cx="64" cy="42" r="16" fill="url(#maltiFur)" />
          {/* Floppy Ear over face */}
          <ellipse cx="56" cy="46" rx="6" ry="12" fill="#b66127" transform="rotate(-15 56 46)" />
          {/* Closed Sleeping Eye */}
          <path d="M 68 44 Q 72 47 76 44" fill="none" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
          {/* Nose */}
          <circle cx="76" cy="49" r="3" fill="#2a170e" />
        </svg>
        <div className="absolute -top-3 right-0 text-xs font-bold text-toffee font-scrawl animate-bounce">
          z Z z
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 90" className="w-full h-full drop-shadow-lg">
        {/* Wagging Tail */}
        <g className="animate-tail-wag" style={{ transformOrigin: '22px 50px' }}>
          <path d="M 22 50 Q 8 38 12 24 Q 20 20 22 32 Z" fill="url(#maltiFur)" />
          <circle cx="12" cy="22" r="5" fill="#fff8ed" />
        </g>

        {/* Back Legs */}
        <path d="M 32 58 Q 28 70 30 80" stroke="#b66127" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="30" cy="80" rx="5" ry="3" fill="#fffdf8" />
        <path d="M 42 58 Q 44 70 42 80" stroke="#d9894e" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="42" cy="80" rx="5" ry="3" fill="#fffdf8" />

        {/* Fluffy Body */}
        <ellipse cx="50" cy="54" rx="24" ry="17" fill="url(#maltiFur)" />

        {/* Front Legs */}
        <path d="M 62 58 Q 60 70 62 80" stroke="#b66127" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="62" cy="80" rx="5" ry="3" fill="#fffdf8" />
        <path d="M 72 58 Q 74 70 73 80" stroke="#d9894e" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="73" cy="80" rx="5" ry="3" fill="#fffdf8" />

        {/* Red Collar & Bell */}
        <ellipse cx="70" cy="48" rx="5" ry="10" fill="#ef4444" transform="rotate(-15 70 48)" />
        <circle cx="72" cy="56" r="3.5" fill="url(#goldTag)" stroke="#a16207" strokeWidth="0.8" />

        {/* Head */}
        <g className="animate-head-bob" style={{ transformOrigin: '76px 36px' }}>
          {/* Back Ear */}
          <ellipse cx="66" cy="24" rx="8" ry="16" fill="#b66127" transform="rotate(-15 66 24)" />
          <circle cx="76" cy="36" r="18" fill="url(#maltiFur)" />
          {/* Forehead fluff */}
          <circle cx="71" cy="20" r="6" fill="#fff8ed" />
          <circle cx="77" cy="18" r="7" fill="#fff8ed" />
          <circle cx="83" cy="20" r="6" fill="#fff8ed" />
          {/* Muzzle */}
          <ellipse cx="87" cy="40" rx="10" ry="7" fill="#fffdf8" />
          <ellipse cx="89" cy="37" rx="4.5" ry="3.5" fill="#2a170e" />
          <circle cx="88" cy="36" r="1.2" fill="#ffffff" />
          <path d="M 85 42 Q 88 45 91 42" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="80" cy="32" r="4.2" fill="#2a170e" />
          <circle cx="81.5" cy="30.5" r="1.8" fill="#ffffff" />
          <circle cx="79.5" cy="33" r="0.8" fill="#ffffff" />
          {/* Cheek */}
          <circle cx="78" cy="40" r="3.5" fill="#f9cdbf" opacity="0.8" />
          {/* Front Floppy Ear */}
          <ellipse cx="69" cy="28" rx="8" ry="16" fill="#d9894e" transform="rotate(-8 69 28)" />
          <ellipse cx="69" cy="28" rx="4.5" ry="10" fill="#fff8ed" transform="rotate(-8 69 28)" />
        </g>

        {/* Optional Toy Ball if pose is roll-ball */}
        {pose === 'rollBall' && (
          <g transform="translate(82, 60)">
            <circle cx="10" cy="10" r="8" fill="#ef4444" />
            <path d="M 2 10 Q 10 2 18 10 Q 10 18 2 10 Z" fill="#facc15" />
          </g>
        )}
      </svg>
    </div>
  );
};

// 2. POMERANIAN (Dog 2 - Fluffy cloud with sunglasses option)
export const PomeranianSprite = ({ pose = 'idle', className = 'w-20 h-20' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 90" className="w-full h-full drop-shadow-lg">
        {/* High curled fluffy plume tail */}
        <g className="animate-tail-wag" style={{ transformOrigin: '30px 40px' }}>
          <ellipse cx="25" cy="30" rx="14" ry="20" fill="url(#pomFur)" transform="rotate(-25 25 30)" />
          <circle cx="20" cy="20" r="10" fill="#ffffff" />
        </g>

        {/* Fluffy Cloud Body */}
        <ellipse cx="50" cy="54" rx="28" ry="20" fill="url(#pomFur)" />
        <circle cx="36" cy="52" r="12" fill="#ffffff" opacity="0.8" />
        <circle cx="64" cy="52" r="12" fill="#ffffff" opacity="0.8" />

        {/* Tiny Paws */}
        <ellipse cx="36" cy="74" rx="5" ry="4" fill="#ffffff" stroke="#f9dfb6" strokeWidth="1" />
        <ellipse cx="46" cy="74" rx="5" ry="4" fill="#ffffff" stroke="#f9dfb6" strokeWidth="1" />
        <ellipse cx="58" cy="74" rx="5" ry="4" fill="#ffffff" stroke="#f9dfb6" strokeWidth="1" />
        <ellipse cx="68" cy="74" rx="5" ry="4" fill="#ffffff" stroke="#f9dfb6" strokeWidth="1" />

        {/* Fluffy Head */}
        <circle cx="66" cy="38" r="20" fill="url(#pomFur)" />

        {/* Pointy Fox Ears */}
        <polygon points="56,26 62,12 68,26" fill="#f9dfb6" />
        <polygon points="58,25 62,16 66,25" fill="#fbe8cc" />
        <polygon points="70,26 76,12 82,26" fill="#f9dfb6" />
        <polygon points="72,25 76,16 80,25" fill="#fbe8cc" />

        {/* Baby doll muzzle */}
        <ellipse cx="76" cy="42" rx="8" ry="6" fill="#ffffff" />
        <ellipse cx="78" cy="40" rx="3.5" ry="2.5" fill="#2a170e" />
        <path d="M 75 44 Q 77 46 79 44" fill="none" stroke="#2a170e" strokeWidth="1.4" strokeLinecap="round" />

        {/* Eyes or Cool Sunglasses */}
        {pose === 'popDubai' ? (
          <g transform="translate(62, 32)">
            {/* Cool Dubai Sunglasses */}
            <rect x="0" y="0" width="13" height="9" rx="3" fill="#18181b" />
            <rect x="15" y="0" width="13" height="9" rx="3" fill="#18181b" />
            <line x1="12" y1="3" x2="16" y2="3" stroke="#facc15" strokeWidth="1.5" />
            <line x1="2" y1="2" x2="6" y2="7" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <line x1="17" y1="2" x2="21" y2="7" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </g>
        ) : (
          <g>
            <circle cx="70" cy="36" r="3.8" fill="#2a170e" />
            <circle cx="71.2" cy="35" r="1.5" fill="#ffffff" />
            <circle cx="80" cy="36" r="3.8" fill="#2a170e" />
            <circle cx="81.2" cy="35" r="1.5" fill="#ffffff" />
          </g>
        )}

        {/* Rosy Cheeks */}
        <circle cx="64" cy="44" r="3.5" fill="#f9cdbf" opacity="0.8" />
        <circle cx="82" cy="44" r="3.5" fill="#f9cdbf" opacity="0.8" />
      </svg>
    </div>
  );
};

// 3. POODLE (Dog 3 - Rides airplane, holds phone, holds gift box)
export const PoodleSprite = ({ pose = 'plane', className = 'w-20 h-20' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 110 90" className="w-full h-full drop-shadow-lg">
        {/* Curly Red Poodle Head */}
        <g transform="translate(10, 0)">
          {/* Ears with curly puffs */}
          <ellipse cx="38" cy="34" rx="8" ry="18" fill="url(#poodleFur)" transform="rotate(-15 38 34)" />
          <ellipse cx="38" cy="34" rx="4" ry="12" fill="#e89569" transform="rotate(-15 38 34)" />

          {/* Topknot Puff */}
          <circle cx="50" cy="18" r="10" fill="url(#poodleFur)" />
          <circle cx="45" cy="18" r="6" fill="#e89569" />
          <circle cx="55" cy="18" r="6" fill="#e89569" />

          {/* Head */}
          <circle cx="50" cy="34" r="18" fill="url(#poodleFur)" />

          {/* Snout */}
          <ellipse cx="60" cy="38" rx="9" ry="7" fill="#fffdf8" />
          <ellipse cx="62" cy="36" rx="4" ry="3" fill="#2a170e" />
          <path d="M 58 41 Q 61 43 64 41" fill="none" stroke="#2a170e" strokeWidth="1.5" strokeLinecap="round" />

          {/* Eyes */}
          <circle cx="54" cy="30" r="3.8" fill="#2a170e" />
          <circle cx="55.2" cy="28.8" r="1.5" fill="#ffffff" />

          {/* Body */}
          <ellipse cx="40" cy="56" rx="18" ry="14" fill="url(#poodleFur)" />
        </g>

        {/* PROPS ACCORDING TO POSE */}
        {pose === 'plane' && (
          /* Cartoon Airplane */
          <g transform="translate(15, 45)">
            {/* Plane Body */}
            <path d="M 0 15 Q 35 0 65 15 L 60 25 L 5 25 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            {/* Wings */}
            <polygon points="25,18 40,-5 52,-5 42,18" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
            <polygon points="20,22 35,38 45,38 35,22" fill="#0284c7" />
            {/* Propeller */}
            <ellipse cx="67" cy="16" rx="2" ry="12" fill="#facc15" className="animate-spin-once" />
          </g>
        )}

        {pose === 'phone' && (
          /* Smartphone Prop */
          <g transform="translate(68, 42)">
            <rect x="0" y="0" width="14" height="22" rx="3" fill="#18181b" stroke="#38bdf8" strokeWidth="1" />
            <rect x="1.5" y="2" width="11" height="18" rx="2" fill="#25D366" />
            <circle cx="7" cy="11" r="3" fill="#ffffff" />
          </g>
        )}

        {pose === 'box' && (
          /* Gift Delivery Box Prop */
          <g transform="translate(60, 44)">
            <rect x="0" y="6" width="24" height="20" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <rect x="-2" y="2" width="28" height="6" rx="2" fill="#ef4444" />
            {/* Ribbon */}
            <line x1="12" y1="2" x2="12" y2="26" stroke="#ef4444" strokeWidth="3" />
            <circle cx="12" cy="2" r="3" fill="#ef4444" />
          </g>
        )}

        {pose === 'sniff' && (
          /* Sniffing flower prop */
          <g transform="translate(75, 48)">
            <circle cx="5" cy="5" r="4" fill="#f43f5e" />
            <circle cx="5" cy="5" r="1.5" fill="#facc15" />
            <path d="M 5 9 Q 3 16 2 20" stroke="#22c55e" strokeWidth="2" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};

// 4. CAVAPOO (Dog 4 - Wearing tiny stethoscope and vet badge)
export const CavapooSprite = ({ pose = 'stethoscope', className = 'w-20 h-20' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 90" className="w-full h-full drop-shadow-lg">
        {/* Tail */}
        <g className="animate-tail-wag" style={{ transformOrigin: '24px 50px' }}>
          <path d="M 24 50 Q 12 36 15 22" stroke="url(#cavaFur)" strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>

        {/* Fluffy Body */}
        <ellipse cx="50" cy="54" rx="24" ry="18" fill="url(#cavaFur)" />
        {/* White chest patch (classic Cavapoo feature) */}
        <ellipse cx="64" cy="52" rx="8" ry="10" fill="#fffdf8" />

        {/* Legs */}
        <path d="M 34 60 L 32 80" stroke="#7a3411" strokeWidth="6" strokeLinecap="round" />
        <path d="M 46 60 L 46 80" stroke="#c86d35" strokeWidth="6" strokeLinecap="round" />
        <path d="M 62 60 L 60 80" stroke="#7a3411" strokeWidth="6" strokeLinecap="round" />
        <path d="M 72 60 L 72 80" stroke="#c86d35" strokeWidth="6" strokeLinecap="round" />

        {/* Head */}
        <circle cx="70" cy="34" r="18" fill="url(#cavaFur)" />
        {/* Floppy Long Wavy Ears */}
        <ellipse cx="60" cy="30" rx="8" ry="18" fill="#7a3411" transform="rotate(-15 60 30)" />
        <ellipse cx="60" cy="30" rx="4" ry="12" fill="#fde0b2" transform="rotate(-15 60 30)" />

        {/* Muzzle */}
        <ellipse cx="80" cy="38" rx="9" ry="7" fill="#fffdf8" />
        <ellipse cx="82" cy="35" rx="4" ry="3" fill="#2a170e" />
        <path d="M 78 40 Q 81 43 84 40" fill="none" stroke="#2a170e" strokeWidth="1.5" strokeLinecap="round" />

        {/* Warm Doe Eyes */}
        <circle cx="74" cy="30" r="4.2" fill="#2a170e" />
        <circle cx="75.5" cy="28.5" r="1.8" fill="#ffffff" />

        {/* Tiny Vet Stethoscope Prop */}
        <path d="M 64 36 Q 60 48 68 56 Q 74 60 76 56" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
        <circle cx="76" cy="56" r="3.5" fill="#e2e8f0" stroke="#0284c7" strokeWidth="1" />
        {/* Ear tips of stethoscope */}
        <circle cx="64" cy="36" r="2" fill="#0284c7" />

        {/* Vet Cross Badge */}
        <g transform="translate(56, 48)">
          <rect x="0" y="0" width="10" height="10" rx="2" fill="#ffffff" stroke="#ef4444" strokeWidth="0.8" />
          <path d="M 5 2 L 5 8 M 2 5 L 8 5" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

// 5. SHIH TZU (Dog 5 - Silky coat, cute topknot bow, inquisitive head tilt)
export const ShihTzuSprite = ({ pose = 'peek', className = 'w-20 h-20' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 90" className="w-full h-full drop-shadow-lg">
        {/* Shih Tzu Topknot Ribbon Bow */}
        <g transform="translate(48, 12)">
          <ellipse cx="3" cy="3" rx="4" ry="2.5" fill="#ef4444" transform="rotate(-30 3 3)" />
          <ellipse cx="9" cy="3" rx="4" ry="2.5" fill="#ef4444" transform="rotate(30 9 3)" />
          <circle cx="6" cy="3" r="2" fill="#facc15" />
        </g>

        {/* Head */}
        <circle cx="54" cy="38" r="20" fill="url(#shihFur)" />

        {/* Long Silky Drop Ears */}
        <path d="M 36 28 C 32 40 34 56 40 64 C 44 56 42 40 42 30 Z" fill="#2a170e" />
        <path d="M 72 28 C 76 40 74 56 68 64 C 64 56 66 40 66 30 Z" fill="#2a170e" />

        {/* Classic Shih Tzu Face Mustache & Beard */}
        <ellipse cx="54" cy="46" rx="14" ry="10" fill="#ffffff" />
        <ellipse cx="54" cy="40" rx="4.5" ry="3.5" fill="#2a170e" />
        <circle cx="52.8" cy="39" r="1.2" fill="#ffffff" />
        <path d="M 50 44 Q 54 47 58 44" fill="none" stroke="#2a170e" strokeWidth="1.5" strokeLinecap="round" />

        {/* Big Inquisitive Eyes */}
        <circle cx="45" cy="34" r="4.5" fill="#2a170e" />
        <circle cx="46.5" cy="32.5" r="2" fill="#ffffff" />
        <circle cx="63" cy="34" r="4.5" fill="#2a170e" />
        <circle cx="64.5" cy="32.5" r="2" fill="#ffffff" />

        {/* Front Paws Peeking Over Edge */}
        <ellipse cx="40" cy="62" rx="7" ry="5" fill="#ffffff" stroke="#fbe8cc" strokeWidth="1.2" />
        <ellipse cx="68" cy="62" rx="7" ry="5" fill="#ffffff" stroke="#fbe8cc" strokeWidth="1.2" />

        {/* Question Mark Bubble if pose is question */}
        {pose === 'question' && (
          <g transform="translate(68, 6)" className="animate-bounce">
            <circle cx="12" cy="12" r="11" fill="#ffffff" stroke="#f2be6b" strokeWidth="1.5" />
            <text x="8" y="16" fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill="#c2622b">?</text>
          </g>
        )}
      </svg>
    </div>
  );
};
