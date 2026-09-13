import { validationResult } from 'express-validator';
import { deleteUploads } from '../utils/uploads.js';

export async function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const files = req.files ? (Array.isArray(req.files) ? req.files : Object.values(req.files).flat()) : [];
    await deleteUploads([req.file, ...files].filter(Boolean).map((file) => `/uploads/${file.filename}`));
    return res.status(422).json({
      message: errors.array()[0]?.msg || 'Please correct the highlighted fields.',
      errors: errors.array().map(({ path, msg }) => ({ field: path, message: msg })),
    });
  }
  next();
}
