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
  authDomain: "chat-ininiti.firebaseapp.com",
  projectId: "chat-ininiti",
  storageBucket: "chat-ininiti.firebasestorage.app",
  messagingSenderId: "760618195935",
  appId: "1:760618195935:web:03ef81ea5a7aa090a6426a",
  measurementId: "G-5285G693NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const db = getFirestore()  
export const storage = getStorage()
