import type { LucideIcon } from "lucide-react";

export interface DashboardStats {
  totalArticles: number;
  activeAdmins: number;
  totalAdmins: number;
  totalCategories: number;
  pendingReview: number;
}

export interface DashboardCardItem {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  trend?: boolean;
}
