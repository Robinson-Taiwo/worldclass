"use client";

import {
  Home,
  Settings,
  User2,
  Bell,
  Trophy,
  ChevronUp,
  FileBox,
  FileCode2Icon,
  Badge,
  ChartCandlestickIcon,
  Scale3dIcon,
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

// Top navigation
const mainMenu = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Settings", url: "/settings", icon: Settings },
  {
    title: "Typescript modules",
    url: "/typescript-modules",
    icon: FileBox,
  },
  {
    title: "Next.js modules",
    url: "/nextjs-modules",
    icon: FileCode2Icon,
  },
  { title: "Badges", url: "/badges", icon: Badge },
  {
    title: "Streak Analysis",
    url: "/streaks",
    icon: ChartCandlestickIcon,
  },
  { title: "Your Progress", url: "/progress", icon: Scale3dIcon },
];

export function AppSidebar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);

  const handleLogout = async () => {
    try {
      await logout(); // Firebase logout
      dispatch(clearUser()); // Clear from Redux store
      router.push("/authentication/login");

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
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
                  {/* <span>{!user?.email ? "Anonymous" : user?.username}</span> */}
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
