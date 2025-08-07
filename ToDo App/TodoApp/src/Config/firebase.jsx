// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjtWBu-tAEA0FjPXk5hJkzCY1tknGHVyg",
  authDomain: "react-database-27f00.firebaseapp.com",
  projectId: "react-database-27f00",
  storageBucket: "react-database-27f00.firebasestorage.app",
  messagingSenderId: "718579096699",
  appId: "1:718579096699:web:9469bfb8a427b814c4d6de"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase

const auth = getAuth(app);
const db = getFirestore(app);



export { db, auth }; 
