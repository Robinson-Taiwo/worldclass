"use client";

import { auth } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  UserCredential,
} from "firebase/auth";
import { toast } from "sonner";

// Email Signup
export const registerWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await sendEmailVerification(userCredential.user);
  toast.success("Signup successful! Verification email sent.");
  return userCredential;
};

// Email Login
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  if (!user.emailVerified) {
    toast.error("Please verify your email before logging in.");
    throw new Error("Email not verified");
  }

  toast.success("Logged in successfully!");
  return userCredential;
};

// Google Login (with account selector)
export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const result = await signInWithPopup(auth, provider);
  toast.success(`Logged in as ${result.user.displayName}`);
  return result;
};

// GitHub Login (with account selector)
export const signInWithGithub = async (): Promise<UserCredential> => {
  const provider = new GithubAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const result = await signInWithPopup(auth, provider);
  toast.success(`Logged in as ${result.user.displayName}`);
  return result;
};

// Logout
export const logout = async () => {
  await signOut(auth);
  toast.success("Logged out successfully.");
};
