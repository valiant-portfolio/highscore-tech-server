import { blogs } from '../data/blogData.js';

/**
 * @description Get all blog posts
 * @route GET /api/get-all-blogs
 * @access Public
 */
export const getAllBlogs = async (req, res, next) => {
  try {
    // In a real application, you would fetch this from a database.
    // For now, we are just returning the dummy data.
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};
