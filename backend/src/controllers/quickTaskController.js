import { QuickTask } from '../models/QuickTask.js';

export const getPublicQuickTasks = async (req, res, next) => {
  try {
    const quickTasks = await QuickTask.find({ published: true }).sort({ displayOrder: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: quickTasks.length, quickTasks });
  } catch (error) {
    next(error);
  }
};

export const getAllQuickTasksAdmin = async (req, res, next) => {
  try {
    const quickTasks = await QuickTask.find().sort({ displayOrder: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: quickTasks.length, quickTasks });
  } catch (error) {
    next(error);
  }
};

export const createQuickTask = async (req, res, next) => {
  try {
    const quickTask = await QuickTask.create(req.body);
    res.status(201).json({ success: true, message: 'Quick task created', quickTask });
  } catch (error) {
    next(error);
  }
};

export const updateQuickTask = async (req, res, next) => {
  try {
    const quickTask = await QuickTask.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quickTask) return res.status(404).json({ success: false, message: 'Quick task not found' });
    res.status(200).json({ success: true, message: 'Quick task updated', quickTask });
  } catch (error) {
    next(error);
  }
};

export const deleteQuickTask = async (req, res, next) => {
  try {
    const quickTask = await QuickTask.findByIdAndDelete(req.params.id);
    if (!quickTask) return res.status(404).json({ success: false, message: 'Quick task not found' });
    res.status(200).json({ success: true, message: 'Quick task deleted' });
  } catch (error) {
    next(error);
  }
};
