import api from './api.js';
import { assetUrl } from '../utils/image.js';
const mapVehicle=(v)=>({...v,images:(v.images||[]).map(assetUrl)});
export const getVehicles = (params = {}) => api.get('/vehicles', { params }).then((r) => r.data.map(mapVehicle));
export const getVehicle = (slug) => api.get(`/vehicles/${slug}`).then((r) => mapVehicle(r.data));
