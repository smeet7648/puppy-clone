import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getIsMongoConnected } from '../config/db.js';
import PuppyModel from '../models/Puppy.js';
import TestimonialModel from '../models/Testimonial.js';
import HappyFamilyPhotoModel from '../models/HappyFamilyPhoto.js';
import FAQModel from '../models/FAQ.js';
import EnquiryModel from '../models/Enquiry.js';
import SettingsModel from '../models/Settings.js';
import AdminModel from '../models/Admin.js';
import {
  initialPuppies,
  initialTestimonials,
  initialHappyFamilies,
  initialFAQs,
  initialSettings,
  getDefaultEnquiries
} from './initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

// Default initial database state so the app works out-of-the-box without manual seeding
const buildDefaultDbState = () => ({
  puppies: initialPuppies.map((p, idx) => ({
    ...p,
    _id: 'pup_' + (idx + 1),
    createdAt: new Date(Date.now() - idx * 3600000).toISOString()
  })),
  testimonials: initialTestimonials.map((t, idx) => ({
    ...t,
    _id: 'test_' + (idx + 1),
    createdAt: new Date().toISOString()
  })),
  happyFamilies: initialHappyFamilies.map((h, idx) => ({
    ...h,
    _id: 'hf_' + (idx + 1),
    createdAt: new Date().toISOString()
  })),
  faqs: initialFAQs.map((f, idx) => ({
    ...f,
    _id: 'faq_' + (idx + 1),
    createdAt: new Date().toISOString()
  })),
  settings: initialSettings,
  enquiries: getDefaultEnquiries(),
  admins: [
    {
      _id: 'adm_1',
      email: 'admin@teddypups.ae',
      // bcrypt hash for 'TeddyPups2026!'
      passwordHash: '$2a$10$w3U/fE6g0iC8YfH8Z1u18.P9nKxN74K4qA.R76J4mK9Rz4hO3kUfe',
      name: 'TeddyPups Concierge'
    }
  ]
});

// Initial in-memory cache
let fileDb = buildDefaultDbState();

// Ensure directory exists and load file
if (!fs.existsSync(__dirname)) {
  fs.mkdirSync(__dirname, { recursive: true });
}

if (fs.existsSync(DB_FILE)) {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.puppies) && parsed.puppies.length > 0) {
      fileDb = parsed;
    } else {
      // Re-save default state if file was empty
      saveFileDb();
    }
  } catch (e) {
    console.error('Error reading database.json:', e);
    saveFileDb();
  }
} else {
  // If file does not exist, save default database immediately
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(fileDb, null, 2), 'utf8');
  } catch (e) {
    console.error('Error writing initial database.json:', e);
  }
}

const saveFileDb = () => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(fileDb, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving database.json:', err);
  }
};

export const getDbState = () => fileDb;
export const setDbState = (newState) => {
  fileDb = { ...fileDb, ...newState };
  saveFileDb();
};

