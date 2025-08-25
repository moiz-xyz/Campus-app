import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "@/utils/constant"; 
import { Loader2 } from "lucide-react"; // loader

const Job = ({ job }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true); // loader state
  const navigate = useNavigate();

  useEffect(() => {
    if (job?.companyId) {
      const companyRef = ref(db, `companies/${job.companyId}`);
      get(companyRef).then((snapshot) => {
        if (snapshot.exists()) {
          setCompany(snapshot.val());
        }
        setLoading(false); // stop loader after fetch
      });
    } else {
      setLoading(false); // no companyId → stop loader
    }
  }, [job?.companyId]);

  // 🔹 Show centered loader while fetching
  if (loading) {
    return (
      <div className="flex items-center justify-center p-10 border rounded-xl shadow-md bg-white">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  // 🔹 If company is deleted → don’t render
  if (company?.isDeleted) return null;

  const daysAgoFunction = (timestamp) => {
    const createdAt = new Date(timestamp);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{company?.name || job?.companyName}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${job?.id}`)} variant="outline">
          Details
        </Button>
      </div>
    </div>
  );
};

export default Job;
