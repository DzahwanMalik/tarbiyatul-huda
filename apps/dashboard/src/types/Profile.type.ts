export type AdminRole = "SUPER_ADMIN" | "ADMIN";

export interface Profile {
  id: string;
  role: AdminRole;
  full_name: string;
  is_active: boolean;
  created_at?: string;
}

export type AdminRoleFilter = "all" | "SUPER_ADMIN" | "ADMIN";
export type AdminStatusFilter = "all" | "active" | "inactive";

