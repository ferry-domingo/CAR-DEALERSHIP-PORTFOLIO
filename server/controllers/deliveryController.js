import Delivery from '../models/Delivery.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDeliveries = asyncHandler(async (req, res) => {
  const deliveries = await Delivery.find({ visible: true }).sort({ delivery_date: -1 });
  res.json(deliveries);
});
