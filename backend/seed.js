import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbService, getDbState, setDbState } from './data/store.js';
import { connectDB, getIsMongoConnected } from './config/db.js';
import PuppyModel from './models/Puppy.js';
import TestimonialModel from './models/Testimonial.js';
import HappyFamilyPhotoModel from './models/HappyFamilyPhoto.js';
import FAQModel from './models/FAQ.js';
import SettingsModel from './models/Settings.js';
import AdminModel from './models/Admin.js';
import {
  initialPuppies,
  initialTestimonials,
  initialHappyFamilies,
  initialFAQs,
  initialSettings,
  getDefaultAdmin,
  getDefaultEnquiries
} from './data/initialData.js';

dotenv.config();

export {
  initialPuppies,
  initialTestimonials,
  initialHappyFamilies,
  initialFAQs,
  initialSettings
};

/**
 * Perform complete database seed
 */
export async function seed({ exitOnComplete = false } = {}) {
  console.log('🌱 Seeding TeddyPups default database...');
  await connectDB();

  const adminUser = await getDefaultAdmin();

  if (getIsMongoConnected()) {
    console.log('🔄 Seeding to MongoDB...');
    await PuppyModel.deleteMany({});
    await PuppyModel.insertMany(initialPuppies);

    await TestimonialModel.deleteMany({});
    await TestimonialModel.insertMany(initialTestimonials);

    await HappyFamilyPhotoModel.deleteMany({});
    await HappyFamilyPhotoModel.insertMany(initialHappyFamilies);

    await FAQModel.deleteMany({});
    await FAQModel.insertMany(initialFAQs);

    await SettingsModel.deleteMany({});
    await SettingsModel.create(initialSettings);

    await AdminModel.deleteMany({});
    await AdminModel.create(adminUser);
  } else {
    console.log('📁 Seeding to persistent file database (database.json)...');
    setDbState({
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
      admins: [{ ...adminUser, _id: 'adm_1' }]
    });
  }

  console.log('✅ Seeding completed successfully!');
  console.log('👤 Admin login: admin@teddypups.ae / TeddyPups2026!');

  if (exitOnComplete) {
    process.exit(0);
  }
}

/**
 * Automatically seeds default data if MongoDB collections or file database
 * are empty or missing. Never requires manual seeding.
 */
export async function autoSeedIfEmpty({ force = false } = {}) {
  try {
    let needsSeed = false;

    if (getIsMongoConnected()) {
      const puppyCount = await PuppyModel.countDocuments();
      const settingsCount = await SettingsModel.countDocuments();
      const adminCount = await AdminModel.countDocuments();

      if (force || puppyCount === 0 || settingsCount === 0 || adminCount === 0) {
        needsSeed = true;
      }
    } else {
      const state = getDbState();
      if (
        force ||
        !state ||
        !Array.isArray(state.puppies) ||
        state.puppies.length === 0 ||
        !state.settings?.brandName ||
        !Array.isArray(state.admins) ||
        state.admins.length === 0
      ) {
        needsSeed = true;
      }
    }

    if (needsSeed) {
      console.log('🌱 Database is empty. Automatically applying default seed data...');
      await seed({ exitOnComplete: false });
      console.log('✅ Default TeddyPups data automatically initialized!');
    } else {
      console.log('✨ Default TeddyPups data already loaded. Auto-seed not needed.');
    }
  } catch (err) {
    console.warn('⚠️ Auto-seed check notice (non-fatal):', err.message);
  }
}

// Detect direct CLI execution (e.g. `node backend/seed.js` or `npm run seed`)
const currentFile = fileURLToPath(import.meta.url);
const entryFile = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (entryFile && currentFile === entryFile) {
  seed({ exitOnComplete: true }).catch(err => {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  });
}
