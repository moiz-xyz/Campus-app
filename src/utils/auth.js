import { createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import Swal from 'sweetalert2'

export const registerUser = async (email, password, name, role) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

   localStorage.setItem("userUID", user.uid);

  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    role,
    createdAt: new Date().toISOString(),
  });
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  localStorage.setItem("userUID", user.uid) ;
  return user;
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.clear(); 
    Swal.fire({
          title: "Logout Sucessfully!",
          icon: "success",
          draggable: true
        });
  } catch (error) {
     Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: err.message
          });
    throw error;
  }
};

