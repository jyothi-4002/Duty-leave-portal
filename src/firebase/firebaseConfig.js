// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXdj4P5VbsH5QNW69SmKtyEiyISX9GOdk",
  authDomain: "duty-leave-portal-for-college.firebaseapp.com",
  projectId: "duty-leave-portal-for-college",
  storageBucket: "duty-leave-portal-for-college.firebasestorage.app",
  messagingSenderId: "285773403364",
  appId: "1:285773403364:web:d93b3d10a58936779a48f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };