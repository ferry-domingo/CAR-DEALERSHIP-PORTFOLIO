import Vehicle from '../models/Vehicle.js';
import Delivery from '../models/Delivery.js';
import Testimonial from '../models/Testimonial.js';
import Inquiry from '../models/Inquiry.js';
import Profile, { profileDefaults } from '../models/Profile.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { fileUrl, parseJsonField } from '../middleware/upload.js';
import { deleteUpload, deleteUploads } from '../utils/uploads.js';

const bool = (value, fallback = false) => value === undefined ? fallback : value === true || value === 'true';
const slugify = (value) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'vehicle';
async function uniqueVehicleSlug(name, excludeId = null) {
  const base = slugify(name); let slug = base; let suffix = 2;
  while (await Vehicle.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) slug = `${base}-${suffix++}`;
  return slug;
}
const vehiclePayload = (req, current = null) => {
  const retained = parseJsonField(req.body.retained_images, current?.images || []).filter((url) => current?.images?.includes(url));
  if (retained.length + (req.files || []).length > 8) throw Object.assign(new Error('A vehicle can have at most 8 images.'), { statusCode: 422 });
  return {
    name: req.body.name, type: req.body.type, category: req.body.category,
    description: req.body.description, price: req.body.price === '' || req.body.price == null ? null : Number(req.body.price),
    images: [...retained, ...(req.files || []).map(fileUrl)],
    highlights: parseJsonField(req.body.highlights, current?.highlights || []),
    specifications: parseJsonField(req.body.specifications, current?.specifications || []),
    featured: bool(req.body.featured), active: bool(req.body.active, true),
  };
};

const getByIdOr404 = async (Model, id, res) => {
  const doc = await Model.findById(id);
  if (!doc) {
    res.status(404).json({ message: 'Record not found.' });
    return null;
  }
  return doc;
};

export const dashboardOverview = asyncHandler(async (req, res) => {
  const [vehicles, deliveries, testimonials, newInquiries, recentInquiries] = await Promise.all([
    Vehicle.countDocuments(),
    Delivery.countDocuments(),
    Testimonial.countDocuments(),
    Inquiry.countDocuments({ status: 'New' }),
    Inquiry.find().sort({ createdAt: -1 }).limit(6),
  ]);
  res.json({ vehicles, deliveries, testimonials, newInquiries, recentInquiries });
});

export const listVehicles = asyncHandler(async (req, res) => {
  res.json(await Vehicle.find().sort({ createdAt: -1 }));
});
export const createVehicle = asyncHandler(async (req, res) => {
  const payload = vehiclePayload(req);
  payload.slug = await uniqueVehicleSlug(payload.name);
  const vehicle = await Vehicle.create(payload);
  res.status(201).json(vehicle);
});
export const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await getByIdOr404(Vehicle, req.params.id, res); if (!vehicle) return;
  const oldImages = [...vehicle.images];
  const payload = vehiclePayload(req, vehicle);
  payload.slug = await uniqueVehicleSlug(payload.name, vehicle._id);
  Object.assign(vehicle, payload); await vehicle.save();
  await deleteUploads(oldImages.filter((url) => !vehicle.images.includes(url))); res.json(vehicle);
});
export const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await getByIdOr404(Vehicle, req.params.id, res); if (!vehicle) return;
  await vehicle.deleteOne(); await deleteUploads(vehicle.images); res.json({ message: 'Vehicle deleted.' });
});

export const listDeliveries = asyncHandler(async (req, res) => {
  res.json(await Delivery.find().sort({ delivery_date: -1 }));
});
export const createDelivery = asyncHandler(async (req, res) => {
  const delivery = await Delivery.create({ ...req.body, image: fileUrl(req.file) || '/images/delivery-placeholder.svg', visible: bool(req.body.visible, true), is_demo: bool(req.body.is_demo, true) });
  res.status(201).json(delivery);
});
export const updateDelivery = asyncHandler(async (req, res) => {
  const delivery = await getByIdOr404(Delivery, req.params.id, res); if (!delivery) return;
  const oldImage = delivery.image;
  const nextImage = fileUrl(req.file) || (bool(req.body.remove_image) ? '/images/delivery-placeholder.svg' : delivery.image);
  Object.assign(delivery, { ...req.body, image: nextImage, visible: bool(req.body.visible, delivery.visible), is_demo: bool(req.body.is_demo, delivery.is_demo) });
  await delivery.save(); if (nextImage !== oldImage) await deleteUpload(oldImage); res.json(delivery);
});
export const deleteDelivery = asyncHandler(async (req, res) => {
  const delivery = await getByIdOr404(Delivery, req.params.id, res); if (!delivery) return;
  await delivery.deleteOne(); await deleteUpload(delivery.image); res.json({ message: 'Delivery deleted.' });
});

