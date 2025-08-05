import { UserCircle2 } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center border-b border-b-border  justify-between w-full px-6 pb-4 flex-row">
        <h1 className="font-bold text-3xl   ">WorldClass.io</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserCircle2 className="mr-2 w-8 h-8 " />
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
        </DropdownMenu>{" "}
      </div>
    </>
  );
};

export default Navbar;
