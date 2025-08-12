// components/AdminProtectedRoute.tsx
"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";

export default function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  const [checking, setChecking] = useState(true); // initial loading guard

  useEffect(() => {
    // Wait until Redux loads
    if (user === null || user === undefined) return;

    const role = user.role;
    const isLoggedIn = user.isLoggedIn;

    if (
      !isLoggedIn ||
      (role !== "admin" && role !== "owner")
    ) {
      router.replace("/admin/admin-login");
    }

    setChecking(false); // done checking
  }, [user, router]);

  if (checking) return null; // Don't show anything while verifying

  return <>{children}</>;
}
