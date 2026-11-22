import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, Heart, Play, Calendar, CheckCircle2, MapPin, Share2, ArrowLeft, X } from 'lucide-react';
import { api } from '../api';
import { useSettings } from '../context/SettingsContext';
import { PuppyCard } from '../components/common/PuppyCard';
import { SEO } from '../components/common/SEO';

export const PuppyDetailPage = () => {
  const { slug } = useParams();
  const { settings, getWhatsAppLink } = useSettings();
  const [puppy, setPuppy] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await api.getPuppyBySlug(slug);
        if (res.success && res.data) {
          setPuppy(res.data);
          setRelated(res.related || []);
          setActiveImageIdx(0);
        }
      } catch (err) {
        console.error('Failed to load puppy detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-12 h-12 border-4 border-honey border-t-toffee rounded-full animate-spin mx-auto mb-4" />
        <p className="text-cocoa-soft text-sm">Loading puppy profile...</p>
      </div>
    );
  }

  if (!puppy) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-cocoa mb-3">Puppy Not Found</h2>
        <p className="text-sm text-cocoa-soft mb-6">
          This puppy listing may have been adopted or is no longer active.
        </p>
        <Link
          to="/puppies"
          className="inline-flex items-center gap-2 bg-toffee text-milk px-6 py-3 rounded-full text-sm font-semibold shadow-lift"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Available Puppies</span>
        </Link>
      </div>
    );
  }

  const images = puppy.images && puppy.images.length > 0 ? puppy.images : ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80'];
  const currentImage = images[activeImageIdx] || images[0];

  const waEnquiryText = `Hi TeddyPups! I'm enquiring about ${puppy.name} (${puppy.breed}, ${puppy.gender}, ${puppy.ageLabel || puppy.ageMonths + ' months'}) listed on https://puppy.instabizweb.com/puppies/${puppy.slug}. Could you share recent videos, health details, and how to reserve?`;

  return (
    <div className="py-6 sm:py-8 md:py-14 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-20 md:pb-14">
      <SEO
        title={`${puppy.name}, ${puppy.breed} puppy | TeddyPups U.A.E.`}
        description={`Meet ${puppy.name}, a gorgeous teacup ${puppy.breed} in Dubai. ${puppy.description}`}
        image={currentImage}
        slug={`/puppies/${puppy.slug}`}
        type="product"
        puppyData={puppy}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-cocoa-soft/80 mb-6 font-medium">
        <Link to="/" className="hover:text-toffee">Home</Link>
        <span>/</span>
        <Link to="/puppies" className="hover:text-toffee">Available Puppies</Link>
        <span>/</span>
        <span className="text-cocoa font-bold">{puppy.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Gallery & Video */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Photo View */}
          <div className="relative aspect-[4/3] rounded-4xl overflow-hidden bg-honey/10 shadow-soft border border-honey/25 group">
            <img
              src={currentImage}
              alt={puppy.name}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-xs ${
                puppy.status === 'available' ? 'bg-emerald-600 text-white' :
                puppy.status === 'reserved' ? 'bg-amber-600 text-white' : 'bg-cocoa text-milk'
              }`}>
                {puppy.status === 'available' ? 'Available' : puppy.status === 'reserved' ? 'Reserved' : 'Gone Home'}
              </span>

              {puppy.origin === 'imported' ? (
                <span className="bg-sky/95 text-sky-deep text-xs font-bold px-3 py-1.5 rounded-full shadow-xs border border-sky-deep/20">
                  Korea → Dubai Import
                </span>
              ) : (
                <span className="bg-milk/95 text-toffee text-xs font-bold px-3 py-1.5 rounded-full shadow-xs border border-toffee/20">
                  In Downtown Dubai Showroom
                </span>
              )}
            </div>

            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-4 right-4 bg-cocoa/80 hover:bg-cocoa text-milk text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-xs transition"
            >
              Click to view full size
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImageIdx === idx ? 'border-toffee scale-105 shadow-lift' : 'border-honey/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Video Player */}
          {puppy.videoUrl && (
            <div className="bg-white rounded-3xl p-5 border border-honey/25 shadow-soft">
              <div className="flex items-center gap-2 mb-3">
                <Play className="w-4 h-4 fill-toffee text-toffee" />
                <h3 className="font-serif font-bold text-cocoa text-base">
                  Video of {puppy.name}
                </h3>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden bg-cocoa shadow-inner">
                <video
                  src={puppy.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                  poster={currentImage}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Puppy Details & Concierge CTAs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-4xl p-6 sm:p-8 border border-honey/25 shadow-soft">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-cocoa">
                  {puppy.name}
                </h1>
                <p className="text-sm font-semibold text-toffee mt-0.5">
                  {puppy.breed} · {puppy.origin === 'imported' ? 'Korean Teacup Lineage' : 'Dubai Showroom'}
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-honey/25 text-cocoa capitalize">
                {puppy.gender}
              </span>
            </div>

            {/* Price tag */}
            <div className="my-5 p-4 rounded-2xl bg-honey/15 border border-honey/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-cocoa-soft block">Adoption fee</span>
                <span className="font-serif text-2xl font-bold text-cocoa">{puppy.price || 'Price on request'}</span>
              </div>
              <span className="text-xs text-cocoa-soft/80 font-medium">
                Includes VAT, Passport & Concierge
              </span>
            </div>

            {/* Primary Action Button: WhatsApp */}
            <div className="space-y-3">
              <a
                href={getWhatsAppLink(waEnquiryText)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base shadow-lift transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-5 h-5 fill-current flex-shrink-0" />
                <span>Enquire on WhatsApp about {puppy.name}</span>
              </a>

              <Link
                to="/contact"
                className="w-full py-3 sm:py-3.5 px-4 rounded-full bg-honey/25 hover:bg-honey/40 text-cocoa font-bold text-xs sm:text-sm border border-honey/40 transition flex items-center justify-center gap-2 text-center"
              >
                <Calendar className="w-4 h-4 text-toffee flex-shrink-0" />
                <span>Book a Showroom Visit to Meet {puppy.name}</span>
              </Link>
            </div>

            {/* Key Attributes Grid */}
            <div className="mt-8 pt-6 border-t border-honey/20 grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-2xl bg-milk border border-honey/20">
                <span className="text-cocoa-soft/70 block mb-0.5">Age</span>
                <strong className="text-cocoa text-sm">{puppy.ageLabel || `${puppy.ageMonths} months`}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-milk border border-honey/20">
                <span className="text-cocoa-soft/70 block mb-0.5">Gender</span>
                <strong className="text-cocoa text-sm capitalize">{puppy.gender}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-milk border border-honey/20">
                <span className="text-cocoa-soft/70 block mb-0.5">Estimated Adult Size</span>
                <strong className="text-cocoa text-sm">Under 2.2 kg (Teacup)</strong>
              </div>
              <div className="p-3 rounded-2xl bg-milk border border-honey/20">
                <span className="text-cocoa-soft/70 block mb-0.5">Hypoallergenic</span>
                <strong className="text-cocoa text-sm">Yes (Non-shedding)</strong>
              </div>
            </div>

            {/* Description */}
            {puppy.description && (
              <div className="mt-6 pt-6 border-t border-honey/20">
                <h3 className="font-serif font-bold text-cocoa text-base mb-2">About {puppy.name}</h3>
                <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed">
                  {puppy.description}
                </p>
              </div>
            )}

            {/* Health Info */}
            <div className="mt-6 pt-6 border-t border-honey/20">
              <h3 className="font-serif font-bold text-cocoa text-base mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-toffee" />
                <span>Health & Vaccinations</span>
              </h3>
              <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed bg-milk p-3.5 rounded-2xl border border-honey/20">
                {puppy.healthInfo || 'Microchipped, up to date on all vaccinations, fully dewormed, vet-checked with certified health guarantee.'}
              </p>
            </div>
          </div>

          {/* Every Teddy Pup Comes With Card */}
          <div className="bg-[#fbf7ee] rounded-3xl p-6 border border-honey/30 shadow-xs">
            <h3 className="font-serif font-bold text-cocoa text-base mb-3 flex items-center gap-2">
              <span className="font-scrawl text-toffee text-lg">Every Teddy Pup comes with:</span>
            </h3>
            <ul className="space-y-2 text-xs text-cocoa-soft">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-toffee flex-shrink-0" />
                <span>Official UAE / International Veterinary Passport</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-toffee flex-shrink-0" />
                <span>ISO Microchip Registered in Dubai</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-toffee flex-shrink-0" />
                <span>1-Year Congenital Health Warranty</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-toffee flex-shrink-0" />
                <span>Complimentary Luxury Starter Pack & 24/7 Concierge</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Puppies Section */}
      {related.length > 0 && (
        <div className="mt-20 pt-12 border-t border-honey/20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="font-scrawl text-toffee text-lg">more to love</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
                You may also fall in love with
              </h2>
            </div>
            <Link to="/puppies" className="text-toffee font-bold text-sm hover:underline">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((rel) => (
              <PuppyCard key={rel._id || rel.slug} puppy={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={currentImage}
            alt={puppy.name}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
