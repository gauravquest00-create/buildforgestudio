import express from 'express';
import { handleImageUpload, handleImageDelete } from '../controllers/uploadController.js';
import { protectAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/', protectAdmin, upload.single('image'), handleImageUpload);
router.post('/delete', protectAdmin, handleImageDelete);

export default router;
