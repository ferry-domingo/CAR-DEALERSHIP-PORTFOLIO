import api from './api.js';
export const getProfile = () => api.get('/profile').then((r) => r.data);
