import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: 'public-profile' },
  name: { type: String, required: true, trim: true, default: 'Rafael Galvez' },
  title: { type: String, required: true, trim: true, default: 'BYD Sales Consultant' },
  bio: { type: String, required: true, trim: true, default: 'Your dedicated BYD Sales Consultant in Baliwag.' },
  profile_photo: { type: String, default: '/images/rafael-placeholder.svg' },
  phone: { type: String, trim: true, default: '' },
  email: { type: String, trim: true, lowercase: true, default: '' },
  facebook_url: { type: String, trim: true, default: '' },
  address: { type: String, trim: true, default: 'Baliwag, Bulacan, Philippines' },
  map_url: { type: String, trim: true, default: '' },
}, { timestamps: true });

export const profileDefaults = {
  key: 'public-profile', name: 'Rafael Galvez', title: 'BYD Sales Consultant',
  bio: 'Your dedicated BYD Sales Consultant in Baliwag.',
  profile_photo: '/images/rafael-placeholder.svg', phone: '', email: '', facebook_url: '',
  address: 'Baliwag, Bulacan, Philippines', map_url: '',
};

export default mongoose.model('Profile', profileSchema);
