import Vehicle from '../models/Vehicle.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getVehicles = asyncHandler(async (req, res) => {
  const filter = { active: true };
  const { category, featured } = req.query;
  if (category && category !== 'All') filter.category = category;
  if (featured === 'true') filter.featured = true;
  const vehicles = await Vehicle.find(filter).sort({ featured: -1, createdAt: -1 });
  res.json(vehicles);
});

export const getVehicleBySlug = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findOne({ slug: req.params.slug, active: true });
  if (!vehicle) return res.status(404).json({ message: 'Vehicle not found.' });
  res.json(vehicle);
});
