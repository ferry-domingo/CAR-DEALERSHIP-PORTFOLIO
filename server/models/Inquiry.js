import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  full_name: { type: String, required: true, trim: true },
  contact_number: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  preferred_vehicle: { type: String, default: '', trim: true },
  inquiry_type: {
    type: String,
    required: true,
    enum: ['Vehicle Inquiry', 'Request a Quote', 'Test Drive', 'Financing Inquiry', 'General Inquiry'],
  },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
}, { timestamps: true });

export default mongoose.model('Inquiry', inquirySchema);
