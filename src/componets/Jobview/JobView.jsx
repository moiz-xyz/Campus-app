import React, { useEffect, useState } from "react";
import "./Job.css";
import { getJobs } from "../../utils/post";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getJobs();
        setJobs(jobData);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-listing">
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <img src={job.logo} alt="Company Logo" className="job-logo" />
              <div>
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
                <p className="location">{job.location}</p>
              </div>
            </div>

            <div className="job-body">
              <p className="type"><strong>Type:</strong> {job.type}</p>
              {job.salary && <p className="salary"><strong>Salary:</strong> {job.salary}</p>}
              <p className="description">{job.description}</p>

              {userData?.role === "Student" && (
                <button className="apply-btn">Apply Now</button>
              )}

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewJobs;
