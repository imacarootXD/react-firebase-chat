// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY ,
  authDomain: "sixthformtutors-efe24.firebaseapp.com",
  projectId: "sixthformtutors-efe24",
  storageBucket: "sixthformtutors-efe24.firebasestorage.app",
  messagingSenderId: "207045511167",
  appId: "1:207045511167:web:cd80e139b8eea9d2d8c9ca",
  measurementId: "G-RGNPCS53GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()  
export const storage = getStorage()
