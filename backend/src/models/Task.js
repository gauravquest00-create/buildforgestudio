import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    clientEmail: {
      type: String,
      required: [true, 'Client email is required'],
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Task description is required'],
      trim: true,
    },
    technology: {
      type: String,
      trim: true,
      default: 'MERN Stack',
    },
    budget: {
      type: String,
      trim: true,
      default: '$50',
    },
    quote: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['NEW', 'REVIEWING', 'QUOTED', 'ACCEPTED', 'PAID', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
      default: 'NEW',
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
    },
    estimatedDelivery: {
      type: String,
      trim: true,
      default: '1-2 Days',
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

export const Task = mongoose.model('Task', taskSchema);
