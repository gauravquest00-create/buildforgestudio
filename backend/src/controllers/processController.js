import { ProcessStep } from '../models/ProcessStep.js';

export const getPublicProcessSteps = async (req, res, next) => {
  try {
    const steps = await ProcessStep.find({ published: true }).sort({ displayOrder: 1 });
    res.status(200).json({ success: true, count: steps.length, steps });
  } catch (error) {
    next(error);
  }
};

export const getAllProcessStepsAdmin = async (req, res, next) => {
  try {
    const steps = await ProcessStep.find().sort({ displayOrder: 1 });
    res.status(200).json({ success: true, count: steps.length, steps });
  } catch (error) {
    next(error);
  }
};

export const createProcessStep = async (req, res, next) => {
  try {
    const step = await ProcessStep.create(req.body);
    res.status(201).json({ success: true, message: 'Process step created', step });
  } catch (error) {
    next(error);
  }
};

export const updateProcessStep = async (req, res, next) => {
  try {
    const step = await ProcessStep.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!step) return res.status(404).json({ success: false, message: 'Process step not found' });
    res.status(200).json({ success: true, message: 'Process step updated', step });
  } catch (error) {
    next(error);
  }
};

export const deleteProcessStep = async (req, res, next) => {
  try {
    const step = await ProcessStep.findByIdAndDelete(req.params.id);
    if (!step) return res.status(404).json({ success: false, message: 'Process step not found' });
    res.status(200).json({ success: true, message: 'Process step deleted' });
  } catch (error) {
    next(error);
  }
};
