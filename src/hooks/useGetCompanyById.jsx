import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/constant"; 
const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) return;

    const fetchSingleCompany = async () => {
      try {
        const companyRef = doc(db, "companies", companyId); 
        const companySnap = await getDoc(companyRef);

        if (companySnap.exists()) {
          const companyData = { id: companySnap.id, ...companySnap.data() };
          dispatch(setSingleCompany(companyData));
        } else {
          console.warn("Company not found in Firestore");
        }
      } catch (error) {
        console.error("Error fetching company from Firestore:", error);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