export const dbService = {
  // PUPPIES
  async getPuppies(query = {}) {
    if (getIsMongoConnected()) {
      const filter = {};
      if (query.breed) filter.breed = new RegExp(query.breed, 'i');
      if (query.origin) filter.origin = query.origin;
      if (query.gender && query.gender !== 'all') filter.gender = query.gender;
      if (query.status) filter.status = query.status;
      return await PuppyModel.find(filter).sort({ createdAt: -1 });
    }

    let results = [...fileDb.puppies];
    if (query.breed) {
      results = results.filter(p => p.breed.toLowerCase().includes(query.breed.toLowerCase()));
    }
    if (query.origin) {
      results = results.filter(p => p.origin === query.origin);
    }
    if (query.gender && query.gender !== 'all') {
      results = results.filter(p => p.gender === query.gender || p.gender === 'both');
    }
    if (query.status) {
      results = results.filter(p => p.status === query.status);
    }
    return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getPuppyBySlug(slug) {
    if (getIsMongoConnected()) {
      return await PuppyModel.findOne({ slug });
    }
    return fileDb.puppies.find(p => p.slug === slug) || null;
  },

  async getPuppyById(id) {
    if (getIsMongoConnected()) {
      return await PuppyModel.findById(id);
    }
    return fileDb.puppies.find(p => p._id === id || p.id === id) || null;
  },

  async createPuppy(puppyData) {
    if (getIsMongoConnected()) {
      return await PuppyModel.create(puppyData);
    }
    const cleanData = {
      ...puppyData,
      _id: puppyData._id || 'pup_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: puppyData.createdAt || new Date().toISOString()
    };
    fileDb.puppies.unshift(cleanData);
    saveFileDb();
    return cleanData;
  },

  async updatePuppy(id, updateData) {
    if (getIsMongoConnected()) {
      return await PuppyModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    const idx = fileDb.puppies.findIndex(p => p._id === id || p.id === id);
    if (idx === -1) return null;
    fileDb.puppies[idx] = { ...fileDb.puppies[idx], ...updateData };
    saveFileDb();
    return fileDb.puppies[idx];
  },

  async deletePuppy(id) {
    if (getIsMongoConnected()) {
      return await PuppyModel.findByIdAndDelete(id);
    }
    const idx = fileDb.puppies.findIndex(p => p._id === id || p.id === id);
    if (idx === -1) return null;
    const removed = fileDb.puppies.splice(idx, 1)[0];
    saveFileDb();
    return removed;
  },

  // TESTIMONIALS
  async getTestimonials() {
    if (getIsMongoConnected()) {
      return await TestimonialModel.find().sort({ featured: -1, createdAt: -1 });
    }
    return [...fileDb.testimonials].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  },

  async createTestimonial(data) {
    if (getIsMongoConnected()) {
      return await TestimonialModel.create(data);
    }
    const item = { ...data, _id: 'test_' + Date.now(), createdAt: new Date().toISOString() };
    fileDb.testimonials.unshift(item);
    saveFileDb();
    return item;
  },

  async updateTestimonial(id, data) {
    if (getIsMongoConnected()) {
      return await TestimonialModel.findByIdAndUpdate(id, data, { new: true });
    }
    const idx = fileDb.testimonials.findIndex(t => t._id === id || t.id === id);
    if (idx === -1) return null;
    fileDb.testimonials[idx] = { ...fileDb.testimonials[idx], ...data };
    saveFileDb();
    return fileDb.testimonials[idx];
  },

  async deleteTestimonial(id) {
    if (getIsMongoConnected()) {
      return await TestimonialModel.findByIdAndDelete(id);
    }
    const idx = fileDb.testimonials.findIndex(t => t._id === id || t.id === id);
    if (idx === -1) return null;
    const removed = fileDb.testimonials.splice(idx, 1)[0];
    saveFileDb();
    return removed;
  },

  // HAPPY FAMILIES
  async getHappyFamilies() {
    if (getIsMongoConnected()) {
      return await HappyFamilyPhotoModel.find().sort({ order: 1, createdAt: -1 });
    }
    return [...fileDb.happyFamilies].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async createHappyFamilyPhoto(data) {
    if (getIsMongoConnected()) {
      return await HappyFamilyPhotoModel.create(data);
    }
    const item = { ...data, _id: 'hf_' + Date.now(), createdAt: new Date().toISOString() };
    fileDb.happyFamilies.push(item);
    saveFileDb();
    return item;
  },

  async updateHappyFamilyPhoto(id, data) {
    if (getIsMongoConnected()) {
      return await HappyFamilyPhotoModel.findByIdAndUpdate(id, data, { new: true });
    }
    const idx = fileDb.happyFamilies.findIndex(h => h._id === id || h.id === id);
    if (idx === -1) return null;
    fileDb.happyFamilies[idx] = { ...fileDb.happyFamilies[idx], ...data };
    saveFileDb();
    return fileDb.happyFamilies[idx];
  },

  async deleteHappyFamilyPhoto(id) {
    if (getIsMongoConnected()) {
      return await HappyFamilyPhotoModel.findByIdAndDelete(id);
    }
    const idx = fileDb.happyFamilies.findIndex(h => h._id === id || h.id === id);
    if (idx === -1) return null;
    const removed = fileDb.happyFamilies.splice(idx, 1)[0];
    saveFileDb();
    return removed;
  },

  // FAQS
  async getFAQs() {
    if (getIsMongoConnected()) {
      return await FAQModel.find().sort({ order: 1, createdAt: 1 });
    }
    return [...fileDb.faqs].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async createFAQ(data) {
    if (getIsMongoConnected()) {
      return await FAQModel.create(data);
    }
    const item = { ...data, _id: 'faq_' + Date.now(), createdAt: new Date().toISOString() };
    fileDb.faqs.push(item);
    saveFileDb();
    return item;
  },

  async updateFAQ(id, data) {
    if (getIsMongoConnected()) {
      return await FAQModel.findByIdAndUpdate(id, data, { new: true });
    }
    const idx = fileDb.faqs.findIndex(f => f._id === id || f.id === id);
    if (idx === -1) return null;
    fileDb.faqs[idx] = { ...fileDb.faqs[idx], ...data };
    saveFileDb();
    return fileDb.faqs[idx];
  },

  async deleteFAQ(id) {
    if (getIsMongoConnected()) {
      return await FAQModel.findByIdAndDelete(id);
    }
    const idx = fileDb.faqs.findIndex(f => f._id === id || f.id === id);
    if (idx === -1) return null;
    const removed = fileDb.faqs.splice(idx, 1)[0];
    saveFileDb();
    return removed;
  },

  // SETTINGS
  async getSettings() {
    if (getIsMongoConnected()) {
      let settings = await SettingsModel.findOne();
      if (!settings) {
        settings = await SettingsModel.create({});
      }
      return settings;
    }
    return fileDb.settings || {};
  },

  async updateSettings(data) {
    if (getIsMongoConnected()) {
      return await SettingsModel.findOneAndUpdate({}, data, { new: true, upsert: true });
    }
    fileDb.settings = { ...fileDb.settings, ...data, updatedAt: new Date().toISOString() };
    saveFileDb();
    return fileDb.settings;
  },

  // ENQUIRIES
  async getEnquiries() {
    if (getIsMongoConnected()) {
      return await EnquiryModel.find().sort({ createdAt: -1 });
    }
    return [...fileDb.enquiries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async createEnquiry(data) {
    if (getIsMongoConnected()) {
      return await EnquiryModel.create(data);
    }
    const item = {
      ...data,
      _id: 'enq_' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString()
    };
    fileDb.enquiries.unshift(item);
    saveFileDb();
    return item;
  },

  async updateEnquiryStatus(id, status) {
    if (getIsMongoConnected()) {
      return await EnquiryModel.findByIdAndUpdate(id, { status }, { new: true });
    }
    const idx = fileDb.enquiries.findIndex(e => e._id === id || e.id === id);
    if (idx === -1) return null;
    fileDb.enquiries[idx].status = status;
    saveFileDb();
    return fileDb.enquiries[idx];
  },

  // ADMINS
  async findAdminByEmail(email) {
    if (getIsMongoConnected()) {
      return await AdminModel.findOne({ email: email.toLowerCase() });
    }
    return fileDb.admins.find(a => a.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async createAdmin(data) {
    if (getIsMongoConnected()) {
      return await AdminModel.create({
        ...data,
        email: data.email.toLowerCase()
      });
    }
    const admin = {
      ...data,
      email: data.email.toLowerCase(),
      _id: 'adm_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    fileDb.admins.push(admin);
    saveFileDb();
    return admin;
  }
};
