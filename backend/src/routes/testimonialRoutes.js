import express from 'express';
import {
  getPublicTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getPublicTestimonials);

// Admin routes
router.get('/admin/all', protectAdmin, getAllTestimonialsAdmin);
router.post('/', protectAdmin, createTestimonial);
router.patch('/:id', protectAdmin, updateTestimonial);
router.delete('/:id', protectAdmin, deleteTestimonial);

export default router;
