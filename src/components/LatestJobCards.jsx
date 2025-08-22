import React from "react";
import { Link } from "react-router-dom";

const LatestJobCards = ({ job }) => {    
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
