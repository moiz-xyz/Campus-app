import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

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
const auth = getAuth(app);
const db = getDatabase(app);

const createAdmin = async () => {
  try {
    const email = "admin@gmail.com";
    const password = "12345678"; 
    const fullname = "Admin User";

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    await updateProfile(firebaseUser, { displayName: fullname });

    await set(ref(db, "users/" + firebaseUser.uid), {
      fullname,
      email,
      uid: firebaseUser.uid,
      role: "admin",
    });

    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

createAdmin();
