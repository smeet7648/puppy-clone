import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Star, X } from 'lucide-react';
import { api } from '../api';
import { useSettings } from '../context/SettingsContext';
import { SEO } from '../components/common/SEO';

export const HappyFamiliesPage = () => {
  const [photos, setPhotos] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImg, setLightboxImg] = useState(null);
  const { getWhatsAppLink } = useSettings();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [photoRes, testRes] = await Promise.all([
          api.getHappyFamilies(),
          api.getTestimonials()
        ]);
        if (photoRes.success) setPhotos(photoRes.data || []);
        if (testRes.success) setTestimonials(testRes.data || []);
      } catch (err) {
        console.error('Error loading happy families:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO
        title="Happy Families & Testimonials | TeddyPups U.A.E."
        description="See real customer photos and read reviews from families across Dubai, Abu Dhabi, and beyond who welcomed their teacup puppies with TeddyPups."
        slug="/happy-families"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="font-scrawl text-toffee text-lg">family albums</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa mt-1">
          Happy families
        </h1>
        <p className="mt-3 text-cocoa-soft text-base leading-relaxed">
          Moments of pure joy. Real photos and heartfelt stories from clients who welcomed their new puppies home.
        </p>
      </div>

      {/* Gallery Section */}
      <div className="mb-20">
        <h2 className="font-serif text-2xl font-bold text-cocoa mb-6 text-center">
          Family Moments Gallery
        </h2>

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-4 border-honey border-t-toffee rounded-full animate-spin mx-auto mb-4" />
            <p className="text-cocoa-soft text-sm">Loading memories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {photos.map((item, idx) => (
              <div
                key={item._id || idx}
                onClick={() => setLightboxImg(item)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-honey/20 shadow-soft hover:shadow-lift transition-all hover:-translate-y-1 flex flex-col"
              >
                <div className="aspect-square overflow-hidden bg-honey/10 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-cocoa/0 group-hover:bg-cocoa/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 text-cocoa font-bold text-xs px-3 py-1.5 rounded-full shadow-xs">
                      Enlarge
                    </span>
                  </div>
                </div>
                <div className="p-3 text-center bg-white flex-1 flex items-center justify-center">
                  <p className="text-xs font-medium text-cocoa leading-tight">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Testimonials Section */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-scrawl text-toffee text-lg">client reviews</span>
          <h2 className="font-serif text-3xl font-bold text-cocoa mt-1">
            What our puppy parents say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test, idx) => (
            <div
              key={test._id || idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-honey/25 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-honey mb-4">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-honey" />
                  ))}
                </div>
                <p className="font-serif text-base text-cocoa leading-relaxed italic mb-6">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-honey/15 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-cocoa text-sm">{test.name}</h4>
                  <span className="text-xs text-cocoa-soft/80">{test.location}</span>
                </div>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                  Verified Family
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share story CTA */}
      <div className="bg-gradient-to-r from-honey/20 via-honey/10 to-milk rounded-4xl p-8 sm:p-10 text-center max-w-2xl mx-auto border border-honey/30">
        <h3 className="font-serif text-2xl font-bold text-cocoa mb-2">
          Are you a TeddyPups parent?
        </h3>
        <p className="text-xs sm:text-sm text-cocoa-soft mb-6 leading-relaxed">
          Send us photos of your baby's milestones on WhatsApp to be featured on our Happy Families wall!
        </p>
        <a
          href={getWhatsAppLink("Hi TeddyPups! Here are some updated photos of our puppy for your Happy Families gallery!")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-bold px-7 py-3 rounded-full shadow-lift hover:scale-105 active:scale-95 transition"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Share Photos on WhatsApp</span>
        </a>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-2xl text-center">
            <img
              src={lightboxImg.imageUrl}
              alt={lightboxImg.caption}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl mx-auto"
            />
            <p className="text-white mt-4 font-serif text-lg font-medium">
              {lightboxImg.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
