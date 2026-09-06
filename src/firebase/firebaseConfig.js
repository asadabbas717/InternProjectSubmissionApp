import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const required = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const firebaseConfig = {
  apiKey: required("EXPO_PUBLIC_FIREBASE_API_KEY"),
  authDomain: required("EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: required("EXPO_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: required("EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: required("EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: required("EXPO_PUBLIC_FIREBASE_APP_ID"),
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
