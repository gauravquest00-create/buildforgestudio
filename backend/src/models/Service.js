import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true,
    },
    startingPrice: {
      type: String,
      trim: true,
      default: 'Custom Quote',
    },
    features: {
      type: [String],
      default: [],
    },
    icon: {
      type: String,
      default: 'Code',
    },
    ctaText: {
      type: String,
      default: 'Start a Project',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model('Service', serviceSchema);
