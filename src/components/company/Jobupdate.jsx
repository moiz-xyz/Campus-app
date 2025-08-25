import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { db } from "@/utils/constant";
import { ref, update, get } from "firebase/database";

const JobUpdate = () => {
  const { id } = useParams(); // job id
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch job by id
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobRef = ref(db, `jobs/${id}`);
        const snapshot = await get(jobRef);
        if (snapshot.exists()) {
          setInput(snapshot.val());
        } else {
          toast.error("Job not found!");
          navigate("/company/jobs");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        toast.error("Failed to load job.");
      }
    };

    fetchJob();
  }, [id, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const jobRef = ref(db, `jobs/${id}`);
      await update(jobRef, {
        ...input,
        updatedAt: Date.now(),
      });

      toast.success("Job updated successfully!");
      navigate("/company/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <form onSubmit={submitHandler} className="p-8 border shadow rounded-md">
          <div className="flex items-center gap-5 mb-6">
            <Button
              onClick={() => navigate("/company/jobs")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              type="button"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Edit Job</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input type="text" name="title" value={input.title} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Salary</Label>
              <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Experience</Label>
              <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update Job
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobUpdate;
