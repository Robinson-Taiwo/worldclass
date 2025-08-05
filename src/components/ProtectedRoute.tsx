// components/ProtectedRoute.tsx
"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/store/store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const LoggedIn = useSelector(
    (state: RootState) => state.user.user?.isLoggedIn
  ); // from redux
  const router = useRouter();

  useEffect(() => {
    if (!LoggedIn) {
      router.replace("/authentication/login");
    }
  }, [LoggedIn, router]);

  if (!LoggedIn) {
    // Optionally show loading while redirecting
    return (
      <div className="text-center h-full w-full items-center h-center  justify-center flex flex-col mt-10">
        {" "}
        <svg
          className="w-20 h-20 animate-spin text-orange-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        Redirecting.....
      </div>
    );
  }

  return <>{children}</>;
}
