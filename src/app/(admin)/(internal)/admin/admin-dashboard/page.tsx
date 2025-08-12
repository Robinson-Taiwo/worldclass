"use client";

import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { YourProfileDialog } from "@/components/YourProfileDialog";
import Image from "next/image";

const Page = () => {
  const [user, setUser] = useState<import("firebase/auth").User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const router = useRouter();
  //

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is signed in:", currentUser.displayName);
        setUser(currentUser);
        console.log(currentUser);
      } else {
        console.log("No user is signed in.");
        setUser(null);
      }
      setLoading(false);
    });

    const needsProfileUpdate =
      !user?.displayName || !user?.photoURL || !user.phoneNumber;

    if (needsProfileUpdate) {
      setShowProfileDialog(true); // <-- you'll need to add this modal logic
    } else {
      router.push("/admin/admin-dashboard"); // Or wherever you want to send them after login
    }

    return () => unsubscribe(); // cleanup
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {showProfileDialog && <YourProfileDialog />}

      {user?.displayName ? `Welcome, ${user.displayName}` : "Welcome, Guest!"}
      <Image
        src={user?.photoURL || "/default-profile.png"}
        width={100}
        height={100}
        alt={user?.displayName || "Profile"}
      />
    </div>
  );
};

export default Page;
