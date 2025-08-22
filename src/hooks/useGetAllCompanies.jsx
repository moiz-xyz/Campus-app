import { setCompanies } from '@/redux/companySlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/constant";
const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "companies")); 
        const companies = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Companies fetched from Firestore:", companies);

        dispatch(setCompanies(companies));
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
