import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../api';
import { useSettings } from '../context/SettingsContext';
import { CartoonSection } from '../components/common/CartoonSection';
import { SEO } from '../components/common/SEO';

export const ContactPage = () => {
  const { settings, getWhatsAppLink } = useSettings();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    puppyName: '',
    message: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    try {
      const res = await api.sendEnquiry(formData);
      if (res.success) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', phone: '', email: '', puppyName: '', message: '' });
      } else {
        setStatus({ loading: false, success: false, error: res.message || 'Failed to submit enquiry.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Network error. Please try again or reach out on WhatsApp.' });
    }
  };

  return (
    <div className="py-8 sm:py-10 md:py-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-24 md:pb-16">
      <SEO
        title="Visit & Contact Us | TeddyPups U.A.E."
        description="Visit our Downtown Dubai showroom, book a private puppy cuddle appointment, or contact our 24/7 concierge on WhatsApp."
        slug="/contact"
      />

      {/* Header */}
      <CartoonSection direction="pop">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-scrawl text-toffee text-lg">say hello</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa mt-1">
            Get in touch with us
          </h1>
          <p className="mt-3 text-cocoa-soft text-base leading-relaxed">
            Book a private puppy cuddle appointment in our Downtown Dubai showroom or speak directly with our concierge team.
          </p>
        </div>
      </CartoonSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Contact Cards & Showroom Details (Slides in from LEFT) */}
        <div className="lg:col-span-5 space-y-6">
          <CartoonSection direction="left">
            <div className="bg-white rounded-4xl p-6 sm:p-8 border border-honey/25 shadow-soft space-y-6">
              <h2 className="font-serif text-2xl font-bold text-cocoa">
                Visit us in Downtown Dubai
              </h2>
              <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed">
                Our boutique showroom offers a calm, hygienic, and luxurious environment where you and your family can meet and play with our puppies.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-honey/20 text-toffee flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-cocoa text-sm">Showroom Address</h4>
                    <p className="text-xs text-cocoa-soft leading-relaxed">
                      {settings.address || 'Downtown Dubai, Boulevard Plaza Tower 1, United Arab Emirates'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-honey/20 text-toffee flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-cocoa text-sm">Opening Hours</h4>
                    <p className="text-xs text-cocoa-soft leading-relaxed">
                      {settings.hours || 'Daily: 10:00 AM – 9:00 PM (By appointment)'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-cocoa text-sm">WhatsApp Concierge</h4>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-700 hover:underline block"
                    >
                      {settings.whatsappNumber || '+971 50 123 4567'} (Instant Reply)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-honey/20 text-toffee flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-cocoa text-sm">Phone Call</h4>
                    <a href={`tel:${settings.phone || '+97143210000'}`} className="text-xs font-semibold text-toffee hover:underline">
                      {settings.phone || '+971 4 321 0000'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-honey/20 text-toffee flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-cocoa text-sm">Email</h4>
                    <a href={`mailto:${settings.email || 'concierge@teddypups.ae'}`} className="text-xs font-semibold text-toffee hover:underline break-all">
                      {settings.email || 'concierge@teddypups.ae'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Pill */}
              <div className="pt-4 border-t border-honey/20">
                <a
                  href={getWhatsAppLink("Hi TeddyPups! I'd like to book a showroom visit to meet your puppies.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-lift hover:bg-[#20ba59] transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Book Showroom Visit on WhatsApp</span>
                </a>
              </div>
            </div>
          </CartoonSection>

          {/* Interactive Styled Map Embed */}
          <CartoonSection direction="pop" delay={0.2}>
            <div className="bg-white rounded-3xl overflow-hidden border border-honey/25 shadow-soft p-2">
              <iframe
                title="Downtown Dubai Showroom Map"
                src="https://maps.google.com/maps?q=Boulevard+Plaza+Tower+1+Downtown+Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-56 rounded-2xl border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </CartoonSection>
        </div>

        {/* Right Column: Contact & Concierge Form (Slides in from RIGHT) */}
        <div className="lg:col-span-7">
          <CartoonSection direction="right">
            <div className="bg-white rounded-4xl p-6 sm:p-10 border border-honey/25 shadow-soft">
              <h2 className="font-serif text-2xl font-bold text-cocoa mb-2">
                Send our concierge a message
              </h2>
              <p className="text-xs sm:text-sm text-cocoa-soft mb-8 leading-relaxed">
                Fill in the form below and our puppy advisor will get back to you via WhatsApp or email within minutes.
              </p>

              {status.success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">Thank you for contacting TeddyPups!</h5>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Our concierge team has received your message and will contact you via WhatsApp shortly.
                    </p>
                  </div>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">Oops, something went wrong</h5>
                    <p className="text-xs text-rose-700 mt-0.5">{status.error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-cocoa mb-1.5">
                      Your Full Name <span className="text-toffee">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Mansoori"
                      className="w-full px-4 py-3 rounded-2xl border border-honey/30 focus:border-toffee focus:outline-none text-sm bg-milk/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cocoa mb-1.5">
                      WhatsApp / Mobile Phone <span className="text-toffee">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 50 000 0000"
                      className="w-full px-4 py-3 rounded-2xl border border-honey/30 focus:border-toffee focus:outline-none text-sm bg-milk/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-cocoa mb-1.5">
                      Email Address <span className="text-toffee">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-3 rounded-2xl border border-honey/30 focus:border-toffee focus:outline-none text-sm bg-milk/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cocoa mb-1.5">
                      Puppy / Breed of Interest
                    </label>
                    <input
                      type="text"
                      name="puppyName"
                      value={formData.puppyName}
                      onChange={handleChange}
                      placeholder="e.g. Maltipoo Max, or Korean Poodle"
                      className="w-full px-4 py-3 rounded-2xl border border-honey/30 focus:border-toffee focus:outline-none text-sm bg-milk/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-cocoa mb-1.5">
                    How can we help? <span className="text-toffee">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you are looking for (breed, size, personality) or let us know when you'd like to visit our showroom..."
                    className="w-full px-4 py-3 rounded-2xl border border-honey/30 focus:border-toffee focus:outline-none text-sm bg-milk/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-4 rounded-full bg-toffee hover:bg-toffee-deep text-milk font-bold text-sm shadow-lift transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status.loading ? (
                    <div className="w-5 h-5 border-2 border-milk border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Concierge Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </CartoonSection>
        </div>
      </div>
    </div>
  );
};
