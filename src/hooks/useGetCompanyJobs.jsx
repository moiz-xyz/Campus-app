import { setAllAdminJobs } from '@/redux/jobSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ref, get } from "firebase/database";
import { db } from "@/utils/constant";

const useGetCompanyJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth); 
    useEffect(() => {
        const fetchCompanyJobs = async () => {
            try {
                if (!user || user.role !== "company") return;

                const jobsRef = ref(db, "jobs"); 
                const snapshot = await get(jobsRef);

                const jobs = [];
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    for (const id in data) {
                        if (data[id].companyId === user.uid) {
                            jobs.push({ id, ...data[id] });
                        }
                    }
                }

                dispatch(setAllAdminJobs(jobs));
            } catch (error) {
                console.error("Error fetching company jobs:", error);
            }
        };

        fetchCompanyJobs();
    }, [dispatch, user]);
};

export default useGetCompanyJobs;
