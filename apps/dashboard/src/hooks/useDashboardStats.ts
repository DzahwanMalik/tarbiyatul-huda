import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import type { DashboardStats } from "@/types/Dashboard.type";

interface UseDashboardStatsReturn {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
}

export const useDashboardStats = (): UseDashboardStatsReturn => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect((): void => {
    const fetchStats = async (): Promise<void> => {
      try {
        setIsLoading(true);

        const [
          { count: totalArticles, error: articlesError },
          { count: activeAdmins, error: adminsError },
          { count: totalCategories, error: categoriesError },
          { count: pendingReview, error: pendingError },
        ] = await Promise.all([
          supabase.from("articles").select("*", { count: "exact", head: true }),
          supabase
            .from("profiles")
            .select("*", { count: "exact", head: true })
            .in("role", ["ADMIN", "SUPER_ADMIN"])
            .eq("is_active", true),
          supabase
            .from("categories")
            .select("*", { count: "exact", head: true }),
          supabase
            .from("articles")
            .select("*", { count: "exact", head: true })
            .eq("is_published", false),
        ]);

        if (articlesError || adminsError || categoriesError || pendingError) {
          throw new Error("Gagal mengambil data statistik");
        }

        setStats({
          totalArticles: totalArticles ?? 0,
          activeAdmins: activeAdmins ?? 0,
          totalCategories: totalCategories ?? 0,
          pendingReview: pendingReview ?? 0,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan yang tidak diketahui",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
};
