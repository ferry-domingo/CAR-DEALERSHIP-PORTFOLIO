import 'dotenv/config';
import bcrypt from 'bcrypt';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js';
import Delivery from '../models/Delivery.js';
import Testimonial from '../models/Testimonial.js';
import Inquiry from '../models/Inquiry.js';

const vehicles = [
  {
    name: 'BYD Seal 05', slug: 'byd-seal-05', type: 'Plug-in Hybrid Sedan', category: 'Hybrid',
    description: 'Demo listing for a refined electrified sedan. Replace specifications and pricing with current authorized information before publishing.',
    price: 1198000, images: ['/images/seal-sedan.svg'], featured: true, active: true,
    highlights: ['Electrified driving concept', 'Modern cabin layout', 'Daily-use comfort'],
    specifications: [{ label: 'Powertrain', value: 'Demo: Plug-in Hybrid' }, { label: 'Body style', value: 'Sedan' }, { label: 'Availability', value: 'Confirm with consultant' }],
  },
  {
    name: 'BYD Atto 3', slug: 'byd-atto-3', type: 'Electric SUV', category: 'SUV',
    description: 'Demo SUV listing focused on practical electric mobility, spacious everyday usability, and contemporary design.',
    price: 1598000, images: ['/images/atto-suv.svg'], featured: true, active: true,
    highlights: ['Electric vehicle', 'SUV practicality', 'Contemporary interior'],
    specifications: [{ label: 'Powertrain', value: 'Demo: Battery Electric' }, { label: 'Body style', value: 'SUV' }, { label: 'Availability', value: 'Confirm with consultant' }],
  },
  {
    name: 'BYD Dolphin', slug: 'byd-dolphin', type: 'Electric Hatchback', category: 'EV',
    description: 'Demo compact EV listing designed to showcase a city-friendly option for customers exploring electric mobility.',
    price: 1398000, images: ['/images/dolphin-hatch.svg'], featured: true, active: true,
    highlights: ['Compact footprint', 'Battery electric concept', 'Urban-friendly layout'],
    specifications: [{ label: 'Powertrain', value: 'Demo: Battery Electric' }, { label: 'Body style', value: 'Hatchback' }, { label: 'Availability', value: 'Confirm with consultant' }],
  },
  {
    name: 'BYD Sealion 6', slug: 'byd-sealion-6', type: 'Electrified SUV', category: 'SUV',
    description: 'Demo midsize SUV listing for customers who prioritize passenger space, comfort, and an electrified powertrain option.',
    price: 1548000, images: ['/images/sealion-suv.svg'], featured: false, active: true,
    highlights: ['Family-focused cabin', 'Electrified concept', 'SUV versatility'],
    specifications: [{ label: 'Powertrain', value: 'Demo: Electrified' }, { label: 'Body style', value: 'SUV' }, { label: 'Availability', value: 'Confirm with consultant' }],
  },
  {
    name: 'BYD Qin Plus', slug: 'byd-qin-plus', type: 'Hybrid Sedan', category: 'Sedan',
    description: 'Portfolio demo sedan record. Model naming, market availability, features, and price must be verified before real deployment.',
    price: null, images: ['/images/qin-hybrid.svg'], featured: false, active: true,
    highlights: ['Sedan profile', 'Electrified concept', 'Demo-only listing'],
    specifications: [{ label: 'Powertrain', value: 'Demo: Hybrid' }, { label: 'Body style', value: 'Sedan' }, { label: 'Availability', value: 'Demo only — verify locally' }],
  },
];

const deliveries = [
  { customer_name: 'Sample Customer A', location: 'Baliwag, Bulacan', vehicle: 'BYD Seal 05', delivery_date: new Date('2026-08-22'), story: 'Sample delivery story for portfolio demonstration. Replace this entry with authorized customer content before launch.', image: '/images/delivery-placeholder.svg', visible: true, is_demo: true },
  { customer_name: 'Sample Customer B', location: 'Plaridel, Bulacan', vehicle: 'BYD Atto 3', delivery_date: new Date('2026-08-10'), story: 'Demo content showing how a successful customer handover can be presented on the site.', image: '/images/delivery-placeholder.svg', visible: true, is_demo: true },
  { customer_name: 'Sample Customer C', location: 'Pulilan, Bulacan', vehicle: 'BYD Dolphin', delivery_date: new Date('2026-07-28'), story: 'Fictional portfolio entry only. Real delivery photos and stories require customer authorization.', image: '/images/delivery-placeholder.svg', visible: true, is_demo: true },
];

const testimonials = [
  { customer_name: 'Sample Reviewer A', location: 'Baliwag, Bulacan', vehicle: 'BYD Seal 05', rating: 5, testimonial: 'Sample customer testimonial for demonstration purposes. This is not a real customer review.', approved: true, featured: true, is_demo: true },
  { customer_name: 'Sample Reviewer B', location: 'Malolos, Bulacan', vehicle: 'BYD Atto 3', rating: 5, testimonial: 'Demo review: the inquiry process felt clear and easy to follow. Replace with an authorized real review before production use.', approved: true, featured: true, is_demo: true },
  { customer_name: 'Sample Reviewer C', location: 'Pulilan, Bulacan', vehicle: 'BYD Dolphin', rating: 5, testimonial: 'Portfolio-only testimonial content illustrating the intended trust-building layout.', approved: true, featured: false, is_demo: true },
];

async function seed() {
  await connectDB();
  await Promise.all([Vehicle.deleteMany({}), Delivery.deleteMany({}), Testimonial.deleteMany({}), Inquiry.deleteMany({})]);
  const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const hash = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate({ email }, { email, password: hash, role: 'admin' }, { upsert: true, new: true, setDefaultsOnInsert: true });
  await Vehicle.insertMany(vehicles);
  await Delivery.insertMany(deliveries);
  await Testimonial.insertMany(testimonials);
  console.log(`Seed complete. Admin email: ${email}`);
  console.log('Change ADMIN_PASSWORD before deployment.');
  process.exit(0);
}

seed().catch((error) => { console.error(error); process.exit(1); });
