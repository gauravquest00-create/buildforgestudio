import express from 'express';
import {
  getPublicProcessSteps,
  getAllProcessStepsAdmin,
  createProcessStep,
  updateProcessStep,
  deleteProcessStep,
} from '../controllers/processController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getPublicProcessSteps);

// Admin routes
router.get('/admin/all', protectAdmin, getAllProcessStepsAdmin);
router.post('/', protectAdmin, createProcessStep);
router.patch('/:id', protectAdmin, updateProcessStep);
router.delete('/:id', protectAdmin, deleteProcessStep);

export default router;
