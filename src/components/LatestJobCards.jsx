import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, get } from "firebase/database";
import { db } from "@/utils/constant";
import { Loader2 } from "lucide-react"; 

const LatestJobCards = ({ job }) => {
  const [isCompanyDeleted, setIsCompanyDeleted] = useState(null); 

  useEffect(() => {
    if (job?.companyId) {
      const companyRef = ref(db, `users/${job.companyId}/isDeleted`);
      get(companyRef).then((snapshot) => {
        if (snapshot.exists() && snapshot.val() === true) {
          setIsCompanyDeleted(true);
        } else {
          setIsCompanyDeleted(false);
        }
      });
    }
  }, [job?.companyId]);

  if (isCompanyDeleted === null) {
    return (
      <div className="flex items-center justify-center p-5">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isCompanyDeleted) return null;

  return (
    <Link to={`/description/${job.id}`}>
      <div className="p-5 border rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
        <h2 className="font-bold text-lg text-gray-900">{job.title}</h2>
        <p className="text-gray-600 mt-1">{job.companyName}</p>
        <div className="flex gap-3 mt-3 text-sm text-gray-700">
          <span>{job.location}</span>
          <span>•</span>
          <span>{job.jobType}</span>
        </div>
      </div>
    </Link>
  );
};

export default LatestJobCards;
