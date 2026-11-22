import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { autoSeedIfEmpty } from './seed.js';

// Route imports
import puppiesRouter from './routes/puppies.js';
import happyFamiliesRouter from './routes/happyFamilies.js';
import testimonialsRouter from './routes/testimonials.js';
import faqsRouter from './routes/faqs.js';
import settingsRouter from './routes/settings.js';
import enquiriesRouter from './routes/enquiries.js';
import adminRouter from './routes/admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database and guarantee default seed data is loaded on server startup
await connectDB();
await autoSeedIfEmpty();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve local uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate Limiter for general APIs
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests, please try again later.' }
});

// Stricter rate limiter for enquiries & auth
const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 25,
  message: { success: false, message: 'Too many enquiries sent. Please contact us directly on WhatsApp.' }
});

app.use('/api', generalLimiter);
app.use('/api/enquiries', enquiryLimiter);

// API Routes
app.use('/api/puppies', puppiesRouter);
app.use('/api/happy-families', happyFamiliesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/enquiries', enquiriesRouter);
app.use('/api/admin', adminRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'TeddyPups U.A.E.',
    tagline: 'every puppy is family',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build in production
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Export app for testing or serverless deployment
export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🐾 TeddyPups Server running on http://127.0.0.1:${PORT}`);
  });
}


