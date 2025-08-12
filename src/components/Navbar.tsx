"use client";

import { UserCircle2 } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/authHelpers";
import { clearUser } from "@/store/slices/UserSlice"; // adjust path if needed
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout(); // Firebase logout
      dispatch(clearUser()); // Clear from Redux store
      router.push("/authentication/ogin");

      console.log("Logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <>
      <div className="flex items-center border-b border-b-border  justify-between w-full px-6 pb-4 flex-row">
        <h1 className="font-bold lg:text-3xl   ">WorldClass.io</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserCircle2 className="mr-2 lg:w-8 lg:h-8 w-6 h-6 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account">Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <p onClick={handleLogout}>Log out</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>{" "}
      </div>
    </>
  );
};

export default Navbar;
