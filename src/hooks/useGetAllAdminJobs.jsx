import { setAllAdminJobs } from '@/redux/jobSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ref, get } from "firebase/database";
import { db } from "@/utils/constant";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const jobsRef = ref(db, "jobs"); // path to jobs
                const snapshot = await get(jobsRef);

                const jobs = [];
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // Realtime DB returns an object with keys as IDs
                    for (const id in data) {
                        jobs.push({ id, ...data[id] });
                    }
                }

                // Dispatch to redux
                dispatch(setAllAdminJobs(jobs));
            } catch (error) {
                console.error("Error fetching admin jobs:", error);
            }
        };

        fetchAllAdminJobs();
    }, [dispatch]);
};

export default useGetAllAdminJobs;
