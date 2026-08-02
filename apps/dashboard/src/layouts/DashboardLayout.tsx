import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import useAuthStore from "../store/useAuthStore";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/molecules/AppSidebar";
import { Spinner } from "@/components/ui/spinner";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { fetchSession, loading, user } = useAuthStore();

  useEffect(() => {
    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        useAuthStore.setState({ user: null, profile: null });
        navigate("/login", { replace: true });
      } else if (event === "TOKEN_REFRESHED") {
        fetchSession();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchSession, navigate]);

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-accent p-2">
        {loading ? (
          <div className="flex min-h-screen items-center justify-center">
            <Spinner className="size-10" />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
