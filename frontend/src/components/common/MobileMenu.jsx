import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const MobileMenu = ({ isOpen, onClose, navLinks }) => {
  const { settings, getWhatsAppLink } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-cocoa/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-milk shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-honey/20">
            <div>
              <span className="font-scrawl text-2xl text-toffee">where to, friend?</span>
              <p className="text-xs text-cocoa-soft/80 mt-1">every puppy is family</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2.5 rounded-full bg-honey/20 hover:bg-honey/40 text-cocoa transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-2xl text-base font-medium transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-honey/30 text-toffee font-bold shadow-xs'
                      : 'text-cocoa hover:bg-honey/15 hover:text-toffee'
                  }`
                }
              >
                <span>{link.name}</span>
                <span className="text-honey text-xs font-serif">→</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-honey/20 space-y-3">
          <a
            href={getWhatsAppLink("Hi TeddyPups! I'd like to ask about your available puppies.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-toffee text-milk py-3 rounded-full font-semibold shadow-lift hover:bg-toffee-deep transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp us</span>
          </a>

          <a
            href={`tel:${settings.phone?.replace(/[^0-9+]/g, '') || '+97143210000'}`}
            className="w-full flex items-center justify-center gap-2 bg-honey/30 text-cocoa hover:bg-honey/50 py-3 rounded-full font-semibold transition-all text-sm"
          >
            <Phone className="w-4 h-4 text-toffee" />
            <span>Call {settings.phone || '+971 4 321 0000'}</span>
          </a>

          <div className="text-center text-xs text-cocoa-soft/70 pt-2 font-scrawl">
            Downtown Dubai, UAE
          </div>
        </div>
      </div>
    </div>
  );
};
