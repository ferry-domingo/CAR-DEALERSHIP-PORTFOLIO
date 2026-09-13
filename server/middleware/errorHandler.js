export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

import { deleteUploads } from '../utils/uploads.js';

export async function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  const files = req.files ? (Array.isArray(req.files) ? req.files : Object.values(req.files).flat()) : [];
  await deleteUploads([req.file, ...files].filter(Boolean).map((file) => `/uploads/${file.filename}`));
  const status = err.statusCode || (err.name === 'ValidationError' || err.name === 'MulterError' ? 400 : 500);
  const body = { message: err.message || 'Unexpected server error.' };
  if (process.env.NODE_ENV !== 'production') body.stack = err.stack;
  res.status(status).json(body);
}
