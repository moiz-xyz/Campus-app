import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

import { db } from '@/utils/constant';
import { ref, get } from 'firebase/database';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        // Reference to the job in Realtime DB
        const jobRef = ref(db, `jobs/${params.id}`);
        const snapshot = await get(jobRef);

        if (snapshot.exists()) {
          const jobData = snapshot.val();

          // applications array/object inside the job
          dispatch(setAllApplicants(jobData));
        } else {
          console.log('No such job!');
        }
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length || 0}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
