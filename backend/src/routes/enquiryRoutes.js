import express from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { protectAdmin } from '../middleware/auth.js';
import { validateEnquiry } from '../middleware/validate.js';

const router = express.Router();

// Public submission
router.post('/', validateEnquiry, createEnquiry);

// Admin management
router.get('/', protectAdmin, getAllEnquiries);
router.get('/:id', protectAdmin, getEnquiryById);
router.patch('/:id', protectAdmin, updateEnquiry);
router.delete('/:id', protectAdmin, deleteEnquiry);

export default router;
