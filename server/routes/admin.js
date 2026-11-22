import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbService } from '../data/store.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload, processUpload } from '../middleware/upload.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'teddypups_super_secret_jwt_key_2026_dubai';

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const admin = await dbService.findAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin._id || admin.id, email: admin.email, name: admin.name || 'Admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Welcome back!',
      token,
      admin: { email: admin.email, name: admin.name || 'Admin' }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/me
router.get('/me', authMiddleware, async (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// ================= PUPPIES CRUD =================
// GET /api/admin/puppies
router.get('/puppies', authMiddleware, async (req, res) => {
  try {
    const puppies = await dbService.getPuppies();
    res.json({ success: true, data: puppies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/admin/puppies
router.post('/puppies', authMiddleware, async (req, res) => {
  try {
    const { name, breed, gender, ageMonths, ageLabel, origin, status, images, videoUrl, description, healthInfo, price, featured } = req.body;
    
    // auto-generate slug
    const baseSlug = `${name}-${breed}-${gender}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let slug = baseSlug;
    let existing = await dbService.getPuppyBySlug(slug);
    let counter = 1;
    while (existing) {
      slug = `${baseSlug}-${counter}`;
      existing = await dbService.getPuppyBySlug(slug);
      counter++;
    }

    const newPuppy = await dbService.createPuppy({
      name,
      slug,
      breed,
      gender: gender || 'female',
      ageMonths: Number(ageMonths) || 2,
      ageLabel: ageLabel || `${ageMonths || 2} months`,
      origin: origin || 'local',
      status: status || 'available',
      images: Array.isArray(images) ? images : [],
      videoUrl: videoUrl || '',
      description: description || '',
      healthInfo: healthInfo || 'Microchipped, up to date on all vaccinations, certified vet passport.',
      price: price || 'Price on request',
      featured: Boolean(featured),
      soldAt: status === 'sold' ? new Date() : null
    });

    res.status(201).json({ success: true, data: newPuppy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/puppies/:id
router.put('/puppies/:id', authMiddleware, async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.status === 'sold' && !updateData.soldAt) {
      updateData.soldAt = new Date();
    } else if (updateData.status === 'available') {
      updateData.soldAt = null;
    }

    const updated = await dbService.updatePuppy(req.params.id, updateData);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Puppy not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/puppies/:id
router.delete('/puppies/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await dbService.deletePuppy(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Puppy not found' });
    }
    res.json({ success: true, message: 'Puppy removed successfully', data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================= HAPPY FAMILIES CRUD =================
router.post('/happy-families', authMiddleware, async (req, res) => {
  try {
    const item = await dbService.createHappyFamilyPhoto(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/happy-families/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await dbService.updateHappyFamilyPhoto(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/happy-families/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await dbService.deleteHappyFamilyPhoto(req.params.id);
    res.json({ success: true, data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================= FAQS CRUD =================
router.post('/faqs', authMiddleware, async (req, res) => {
  try {
    const item = await dbService.createFAQ(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/faqs/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await dbService.updateFAQ(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/faqs/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await dbService.deleteFAQ(req.params.id);
    res.json({ success: true, data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================= TESTIMONIALS CRUD =================
router.post('/testimonials', authMiddleware, async (req, res) => {
  try {
    const item = await dbService.createTestimonial(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await dbService.updateTestimonial(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await dbService.deleteTestimonial(req.params.id);
    res.json({ success: true, data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================= SETTINGS =================
router.put('/settings', authMiddleware, async (req, res) => {
  try {
    const updated = await dbService.updateSettings(req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================= ENQUIRIES =================
router.get('/enquiries', authMiddleware, async (req, res) => {
  try {
    const enquiries = await dbService.getEnquiries();
    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/enquiries/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await dbService.updateEnquiryStatus(req.params.id, status);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ================= UPLOAD =================
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }
    const result = await processUpload(req.file);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
