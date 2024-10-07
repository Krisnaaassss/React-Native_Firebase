// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBprTMQGUEzbokrl2y1zEv4uOFS4RBPj6Y",
  authDomain: "krisnaproject-dfb74.firebaseapp.com",
  projectId: "krisnaproject-dfb74",
  storageBucket: "krisnaproject-dfb74.appspot.com",
  messagingSenderId: "867292048799",
  appId: "1:867292048799:web:a47e33986f58c3b7eba1aa",
  measurementId: "G-LD220XY1WX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
