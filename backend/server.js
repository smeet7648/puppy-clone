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

// Security Middleware - explicitly allow external CDN images, videos, fonts, and inline styles
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS Configuration - allows requests from Netlify, localhost, or any client
app.use(cors({
  origin: (origin, callback) => {
    // allow all origins (including https://glittery-naiad-b1204c.netlify.app)
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve local uploads reliably from multiple possible root/backend locations
const localUploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(localUploadDir)) {
  fs.mkdirSync(localUploadDir, { recursive: true });
}
app.use('/uploads', express.static(localUploadDir));

const cwdUploadDir = path.join(process.cwd(), 'uploads');
if (fs.existsSync(cwdUploadDir) && cwdUploadDir !== localUploadDir) {
  app.use('/uploads', express.static(cwdUploadDir));
}

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

// Resilient frontend static serving & SPA catch-all routing
const candidateDistPaths = [
  path.join(__dirname, '..', 'frontend', 'dist'),
  path.join(process.cwd(), 'frontend', 'dist'),
  path.join(process.cwd(), 'dist'),
  path.join(__dirname, 'dist')
];

const findDistPath = () => candidateDistPaths.find(p => fs.existsSync(path.join(p, 'index.html')));

// Register static handlers for any detected dist directory
candidateDistPaths.forEach(distPath => {
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath, {
      maxAge: '1d',
      setHeaders: (res, filePath) => {
        // Guarantee index.html is never cached so new builds load immediately
        if (filePath.endsWith('index.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
      }
    }));
  }
});

// Explicit API 404 handler (prevents API routes from accidentally serving index.html)
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Catch-all SPA route: serves index.html for all page navigations & direct links
app.get('*', (req, res, next) => {
  // Let uploads or API pass through if missed
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }

  const distPath = findDistPath();
  if (distPath) {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      return res.sendFile(indexPath, (err) => {
        if (err && !res.headersSent) {
          next(err);
        }
      });
    }
  }

  // Fallback if frontend is not built
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
      <head><title>TeddyPups - Not Found</title></head>
      <body style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h2>Page Not Found</h2>
        <p>If you just deployed, make sure to run <code>npm run build</code> in the frontend directory.</p>
        <a href="/">Go to Home</a>
      </body>
    </html>
  `);
});

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


