import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";

// Firebase config — fall back to explicit values if env vars are not set
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAFuWbx3fvDoOl-N1FrI2ma44LhhnVM1ps",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "first-project-eebb8.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://first-project-eebb8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "first-project-eebb8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "first-project-eebb8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "585182318670",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:585182318670:web:7c2e142a55b1343614731f",
};

// Initialize Firebase app (safe for HMR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exports
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Realtime Database
export const rtdb = getDatabase(app);

// Helper: subscribe to a realtime database path. Callback receives the value.
// Returns the unsubscribe function.
export function subscribeToPath(path: string, callback: (val: any) => void) {
  const r = ref(rtdb, path);
  const unsubscribe = onValue(r, (snapshot) => {
    callback(snapshot.val());
  });
  return unsubscribe;
}

// Optional: add more exports (storage, analytics) as needed
