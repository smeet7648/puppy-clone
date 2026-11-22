import express from 'express';
import { dbService } from '../data/store.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const settings = await dbService.getSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
