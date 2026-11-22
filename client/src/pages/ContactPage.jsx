import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../api';
import { useSettings } from '../context/SettingsContext';
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
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO
        title="Visit & Contact Us | TeddyPups U.A.E."
        description="Visit our Downtown Dubai showroom, book a private puppy cuddle appointment, or contact our 24/7 concierge on WhatsApp."
        slug="/contact"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="font-scrawl text-toffee text-lg">say hello</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa mt-1">
          Get in touch with us
        </h1>
        <p className="mt-3 text-cocoa-soft text-base leading-relaxed">
          Book a private puppy cuddle appointment in our Downtown Dubai showroom or speak directly with our concierge team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Contact Cards & Showroom Details */}
        <div className="lg:col-span-5 space-y-6">
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

          {/* Interactive Styled Map Embed */}
          <div className="bg-white rounded-3xl overflow-hidden border border-honey/25 shadow-soft p-2">
            <iframe
              title="Downtown Dubai Showroom Map"
              src="https://maps.google.com/maps?q=Boulevard+Plaza+Tower+1+Downtown+Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-56 rounded-2xl border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        {/* Right Column: Contact & Concierge Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-4xl p-6 sm:p-10 border border-honey/25 shadow-soft">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa mb-2">
              Send an enquiry
            </h2>
            <p className="text-xs sm:text-sm text-cocoa-soft mb-8">
              Fill in your details below and our team will get in touch on WhatsApp within minutes.
            </p>

            {status.success && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Thank you for your enquiry!</h4>
                  <p className="text-xs mt-1">Our puppy concierge team has received your message and will reach out to you on WhatsApp shortly.</p>
                </div>
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs">{status.error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cocoa mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Sarah Mansoori"
                    className="w-full px-4 py-3 rounded-2xl bg-milk border border-honey/30 text-sm focus:outline-none focus:ring-2 focus:ring-toffee text-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cocoa mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+971 50 000 0000"
                    className="w-full px-4 py-3 rounded-2xl bg-milk border border-honey/30 text-sm focus:outline-none focus:ring-2 focus:ring-toffee text-cocoa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-cocoa mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-milk border border-honey/30 text-sm focus:outline-none focus:ring-2 focus:ring-toffee text-cocoa"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cocoa mb-1">
                    Puppy of Interest (Optional)
                  </label>
                  <input
                    type="text"
                    name="puppyName"
                    value={formData.puppyName}
                    onChange={handleChange}
                    placeholder="e.g. Max or Korean Maltipoo"
                    className="w-full px-4 py-3 rounded-2xl bg-milk border border-honey/30 text-sm focus:outline-none focus:ring-2 focus:ring-toffee text-cocoa"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cocoa mb-1">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us what breed or date you would like to visit our showroom..."
                  className="w-full px-4 py-3 rounded-2xl bg-milk border border-honey/30 text-sm focus:outline-none focus:ring-2 focus:ring-toffee text-cocoa"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 rounded-full bg-toffee hover:bg-toffee-deep text-milk font-bold text-sm shadow-lift transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status.loading ? (
                  <span>Sending enquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Concierge Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
