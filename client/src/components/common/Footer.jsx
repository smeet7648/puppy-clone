import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const Footer = () => {
  const { settings, getWhatsAppLink } = useSettings();

  return (
    <footer className="bg-cocoa text-milk pt-16 pb-24 md:pb-12 border-t-4 border-honey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-honey/20 p-1 border border-honey/40">
                <img src="/logo.svg" alt="TeddyPups Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-milk">
                  {settings.brandName || 'TeddyPups'}
                </span>
                <span className="block font-scrawl text-honey text-xs">every puppy is family</span>
              </div>
            </Link>
            <p className="text-milk/80 text-sm leading-relaxed">
              Dubai-based brand specializing in miniature puppies, premium services and worldwide shipping.
            </p>
            <div className="pt-2">
              <span className="inline-block bg-milk/10 text-honey px-3 py-1 rounded-full text-xs font-semibold border border-milk/10">
                Downtown Dubai Showroom
              </span>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-honey mb-4">Explore</h3>
            <ul className="space-y-2.5 text-sm text-milk/80">
              <li>
                <Link to="/puppies" className="hover:text-honey transition">Available puppies</Link>
              </li>
              <li>
                <Link to="/gone-home" className="hover:text-honey transition">Gone home (Adopted)</Link>
              </li>
              <li>
                <Link to="/happy-families" className="hover:text-honey transition">Happy families</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-honey transition">How it works</Link>
              </li>
              <li>
                <Link to="/how-it-works#delivery" className="hover:text-honey transition">Delivery & collection</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-honey transition">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-honey transition">Visit & contact</Link>
              </li>
            </ul>
          </div>

          {/* Say hello */}
          <div>
            <h3 className="font-serif text-lg font-bold text-honey mb-4">Say hello</h3>
            <ul className="space-y-3 text-sm text-milk/80">
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-honey mt-1 flex-shrink-0" />
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-honey font-semibold transition"
                >
                  WhatsApp: {settings.whatsappNumber || '+971 50 123 4567'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-honey mt-1 flex-shrink-0" />
                <a href={`tel:${settings.phone || '+97143210000'}`} className="hover:text-honey transition">
                  {settings.phone || '+971 4 321 0000'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-honey mt-1 flex-shrink-0" />
                <a href={`mailto:${settings.email || 'concierge@teddypups.ae'}`} className="hover:text-honey transition break-all">
                  {settings.email || 'concierge@teddypups.ae'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-honey mt-1 flex-shrink-0" />
                <span>{settings.address || 'Downtown Dubai, UAE'}</span>
              </li>
            </ul>
          </div>

          {/* Socials & Hours */}
          <div>
            <h3 className="font-serif text-lg font-bold text-honey mb-4">Follow the Pups</h3>
            <p className="text-xs text-milk/70 mb-4 leading-relaxed">
              Watch daily Instagram & TikTok reels of our puppies playing in our Dubai showroom!
            </p>
            <div className="flex gap-3 mb-6">
              <a
                href={settings.socials?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-milk/20 flex items-center justify-center text-milk/80 hover:text-honey hover:border-honey transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socials?.tiktok || 'https://tiktok.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full border border-milk/20 flex items-center justify-center text-milk/80 hover:text-honey hover:border-honey transition font-bold text-xs"
              >
                TK
              </a>
              <a
                href={settings.socials?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-milk/20 flex items-center justify-center text-milk/80 hover:text-honey hover:border-honey transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            <div className="text-xs text-milk/60 border-t border-milk/15 pt-3">
              <p className="font-semibold text-milk/80">Showroom Hours:</p>
              <p>{settings.hours || 'Daily 10:00 AM – 9:00 PM (By Appointment)'}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-milk/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-milk/60">
          <div className="flex items-center gap-2">
            <span>© 2026 {settings.brandName || 'TeddyPups'} U.A.E.</span>
            <span>·</span>
            <span className="font-scrawl text-honey text-sm">every puppy is family</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-honey transition">Visit Downtown Showroom</Link>
            <span>·</span>
            <Link to="/admin" className="hover:text-honey text-milk/40 hover:text-milk/80 transition">Owner Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
