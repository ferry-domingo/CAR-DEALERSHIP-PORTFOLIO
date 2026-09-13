import { create } from 'zustand';
export const useInquiryStore = create((set) => ({
  preferredVehicle: '',
  setPreferredVehicle: (preferredVehicle) => set({ preferredVehicle }),
  clearPreferredVehicle: () => set({ preferredVehicle: '' }),
}));
