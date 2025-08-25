import { setCompanies } from '@/redux/companySlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ref, get } from "firebase/database";
import { db } from "@/utils/constant";

const useGetAllUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => { 
    const fetchUsers = async () => {
      try {
        const usersRef = ref(db, "users");
        const snapshot = await get(usersRef);

        const users = [];
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const id in data) {
            if (data[id].role !== "admin") {
              users.push({ id, ...data[id] });
            }
          }
        }

        dispatch(setCompanies(users));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);
};

export default useGetAllUsers;
