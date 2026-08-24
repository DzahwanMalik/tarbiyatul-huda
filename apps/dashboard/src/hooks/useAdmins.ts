import { useCallback, useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase";
import type {
  AdminRole,
  AdminRoleFilter,
  AdminStatusFilter,
  Profile,
} from "@/types/Profile.type";

interface UseAdminsReturn {
  admins: Profile[];
  filteredAdmins: Profile[];
  totalCount: number;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  searchQuery: string;
  roleFilter: AdminRoleFilter;
  statusFilter: AdminStatusFilter;
  setSearchQuery: (query: string) => void;
  setRoleFilter: (role: AdminRoleFilter) => void;
  setStatusFilter: (status: AdminStatusFilter) => void;
  toggleActiveStatus: (id: string, currentStatus: boolean) => Promise<boolean>;
  updateRole: (id: string, newRole: AdminRole) => Promise<boolean>;
  refetch: () => void;
}

export const useAdmins = (): UseAdminsReturn => {
  const [admins, setAdmins] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<AdminRoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<AdminStatusFilter>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState<number>(0);

  const refetch = useCallback((): void => {
    setRefreshIndex((prev: number): number => prev + 1);
  }, []);

  useEffect((): (() => void) => {
    let isMounted = true;

    const loadAdmins = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .in("role", ["ADMIN", "SUPER_ADMIN"])
          .order("created_at", { ascending: false });

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (isMounted) {
          setAdmins((data as Profile[]) || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Gagal memuat data administrator",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadAdmins();

    return (): void => {
      isMounted = false;
    };
  }, [refreshIndex]);

  const filteredAdmins: Profile[] = useMemo((): Profile[] => {
    return admins.filter((admin: Profile): boolean => {
      // Search by full_name
      if (searchQuery.trim()) {
        const q: string = searchQuery.toLowerCase().trim();
        if (!admin.full_name.toLowerCase().includes(q)) {
          return false;
        }
      }

      // Role filter
      if (roleFilter !== "all" && admin.role !== roleFilter) {
        return false;
      }

      // Status filter
      if (statusFilter === "active" && !admin.is_active) {
        return false;
      }
      if (statusFilter === "inactive" && admin.is_active) {
        return false;
      }

      return true;
    });
  }, [admins, searchQuery, roleFilter, statusFilter]);

  const toggleActiveStatus = async (
    id: string,
    currentStatus: boolean,
  ): Promise<boolean> => {
    try {
      setIsUpdating(true);
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      refetch();
      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memperbarui status aktif akun",
      );
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const updateRole = async (
    id: string,
    newRole: AdminRole,
  ): Promise<boolean> => {
    try {
      setIsUpdating(true);
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      refetch();
      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal memperbarui role administrator",
      );
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    admins,
    filteredAdmins,
    totalCount: admins.length,
    isLoading,
    isUpdating,
    error,
    searchQuery,
    roleFilter,
    statusFilter,
    setSearchQuery,
    setRoleFilter,
    setStatusFilter,
    toggleActiveStatus,
    updateRole,
    refetch,
  };
};
