import {
  ChartBarStacked,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Settings,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "../ui/sidebar";
import { NavLink } from "react-router";
import { Button } from "../ui/button";
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
} from "../ui/alert-dialog";
import { toast } from "../ui/toast";
import useAuthStore from "../../store/useAuthStore";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Menu {
  to: string;
  label: string;
  icon: LucideIcon;
}

const MENUS: Menu[] = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/articles",
    label: "Articles",
    icon: Newspaper,
  },
  {
    to: "/categories",
    label: "Categories",
    icon: ChartBarStacked,
  },
  {
    to: "/admins",
    label: "Admins",
    icon: ShieldCheck,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const signOut = useAuthStore((state) => state.signOut);
  const profile = useAuthStore((state) => state.profile);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await toast.promise(signOut(), {
        loading: { title: "Sedang keluar...", type: "loading" },
        success: { title: "Logout Berhasil!", type: "success" },
        error: (err: Error) => ({
          title: "Logout Gagal!",
          description: err.message,
          type: "error",
        }),
      });
    } catch {
      // Error is already handled by toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Card className="flex flex-row items-center gap-3 p-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
          <div className="w-full">
            <CardHeader className="font-semibold p-0">Welcome,</CardHeader>
            <CardContent className="p-0 text-xs">
              {profile?.full_name}
            </CardContent>
          </div>
        </Card>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {MENUS.map((menu) => (
              <NavLink to={menu.to} key={menu.to} tabIndex={-1}>
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive}>
                    <menu.icon />
                    {menu.label}
                  </SidebarMenuButton>
                )}
              </NavLink>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline">
          <HelpCircle />
          Help Center
        </Button>
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button variant="destructive">
                <LogOut />
                Logout
              </Button>
            }
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah anda yakin ingin keluar dari aplikasi?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleLogout} disabled={loading}>
                {loading ? "Loading..." : "Logout"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
