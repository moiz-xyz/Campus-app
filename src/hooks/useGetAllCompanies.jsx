import { setCompanies } from '@/redux/companySlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ref, get } from "firebase/database";
import { db } from "@/utils/constant";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesRef = ref(db, "companies"); // path to companies
        const snapshot = await get(companiesRef);

        const companies = [];
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Realtime DB returns an object with keys as IDs
          for (const id in data) {
            companies.push({ id, ...data[id] });
          }
        }

        console.log("Companies fetched from Realtime Database:", companies);

        dispatch(setCompanies(companies));
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
