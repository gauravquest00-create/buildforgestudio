import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      trim: true,
      default: 'Founder',
    },
    quote: {
      type: String,
      required: [true, 'Quote is required'],
      trim: true,
    },
    avatar: {
      imageUrl: {
        type: String,
        default: '',
      },
      publicId: {
        type: String,
        default: '',
      },
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    published: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
