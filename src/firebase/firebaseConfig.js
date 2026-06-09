import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFvFaYbWKLuK8qQnvzmKBhBvkJOtI0LfM",
  authDomain: "intern-project-submission-app.firebaseapp.com",
  projectId: "intern-project-submission-app",
  storageBucket: "intern-project-submission-app.firebasestorage.app",
  messagingSenderId: "922752032158",
  appId: "1:922752032158:web:26f8155409673ba8880a8f",
  measurementId: "G-4LPS81ME2Y"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);