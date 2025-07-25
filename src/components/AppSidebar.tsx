"use client";

import {
  Home,
  Settings,
  User2,
  Bell,
  Trophy,
  ChevronUp,
  ChevronDown,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Top navigation
const mainMenu = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Settings", url: "/settings", icon: Settings },
];

// Organized TypeScript curriculum groups
const tsCurriculum = [
  {
    label: "Getting Started",
    items: [
      { title: "TS for New Programmer", path: "ts/get-started/new-programmer" },
      { title: "TS for JS Programmer", path: "ts/get-started/js-programmer" },
    ],
  },
  {
    label: "Basic Concepts",
    items: [
      { title: "Basic Types", path: "ts/handbook/2/basic-types.html" },
      { title: "Functions", path: "ts/handbook/2/functions.html" },
      { title: "Objects", path: "ts/handbook/2/objects.html" },
      { title: "Type Aliases", path: "ts/handbook/2/type-aliases.html" },
    ],
  },
  {
    label: "Advanced Types",
    items: [
      { title: "Narrowing", path: "ts/handbook/2/narrowing.html" },
      { title: "Generics", path: "ts/handbook/2/generics.html" },
      { title: "Keyof/Lookup Types", path: "ts/handbook/2/keyof-types.html" },
    ],
  },
  {
    label: "Classes & Interfaces",
    items: [
      { title: "Classes", path: "ts/handbook/2/classes.html" },
      { title: "Interfaces", path: "ts/handbook/2/interfaces.html" },
      { title: "Inheritance", path: "ts/handbook/2/classes.html#inheritance" },
    ],
  },
  {
    label: "Modules & Config",
    items: [
      { title: "Modules", path: "ts/handbook/modules.html" },
      { title: "Project Config", path: "ts/handbook/tsconfig-json.html" },
    ],
  },
  {
    label: "Tooling & Utility",
    items: [
      {
        title: "Type Guards",
        path: "ts/handbook/advanced-types.html#user-defined-type-guards",
      },
      { title: "Utility Types", path: "ts/handbook/utility-types.html" },
    ],
  },
];

// Next.js learn modules
const nextModules = [
  { title: "Introduction", path: "nextjs/learn/introduction" },
  { title: "Getting Started", path: "nextjs/learn/getting-started" },
  { title: "CSS Styling", path: "nextjs/learn/css-styling" },
  { title: "Fonts & Images", path: "nextjs/learn/fonts-images" },
  { title: "Layouts & Pages", path: "nextjs/learn/layouts-pages" },
  { title: "Navigation", path: "nextjs/learn/navigation" },
  { title: "Database Setup", path: "nextjs/learn/database-setup" },
  { title: "Data Fetching", path: "nextjs/learn/data-fetching" },
  { title: "Static & Dynamic Rendering", path: "nextjs/learn/static-dynamic" },
  { title: "Streaming", path: "nextjs/learn/streaming" },
  { title: "Search & Pagination", path: "nextjs/learn/search-pagination" },
  { title: "Mutating Data", path: "nextjs/learn/mutating-data" },
  { title: "Error Handling", path: "nextjs/learn/error-handling" },
  { title: "Accessibility", path: "nextjs/learn/accessibility" },
  { title: "Authentication", path: "nextjs/learn/authentication" },
  { title: "Metadata", path: "nextjs/learn/metadata" },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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

        {/* TypeScript Curriculum */}
        {/* <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Learn TypeScript
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {tsCurriculum.map((section) => (
                    <Collapsible
                      key={section.label}
                      defaultOpen
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            {section.label}
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {section.items.map((item) => (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={`/${item.path}`}>
                                    {item.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible> */}

        {/* Next.js Curriculum
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Learn Next.js
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nextModules.map((mod) => (
                    <SidebarMenuItem key={mod.title}>
                      <SidebarMenuButton asChild>
                        <Link href={`/curriculum/${mod.path}`}>
                          <span>{mod.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible> */}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 className="mr-2 w-4 h-4" />
                  <span>Taiwo</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/logout">Log out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
