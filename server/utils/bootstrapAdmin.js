import bcrypt from 'bcrypt';
import User from '../models/User.js';

export async function bootstrapAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email && !password) {
    console.warn('Admin bootstrap skipped: ADMIN_EMAIL and ADMIN_PASSWORD are not configured.');
    return;
  }
  if (!email || !password) throw new Error('Both ADMIN_EMAIL and ADMIN_PASSWORD must be configured');
  if (password.length < 12) throw new Error('ADMIN_PASSWORD must contain at least 12 characters');

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) return;

  const hash = await bcrypt.hash(password, 12);
  await User.create({ email, password: hash, role: 'admin' });
  console.log(`Initial admin account created for ${email}`);
}
