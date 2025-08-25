import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAnoo-q3o95TlxM4-18OHJtKnIMjt10obc",
  authDomain: "campus-app-5b52f.firebaseapp.com",
  projectId: "campus-app-5b52f",
  storageBucket: "campus-app-5b52f.firebasestorage.app",
  messagingSenderId: "702973312498",
  appId: "1:702973312498:web:4dc3be8f248ddb1d947f6b",
  databaseURL: "https://campus-app-5b52f-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

