import express from 'express';
import {
  getPublicQuickTasks,
  getAllQuickTasksAdmin,
  createQuickTask,
  updateQuickTask,
  deleteQuickTask,
} from '../controllers/quickTaskController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getPublicQuickTasks);

// Admin routes
router.get('/admin/all', protectAdmin, getAllQuickTasksAdmin);
router.post('/', protectAdmin, createQuickTask);
router.patch('/:id', protectAdmin, updateQuickTask);
router.delete('/:id', protectAdmin, deleteQuickTask);

export default router;
