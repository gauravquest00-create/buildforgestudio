import { Project } from '../models/Project.js';
import { deleteFromCloudinary } from '../services/cloudinaryService.js';

// Public - Get all published projects
export const getPublicProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const query = { published: true };

    if (category && category !== 'ALL') query.category = category;
    if (featured === 'true') query.featured = true;

    const projects = await Project.find(query).sort({ displayOrder: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, projects });
  } catch (error) {
    next(error);
  }
};

// Public - Get single project by slug
export const getPublicProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, published: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

// Admin - Get all projects (including unpublished)
export const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, projects });
  } catch (error) {
    next(error);
  }
};

// Admin - Create project
export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, message: 'Project created', project });
  } catch (error) {
    next(error);
  }
};

// Admin - Update project
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, message: 'Project updated', project });
  } catch (error) {
    next(error);
  }
};

// Admin - Delete project (and clean up Cloudinary images)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    // Clean up thumbnail
    if (project.thumbnail && project.thumbnail.publicId) {
      await deleteFromCloudinary(project.thumbnail.publicId);
    }

    // Clean up gallery
    if (project.gallery && project.gallery.length > 0) {
      for (const item of project.gallery) {
        if (item.publicId) await deleteFromCloudinary(item.publicId);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};
