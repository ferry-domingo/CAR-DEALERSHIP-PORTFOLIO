import api from './api.js';
export const createInquiry = (payload) => api.post('/inquiries', payload).then((r) => r.data);
