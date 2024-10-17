import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

type UserState = {
  user: User | null;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  fetchUser: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      set({ user: data.session.user });
    }
  },
  setUser: (user) => set({ user }),
}));
