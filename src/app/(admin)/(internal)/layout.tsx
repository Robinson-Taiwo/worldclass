import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import AdminNavbar from "@/components/AdminNavbar";
import { AdminAppSidebar } from "@/components/AdminSidebar";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
// import ProtectedRoute from "@/components/ProtectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Worldclass",
  description:
    "a project to help you become world class in next and typescript with their documentations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
      <SidebarProvider>
        <AdminAppSidebar />
        <main className="overflow-x-hidden h-screen min-h-screen  w-screen">
          <div className="">
            <SidebarTrigger />
          </div>
          <div className="flex pb-8 flex-col ">
            <AdminNavbar />
            <AdminProtectedRoute>{children}</AdminProtectedRoute>
          </div>
        </main>
      </SidebarProvider>{" "}
    </div>
  );
}
