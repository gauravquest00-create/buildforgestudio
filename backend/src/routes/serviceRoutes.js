import express from 'express';
import {
  getPublicServices,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getPublicServices);

// Admin routes
router.get('/admin/all', protectAdmin, getAllServicesAdmin);
router.post('/', protectAdmin, createService);
router.patch('/:id', protectAdmin, updateService);
router.delete('/:id', protectAdmin, deleteService);

export default router;
