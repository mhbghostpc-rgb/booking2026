import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuVjQL9rnx-PClQ6lnVwLOw79VCk8pCos",
  authDomain: "moheb-academy.firebaseapp.com",
  projectId: "moheb-academy",
  storageBucket: "moheb-academy.firebasestorage.app",
  messagingSenderId: "991733098654",
  appId: "1:991733098654:web:5e3cc9a5c8f92e83b0b38f",
  measurementId: "G-0RQ8LBKWB2"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
