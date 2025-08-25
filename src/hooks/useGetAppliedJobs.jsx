import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { ref, get } from "firebase/database";
import { db } from "@/utils/constant";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const applicationsRef = ref(db, "applications"); // path to applications
        const snapshot = await get(applicationsRef);

        const applications = [];
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Realtime DB returns an object with keys as IDs
          for (const id in data) {
            applications.push({ id, ...data[id] });
          }
        }

        console.log(applications);

        // Dispatch to redux
        dispatch(setAllAppliedJobs(applications));
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;
