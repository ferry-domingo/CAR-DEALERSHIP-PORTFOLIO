import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  customer_name: { type: String, required: true, trim: true },
  vehicle: { type: String, required: true, trim: true },
  delivery_date: { type: Date, required: true },
  story: { type: String, required: true, trim: true },
  image: { type: String, default: '/images/delivery-placeholder.svg' },
  visible: { type: Boolean, default: true },
  is_demo: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Delivery', deliverySchema);
