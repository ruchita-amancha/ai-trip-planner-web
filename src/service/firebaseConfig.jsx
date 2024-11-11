// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXHZPadnxAlxrdscW1xWZBqHPXltrH-XI",
  authDomain: "ai-trip-planner-70f17.firebaseapp.com",
  projectId: "ai-trip-planner-70f17",
  storageBucket: "ai-trip-planner-70f17.firebasestorage.app",
  messagingSenderId: "382764253583",
  appId: "1:382764253583:web:33eece7dbf2b4189c8cbfa",
  measurementId: "G-1H3P0YH638"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);