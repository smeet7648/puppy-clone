import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { api } from '../api';
import { useSettings } from '../context/SettingsContext';
import { SEO } from '../components/common/SEO';
import { defaultPuppies } from '../data/defaultData';

export const GoneHomePage = () => {
  const [adoptedPuppies, setAdoptedPuppies] = useState(defaultPuppies.filter(p => p.status === 'sold'));
  const [loading, setLoading] = useState(false);
  const { getWhatsAppLink } = useSettings();

  useEffect(() => {
    const fetchAdopted = async () => {
      try {
        const res = await api.getPuppies({ status: 'sold' });
        if (res.success) {
          setAdoptedPuppies(res.data || []);
        }
      } catch (err) {
        console.error('Error fetching adopted puppies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdopted();
  }, []);

  return (
    <div className="py-8 sm:py-10 md:py-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-24 md:pb-16">
      <SEO
        title="Gone Home (Adopted Puppies) | TeddyPups U.A.E."
        description="Browse our beloved teacup puppies who have happily joined their forever families across Dubai, Abu Dhabi, and worldwide."
        slug="/gone-home"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="font-scrawl text-toffee text-lg">sweet memories</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa mt-1">
          Gone home
        </h1>
        <p className="mt-3 text-cocoa-soft text-base leading-relaxed">
          These precious puppies have already found their loving homes. Want a puppy with a similar breed, face, or personality? Contact our concierge on WhatsApp!
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-honey border-t-toffee rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cocoa-soft text-sm">Loading archive...</p>
        </div>
      ) : adoptedPuppies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {adoptedPuppies.map((pup) => {
            const displayImg = (pup.images && pup.images[0]) || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';
            return (
              <div
                key={pup._id || pup.slug}
                className="bg-white rounded-3xl overflow-hidden border border-honey/20 shadow-soft flex flex-col group opacity-90 hover:opacity-100 transition"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-honey/10">
                  <img
                    src={displayImg}
                    alt={pup.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 filter saturate-90"
                  />
                  <div className="absolute top-3 right-3 bg-cocoa/90 text-milk text-[11px] font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-honey text-honey" />
                    <span>Gone Home</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-cocoa mb-1">
                      {pup.name}
                    </h3>
                    <p className="text-xs text-cocoa-soft font-medium mb-2">
                      {pup.breed} · {pup.ageLabel || 'Adopted'}
                    </p>
                    <p className="text-xs text-cocoa-soft/80 line-clamp-2">
                      {pup.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-honey/15 flex items-center justify-between">
                    <span className="text-[11px] text-toffee font-semibold">Adopted Forever ❤️</span>
                    <a
                      href={getWhatsAppLink(`Hi TeddyPups! I saw ${pup.name} in the Gone Home archive. Do you have a similar puppy available?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-cocoa hover:text-toffee flex items-center gap-1"
                    >
                      <span>Similar Pup?</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-honey/25 max-w-md mx-auto">
          <p className="text-cocoa-soft text-sm">No adopted listings archived yet.</p>
        </div>
      )}

      {/* CTA Box */}
      <div className="mt-16 bg-[#fbf7ee] rounded-4xl p-8 sm:p-10 border border-honey/30 text-center max-w-2xl mx-auto">
        <h3 className="font-serif text-2xl font-bold text-cocoa mb-2">
          Find your dream puppy today
        </h3>
        <p className="text-xs sm:text-sm text-cocoa-soft mb-6">
          Our team can source specific teacup breeds from trusted partner breeders in South Korea or introduce you to current puppies in our Dubai showroom.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/puppies"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-toffee text-milk text-sm font-bold shadow-lift hover:bg-toffee-deep transition"
          >
            Browse Available Puppies
          </Link>
          <a
            href={getWhatsAppLink("Hi TeddyPups! I'd like to ask about upcoming litters and custom breed requests.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white text-sm font-bold shadow-lift transition flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
