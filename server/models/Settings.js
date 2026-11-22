import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  brandName: { type: String, default: 'TeddyPups' },
  tagline: { type: String, default: 'every puppy is family' },
  whatsappNumber: { type: String, default: '+971 50 123 4567' },
  whatsappCleanNumber: { type: String, default: '971501234567' },
  phone: { type: String, default: '+971 4 321 0000' },
  email: { type: String, default: 'concierge@teddypups.ae' },
  address: { type: String, default: 'Downtown Dubai, Boulevard Plaza Tower 1, United Arab Emirates' },
  hours: { type: String, default: 'Daily: 10:00 AM – 9:00 PM (By appointment)' },
  socials: {
    instagram: { type: String, default: 'https://instagram.com/teddypups.ae' },
    tiktok: { type: String, default: 'https://tiktok.com/@teddypups.ae' },
    facebook: { type: String, default: 'https://facebook.com/teddypups.ae' }
  },
  updatedAt: { type: Date, default: Date.now }
});

export const SettingsModel = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
export default SettingsModel;
