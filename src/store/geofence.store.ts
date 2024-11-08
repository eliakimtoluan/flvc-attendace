import { create } from "zustand";

export interface Geofence {
  latitude: number;
  longitude: number;
  radius: number;
}
interface GeofenceStore {
  geofence: Geofence;
  setGeofence: (p: Geofence) => void;
}
export const useGeofenceStore = create<GeofenceStore>((set: any) => ({
  geofence: {
    latitude: 0,
    longitude: 0,
    radius: 0,
  },
  setGeofence: (geofence) => set(() => ({ geofence })),
}));
