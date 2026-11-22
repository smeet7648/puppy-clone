import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { api } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

export const AdminSettings = () => {
  const { token } = useAuth();
  const { settings, fetchSettings } = useSettings();

  const [form, setForm] = useState({
    brandName: settings.brandName || 'TeddyPups',
    tagline: settings.tagline || 'every puppy is family',
    whatsappNumber: settings.whatsappNumber || '+971 50 123 4567',
    whatsappCleanNumber: settings.whatsappCleanNumber || '971501234567',
    phone: settings.phone || '+971 4 321 0000',
    email: settings.email || 'concierge@teddypups.ae',
    address: settings.address || 'Downtown Dubai, Boulevard Plaza Tower 1, United Arab Emirates',
    hours: settings.hours || 'Daily: 10:00 AM – 9:00 PM (By appointment)',
    socials: {
      instagram: settings.socials?.instagram || 'https://instagram.com/teddypups.ae',
      tiktok: settings.socials?.tiktok || 'https://tiktok.com/@teddypups.ae',
      facebook: settings.socials?.facebook || 'https://facebook.com/teddypups.ae'
    }
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await api.adminUpdateSettings(form, token);
      if (res.success) {
        setSaved(true);
        fetchSettings();
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      alert('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
          Site & Concierge Settings
        </h1>
        <p className="text-xs text-cocoa-soft mt-1">
          Update your Dubai showroom address, WhatsApp contact numbers, hours, and social media links.
        </p>
      </div>

      {saved && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully and updated live on the website!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-4xl p-6 sm:p-8 border border-honey/25 shadow-soft space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-cocoa mb-1">Brand Name</label>
            <input
              type="text"
              value={form.brandName}
              onChange={e => setForm(prev => ({ ...prev, brandName: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-cocoa mb-1">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={e => setForm(prev => ({ ...prev, tagline: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-cocoa mb-1">WhatsApp Display Number</label>
            <input
              type="text"
              value={form.whatsappNumber}
              onChange={e => setForm(prev => ({ ...prev, whatsappNumber: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-cocoa mb-1">WhatsApp Clean Digits (for wa.me links)</label>
            <input
              type="text"
              value={form.whatsappCleanNumber}
              onChange={e => setForm(prev => ({ ...prev, whatsappCleanNumber: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-cocoa mb-1">Phone Number</label>
            <input
              type="text"
              value={form.phone}
              onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-cocoa mb-1">Concierge Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-cocoa mb-1">Showroom Address</label>
          <input
            type="text"
            value={form.address}
            onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa font-medium"
          />
        </div>

        <div>
          <label className="block font-bold text-cocoa mb-1">Opening Hours</label>
          <input
            type="text"
            value={form.hours}
            onChange={e => setForm(prev => ({ ...prev, hours: e.target.value }))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-milk border border-honey/30 text-cocoa font-medium"
          />
        </div>

        <div className="pt-2 border-t border-honey/20">
          <span className="block font-bold text-cocoa mb-3">Social Media Links</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-cocoa-soft mb-1">Instagram</label>
              <input
                type="text"
                value={form.socials.instagram}
                onChange={e => setForm(prev => ({ ...prev, socials: { ...prev.socials, instagram: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-milk border border-honey/30 text-cocoa"
              />
            </div>
            <div>
              <label className="block text-cocoa-soft mb-1">TikTok</label>
              <input
                type="text"
                value={form.socials.tiktok}
                onChange={e => setForm(prev => ({ ...prev, socials: { ...prev.socials, tiktok: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-milk border border-honey/30 text-cocoa"
              />
            </div>
            <div>
              <label className="block text-cocoa-soft mb-1">Facebook</label>
              <input
                type="text"
                value={form.socials.facebook}
                onChange={e => setForm(prev => ({ ...prev, socials: { ...prev.socials, facebook: e.target.value } }))}
                className="w-full px-3 py-2 rounded-xl bg-milk border border-honey/30 text-cocoa"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-honey/20 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-full bg-toffee text-milk font-bold shadow-lift hover:bg-toffee-deep transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
