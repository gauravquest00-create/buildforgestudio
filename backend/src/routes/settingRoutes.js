import express from 'express';
import {
  getPublicSettings,
  updateSettings,
  getDashboardStats,
} from '../controllers/settingController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getPublicSettings);

// Admin routes
router.patch('/', protectAdmin, updateSettings);
router.get('/stats', protectAdmin, getDashboardStats);

export default router;
