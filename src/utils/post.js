// ✅ No JSX/React here
import { collection, addDoc, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Post a new job
export const postJob = async (jobData) => {
  const userUID = localStorage.getItem("userUID");
  await addDoc(collection(db, "posted_jobs"), {
    ...jobData,
    userUID, 
    createdAt: new Date().toISOString(),
  });
};

// Get all jobs
export const getJobs = async () => {
  const querySnapshot = await getDocs(collection(db, "posted_jobs"));
  const jobs = [];
  querySnapshot.forEach((doc) => {
    jobs.push({ id: doc.id, ...doc.data() });
  });
  return jobs;
};

// Update a job
export const updateJob = async (jobId, updatedData) => {
  const jobRef = doc(db, "posted_jobs", jobId);
  await updateDoc(jobRef, {
    ...updatedData,
    updatedAt: new Date().toISOString(),
  });
};

// Submit a job response
export const responseForjob = async (userData) => {
  const userUID = localStorage.getItem("userUID"); // ✅ Applicant UID
  const jobPosterUID = localStorage.getItem("jobPosterUID"); // ✅ Job Poster UID stored before form

  if (!jobPosterUID) {
    throw new Error("Missing jobPosterUID in localStorage");
  }

  await addDoc(collection(db, "response"), {
    ...userData,
    userUID,
    jobPosterUID,
    createdAt: new Date().toISOString(),
  });
};

// Get responses for a specific job poster
export const getResponse = async (jobPosterUID) => {
  const q = query(collection(db, "response"), where("jobPosterUID", "==", jobPosterUID));
  const querySnapshot = await getDocs(q);

  const responses = [];
  querySnapshot.forEach((doc) => {
    responses.push({ id: doc.id, ...doc.data() });
  });
  return responses;
};
