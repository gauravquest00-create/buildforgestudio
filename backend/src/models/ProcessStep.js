import mongoose from 'mongoose';

const processStepSchema = new mongoose.Schema(
  {
    stepNumber: {
      type: String,
      required: [true, 'Step number is required (e.g. 01)'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Step title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Step description is required'],
      trim: true,
    },
    details: {
      type: [String],
      default: [],
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

export const ProcessStep = mongoose.model('ProcessStep', processStepSchema);
