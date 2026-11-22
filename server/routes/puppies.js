import express from 'express';
import { dbService } from '../data/store.js';

const router = express.Router();

// GET /api/puppies?breed=&origin=&gender=&status=&page=&limit=
router.get('/', async (req, res) => {
  try {
    const { breed, origin, gender, status, page = 1, limit = 50 } = req.query;
    const puppies = await dbService.getPuppies({ breed, origin, gender, status });
    
    // Pagination support
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = puppies.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      data: paginated,
      total: puppies.length,
      page: pageNum,
      totalPages: Math.ceil(puppies.length / limitNum)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/puppies/:slug
router.get('/:slug', async (req, res) => {
  try {
    const puppy = await dbService.getPuppyBySlug(req.params.slug);
    if (!puppy) {
      return res.status(404).json({ success: false, message: 'Puppy not found' });
    }

    // Also get related puppies of same breed or origin
    const allPuppies = await dbService.getPuppies({ status: 'available' });
    const related = allPuppies
      .filter(p => (p.slug !== puppy.slug) && (p.breed === puppy.breed || p.origin === puppy.origin))
      .slice(0, 4);

    res.json({
      success: true,
      data: puppy,
      related
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
