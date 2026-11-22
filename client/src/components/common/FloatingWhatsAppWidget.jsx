import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, Send, Sparkles, CheckCheck } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const FloatingWhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("Hi TeddyPups! I'd love to know more about your puppies.");
  const { settings, getWhatsAppLink } = useSettings();

  const breeds = [
    { name: 'Maltipoo', param: 'Maltipoo' },
    { name: 'Pomeranian', param: 'Pomeranian' },
    { name: 'Poodle', param: 'Poodle' },
    { name: 'Cavapoo', param: 'Cavapoo' },
    { name: 'Shih Tzu', param: 'Shih Tzu' },
  ];

  const handleSend = () => {
    const url = getWhatsAppLink(customMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="hidden md:block fixed bottom-8 right-6 z-40">
      {/* Mini Chat Card */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm bg-milk rounded-3xl shadow-2xl border border-honey/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Card Header */}
          <div className="bg-cocoa text-milk p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-honey/20 p-1 border border-honey/40">
                <img src="/logo.svg" alt="TeddyPups" className="w-full h-full object-contain" />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-cocoa" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-milk flex items-center gap-1.5 leading-tight">
                  {settings.brandName || 'TeddyPups'} Concierge
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-honey">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Online · Typically replies in seconds</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-milk/70 hover:text-milk p-1.5 rounded-full hover:bg-milk/10 transition"
              aria-label="Close WhatsApp chat widget"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#fbf8f2] space-y-3 max-h-72 overflow-y-auto text-sm">
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-honey/30 p-1 flex-shrink-0">
                <img src="/logo.svg" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs border border-honey/15 text-cocoa max-w-[85%]">
                <p className="font-medium text-xs text-toffee mb-1">TeddyPups Concierge</p>
                <p className="text-xs leading-relaxed">
                  Hello from Downtown Dubai! 🐾 Looking for a puppy in our showroom or interested in our exclusive Korean teacup imports? We are ready to assist you on WhatsApp!
                </p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-cocoa-soft/60">
                  <span>Just now</span>
                  <CheckCheck className="w-3.5 h-3.5 text-sky-deep" />
                </div>
              </div>
            </div>

            {/* Breed Quick-Links */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-cocoa-soft/80 block mb-1.5 uppercase tracking-wider">
                Filter by breed:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {breeds.map((b) => (
                  <Link
                    key={b.name}
                    to={`/puppies?breed=${encodeURIComponent(b.param)}`}
                    onClick={() => setIsOpen(false)}
                    className="text-xs bg-honey/25 hover:bg-honey/50 text-cocoa font-medium px-2.5 py-1 rounded-full border border-honey/40 transition hover:scale-105"
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Action / Textarea */}
          <div className="p-3 bg-white border-t border-honey/20">
            <div className="relative">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full text-xs pr-10 pl-3 py-2.5 bg-milk rounded-full border border-honey/30 focus:outline-none focus:ring-2 focus:ring-toffee text-cocoa"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                className="absolute right-1.5 top-1.5 p-1.5 bg-toffee text-milk rounded-full hover:bg-toffee-deep transition shadow-xs"
                aria-label="Send message on WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-center text-cocoa-soft/60 mt-2">
              Opens WhatsApp directly with our Dubai concierge
            </p>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className="relative group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-lift transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline font-bold text-sm tracking-wide">
          {isOpen ? 'Close Concierge' : 'WhatsApp Concierge'}
        </span>
      </button>
    </div>
  );
};