export const listTestimonials = asyncHandler(async (req, res) => {
  res.json(await Testimonial.find().sort({ createdAt: -1 }));
});
export const createTestimonial = asyncHandler(async (req, res) => {
  const approved = bool(req.body.approved);
  const testimonial = await Testimonial.create({ ...req.body, rating: Number(req.body.rating), approved, status: approved ? 'approved' : 'pending', featured: bool(req.body.featured), is_demo: bool(req.body.is_demo, true) });
  res.status(201).json(testimonial);
});
export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await getByIdOr404(Testimonial, req.params.id, res); if (!testimonial) return;
  const approved = bool(req.body.approved, testimonial.approved);
  Object.assign(testimonial, { ...req.body, rating: Number(req.body.rating), approved, status: approved ? 'approved' : 'pending', featured: bool(req.body.featured), is_demo: bool(req.body.is_demo, testimonial.is_demo) });
  await testimonial.save(); res.json(testimonial);
});
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await getByIdOr404(Testimonial, req.params.id, res); if (!testimonial) return;
  await testimonial.deleteOne(); res.json({ message: 'Testimonial deleted.' });
});

export const approveTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await getByIdOr404(Testimonial, req.params.id, res); if (!testimonial) return;
  testimonial.approved = true; testimonial.status = 'approved'; await testimonial.save(); res.json(testimonial);
});
export const rejectTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await getByIdOr404(Testimonial, req.params.id, res); if (!testimonial) return;
  await testimonial.deleteOne(); res.json({ message: 'Testimonial rejected and deleted.' });
});

export const getAdminProfile = asyncHandler(async (_req, res) => {
  const profile = await Profile.findOne({ key: 'public-profile' }).lean();
  const data = profile || profileDefaults;
  res.json({ ...data, facebook_url: data.facebook_url || data.messenger_url || '' });
});
export const updateProfile = asyncHandler(async (req, res) => {
  const current = await Profile.findOne({ key: 'public-profile' });
  const oldPhoto = current?.profile_photo;
  const payload = {
    name: req.body.name, title: req.body.title, bio: req.body.bio, phone: req.body.phone || '',
    email: req.body.email || '', facebook_url: req.body.facebook_url || '', address: req.body.address || '',
    map_url: req.body.map_url || '', profile_photo: fileUrl(req.file) || (bool(req.body.remove_profile_photo) ? profileDefaults.profile_photo : current?.profile_photo || profileDefaults.profile_photo),
  };
  const profile = await Profile.findOneAndUpdate({ key: 'public-profile' }, { $set: payload, $setOnInsert: { key: 'public-profile' } }, { new: true, upsert: true, runValidators: true });
  if (profile.profile_photo !== oldPhoto) await deleteUpload(oldPhoto); res.json(profile);
});

export const listInquiries = asyncHandler(async (req, res) => {
  const filter = {};
  const { status, type, search } = req.query;
  if (status) filter.status = status;
  if (type) filter.inquiry_type = type;
  if (search) {
    const rx = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [{ full_name: rx }, { email: rx }, { preferred_vehicle: rx }];
  }
  res.json(await Inquiry.find(filter).sort({ createdAt: -1 }));
});
export const updateInquiryStatus = asyncHandler(async (req, res) => {
  const inquiry = await getByIdOr404(Inquiry, req.params.id, res); if (!inquiry) return;
  inquiry.status = req.body.status; await inquiry.save(); res.json(inquiry);
});
