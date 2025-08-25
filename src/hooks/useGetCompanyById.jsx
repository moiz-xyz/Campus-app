import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { ref, get } from "firebase/database";
import { db } from "@/utils/constant"; 

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) return;

    const fetchSingleCompany = async () => {
      try {
        const companyRef = ref(db, `companies/${companyId}`); // path to company
        const snapshot = await get(companyRef);

        if (snapshot.exists()) {
          const companyData = { id: companyId, ...snapshot.val() };
          dispatch(setSingleCompany(companyData));
        } else {
          console.warn("Company not found in Realtime Database");
        }
      } catch (error) {
        console.error("Error fetching company from Realtime Database:", error);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
