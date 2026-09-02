import express from 'express';
import {
  getPublicProjects,
  getPublicProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protectAdmin } from '../middleware/auth.js';
import { validateProject } from '../middleware/validate.js';

const router = express.Router();

// Public routes
router.get('/', getPublicProjects);
router.get('/slug/:slug', getPublicProjectBySlug);

// Admin routes
router.get('/admin/all', protectAdmin, getAllProjectsAdmin);
router.post('/', protectAdmin, validateProject, createProject);
router.patch('/:id', protectAdmin, updateProject);
router.delete('/:id', protectAdmin, deleteProject);

export default router;
