import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(protectAdmin); // All task management endpoints are private admin

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
