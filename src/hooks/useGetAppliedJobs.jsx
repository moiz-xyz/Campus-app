import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/utils/constant";
const useGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        // reference to the "applications" collection in Firestore
        const querySnapshot = await getDocs(collection(db, "applications"));

        // convert docs to plain JS objects
        const applications = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

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
