import express from 'express';
import { body } from 'express-validator';
import { login } from '../controllers/authController.js';
import * as admin from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { upload, validateImageSignatures } from '../middleware/upload.js';

const router = express.Router();
const loginRules = [body('email').isEmail().normalizeEmail(), body('password').isLength({ min: 6 })];
const vehicleRules = [
  body('name').trim().notEmpty().withMessage('Vehicle name is required.'),
  body('type').trim().notEmpty().withMessage('Vehicle type is required.'),
  body('category').isIn(['EV', 'Hybrid', 'Sedan', 'SUV']).withMessage('Select a valid category.'),
  body('description').optional({ checkFalsy: true }).trim().isLength({ max: 3000 }).withMessage('Description must be 3000 characters or fewer.'),
  body('price').optional({ checkFalsy: true, nullable: true }).isFloat({ min: 0 }).withMessage('Price must be zero or greater.'),
];
const deliveryRules = [
  body('customer_name').trim().notEmpty().withMessage('Customer name is required.'),
  body('vehicle').trim().notEmpty().withMessage('Vehicle is required.'),
  body('delivery_date').isISO8601().withMessage('Select a valid delivery date.'),
  body('story').trim().isLength({ min: 10 }).withMessage('Story must be at least 10 characters.'),
];
const testimonialRules = [
  body('customer_name').trim().notEmpty().withMessage('Customer name is required.'),
  body('vehicle').trim().notEmpty().withMessage('Vehicle is required.'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5.'),
  body('testimonial').trim().isLength({ min: 10 }).withMessage('Testimonial must be at least 10 characters.'),
];

router.post('/login', loginRules, validate, login);
router.use(protect);
router.get('/dashboard', admin.dashboardOverview);

router.route('/vehicles').get(admin.listVehicles).post(upload.array('images', 8), validateImageSignatures, vehicleRules, validate, admin.createVehicle);
router.route('/vehicles/:id').put(upload.array('images', 8), validateImageSignatures, vehicleRules, validate, admin.updateVehicle).delete(admin.deleteVehicle);
router.route('/deliveries').get(admin.listDeliveries).post(upload.single('image'), validateImageSignatures, deliveryRules, validate, admin.createDelivery);
router.route('/deliveries/:id').put(upload.single('image'), validateImageSignatures, deliveryRules, validate, admin.updateDelivery).delete(admin.deleteDelivery);
router.route('/testimonials').get(admin.listTestimonials).post(upload.none(), testimonialRules, validate, admin.createTestimonial);
router.route('/testimonials/:id').put(upload.none(), testimonialRules, validate, admin.updateTestimonial).delete(admin.deleteTestimonial);
router.patch('/testimonials/:id/approve', admin.approveTestimonial);
router.delete('/testimonials/:id/reject', admin.rejectTestimonial);
const optionalUrl = (field, label) => body(field).optional({ checkFalsy: true }).isURL({ protocols: ['http', 'https'], require_protocol: true }).withMessage(`${label} must start with http:// or https://.`);
const profileRules = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.'),
  body('title').trim().isLength({ min: 2, max: 120 }).withMessage('Professional title must be between 2 and 120 characters.'),
  body('bio').trim().isLength({ min: 10, max: 2000 }).withMessage('Biography must be between 10 and 2000 characters.'),
  body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 40 }).withMessage('Phone number is too long.'),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
  body('address').optional({ checkFalsy: true }).trim().isLength({ max: 200 }).withMessage('Address must be 200 characters or fewer.'),
  optionalUrl('facebook_url', 'Facebook URL'), optionalUrl('map_url', 'Map URL'),
];
router.route('/profile').get(admin.getAdminProfile).put(upload.single('profile_photo'), validateImageSignatures, profileRules, validate, admin.updateProfile);
router.get('/inquiries', admin.listInquiries);
router.put('/inquiries/:id/status', body('status').isIn(['New', 'Contacted', 'Closed']), validate, admin.updateInquiryStatus);

export default router;
