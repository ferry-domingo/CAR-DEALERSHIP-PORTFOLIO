import api from './api.js';
import { assetUrl } from '../utils/image.js';
export const getDeliveries = () => api.get('/deliveries').then((r) => r.data.map(x=>({...x,image:assetUrl(x.image)})));
