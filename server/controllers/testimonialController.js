import Testimonial from '../models/Testimonial.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ approved: true }).sort({ featured: -1, createdAt: -1 });
  res.json(testimonials);
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create({
    customer_name: req.body.customer_name, vehicle: req.body.vehicle,
    rating: Number(req.body.rating), testimonial: req.body.testimonial,
    approved: false, status: 'pending', featured: false, is_demo: false,
  });
  res.status(201).json({ message: 'Thank you! Your testimonial was submitted for review.', id: testimonial._id });
});
