import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { db } from "@/utils/constant";
import { ref, get, update } from "firebase/database";
import { setSingleJob } from "@/redux/jobSlice";
import { setAllApplicants } from "@/redux/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(false);
  const params = useParams();
  const jobId = params.id;

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("You must be logged in to apply!");
      return;
    }

    try {
      const jobRef = ref(db, `jobs/${jobId}`);
      const snapshot = await get(jobRef);
      const jobData = snapshot.val() || {};
      const existingApplications = jobData.applications || [];

      const alreadyApplied = existingApplications.some(
        (app) => app.applicantId === user.uid
      );
      if (alreadyApplied) {
        setIsApplied(true);
        toast.error("You have already applied for this job!");
        return;
      }

      const newApplication = {
        applicantId: user.uid,
        email: user.email,
        fullname: user.fullname,
        phoneNumber: user.phoneNumber,
        status : "Pending",
        appliedAt: Date.now(),
      };

      await update(jobRef, {
        applications: [...existingApplications, newApplication],
      });

      setIsApplied(true);

      // Redux update
      dispatch(setSingleJob({ ...jobData, id: jobId, applications: [...existingApplications, newApplication] }));
      dispatch(setAllApplicants([...existingApplications, newApplication]));

      toast.success("Applied successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const jobRef = ref(db, `jobs/${jobId}`);
        const snapshot = await get(jobRef);
        if (snapshot.exists()) {
          const jobData = snapshot.val();
          dispatch(setSingleJob({ id: jobId, ...jobData }));
          dispatch(setAllApplicants(jobData.applications || []));

          const alreadyApplied = jobData.applications?.some(
            (app) => app.applicantId === user?.uid
          );
          setIsApplied(alreadyApplied);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load job details.");
      }
    };

    if (jobId) fetchSingleJob();
  }, [jobId, dispatch, user?.uid]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="ghost" className="text-blue-700 font-bold">
              {singleJob?.position} Positions
            </Badge>
            <Badge variant="ghost" className="text-[#F83002] font-bold">
              {singleJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-[#7209b7] font-bold">
              {singleJob?.salary}
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role: <span className="pl-4 font-normal">{singleJob?.title}</span>
        </h1>
        <h1 className="font-bold my-1">
          Location: <span className="pl-4 font-normal">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold my-1">
          Description: <span className="pl-4 font-normal">{singleJob?.description}</span>
        </h1>
        <h1 className="font-bold my-1">
          Experience: <span className="pl-4 font-normal">{singleJob?.experience} yrs</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary: <span className="pl-4 font-normal">{singleJob?.salary}</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants: <span className="pl-4 font-normal">{singleJob?.applications?.length || 0}</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal">
            {singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : "N/A"}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
