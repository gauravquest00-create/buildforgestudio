import { Setting } from '../models/Setting.js';
import { initialSettings } from '../utils/seedData.js';

// Public - Get site configuration
export const getPublicSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create(initialSettings);
    }
    res.status(200).json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};

// Admin - Update site settings
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.status(200).json({ success: true, message: 'Settings updated successfully', settings });
  } catch (error) {
    next(error);
  }
};

// Admin - Dashboard metrics & statistics
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalEnquiries,
      newEnquiries,
      activeTasks,
      activeProjects,
      publishedServices,
      publishedProjects,
      recentEnquiries,
      recentTasks,
    ] = await Promise.all([
      import('../models/Enquiry.js').then((m) => m.Enquiry.countDocuments()),
      import('../models/Enquiry.js').then((m) => m.Enquiry.countDocuments({ status: 'NEW' })),
      import('../models/Task.js').then((m) => m.Task.countDocuments({ status: { $in: ['NEW', 'REVIEWING', 'QUOTED', 'ACCEPTED', 'IN_PROGRESS'] } })),
      import('../models/Project.js').then((m) => m.Project.countDocuments({ published: true })),
      import('../models/Service.js').then((m) => m.Service.countDocuments({ published: true })),
      import('../models/Project.js').then((m) => m.Project.countDocuments()),
      import('../models/Enquiry.js').then((m) => m.Enquiry.find().sort({ createdAt: -1 }).limit(5)),
      import('../models/Task.js').then((m) => m.Task.find().sort({ createdAt: -1 }).limit(5)),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalEnquiries,
        newEnquiries,
        activeTasks,
        activeProjects,
        publishedServices,
        publishedProjects,
      },
      recentEnquiries,
      recentTasks,
    });
  } catch (error) {
    next(error);
  }
};
