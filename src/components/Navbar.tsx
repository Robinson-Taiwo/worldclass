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
      <div className="flex items-center border-b border-b-border  justify-end w-full px-6 pb-4 flex-row">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserCircle2 className="mr-2 w-6 h-4=6" />
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
