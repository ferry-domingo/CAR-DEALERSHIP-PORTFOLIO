import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const uploadsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../uploads');
export async function deleteUpload(url) {
  if (!url?.startsWith('/uploads/')) return;
  const target = path.resolve(uploadsDir, path.basename(url));
  if (path.dirname(target) !== uploadsDir) return;
  await fs.unlink(target).catch((error) => { if (error.code !== 'ENOENT') console.error('Unable to delete upload:', error.message); });
}
export async function deleteUploads(urls = []) { await Promise.all(urls.map(deleteUpload)); }
