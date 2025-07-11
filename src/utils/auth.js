import { doc, setDoc } from "firebase/firestore";
import { db , auth } from "./firebaseConfig"; 

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
from "firebase/auth";

export const registerUser = async (email, password, name, role) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "registeredUsers", user.uid), {
    name,
    email,
    role,
    createdAt: new Date()
  });

  return user;
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};