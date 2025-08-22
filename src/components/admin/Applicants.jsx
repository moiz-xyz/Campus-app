import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

// Firebase
import { db } from '@/utils/constant'
import { doc, getDoc } from 'firebase/firestore'

const Applicants = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { applicants } = useSelector((store) => store.application)

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        // Get the job document
        const jobRef = doc(db, 'jobs', params.id)
        const jobSnap = await getDoc(jobRef)

        if (jobSnap.exists()) {
          const jobData = jobSnap.data()

          // assuming applications are stored inside job document as array
          dispatch(setAllApplicants(jobData))
        } else {
          console.log('No such job!')
        }
      } catch (error) {
        console.error('Error fetching applicants:', error)
      }
    }

    fetchAllApplicants()
  }, [params.id, dispatch])

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
  )
}

export default Applicants
