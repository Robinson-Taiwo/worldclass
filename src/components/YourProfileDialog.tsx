"use client";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/slices/UserSlice";

// Update your zod schema to make photoURL optional since we'll generate it
const profileSchema = z.object({
  displayName: z.string().min(2, "Username too short"),
  photo: z.any().optional(), // We’ll validate file separately
});

type ProfileFormData = {
  displayName: string;
  photo?: FileList;
};

export function YourProfileDialog() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileFormData) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("No authenticated user.");
      return;
    }

    let photoURL: string | null = null;

    if (data.photo && data.photo.length > 0) {
      try {
        const file = data.photo[0];
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload profile picture.");
        return;
      }
    }

    try {
      await updateProfile(user, {
        displayName: data.displayName,
        photoURL: photoURL || user.photoURL,
      });

      dispatch(
        updateUser({
          username: data.displayName,
          photoURL: photoURL || user.photoURL || null,
        })
      );

      toast.success("Profile updated successfully!");
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Your Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <Input placeholder="e.g. TaiwoDev" {...register("displayName")} />
            {errors.displayName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.displayName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Picture
            </label>
            <Input type="file" accept="image/*" {...register("photo")} />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}