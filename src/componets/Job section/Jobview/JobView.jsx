import React, { useEffect, useState, useContext } from "react";
import "../job.css";
import { getJobs, updateJob } from "../../../utils/post";
import { AuthContext } from "../../../context/AuthContext";
import JobPost from "../Job Post section/JobPost";
import JobApplicationForm from "../JobApllication/JobApplicationForm";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editJobId, setEditJobId] = useState(null);
  const [applyJobId, setApplyJobId] = useState(null);
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

  const handleUpdate = async (updatedData, jobId) => {
    try {
      await updateJob(jobId, updatedData);
      setEditJobId(null);
      const refreshedJobs = await getJobs();
      setJobs(refreshedJobs);
    } catch (err) {
      alert("Error updating job: " + err.message);
    }
  };

  return (
    <div className="job-listing">
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>Loading...</p>
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
              {job.salary && (
                <p className="salary"><strong>Salary:</strong> {job.salary}</p>
              )}
              <p className="description">{job.description}</p>
  {userData?.role === "Student" && (
    <button
      className="apply-btn"
      onClick={() =>
        applyJobId === job.id ? setApplyJobId(null) : setApplyJobId(job.id)
      }
    >
      {applyJobId === job.id ? "Cancel" : "Apply Now"}
    </button>
  )}

{applyJobId && (
  <div className="modal-overlay">
    <div className="modal-blur-background" />
    <div className="job-application-modal-content">
      <button className="cancel-btn" onClick={() => setApplyJobId(null)}>
        x
      </button>
      <JobApplicationForm jobId={applyJobId} onClose={() => setApplyJobId(null)} />
    </div>
  </div>
)}



              {/* Show Edit/Delete to non-students */}
              {userData?.role !== "Student" && (
                <>
                  <button
                    className="apply-btn"
                    onClick={() =>
                      editJobId === job.id ? setEditJobId(null) : setEditJobId(job.id)
                    }
                  >
                    {editJobId === job.id ? "Cancel Edit" : "Edit"}
                  </button>

                  <button
                    className="apply-btn"
                    onClick={() =>
                      window.confirm("Are you sure you want to delete this job?")
                        ? alert("Delete logic not yet implemented!")
                        : null
                    }
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            {/* Show Edit Form if applicable */}
            {editJobId === job.id && (
              <div className="edit-form-wrapper">
                <JobPost
                  initialData={job}
                  onUpdate={handleUpdate}
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewJobs;
