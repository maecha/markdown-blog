import { createContext, ReactNode, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          clearAuth();
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUser, clearAuth]);

  return (
    <AuthContext.Provider value={{ user, setUser, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
