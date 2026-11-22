import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import {
  PupGradients,
  MaltipooSprite,
  PomeranianSprite,
  PoodleSprite,
  CavapooSprite,
  ShihTzuSprite
} from './PupSprites';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export const PupCrewLayer = () => {
  const containerRef = useRef(null);
  const dog1Ref = useRef(null); // Maltipoo
  const ballRef = useRef(null); // Toy ball
  const dog2Ref = useRef(null); // Pomeranian
  const dog3Ref = useRef(null); // Poodle (Airplane / Journey)
  const dog4Ref = useRef(null); // Cavapoo (Vet Stethoscope)
  const dog5Ref = useRef(null); // Shih Tzu (FAQ Peeker)
  const finaleRef = useRef(null); // All 5 Finale Assembly

  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [maltiPose, setMaltiPose] = useState('idle');
  const [poodlePose, setPoodlePose] = useState('plane');
  const [shihPose, setShihPose] = useState('peek');

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    // Small delay to ensure route transitions & DOM elements are mounted
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const heroEl = document.querySelector('#hero-section');
        const meetPupsEl = document.querySelector('#meet-pups-section');
        const twoWaysEl = document.querySelector('#two-ways-section');
        const journeyEl = document.querySelector('#journey-section');
        const trustEl = document.querySelector('#trust-section');
        const faqEl = document.querySelector('#faq-preview-section');
        const finalCtaEl = document.querySelector('#final-cta-section');

        // Only run choreo if homepage sections exist
        if (!heroEl) return;

        // ==========================================
        // 1. DOG 1 (MALTIPOO): Hero to Meet the Pups
        // ==========================================
        if (dog1Ref.current && heroEl) {
          // Initial entrance bounce
          gsap.fromTo(
            dog1Ref.current,
            { scale: 0, opacity: 0, y: 40, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              rotation: 0,
              duration: 0.9,
              ease: 'back.out(2)',
              delay: 0.5
            }
          );

          if (meetPupsEl) {
            // Dog 1 runs down toward Meet Pups
            const maltiTl = gsap.timeline({
              scrollTrigger: {
                trigger: heroEl,
                start: 'bottom 85%',
                endTrigger: meetPupsEl,
                end: 'top 20%',
                scrub: 1,
                onUpdate: (self) => {
                  if (self.direction === 1) {
                    setMaltiPose('rollBall');
                  } else {
                    setMaltiPose('idle');
                  }
                }
              }
            });

            maltiTl
              .to(dog1Ref.current, {
                xPercent: isMobile ? -60 : -140,
                yPercent: 120,
                rotation: 8,
                ease: 'power1.inOut'
              })
              .to(dog1Ref.current, {
                xPercent: isMobile ? -30 : -80,
                yPercent: 240,
                scale: 1.1,
                rotation: -4,
                ease: 'power1.out'
              });

            // Toy ball hand-off rolling down towards next section
            if (ballRef.current && twoWaysEl) {
              gsap.timeline({
                scrollTrigger: {
                  trigger: meetPupsEl,
                  start: 'center center',
                  endTrigger: twoWaysEl,
                  end: 'top 40%',
                  scrub: 1
                }
              })
              .fromTo(
                ballRef.current,
                { opacity: 0, scale: 0, xPercent: -50, yPercent: 0, rotation: 0 },
                { opacity: 1, scale: 1.2, xPercent: isMobile ? -180 : -320, yPercent: 220, rotation: 1080, ease: 'none' }
              )
              .to(ballRef.current, { opacity: 0, scale: 0.5, duration: 0.2 });
            }
          }
        }

        // ==========================================
        // 2. DOG 2 (POMERANIAN): Two Ways - Dubai Showroom
        // ==========================================
        if (dog2Ref.current && twoWaysEl) {
          gsap.timeline({
            scrollTrigger: {
              trigger: twoWaysEl,
              start: 'top 75%',
              end: 'center 40%',
              scrub: 1
            }
          })
          .fromTo(
            dog2Ref.current,
            { opacity: 0, scale: 0.3, y: 80, rotation: -12 },
            { opacity: 1, scale: 1, y: 0, rotation: 4, ease: 'back.out(2)' }
          );
        }

        // ==========================================
        // 3. DOG 3 (POODLE): Flight Route & 3-Step Journey
        // ==========================================
        if (dog3Ref.current && journeyEl) {
          gsap.timeline({
            scrollTrigger: {
              trigger: journeyEl,
              start: 'top 80%',
              end: 'bottom 40%',
              scrub: 1,
              onUpdate: (self) => {
                const p = self.progress;
                if (p < 0.33) {
                  setPoodlePose('sniff'); // Step 1: Sniffing flower
                } else if (p < 0.66) {
                  setPoodlePose('phone'); // Step 2: WhatsApp phone
                } else {
                  setPoodlePose('box'); // Step 3: Jumping into delivery box
                }
              }
            }
          })
          .fromTo(
            dog3Ref.current,
            { opacity: 0, scale: 0.4, x: -60, y: 40 },
            { opacity: 1, scale: 1, x: isMobile ? 80 : 220, y: 0, ease: 'power1.inOut' }
          );
        }

        // ==========================================
        // 4. DOG 4 (CAVAPOO): Why Families Trust (Vet Stethoscope)
        // ==========================================
        if (dog4Ref.current && trustEl) {
          gsap.timeline({
            scrollTrigger: {
              trigger: trustEl,
              start: 'top 70%',
              end: 'center center',
              scrub: 1
            }
          })
          .fromTo(
            dog4Ref.current,
            { opacity: 0, scale: 0.4, y: 60, rotation: 10 },
            { opacity: 1, scale: 1, y: 0, rotation: -4, ease: 'back.out(1.8)' }
          );
        }

        // ==========================================
        // 5. DOG 5 (SHIH TZU): FAQ Preview Inquisitive Peeker
        // ==========================================
        if (dog5Ref.current && faqEl) {
          gsap.timeline({
            scrollTrigger: {
              trigger: faqEl,
              start: 'top 75%',
              end: 'center 45%',
              scrub: 1,
              onEnter: () => setShihPose('question'),
              onLeaveBack: () => setShihPose('peek')
            }
          })
          .fromTo(
            dog5Ref.current,
            { opacity: 0, scale: 0.2, y: 50 },
            { opacity: 1, scale: 1, y: 0, ease: 'back.out(1.7)' }
          );
        }

        // ==========================================
        // 6. GRAND FINALE: ALL 5 PUPS ASSEMBLE AT CTA
        // ==========================================
        if (finaleRef.current && finalCtaEl) {
          gsap.timeline({
            scrollTrigger: {
              trigger: finalCtaEl,
              start: 'top 75%',
              end: 'bottom 80%',
              scrub: 1
            }
          })
          .fromTo(
            finaleRef.current,
            { opacity: 0, y: 60, scale: 0.7 },
            { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.6)' }
          );
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    }, 250);

    return () => clearTimeout(timer);
  }, [isMobile, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none z-30 opacity-40 select-none">
        <PupGradients />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden"
      aria-hidden="true"
    >
      <PupGradients />

      {/* 1. Maltipoo Floating Mascot (Hero to Meet Pups) */}
      <div
        ref={dog1Ref}
        className="absolute bottom-28 right-6 sm:right-16 md:right-28 pointer-events-none will-change-transform drop-shadow-xl"
      >
        <div className="relative group">
          <MaltipooSprite pose={maltiPose} className="w-20 h-20 sm:w-24 sm:h-24" />
          <div className="absolute -top-3 -right-2 bg-white/95 px-2 py-0.5 rounded-full shadow-md border border-honey/40 text-[10px] font-bold text-toffee font-scrawl animate-wiggle-fast">
            <span>let's go! 🐾</span>
          </div>
        </div>
      </div>

      {/* Toy Ball Hand-Off */}
      <div
        ref={ballRef}
        className="absolute bottom-24 right-1/2 pointer-events-none opacity-0 will-change-transform"
      >
        <div className="w-7 h-7 drop-shadow-md">
          <svg viewBox="0 0 20 20" className="w-full h-full">
            <circle cx="10" cy="10" r="9" fill="#ef4444" />
            <path d="M 2 10 Q 10 2 18 10 Q 10 18 2 10 Z" fill="#facc15" />
          </svg>
        </div>
      </div>

      {/* 2. Pomeranian Mascot (Two Ways) */}
      <div
        ref={dog2Ref}
        className="absolute top-24 left-6 sm:left-12 pointer-events-none opacity-0 will-change-transform drop-shadow-xl"
      >
        <div className="relative">
          <PomeranianSprite pose="popDubai" className="w-20 h-20 sm:w-24 sm:h-24" />
          <div className="absolute -top-3 left-4 bg-white/95 px-2 py-0.5 rounded-full shadow-md border border-honey/40 text-[10px] font-bold text-toffee font-scrawl">
            <span>Dubai VIP! ✨</span>
          </div>
        </div>
      </div>

      {/* 3. Poodle Mascot (Journey Step Traveler) */}
      <div
        ref={dog3Ref}
        className="absolute top-1/3 left-1/4 pointer-events-none opacity-0 will-change-transform drop-shadow-xl"
      >
        <div className="relative">
          <PoodleSprite pose={poodlePose} className="w-22 h-22 sm:w-26 sm:h-26" />
        </div>
      </div>

      {/* 4. Cavapoo Mascot (Trust Vet) */}
      <div
        ref={dog4Ref}
        className="absolute top-20 right-8 sm:right-20 pointer-events-none opacity-0 will-change-transform drop-shadow-xl"
      >
        <div className="relative">
          <CavapooSprite pose="stethoscope" className="w-20 h-20 sm:w-24 sm:h-24" />
          <div className="absolute -top-3 right-2 bg-white/95 px-2 py-0.5 rounded-full shadow-md border border-honey/40 text-[10px] font-bold text-emerald-600 font-scrawl">
            <span>100% Healthy! 🩺</span>
          </div>
        </div>
      </div>

      {/* 5. Shih Tzu Mascot (FAQ Peeker) */}
      <div
        ref={dog5Ref}
        className="absolute bottom-12 left-8 sm:left-24 pointer-events-none opacity-0 will-change-transform drop-shadow-xl"
      >
        <div className="relative">
          <ShihTzuSprite pose={shihPose} className="w-20 h-20 sm:w-24 sm:h-24" />
        </div>
      </div>

      {/* 6. Grand Finale Assembly (At CTA) */}
      <div
        ref={finaleRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 will-change-transform"
      >
        <div className="flex items-center gap-1 sm:gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl border-2 border-honey/50">
          <MaltipooSprite pose="idle" className="w-10 h-10 sm:w-12 sm:h-12" />
          <PomeranianSprite pose="idle" className="w-10 h-10 sm:w-12 sm:h-12" />
          <PoodleSprite pose="sniff" className="w-10 h-10 sm:w-12 sm:h-12" />
          <CavapooSprite pose="stethoscope" className="w-10 h-10 sm:w-12 sm:h-12" />
          <ShihTzuSprite pose="peek" className="w-10 h-10 sm:w-12 sm:h-12" />
          <span className="font-scrawl text-toffee text-xs sm:text-sm font-bold pl-1 hidden sm:inline">
            we can't wait to meet you! ❤️
          </span>
        </div>
      </div>
    </div>
  );
};
