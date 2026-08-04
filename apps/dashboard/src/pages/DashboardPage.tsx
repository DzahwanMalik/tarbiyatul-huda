import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FolderTree,
  PlusCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import type { DashboardStats } from "@/types/Dashboard.type";

type DashboardCardItem = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  trend?: boolean;
};

const getDashboardCards = (
  stats: DashboardStats | null,
): DashboardCardItem[] => [
  {
    title: "Total Articles",
    value: stats ? stats.totalArticles.toLocaleString() : "0",
    description: "+12% this month", // Mock trend since no historical data yet
    icon: FileText,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    trend: true,
  },
  {
    title: "Active Admins",
    value: stats ? stats.activeAdmins.toLocaleString() : "0",
    description: "Across 3 regions", // Mock regions
    icon: Users,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Categories",
    value: stats ? stats.totalCategories.toLocaleString() : "0",
    description: stats
      ? `${stats.pendingReview} pending review`
      : "0 pending review",
    icon: FolderTree,
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
  },
];

const DashboardPage = (): React.JSX.Element => {
  const { stats, isLoading, error } = useDashboardStats();

  const cards: DashboardCardItem[] = getDashboardCards(stats);

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            System overview and recent activity.
          </p>
        </div>
        <Button>
          <PlusCircle />
          Create New Article
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <CardAction>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${card.iconBg}`}
                  >
                    <Icon className={`h-4 w-4 ${card.iconColor}`} />
                  </div>
                </CardAction>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="mb-1 h-9 w-20" />
                ) : (
                  <div className="text-3xl font-bold text-foreground">
                    {card.value}
                  </div>
                )}

                <div className="mt-1 flex items-center text-sm">
                  {card.trend && (
                    <TrendingUp className="mr-1 h-4 w-4 text-primary" />
                  )}
                  {isLoading ? (
                    <Skeleton className="ml-1 h-4 w-32" />
                  ) : (
                    <span
                      className={
                        card.trend
                          ? "font-medium text-primary"
                          : "text-muted-foreground"
                      }
                    >
                      {card.description}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
