import cloudinary from '../config/cloudinary.js';

export const uploadToCloudinary = (fileBuffer, folder = 'buildforge_studio') => {
  return new Promise((resolve, reject) => {
    // If Cloudinary credentials are missing (e.g. initial demo setup), fallback to base64 data URI
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      const b64 = Buffer.from(fileBuffer).toString('base64');
      const dataURI = `data:image/jpeg;base64,${b64}`;
      return resolve({
        imageUrl: dataURI,
        publicId: `local_${Date.now()}`,
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId || publicId.startsWith('local_')) return true;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error(`[Cloudinary Cleanup Error] ${error.message}`);
    return false;
  }
};
