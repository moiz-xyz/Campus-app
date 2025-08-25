import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import { ref, get, query, orderByChild, startAt, endAt } from "firebase/database";
import { db } from "@/utils/constant";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const jobsRef = ref(db, "jobs");

        let jobsSnapshot;
        if (searchedQuery) {
          // Realtime DB supports simple range queries on a single child
          const jobsQuery = query(
            jobsRef,
            orderByChild("title"),
            startAt(searchedQuery),
            endAt(searchedQuery + "\uf8ff")
          );
          jobsSnapshot = await get(jobsQuery);
        } else {
          jobsSnapshot = await get(jobsRef); // fetch all jobs
        }

        const jobs = [];
        if (jobsSnapshot.exists()) {
          const data = jobsSnapshot.val();
          for (const id in data) {
            jobs.push({ id, ...data[id] });
          }
        }

        dispatch(setAllJobs(jobs));
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;
