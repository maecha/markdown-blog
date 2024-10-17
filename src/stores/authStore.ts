import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@supabase/supabase-js";

type AuthState = {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
