import Inquiry from '../models/Inquiry.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.create({
    full_name: req.body.full_name,
    contact_number: req.body.contact_number,
    email: req.body.email,
    preferred_vehicle: req.body.preferred_vehicle || '',
    inquiry_type: req.body.inquiry_type,
    message: req.body.message,
  });
  res.status(201).json({ message: 'Thank you! Your inquiry has been received.', id: inquiry._id });
});
