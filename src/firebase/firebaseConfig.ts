// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjeK2cDVB77aAm03Rg76dOcHWURIiGdJI",
  authDomain: "next-typescript-b7863.firebaseapp.com",
  projectId: "next-typescript-b7863",
  storageBucket: "next-typescript-b7863.appspot.com", // corrected
  messagingSenderId: "1043395214710",
  appId: "1:1043395214710:web:62ef875ecb6a152a518e57",
  measurementId: "G-7QYMGP4RVE",
};

// Prevent duplicate initialization (Next.js runs things multiple times sometimes)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };
