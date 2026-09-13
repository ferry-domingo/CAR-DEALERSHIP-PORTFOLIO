import mongoose from 'mongoose';

const specificationSchema = new mongoose.Schema({
  label: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true },
}, { _id: false });

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  type: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['EV', 'Hybrid', 'Sedan', 'SUV'] },
  description: { type: String, trim: true, default: '' },
  price: { type: Number, default: null, min: 0 },
  images: [{ type: String, trim: true }],
  highlights: [{ type: String, trim: true }],
  specifications: [specificationSchema],
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema);
