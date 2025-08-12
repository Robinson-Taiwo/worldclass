"use client";

import {
  Home,
  Settings,
  User2,
  Bell,
  Trophy,
  ChevronUp,
  ChartColumn,
  ChartAreaIcon,
  Scale3dIcon,
  Dock,
  ChartCandlestickIcon,
  Badge,
  FileBox,
  FilePlusIcon,
  FileAxis3DIcon,
  BadgePlus,
  UsersIcon,
  //   ChevronDown,
} from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "@/components/ui/collapsible";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/authHelpers";
import { clearUser } from "@/store/slices/UserSlice"; // adjust path if needed
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import useHasMounted from "@/hooksa/hook";

// Top navigation
const mainMenu = [
  { title: "Home", url: "/admin/admin-dashboard", icon: Home },
  { title: "Notifications", url: "/admin/admin-notifications", icon: Bell },
  { title: "Leaderboard", url: "/admin/admin-leaderboard", icon: Trophy },
  { title: "Settings", url: "/admin/settings", icon: Settings },
  { title: "Users", url: "/admin/users", icon: User2 },
  {
    title: "Streak Analysis",
    url: "/admin/streak-analysis",
    icon: ChartCandlestickIcon,
  },
  {
    title: "Module Analysis",
    url: "/admin/module-analysis",
    icon: ChartAreaIcon,
  },
  {
    title: "Progress report",
    url: "/admin/progress-report",
    icon: Scale3dIcon,
  },
  { title: "Submissions", url: "/admin/submissions", icon: Dock },
  {
    title: "Github Analysis",
    url: "/admin/github-analysis",
    icon: ChartColumn,
  },
  { title: "Badges", url: "/admin/badges", icon: Badge },
  {
    title: "Typescript modules",
    url: "/admin/typescript-modules",
    icon: FileBox,
  },
  {
    title: "Next.js modules",
    url: " /admin/nextjs-modules",
    icon: FileAxis3DIcon,
  },
  {
    title: "Add Typescript modules",
    url: "/admin/add-typescript-modules",
    icon: BadgePlus,
  },
  {
    title: "Add Next.js modules",
    url: "/admin/add-nextjs-modules",
    icon: FilePlusIcon,
  },
  {
    title: "Roles",
    url: "/admin/roles",
    icon: UsersIcon,
  },
];

export function AdminAppSidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const hasMounted = useHasMounted();

  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = async () => {
    try {
      await logout(); // Firebase logout
      dispatch(clearUser()); // Clear from Redux store
      router.push("/admin/admin-login");

      console.log("Logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Routes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-6">
              {mainMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 className="mr-2 w-4 h-4" />
                  <span>{hasMounted && !user?.username && "Anonymous"}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top">
                <DropdownMenuItem asChild>
                  <p onClick={handleLogout}>Log out</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
