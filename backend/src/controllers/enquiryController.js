import { Enquiry } from '../models/Enquiry.js';

// Public endpoint - Submit enquiry
export const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, company, type, requirement, budget, timeline } = req.body;

    const enquiry = await Enquiry.create({
      name,
      email,
      company: company || '',
      type: type || 'NOT_SURE',
      requirement,
      budget: budget || 'Flexible',
      timeline: timeline || 'Flexible',
      status: 'NEW',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. We will respond within 24 hours.',
      enquiry: {
        id: enquiry._id,
        name: enquiry.name,
        type: enquiry.type,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin endpoints
export const getAllEnquiries = async (req, res, next) => {
  try {
    const { status, search, limit = 50, page = 1 } = req.query;
    const query = {};

    if (status && status !== 'ALL') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { requirement: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Enquiry.countDocuments(query);
    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, enquiry });
  } catch (error) {
    next(error);
  }
};

export const updateEnquiry = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    if (status) enquiry.status = status;
    if (notes !== undefined) enquiry.notes = notes;

    await enquiry.save();
    res.status(200).json({ success: true, message: 'Enquiry updated', enquiry });
  } catch (error) {
    next(error);
  }
};

export const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};
