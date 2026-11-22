import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    brandName: 'TeddyPups',
    tagline: 'every puppy is family',
    whatsappNumber: '+971 50 123 4567',
    whatsappCleanNumber: '971501234567',
    phone: '+971 4 321 0000',
    email: 'concierge@teddypups.ae',
    address: 'Downtown Dubai, Boulevard Plaza Tower 1, United Arab Emirates',
    hours: 'Daily: 10:00 AM – 9:00 PM (By appointment)',
    socials: {
      instagram: 'https://instagram.com/teddypups.ae',
      tiktok: 'https://tiktok.com/@teddypups.ae',
      facebook: 'https://facebook.com/teddypups.ae'
    }
  });

  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await api.getSettings();
      if (res.success && res.data) {
        setSettings(prev => ({ ...prev, ...res.data }));
      }
    } catch (e) {
      console.warn('Using default settings fallback:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const getWhatsAppLink = (message = "Hi TeddyPups! I'd love to know more about your puppies.") => {
    const cleanNum = settings.whatsappCleanNumber || settings.whatsappNumber?.replace(/[^0-9]/g, '') || '971501234567';
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, fetchSettings, getWhatsAppLink }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
