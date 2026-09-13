import Profile, { profileDefaults } from '../models/Profile.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getProfile = asyncHandler(async (_req, res) => {
  const profile = await Profile.findOne({ key: 'public-profile' }).lean();
  const data = profile || profileDefaults;
  res.json({ ...data, facebook_url: data.facebook_url || data.messenger_url || '' });
});
