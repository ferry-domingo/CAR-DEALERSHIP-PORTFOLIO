import api from './api.js';
export const loginAdmin = (credentials) => api.post('/admin/login', credentials).then((r) => r.data);
