import { setAllAdminJobs } from '@/redux/jobSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Import Firestore
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/constant";
const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                // Reference to jobs collection
                const querySnapshot = await getDocs(collection(db, "jobs"));
                
                // Convert docs into an array
                const jobs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

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
