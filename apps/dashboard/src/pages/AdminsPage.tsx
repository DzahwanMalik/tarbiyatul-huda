import {
  Calendar,
  Crown,
  RotateCw,
  Search,
  Shield,
  ShieldCheck,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { useAdmins } from "@/hooks/useAdmins";
import useAuthStore from "@/store/useAuthStore";
import type {
  AdminRole,
  AdminRoleFilter,
  AdminStatusFilter,
  Profile,
} from "@/types/Profile.type";

const ROLE_TABS: { label: string; value: AdminRoleFilter }[] = [
  { label: "All Roles", value: "all" },
  { label: "Super Admin", value: "SUPER_ADMIN" },
  { label: "Admin", value: "ADMIN" },
];

const STATUS_TABS: { label: string; value: AdminStatusFilter }[] = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const getInitials = (name: string): string => {
  const parts: string[] = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const AdminsPage = (): React.JSX.Element => {
  const {
    filteredAdmins,
    totalCount,
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
  } = useAdmins();

  const currentProfile = useAuthStore((state) => state.profile);

  const [adminToToggleStatus, setAdminToToggleStatus] =
    useState<Profile | null>(null);
  const [adminToChangeRole, setAdminToChangeRole] = useState<{
    admin: Profile;
    nextRole: AdminRole;
  } | null>(null);

  const handleToggleStatus = async (): Promise<void> => {
    if (!adminToToggleStatus) return;

    const newStatus: boolean = !adminToToggleStatus.is_active;
    const success: boolean = await toggleActiveStatus(
      adminToToggleStatus.id,
      adminToToggleStatus.is_active,
    );

    if (success) {
      toast.add({
        title: newStatus ? "Akun Diaktifkan" : "Akun Dinonaktifkan",
        description: `Status akun ${adminToToggleStatus.full_name} berhasil diperbarui.`,
        type: "success",
      });
      setAdminToToggleStatus(null);
    } else {
      toast.add({
        title: "Gagal Mengubah Status",
        description: "Terjadi kesalahan saat mengubah status akun.",
        type: "error",
      });
    }
  };

  const handleChangeRole = async (): Promise<void> => {
    if (!adminToChangeRole) return;

    const { admin, nextRole } = adminToChangeRole;
    const success: boolean = await updateRole(admin.id, nextRole);

    if (success) {
      toast.add({
        title: "Role Diperbarui",
        description: `Role ${admin.full_name} berhasil diubah menjadi ${nextRole}.`,
        type: "success",
      });
      setAdminToChangeRole(null);
    } else {
      toast.add({
        title: "Gagal Memperbarui Role",
        description: "Terjadi kesalahan saat mengubah role admin.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Admins
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola daftar akun administrator, hak akses role, dan status keaktifan sistem.
          </p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Admins Table Card */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="w-full lg:max-w-md">
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <Search className="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Cari nama administrator..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setSearchQuery(e.target.value)
                  }
                  className="h-10"
                />
              </InputGroup>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Role Filter Tabs */}
              <div className="flex items-center rounded-lg border border-border bg-muted/30 p-1">
                {ROLE_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={(): void => setRoleFilter(tab.value)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                      roleFilter === tab.value
                        ? "bg-card text-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center rounded-lg border border-border bg-muted/30 p-1">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={(): void => setStatusFilter(tab.value)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                      statusFilter === tab.value
                        ? "bg-card text-foreground shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Summary Counter & Refresh */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
                  Total: <strong className="text-foreground">{totalCount}</strong>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10"
                  onClick={(): void => refetch()}
                  disabled={isLoading}
                  title="Muat ulang data"
                >
                  <RotateCw
                    className={`size-4 ${isLoading ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Table Content */}
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6 w-[36%]">Administrator</TableHead>
                <TableHead className="w-[20%]">Role</TableHead>
                <TableHead className="w-[18%]">Status</TableHead>
                <TableHead className="w-[14%]">Joined Date</TableHead>
                <TableHead className="w-[12%] text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-9 rounded-full shrink-0" />
                        <div className="flex flex-col gap-1 w-full">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Skeleton className="ml-auto h-8 w-16 rounded-md" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredAdmins.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-36 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users className="size-8 text-muted-foreground/50" />
                      <p className="font-medium text-foreground">
                        Tidak ada administrator ditemukan.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {searchQuery || roleFilter !== "all" || statusFilter !== "all"
                          ? "Coba sesuaikan kata kunci atau filter pencarian Anda."
                          : "Belum ada akun administrator lain yang terdaftar."}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAdmins.map((admin: Profile) => {
                  const isSelf: boolean = admin.id === currentProfile?.id;
                  const nextRole: AdminRole =
                    admin.role === "SUPER_ADMIN" ? "ADMIN" : "SUPER_ADMIN";

                  return (
                    <TableRow key={admin.id}>
                      {/* Name & Avatar */}
                      <TableCell className="pl-6 font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9 border border-border">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                              {getInitials(admin.full_name || "Admin")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">
                                {admin.full_name || "Tanpa Nama"}
                              </span>
                              {isSelf && (
                                <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[10px] font-semibold text-primary">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              ID: {admin.id.substring(0, 8)}...
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Role Badge */}
                      <TableCell>
                        {admin.role === "SUPER_ADMIN" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-chart-1/15 px-2.5 py-0.5 text-xs font-semibold text-chart-1 dark:bg-chart-1/25">
                            <Crown className="size-3" />
                            Super Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                            <Shield className="size-3" />
                            Admin
                          </span>
                        )}
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell>
                        {admin.is_active ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            <span className="size-1.5 rounded-full bg-primary" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                            <span className="size-1.5 rounded-full bg-muted-foreground" />
                            Inactive
                          </span>
                        )}
                      </TableCell>

                      {/* Joined Date */}
                      <TableCell className="text-muted-foreground text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-muted-foreground" />
                          <span>
                            {admin.created_at
                              ? new Date(admin.created_at).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                              : "-"}
                          </span>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Role Change Modal */}
                          <AlertDialog>
                            <AlertDialogTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="size-8 p-0"
                                  disabled={isSelf}
                                  title={
                                    isSelf
                                      ? "Anda tidak dapat mengubah role akun sendiri"
                                      : `Ubah role menjadi ${nextRole}`
                                  }
                                  onClick={(): void =>
                                    setAdminToChangeRole({ admin, nextRole })
                                  }
                                >
                                  <ShieldCheck className="size-4 text-muted-foreground hover:text-foreground" />
                                </Button>
                              }
                            />
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Ubah Role Administrator?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Apakah Anda yakin ingin mengubah role{" "}
                                  <span className="font-semibold text-foreground">
                                    "{adminToChangeRole?.admin.full_name}"
                                  </span>{" "}
                                  dari{" "}
                                  <span className="font-semibold text-foreground">
                                    {adminToChangeRole?.admin.role}
                                  </span>{" "}
                                  menjadi{" "}
                                  <span className="font-semibold text-primary">
                                    {adminToChangeRole?.nextRole}
                                  </span>
                                  ?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel disabled={isUpdating}>
                                  Batal
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={(): void => void handleChangeRole()}
                                  disabled={isUpdating}
                                >
                                  {isUpdating ? "Memproses..." : "Ubah Role"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          {/* Toggle Status Modal */}
                          <AlertDialog>
                            <AlertDialogTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`size-8 p-0 ${
                                    admin.is_active
                                      ? "text-destructive hover:bg-destructive/10"
                                      : "text-primary hover:bg-primary/10"
                                  }`}
                                  disabled={isSelf}
                                  title={
                                    isSelf
                                      ? "Anda tidak dapat menonaktifkan akun sendiri"
                                      : admin.is_active
                                        ? "Nonaktifkan akun"
                                        : "Aktifkan akun"
                                  }
                                  onClick={(): void =>
                                    setAdminToToggleStatus(admin)
                                  }
                                >
                                  {admin.is_active ? (
                                    <UserX className="size-4" />
                                  ) : (
                                    <UserCheck className="size-4" />
                                  )}
                                </Button>
                              }
                            />
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {adminToToggleStatus?.is_active
                                    ? "Nonaktifkan Akun Admin?"
                                    : "Aktifkan Akun Admin?"}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {adminToToggleStatus?.is_active ? (
                                    <>
                                      Apakah Anda yakin ingin menonaktifkan akses
                                      untuk{" "}
                                      <span className="font-semibold text-foreground">
                                        "{adminToToggleStatus?.full_name}"
                                      </span>
                                      ? Akun ini tidak akan dapat login ke
                                      dashboard selama dinonaktifkan.
                                    </>
                                  ) : (
                                    <>
                                      Aktifkan kembali akses untuk{" "}
                                      <span className="font-semibold text-foreground">
                                        "{adminToToggleStatus?.full_name}"
                                      </span>
                                      ?
                                    </>
                                  )}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel disabled={isUpdating}>
                                  Batal
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  variant={
                                    adminToToggleStatus?.is_active
                                      ? "destructive"
                                      : "default"
                                  }
                                  onClick={(): void =>
                                    void handleToggleStatus()
                                  }
                                  disabled={isUpdating}
                                >
                                  {isUpdating
                                    ? "Memproses..."
                                    : adminToToggleStatus?.is_active
                                      ? "Nonaktifkan"
                                      : "Aktifkan"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminsPage;
