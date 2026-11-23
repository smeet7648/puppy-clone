import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary if credentials provided
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

// Local storage configuration - store in backend/uploads
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|mp4|mov|webm/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    const mime = file.mimetype;
    if (allowed.test(ext) || allowed.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Only images (jpg, png, webp) and videos (mp4, webm, mov) are allowed'));
    }
  }
});

// Helper to handle upload to Cloudinary or serve locally
export const processUpload = async (file) => {
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
    try {
      const isVideo = file.mimetype.startsWith('video');
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: isVideo ? 'video' : 'image',
        folder: 'teddypups'
      });
      // remove local temp file
      fs.unlinkSync(file.path);
      return { url: result.secure_url, publicId: result.public_id, isVideo };
    } catch (err) {
      console.warn('Cloudinary upload failed, falling back to local file:', err.message);
    }
  }

  // Local fallback
  return {
    url: `/uploads/${file.filename}`,
    localPath: file.path,
    isVideo: file.mimetype.startsWith('video')
  };
};
