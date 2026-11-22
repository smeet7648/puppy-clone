import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { MobileMenu } from './MobileMenu';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { settings, getWhatsAppLink } = useSettings();
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Puppies', path: '/puppies' },
    { name: 'Happy families', path: '/happy-families' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Visit & contact', path: '/contact' },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-toffee text-milk px-4 py-2 rounded-full shadow-lg font-medium text-sm transition"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-milk/95 backdrop-blur-md shadow-soft border-b border-honey/20 py-3' : 'bg-milk/80 backdrop-blur-sm py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-honey shadow-sm group-hover:scale-105 transition-transform bg-[#fdf7ef] p-0.5">
                <img src="/logo.svg" alt="TeddyPups Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-cocoa leading-none group-hover:text-toffee transition-colors">
                  {settings.brandName || 'TeddyPups'}
                </span>
                <span className="text-[11px] font-medium tracking-widest uppercase text-toffee mt-0.5">
                  U.A.E. Concierge
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-full text-sm font-medium transition-all ${isActive
                      ? 'bg-honey/30 text-toffee font-semibold shadow-xs'
                      : 'text-cocoa-soft hover:text-toffee hover:bg-honey/15'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppLink("Hi TeddyPups! I would love to enquire about your available teacup puppies.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-toffee hover:bg-toffee-deep text-milk px-5 py-2.5 rounded-full text-sm font-semibold shadow-lift hover:shadow-soft-lg transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp us</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="lg:hidden p-2 rounded-full text-cocoa hover:bg-honey/20 transition-colors focus:outline-none focus:ring-2 focus:ring-toffee"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};
