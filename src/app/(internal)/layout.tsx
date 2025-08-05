import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <AppSidebar />
        <main className="overflow-x-hidden  w-screen">
          <div className="">
            <SidebarTrigger />
          </div>
          <div className="flex pb-8 flex-col ">
            <Navbar />
            {children}
          </div>

          <Footer />
        </main>
      </SidebarProvider>{" "}
    </div>
  );
}
