import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app;
let db;
let analytics;

try {
  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  // Initialize Firestore
  db = getFirestore(app);

  // Initialize Analytics only on client side
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }

  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);

  // Create mock implementations for development
  db = {
    collection: () => ({
      add: () => Promise.resolve({ id: "mock-id" }),
      where: () => ({ get: () => Promise.resolve({ empty: true }) }),
    }),
  };
}

export { db, analytics };
export default app;
