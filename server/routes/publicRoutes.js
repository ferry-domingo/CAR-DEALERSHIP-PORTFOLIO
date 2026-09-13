import express from 'express';
import rateLimit from 'express-rate-limit';
import { body } from 'express-validator';
import { getVehicles, getVehicleBySlug } from '../controllers/vehicleController.js';
import { getDeliveries } from '../controllers/deliveryController.js';
import { getTestimonials, createTestimonial } from '../controllers/testimonialController.js';
import { getProfile } from '../controllers/profileController.js';
import { createInquiry } from '../controllers/inquiryController.js';
import { validate } from '../middleware/validate.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();
const inquiryLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false });
const testimonialLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 3, standardHeaders: 'draft-7', legacyHeaders: false });

router.get('/vehicles', getVehicles);
router.get('/vehicles/:slug', getVehicleBySlug);
router.get('/deliveries', getDeliveries);
router.get('/testimonials', getTestimonials);
router.post('/testimonials', testimonialLimiter, upload.none(), [
  body('customer_name').trim().isLength({ min: 2, max: 100 }).withMessage('Enter your name.'),
  body('vehicle').trim().isLength({ min: 2, max: 120 }).withMessage('Enter the vehicle purchased.'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Select a rating from 1 to 5.'),
  body('testimonial').trim().isLength({ min: 10, max: 2000 }).withMessage('Your testimonial must be between 10 and 2000 characters.'),
], validate, createTestimonial);
router.get('/profile', getProfile);
router.post('/inquiries', inquiryLimiter, [
  body('full_name').trim().isLength({ min: 2, max: 100 }).withMessage('Enter your full name.'),
  body('contact_number').trim().isLength({ min: 7, max: 30 }).withMessage('Enter a valid contact number.'),
  body('email').isEmail().normalizeEmail().withMessage('Enter a valid email address.'),
  body('preferred_vehicle').optional({ checkFalsy: true }).trim().isLength({ max: 120 }),
  body('inquiry_type').isIn(['Vehicle Inquiry', 'Request a Quote', 'Test Drive', 'Financing Inquiry', 'General Inquiry']).withMessage('Select a valid inquiry type.'),
  body('message').trim().isLength({ min: 5, max: 2000 }).withMessage('Message must be at least 5 characters.'),
], validate, createInquiry);

export default router;
