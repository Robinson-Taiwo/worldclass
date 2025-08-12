"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateUser } from "@/store/slices/UserSlice";
import { Button } from "@/components/ui/button";

const AdminRoles = () => {
  const disapatch = useDispatch();
  const role = useSelector((state: RootState) => state.user.user?.role);
  // const user = useSelector((state: RootState) => state.user.user);

  const changerole = () => {
    disapatch(
      updateUser({
        role: "admin",
      })
    );
  };

  const changeroleToOwner = () => {
    disapatch(
      updateUser({
        role: "owner",
      })
    );
  };

  return (
    <div className="flex items-center justify-center h-[90vh] w-full  flex-col">
      this is your role:{" "}
      {!role ? "not logged in (log in to see your role)" : role}
      <Button
        className="w-fit mt-4 bg-orange-500 px-4 py-2"
        onClick={changerole}
      >
        change role
      </Button>
      <Button
        className="w-fit mt-4 bg-orange-500 px-4 py-2"
        onClick={changeroleToOwner}
      >
        change role to owner
      </Button>
    </div>
  );
};

export default AdminRoles;
