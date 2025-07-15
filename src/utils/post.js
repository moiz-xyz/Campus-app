import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const postJob = async (jobData) => {
  const userUID = localStorage.getItem("userUID");

  await addDoc(collection(db, "posted_jobs"), {
    ...jobData,
    userUID,
    createdAt: new Date().toISOString(),
  });
};

export const getJobs = async () => {
  const querySnapshot = await getDocs(collection(db, "posted_jobs"));
  const jobs = [];
  querySnapshot.forEach((doc) => {
    jobs.push({ id: doc.id, ...doc.data() });
  });
  return jobs;
};