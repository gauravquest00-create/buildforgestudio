import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js';

export const handleImageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload.' });
    }

    const folder = req.body.folder || 'buildforge_studio';
    const result = await uploadToCloudinary(req.file.buffer, folder);

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: result.imageUrl,
      publicId: result.publicId,
    });
  } catch (error) {
    next(error);
  }
};

export const handleImageDelete = async (req, res, next) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ success: false, message: 'publicId is required' });
    }

    await deleteFromCloudinary(publicId);
    res.status(200).json({ success: true, message: 'Image deleted from storage' });
  } catch (error) {
    next(error);
  }
};
