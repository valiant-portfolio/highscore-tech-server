import { Router } from 'express';
import { getAllBlogs } from '../controllers/blog.controller.js';

const router = Router();

// @route   GET /api/get-all-blogs
// @desc    Get all blog posts
// @access  Public
router.get('/get-all-blogs', ()=> console.log(5678));

export default router;
