import express from 'express';
import { dbService } from '../data/store.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const faqs = await dbService.getFAQs();
    res.json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
