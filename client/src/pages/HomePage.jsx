import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Plane,
  Clock,
  Award,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Play,
  Pause,
  Video
} from 'lucide-react';
import { api } from '../api';
import { useSettings } from '../context/SettingsContext';
import { PuppyCard } from '../components/common/PuppyCard';
import { CardPeekerPup } from '../components/common/CardPeekerPup';
import { CartoonSection } from '../components/common/CartoonSection';
import { SEO } from '../components/common/SEO';

export const HomePage = () => {
  const { settings, getWhatsAppLink } = useSettings();
  const [puppies, setPuppies] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [happyFamilies, setHappyFamilies] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  // Background Video State
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef(null);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    } else {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [puppyRes, testRes, hfRes, faqRes] = await Promise.all([
          api.getPuppies({ status: 'available' }),
          api.getTestimonials(),
          api.getHappyFamilies(),
          api.getFAQs()
        ]);

        if (puppyRes.success) setPuppies(puppyRes.data || []);
        if (testRes.success) setTestimonials(testRes.data || []);
        if (hfRes.success) setHappyFamilies(hfRes.data || []);
        if (faqRes.success) setFaqs(faqRes.data || []);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const marqueePuppies = puppies.slice(0, 6);
  const displayPuppies = puppies.slice(0, 15);
  const featuredTestimonial = testimonials.find(t => t.featured) || testimonials[0] || {
    name: 'Sarah M.',
    location: 'Dubai, UAE',
    quote: 'Finding our little Maltipoo Max through TeddyPups was the smoothest experience. The health check, Korean import passport, and door-to-door concierge in Downtown Dubai was 5-star.'
  };

  const previewFaqs = faqs.slice(0, 3);

  return (
    <div className="relative">
      <SEO
        title="TeddyPups U.A.E. — Premium teacup puppies in Dubai"
        description="Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide. Maltipoo, Pomeranian, Poodle, Cavapoo, Shih Tzu."
      />

      {/* 1. HERO SECTION WITH LUXURY BACKGROUND DOGS VIDEO */}
      <section
        id="hero-section"
        className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden"
      >
        {/* Full-Cover Background Puppy Video with High-Vibrancy Colors */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center scale-105 filter opacity-90 saturate-140 contrast-105 brightness-100 transition-opacity duration-700"
          >
            <source src="/videos/puppies-bg.webm" type="video/webm" />
            <source src="/videos/puppy-bg-480.webm" type="video/webm" />
          </video>
          {/* Subtle Warm Scrim & Top/Bottom Vignette to let vivid puppy colors shine */}
          <div className="absolute inset-0 bg-gradient-to-b from-milk/40 via-transparent to-milk/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(42,23,14,0.12)_100%)]" />
        </div>

        {/* Ambient Video Control Badge */}
        <div className="absolute top-3 right-3 sm:top-6 sm:right-8 z-20">
          <button
            type="button"
            onClick={toggleVideoPlay}
            className="inline-flex items-center gap-1.5 bg-white/80 hover:bg-white backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-cocoa hover:text-toffee shadow-xs border border-honey/30 transition hover:scale-105"
            title={videoPlaying ? "Pause background puppy video" : "Play background puppy video"}
          >
            {videoPlaying ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline font-scrawl text-toffee">puppies playing live</span>
                <Pause className="w-3.5 h-3.5 text-toffee" />
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-toffee fill-current" />
                <span className="font-scrawl text-toffee">resume video</span>
              </>
            )}
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Frosted Glass Hero Showcase Card for crisp legibility over vibrant puppy video */}
          <div className="max-w-4xl mx-auto backdrop-blur-md bg-milk/75 sm:bg-milk/80 rounded-2xl sm:rounded-4xl p-4 sm:p-8 md:p-10 border border-white/80 shadow-soft-lg">
            {/* Small label */}
            <motion.div
              initial={{ scale: 0, rotate: -6 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
              className="inline-flex items-center gap-2 bg-honey/30 border border-honey/60 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6 shadow-xs backdrop-blur-xs"
            >
              <span className="w-2 h-2 rounded-full bg-toffee animate-pulse" />
              <span className="font-scrawl text-toffee text-xs sm:text-base font-semibold">
                every puppy is family
              </span>
            </motion.div>

            {/* Headline with Cartoon Pop */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16 }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-cocoa tracking-tight leading-[1.15] sm:leading-[1.1] drop-shadow-xs"
            >
              Premium teacup puppies in <span className="text-toffee italic">Dubai</span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-cocoa-soft max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
            </motion.p>

            {/* Two CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 200, damping: 16 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full"
            >
              <Link
                to="/puppies"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-toffee text-milk font-bold text-sm sm:text-base shadow-lift hover:bg-toffee-deep transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>View available puppies</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              <a
                href={getWhatsAppLink("Hi TeddyPups! I would like to enquire about your available teacup puppies.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base shadow-lift transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                <span>Enquire on WhatsApp</span>
              </a>
            </motion.div>

            {/* Trust badges strip under hero */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-honey/25 flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10 text-xs sm:text-sm text-cocoa-soft font-semibold">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-toffee flex-shrink-0" />
                <span>100% Health Checked & Vaccinated</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-toffee flex-shrink-0" />
                <span>Downtown Dubai Showroom</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-toffee flex-shrink-0" />
                <span>Korea to UAE Concierge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel marquee */}
        <div className="mt-12 md:mt-16 overflow-hidden py-4 border-y border-honey/20 bg-milk/70 backdrop-blur-xs">
          <div className="flex animate-marquee gap-5">
            {[...marqueePuppies, ...marqueePuppies].map((pup, index) => {
              const imgUrl = (pup.images && pup.images[0]) || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80';
              return (
                <Link
                  key={`${pup.slug}-${index}`}
                  to={`/puppies/${pup.slug}`}
                  className="flex-shrink-0 group block text-left"
                >
                  <div className="w-48 sm:w-56 h-60 sm:h-64 rounded-3xl overflow-hidden relative shadow-soft border-2 border-honey/30 group-hover:border-toffee transition-all">
                    <img
                      src={imgUrl}
                      alt={pup.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-cocoa/20 to-transparent flex flex-col justify-end p-4 text-milk">
                      <span className="font-serif font-bold text-lg leading-tight group-hover:text-honey transition">
                        {pup.name}
                      </span>
                      <span className="text-xs text-milk/90 font-medium">
                        {pup.origin === 'imported' ? `Korean Teacup ${pup.breed}` : `Dubai ${pup.breed}`}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. MEET THE PUPS (SLIDES IN FROM LEFT) */}
      <section
        id="meet-pups-section"
        className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <CartoonSection direction="left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-toffee font-scrawl text-lg mb-2">
                <span>Looking for their forever homes</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa">
                Meet the pups
              </h2>
              <p className="mt-3 text-cocoa-soft text-base sm:text-lg max-w-xl">
                Real puppies, real photos, looking for their families right now
              </p>
            </div>
            <Link
              to="/puppies"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 font-bold text-toffee hover:text-toffee-deep group text-sm sm:text-base"
            >
              <span>See all available puppies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </CartoonSection>

        {/* Grid of puppies with peeking dogs on scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayPuppies.map((pup, idx) => (
            <PuppyCard key={pup._id || pup.slug} puppy={pup} index={idx} />
          ))}

          {/* Final "Meet them all" tile */}
          <div className="relative pt-6">
            <Link
              to="/puppies"
              className="relative z-10 group bg-gradient-to-br from-honey/30 via-honey/15 to-milk rounded-3xl border-2 border-dashed border-honey p-6 flex flex-col items-center justify-center text-center hover:border-toffee hover:bg-honey/40 transition-all shadow-soft h-full min-h-[340px]"
            >
              <div className="w-16 h-16 rounded-full bg-toffee text-milk flex items-center justify-center mb-4 shadow-lift group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-cocoa mb-2">
                Meet them all
              </h3>
              <p className="text-xs text-cocoa-soft max-w-xs mb-5 leading-relaxed">
                Browse our full collection of rare teacup puppies, filter by breed, and watch live videos.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-milk bg-toffee px-5 py-2.5 rounded-full shadow-xs group-hover:bg-toffee-deep transition">
                <span>View all listings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. TWO WAYS TO MEET YOUR PUPPY */}
      <section
        id="two-ways-section"
        className="py-16 md:py-20 bg-[#fdf9f2] border-y border-honey/25 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CartoonSection direction="pop">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-scrawl text-toffee text-lg">tailored concierge</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa mt-1">
                Two ways to meet your puppy
              </h2>
              <p className="text-cocoa-soft mt-3 text-base">
                Whether you wish to cuddle a puppy today in Dubai or reserve a custom doll-face import from Korea, we ensure a seamless experience.
              </p>
            </div>
          </CartoonSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Puppies in Dubai */}
            <CartoonSection direction="left" delay={0.1}>
              <div className="relative pt-6 flex flex-col h-full">
                <CardPeekerPup breed="Pomeranian" position="top-right" />
                <div className="relative z-10 bg-white rounded-4xl p-6 sm:p-8 shadow-soft border border-honey/30 flex flex-col justify-between group hover:shadow-lift transition-all flex-1">
                  <div>
                    <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-honey/10">
                      <img
                        src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80"
                        alt="Puppies in our Dubai Showroom"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-milk/95 text-toffee text-xs font-bold px-3 py-1.5 rounded-full shadow-xs border border-toffee/20">
                        In our showroom
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa mb-3">
                      Puppies in Dubai
                    </h3>
                    <p className="text-cocoa-soft text-sm sm:text-base leading-relaxed mb-6">
                      Experience love at first cuddle! Visit our private boutique showroom in Downtown Dubai to meet our available puppies in person, play with them, and take your puppy home the very same day.
                    </p>
                  </div>

                  <Link
                    to="/puppies?origin=local"
                    className="inline-flex items-center justify-center gap-2 bg-honey/30 hover:bg-honey/60 text-cocoa font-bold px-6 py-3.5 rounded-full text-sm transition-all border border-honey/40"
                  >
                    <span>View Showroom Puppies</span>
                    <ArrowRight className="w-4 h-4 text-toffee" />
                  </Link>
                </div>
              </div>
            </CartoonSection>

            {/* Card 2: Imported for you */}
            <CartoonSection direction="right" delay={0.2}>
              <div className="relative pt-6 flex flex-col h-full">
                <CardPeekerPup breed="Poodle" position="top-left" />
                <div className="relative z-10 bg-white rounded-4xl p-6 sm:p-8 shadow-soft border border-honey/30 flex flex-col justify-between group hover:shadow-lift transition-all flex-1">
                  <div>
                    <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-sky/10">
                      <img
                        src="https://images.unsplash.com/photo-1583511666407-5f06533f2113?auto=format&fit=crop&w=1000&q=80"
                        alt="Imported Teacup Puppies from Korea"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-sky/95 text-sky-deep text-xs font-bold px-3 py-1.5 rounded-full shadow-xs border border-sky-deep/20">
                        Korea → Dubai
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa mb-3">
                      Imported for you
                    </h3>
                    <p className="text-cocoa-soft text-sm sm:text-base leading-relaxed mb-6">
                      Exclusive Korean teacup puppies with signature teddy-bear faces and ultra-compact proportions. Hand-selected from elite South Korean breeders, with full veterinary flight passports and door-to-door delivery.
                    </p>
                  </div>

                  <Link
                    to="/puppies?origin=imported"
                    className="inline-flex items-center justify-center gap-2 bg-sky/30 hover:bg-sky/60 text-sky-deep font-bold px-6 py-3.5 rounded-full text-sm transition-all border border-sky-deep/30"
                  >
                    <span>Explore Korean Imports</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CartoonSection>
          </div>
        </div>
      </section>

      {/* 4. DEDICATED SHOWROOM PLAYROOM VIDEO BANNER */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CartoonSection direction="pop">
          <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white aspect-[4/3] sm:aspect-[21/8] min-h-[340px] sm:min-h-[280px]">
            {/* Live Playroom Video Loop */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter saturate-130 contrast-105"
            >
              <source src="/videos/puppies-bg.webm" type="video/webm" />
              <source src="/videos/puppy-bg-480.webm" type="video/webm" />
            </video>

            {/* Glassmorphic Overlay with VIP Concierge invitation */}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-cocoa/95 via-cocoa/80 sm:via-cocoa/40 to-transparent flex items-end sm:items-center p-5 sm:p-10 md:p-12">
              <div className="max-w-md text-milk">
                <span className="inline-flex items-center gap-1.5 bg-honey/30 text-honey px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 border border-honey/40">
                  <span className="w-2 h-2 rounded-full bg-honey animate-ping" />
                  Live Showroom Cuddles
                </span>
                <h3 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-milk mb-2 leading-tight">
                  See our teacup puppies playing live
                </h3>
                <p className="text-xs sm:text-sm text-milk/80 mb-4 sm:mb-5 leading-relaxed">
                  Every puppy is raised with love, socialization, and pristine hygiene. Schedule an interactive WhatsApp video call to see them play right now.
                </p>
                <a
                  href={getWhatsAppLink("Hi TeddyPups! I watched your showroom video. Can I book a live video call to see available puppies?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white w-full sm:w-auto px-5 py-3 rounded-full text-xs sm:text-sm font-bold shadow-lift transition hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Request Live Video Call</span>
                </a>
              </div>
            </div>
          </div>
        </CartoonSection>
      </section>

      {/* 5. YOUR PUPPY JOURNEY */}
      <section
        id="journey-section"
        className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <CartoonSection direction="pop">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-scrawl text-toffee text-lg">simple & stress-free</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa mt-1">
              Your puppy journey
            </h2>
            <p className="text-cocoa-soft mt-3 text-base sm:text-lg">
              From first WhatsApp greeting to first cuddle at home in three easy steps
            </p>
          </div>
        </CartoonSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 (From Left) */}
          <CartoonSection direction="left" delay={0.1}>
            <div className="relative pt-6 flex flex-col h-full">
              <CardPeekerPup breed="Maltipoo" position="top-right" />
              <div className="relative z-10 bg-white rounded-3xl p-6 sm:p-8 border border-honey/20 shadow-soft flex flex-col flex-1 group hover:shadow-lift transition-all hover:-translate-y-1">
                <span className="font-serif text-5xl font-black text-honey/30 absolute top-4 right-6 select-none">
                  01
                </span>
                <div className="w-12 h-12 rounded-2xl bg-honey/30 text-toffee flex items-center justify-center mb-5 font-bold group-hover:scale-110 transition-transform">
                  🐾
                </div>
                <h3 className="font-serif text-xl font-bold text-cocoa mb-2">
                  Choose your breed
                </h3>
                <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed">
                  Explore our verified listings of teacup Maltipoo, Poodle, Pomeranian, Cavapoo, and Shih Tzu. Tell us your preference for size, gender, and temperament.
                </p>
              </div>
            </div>
          </CartoonSection>

          {/* Step 2 (Pop in from center) */}
          <CartoonSection direction="pop" delay={0.2}>
            <div className="relative pt-6 flex flex-col h-full">
              <CardPeekerPup breed="Cavapoo" position="top-center" />
              <div className="relative z-10 bg-white rounded-3xl p-6 sm:p-8 border border-honey/20 shadow-soft flex flex-col flex-1 group hover:shadow-lift transition-all hover:-translate-y-1">
                <span className="font-serif text-5xl font-black text-honey/30 absolute top-4 right-6 select-none">
                  02
                </span>
                <div className="w-12 h-12 rounded-2xl bg-honey/30 text-toffee flex items-center justify-center mb-5 font-bold group-hover:scale-110 transition-transform">
                  📱
                </div>
                <h3 className="font-serif text-xl font-bold text-cocoa mb-2">
                  Get photos & details
                </h3>
                <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed">
                  We connect on WhatsApp to send live HD videos, parental lineage, weight charts, and veterinary health records. You can also book a showroom visit.
                </p>
              </div>
            </div>
          </CartoonSection>

          {/* Step 3 (From Right) */}
          <CartoonSection direction="right" delay={0.3}>
            <div className="relative pt-6 flex flex-col h-full">
              <CardPeekerPup breed="Shih Tzu" position="top-left" />
              <div className="relative z-10 bg-white rounded-3xl p-6 sm:p-8 border border-honey/20 shadow-soft flex flex-col flex-1 group hover:shadow-lift transition-all hover:-translate-y-1">
                <span className="font-serif text-5xl font-black text-honey/30 absolute top-4 right-6 select-none">
                  03
                </span>
                <div className="w-12 h-12 rounded-2xl bg-honey/30 text-toffee flex items-center justify-center mb-5 font-bold group-hover:scale-110 transition-transform">
                  🏡
                </div>
                <h3 className="font-serif text-xl font-bold text-cocoa mb-2">
                  Secure & safe delivery
                </h3>
                <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed">
                  Pick up your baby from our Downtown Dubai showroom, or enjoy our white-glove chauffeur delivery to your doorstep across the UAE & worldwide.
                </p>
              </div>
            </div>
          </CartoonSection>
        </div>

        {/* CTA row with showroom preview & buttons */}
        <div className="mt-12 bg-honey/15 rounded-4xl p-6 sm:p-8 border border-honey/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xs flex-shrink-0 border-2 border-honey">
              <img
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=200&q=80"
                alt="Showroom Puppy"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif font-bold text-cocoa text-lg">
                Have questions about our process?
              </h4>
              <p className="text-xs sm:text-sm text-cocoa-soft">
                Our concierge answers all your adoption questions on WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              to="/how-it-works"
              className="flex-1 md:flex-initial text-center px-6 py-3 rounded-full bg-honey/40 hover:bg-honey/60 text-cocoa font-bold text-sm transition"
            >
              How it works
            </Link>
            <a
              href={getWhatsAppLink("Hi TeddyPups! I'd like to understand more about your puppy journey.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial text-center px-6 py-3 rounded-full bg-toffee hover:bg-toffee-deep text-milk font-bold text-sm shadow-lift transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Say hello on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. WHY FAMILIES TRUST TEDDYPUPS */}
      <section
        id="trust-section"
        className="py-16 md:py-24 bg-cocoa text-milk relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <CartoonSection direction="left">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="font-scrawl text-honey text-lg">the gold standard</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-milk mt-1">
                Why families trust TeddyPups
              </h2>
              <p className="text-milk/75 mt-3 text-base">
                Every pup arrives with our signature Puppy Passport: certified health, verified origin, and lifetime care.
              </p>
            </div>
          </CartoonSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <CartoonSection direction="pop" delay={0.1}>
              <div className="bg-milk/5 rounded-3xl p-6 border border-milk/10 hover:border-honey/50 transition-all group hover:-translate-y-1 h-full">
                <div className="w-12 h-12 rounded-2xl bg-honey/20 text-honey flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-honey mb-2">
                  Vet-checked & healthy
                </h3>
                <p className="text-xs text-milk/80 leading-relaxed">
                  Microchipped, fully vaccinated, dewormed, and accompanied by a comprehensive clinical health certificate & guarantee.
                </p>
              </div>
            </CartoonSection>

            {/* Pillar 2 */}
            <CartoonSection direction="pop" delay={0.2}>
              <div className="bg-milk/5 rounded-3xl p-6 border border-milk/10 hover:border-honey/50 transition-all group hover:-translate-y-1 h-full">
                <div className="w-12 h-12 rounded-2xl bg-sky/20 text-sky flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-honey mb-2">
                  Korea to Dubai, safely
                </h3>
                <p className="text-xs text-milk/80 leading-relaxed">
                  Temperature-controlled, direct flight couriers from top Korean breeders with full UAE ministry customs clearance.
                </p>
              </div>
            </CartoonSection>

            {/* Pillar 3 */}
            <CartoonSection direction="pop" delay={0.3}>
              <div className="bg-milk/5 rounded-3xl p-6 border border-milk/10 hover:border-honey/50 transition-all group hover:-translate-y-1 h-full">
                <div className="w-12 h-12 rounded-2xl bg-honey/20 text-honey flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-honey mb-2">
                  Support 24/7
                </h3>
                <p className="text-xs text-milk/80 leading-relaxed">
                  Our concierge stays with you for life: nutrition advice, potty training assistance, and emergency vet guidance.
                </p>
              </div>
            </CartoonSection>

            {/* Pillar 4 */}
            <CartoonSection direction="pop" delay={0.4}>
              <div className="bg-milk/5 rounded-3xl p-6 border border-milk/10 hover:border-honey/50 transition-all group hover:-translate-y-1 h-full">
                <div className="w-12 h-12 rounded-2xl bg-honey/20 text-honey flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-honey mb-2">
                  Trusted by families worldwide
                </h3>
                <p className="text-xs text-milk/80 leading-relaxed">
                  Hundreds of families across Dubai, Abu Dhabi, Saudi Arabia, and globally have welcomed our miniature teddy-bear pups.
                </p>
              </div>
            </CartoonSection>
          </div>
        </div>
      </section>

      {/* 7. HAPPY FAMILIES & TESTIMONIALS */}
      <section
        id="happy-families-section"
        className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <CartoonSection direction="right">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-scrawl text-toffee text-lg">forever bonds</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa mt-1">
              Happy families & puppies
            </h2>
            <p className="mt-3 text-cocoa-soft text-base sm:text-lg">
              Nothing makes us happier than seeing our little teacup babies thriving in their forever homes across the Emirates.
            </p>
          </div>
        </CartoonSection>

        {/* Featured Testimonial Quote */}
        <CartoonSection direction="pop">
          <div className="bg-[#fbf7ee] rounded-4xl p-8 md:p-10 border border-honey/30 shadow-soft mb-12 max-w-3xl mx-auto text-center relative">
            <span className="text-5xl text-honey font-serif absolute -top-4 left-6 select-none leading-none">“</span>
            <div className="flex justify-center gap-1 mb-4 text-honey">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg">★</span>
              ))}
            </div>
            <p className="text-cocoa font-serif text-lg md:text-xl italic leading-relaxed mb-4">
              "{featuredTestimonial.quote}"
            </p>
            <div className="font-bold text-cocoa text-sm">
              {featuredTestimonial.name}
            </div>
            <div className="text-xs text-cocoa-soft/80">
              {featuredTestimonial.location}
            </div>
          </div>
        </CartoonSection>

        {/* Customer photos grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {(happyFamilies.slice(0, 8)).map((photo, i) => (
            <CartoonSection key={photo._id || i} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.05}>
              <div className="group bg-white rounded-3xl overflow-hidden border border-honey/20 shadow-soft flex flex-col hover:shadow-lift transition-all hover:-translate-y-1">
                <div className="aspect-square overflow-hidden bg-honey/10">
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 text-center bg-white flex-1 flex items-center justify-center">
                  <p className="text-xs font-medium text-cocoa leading-tight">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </CartoonSection>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/happy-families"
            className="inline-flex items-center gap-2 font-bold text-toffee hover:text-toffee-deep group text-sm sm:text-base"
          >
            <span>See every happy family</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 8. FAQ PREVIEW */}
      <section
        id="faq-preview-section"
        className="py-16 md:py-20 bg-[#fefaf3] border-t border-honey/25 relative"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CartoonSection direction="left">
            <div className="text-center mb-10 relative">
              <span className="font-scrawl text-toffee text-lg">got questions?</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-1">
                Frequently asked questions
              </h2>
            </div>
          </CartoonSection>

          <div className="space-y-4">
            {previewFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <CartoonSection key={faq._id || idx} direction={idx % 2 === 0 ? 'left' : 'right'} delay={idx * 0.08}>
                  <div className="bg-white rounded-2xl border border-honey/25 overflow-hidden shadow-xs">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-cocoa text-base sm:text-lg hover:text-toffee transition"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-toffee transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-cocoa-soft leading-relaxed border-t border-honey/10">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </CartoonSection>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 font-bold text-toffee hover:text-toffee-deep group text-sm sm:text-base"
            >
              <span>Read all questions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section
        id="final-cta-section"
        className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <CartoonSection direction="pop">
          <div className="bg-gradient-to-r from-[#faeada] via-[#f7dfc5] to-[#fcefe3] rounded-4xl p-8 sm:p-12 md:p-16 border border-honey/40 shadow-soft-lg flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <span className="font-scrawl text-toffee text-lg font-semibold block mb-2">
                every puppy is family
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa leading-tight">
                Ready to meet your new best friend?
              </h2>
              <p className="mt-4 text-cocoa-soft text-base leading-relaxed">
                Connect with our concierge team right now on WhatsApp. We will help you select the ideal puppy, share exclusive videos, or book your private showroom visit.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={getWhatsAppLink("Hi TeddyPups! I'm ready to find my new puppy. Can you help me?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-lift transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-milk text-cocoa font-bold text-sm border border-honey/40 shadow-xs transition-all hover:scale-105 active:scale-95 text-center"
                >
                  Visit & contact
                </Link>
              </div>
            </div>

            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex-shrink-0 group">
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative">
                <img
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80"
                  alt="Welcome Home Puppy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-toffee text-milk text-xs font-bold px-4 py-2 rounded-full shadow-lift border-2 border-white font-scrawl flex items-center gap-1.5">
                <span>welcome home</span>
                <span>🐾</span>
              </div>
            </div>
          </div>
        </CartoonSection>
      </section>
    </div>
  );
};
