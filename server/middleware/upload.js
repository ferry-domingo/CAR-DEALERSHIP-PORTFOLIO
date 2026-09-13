import crypto from 'crypto';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const uploadsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../uploads');
fs.mkdirSync(uploadsDir, { recursive: true });
const extensions = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(16).toString('hex')}${extensions[file.mimetype] || ''}`),
});
const fileFilter = (_req, file, cb) => extensions[file.mimetype] ? cb(null, true) : cb(Object.assign(new Error('Only JPEG, PNG, and WebP images are allowed.'), { statusCode: 400 }));
export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024, files: 8 } });
export const fileUrl = (file) => file ? `/uploads/${file.filename}` : '';
export async function validateImageSignatures(req, _res, next) {
  const files = req.files ? (Array.isArray(req.files) ? req.files : Object.values(req.files).flat()) : [];
  const uploaded = [req.file, ...files].filter(Boolean);
  try {
    for (const file of uploaded) {
      const handle = await fsPromises.open(file.path, 'r');
      const buffer = Buffer.alloc(12); await handle.read(buffer, 0, 12, 0); await handle.close();
      const jpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
      const png = buffer.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
      const webp = buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP';
      if (!jpeg && !png && !webp) throw Object.assign(new Error('Uploaded file content is not a valid JPEG, PNG, or WebP image.'), { statusCode: 400 });
    }
    next();
  } catch (error) { next(error); }
}
export const parseJsonField = (value, fallback) => {
  if (value === undefined) return fallback;
  try { return JSON.parse(value); } catch { throw Object.assign(new Error('Invalid structured form data.'), { statusCode: 422 }); }
};
