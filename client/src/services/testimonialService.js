import api from './api.js';
export const getTestimonials = () => api.get('/testimonials').then((r) => r.data);
export const submitTestimonial = (payload) => api.post('/testimonials', payload).then((r) => r.data);
