import { Service } from '../models/Service.js';

export const getPublicServices = async (req, res, next) => {
  try {
    const services = await Service.find({ published: true }).sort({ displayOrder: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: services.length, services });
  } catch (error) {
    next(error);
  }
};

export const getAllServicesAdmin = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ displayOrder: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: services.length, services });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, message: 'Service created', service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.status(200).json({ success: true, message: 'Service updated', service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.status(200).json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};
