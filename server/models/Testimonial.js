import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  customer_name: { type: String, required: true, trim: true },
  vehicle: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  testimonial: { type: String, required: true, trim: true },
  approved: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
  featured: { type: Boolean, default: false },
  is_demo: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
