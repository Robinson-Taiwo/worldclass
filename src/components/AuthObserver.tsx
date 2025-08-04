// components/AuthObserver.tsx
"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "@/firebase/firebaseConfig"; // adjust path to your firebase.ts
import { setUser } from "@/store/slices/UserSlice";

export default function AuthObserver() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            id: user.uid,
            email: user.email || "",
            username: user.displayName || "",
          })
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null; // doesn't render anything
}
