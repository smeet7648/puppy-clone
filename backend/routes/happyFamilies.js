import express from 'express';
import { dbService } from '../data/store.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const happyFamilies = await dbService.getHappyFamilies();
    res.json({ success: true, data: happyFamilies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
