export interface Profile {
  id: string;
  role: "SUPER_ADMIN" | "ADMIN";
  full_name: string;
  is_active: boolean;
}
