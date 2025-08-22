import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import {  collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/utils/constant"; 
const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const jobsRef = collection(db, "jobs"); // jobs collection in Firestore
        let q;

        if (searchedQuery) {
          // If you want to filter by title or keyword
          q = query(jobsRef, where("title", ">=", searchedQuery), where("title", "<=", searchedQuery + "\uf8ff"));
        } else {
          q = query(jobsRef); // fetch all jobs if no search
        }

        const querySnapshot = await getDocs(q);
        const jobs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch(setAllJobs(jobs));
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;
