import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    company: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Company name cannot exceed 100 characters'],
    },
    type: {
      type: String,
      required: [true, 'Requirement type is required'],
      enum: ['QUICK_TASK', 'WEB_PROJECT', 'SYSTEM_SAAS', 'NOT_SURE'],
      default: 'NOT_SURE',
    },
    requirement: {
      type: String,
      required: [true, 'Requirement description is required'],
      trim: true,
      maxlength: [3000, 'Requirement description cannot exceed 3000 characters'],
    },
    budget: {
      type: String,
      trim: true,
      default: 'Flexible / To Discuss',
    },
    timeline: {
      type: String,
      trim: true,
      default: 'Flexible',
    },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'ARCHIVED'],
      default: 'NEW',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
