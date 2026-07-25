import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import type { Profile } from "../types/Profile.type";
import { supabase } from "../lib/supabase";

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

interface AuthAction {
  fetchSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

const useAuthStore = create<AuthState & AuthAction>((set) => ({
  user: null,
  profile: null,
  loading: true,
  fetchSession: async () => {
    set({ loading: true });

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Gagal mengambil profil:", error.message);
          set({ user: null, profile: null });
        } else {
          if (!profileData.is_active) {
            alert(
              "Akun Anda telah dinonaktifkan. Silakan hubungi Super Admin.",
            );
            await supabase.auth.signOut();
            set({ user: null, profile: null });
            return;
          }

          set({ user: session.user, profile: profileData });
        }
      } else {
        set({ user: null, profile: null });
      }
    } catch (err) {
      console.error("Error pada fetchSession:", err);
      set({ user: null, profile: null });
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null, loading: false });
  },
}));

export default useAuthStore;
