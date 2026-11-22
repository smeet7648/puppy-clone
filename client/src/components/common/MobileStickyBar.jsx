import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const MobileStickyBar = () => {
  const { settings, getWhatsAppLink } = useSettings();

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-milk/95 backdrop-blur-md border-t border-honey/30 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl flex items-center gap-2">
      <a
        href={getWhatsAppLink("Hi TeddyPups! I'm browsing your puppies and would love more details.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 min-h-[44px] flex items-center justify-center gap-2 bg-toffee text-milk py-2.5 px-3 rounded-full text-xs sm:text-sm font-semibold shadow-lift active:scale-95 transition"
      >
        <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
        <span className="truncate">WhatsApp us</span>
      </a>

      <a
        href={`tel:${settings.phone?.replace(/[^0-9+]/g, '') || '+97143210000'}`}
        className="flex-1 min-h-[44px] flex items-center justify-center gap-2 bg-honey/30 hover:bg-honey/50 text-cocoa py-2.5 px-3 rounded-full text-xs sm:text-sm font-semibold border border-honey/40 active:scale-95 transition"
      >
        <Phone className="w-4 h-4 text-toffee flex-shrink-0" />
        <span className="truncate">Call Concierge</span>
      </a>
    </div>
  );
};
