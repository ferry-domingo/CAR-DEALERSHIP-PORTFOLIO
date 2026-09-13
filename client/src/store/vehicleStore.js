import { create } from 'zustand';
import { getVehicles } from '../services/vehicleService.js';

export const useVehicleStore = create((set) => ({
  vehicles: [], loading: false, error: '',
  fetchVehicles: async (params) => {
    set({ loading: true, error: '' });
    try { set({ vehicles: await getVehicles(params), loading: false }); }
    catch (error) { set({ error: error.response?.data?.message || 'Unable to load vehicles.', loading: false }); }
  },
}));
