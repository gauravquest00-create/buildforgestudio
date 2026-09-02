import mongoose from 'mongoose';

const quickTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    startingPrice: {
      type: String,
      trim: true,
      default: '$25',
    },
    technology: {
      type: String,
      trim: true,
      default: 'React / Node / Mongo',
    },
    icon: {
      type: String,
      default: 'Zap',
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

export const QuickTask = mongoose.model('QuickTask', quickTaskSchema);
