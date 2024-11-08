import { create } from "zustand";

export enum Role {
  ADMIN = "admin",
  EMPLOYEE = "employee",
}
export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  position?: string;
}

interface ProfileStore {
  profile: Profile;
  setProfile: (p: Profile) => void;
}
export const useProfileStore = create<ProfileStore>((set: any) => ({
  profile: {
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    role: Role.EMPLOYEE,
  },
  setProfile: (profile) => set(() => ({ profile })),
}));
