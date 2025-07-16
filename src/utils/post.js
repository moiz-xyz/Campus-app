import { collection, addDoc, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
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

export const updateJob = async (jobId, updatedData) => {
  try {
    const jobRef = doc(db, "posted_jobs", jobId);
    await updateDoc(jobRef, {
      ...updatedData,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

export const responseForjob = async (userData, jobPosterUID, jobPosterEmail) => {
  const userUID = localStorage.getItem("userUID"); // Applicant's UID

  await addDoc(collection(db, "response"), {
    ...userData,
    userUID, 
    jobPosterUID, 
    createdAt: new Date().toISOString(),
  });
};


export const getResponse = async (jobPosterUID) => {
  const q = query(
    collection(db, "response"),
    where("jobPosterUID", "==", jobPosterUID)
  );

  const querySnapshot = await getDocs(q);
  const responses = [];

  querySnapshot.forEach((doc) => {
    responses.push({ id: doc.id, ...doc.data() });
  });

  return responses;
}