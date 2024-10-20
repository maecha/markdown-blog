import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { supabase } from "@/lib/supabaseClient";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId, setUserId, clearAuth } = useAuthStore();
  const { setUser, fetchUser } = useUserStore();

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        if (session) {
          setUserId(session.user.id);
          setUser(session.user);
        }
      } catch (error) {
        console.error("セッション取得エラー:", error);
        clearAuth();
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUserId(session.user.id);
          setUser(session.user);
        } else {
          clearAuth();
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUserId, setUser, clearAuth]);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId, fetchUser]);

  return <>{children}</>;
};
