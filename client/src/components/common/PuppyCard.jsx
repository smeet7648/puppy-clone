import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, Heart, MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const PuppyCard = ({ puppy }) => {
  const { getWhatsAppLink } = useSettings();

  const isAvailable = puppy.status === 'available';
  const isReserved = puppy.status === 'reserved';
  const isSold = puppy.status === 'sold';

  const defaultPhoto = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';
  const displayImage = (puppy.images && puppy.images.length > 0) ? puppy.images[0] : defaultPhoto;

  const waMessage = `Hi TeddyPups! I'm interested in ${puppy.name} (${puppy.breed}, ${puppy.gender}, ${puppy.ageLabel || puppy.ageMonths + ' months'}). Is this puppy available?`;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-honey/20 shadow-soft hover:shadow-lift transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Image Area */}
      <Link to={`/puppies/${puppy.slug}`} className="relative aspect-[4/3] overflow-hidden bg-honey/10 block">
        <img
          src={displayImage}
          alt={`${puppy.name} - ${puppy.breed}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-1 pointer-events-none">
          {/* Status Badge */}
          {isAvailable && (
            <span className="bg-emerald-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              Available
            </span>
          )}
          {isReserved && (
            <span className="bg-amber-600/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              Reserved
            </span>
          )}
          {isSold && (
            <span className="bg-cocoa/90 backdrop-blur-xs text-milk text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              Gone Home
            </span>
          )}

          {/* Video indicator */}
          {puppy.videoUrl && (
            <span className="bg-cocoa/75 backdrop-blur-xs text-milk text-[11px] font-medium px-2 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <Play className="w-3 h-3 fill-honey text-honey" />
              <span>with video</span>
            </span>
          )}
        </div>

        {/* Origin tag */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          {puppy.origin === 'imported' ? (
            <span className="bg-sky/95 text-sky-deep text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-sky-deep/20">
              Korea → Dubai
            </span>
          ) : (
            <span className="bg-milk/95 text-toffee text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-toffee/20">
              In Showroom
            </span>
          )}
        </div>
      </Link>

      {/* Info Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <Link to={`/puppies/${puppy.slug}`} className="hover:text-toffee transition">
              <h3 className="font-serif text-xl font-bold text-cocoa leading-tight">
                {puppy.name}
              </h3>
            </Link>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-honey/20 text-cocoa capitalize">
              {puppy.gender}
            </span>
          </div>

          <p className="text-xs text-cocoa-soft font-medium mb-3">
            {puppy.breed} · {puppy.ageLabel || `${puppy.ageMonths} months`}
          </p>
        </div>

        {/* Bottom CTA / Action */}
        <div className="pt-3 border-t border-honey/15 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-cocoa-soft/70 block">Concierge price</span>
            <span className="text-sm font-bold text-toffee">{puppy.price || 'On request'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to={`/puppies/${puppy.slug}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-honey/20 hover:bg-honey/40 text-cocoa transition"
            >
              Details
            </Link>
            <a
              href={getWhatsAppLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              title="Enquire on WhatsApp"
              className="p-1.5 rounded-full bg-toffee text-milk hover:bg-toffee-deep transition shadow-lift hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
