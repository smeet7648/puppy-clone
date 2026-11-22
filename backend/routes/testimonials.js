import express from 'express';
import { dbService } from '../data/store.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const testimonials = await dbService.getTestimonials();
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
