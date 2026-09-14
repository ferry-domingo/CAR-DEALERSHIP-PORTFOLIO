export const imageFallback = '/images/hero-ev.svg';
const configuredApiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');
const apiBase = configuredApiUrl.endsWith('/api') ? configuredApiUrl : `${configuredApiUrl}/api`;
export function assetUrl(value) {
  if (!value?.startsWith('/uploads/')) return value;
  try { return new URL(value, new URL(apiBase).origin).toString(); } catch { return value; }
}
export function handleImageError(event) {
  if (event.currentTarget.dataset.fallbackApplied) return;
  event.currentTarget.dataset.fallbackApplied = 'true';
  event.currentTarget.src = imageFallback;
}
