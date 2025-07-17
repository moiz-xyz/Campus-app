import React, { useEffect, useState } from "react";
import { getResponse } from "../../../utils/post";

const ViewApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jobPosterUID = localStorage.getItem("userUID"); // 👈 Company UID stored in localStorage

    if (!jobPosterUID) {
      console.warn("No UID found in localStorage");
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const responses = await getResponse(jobPosterUID);
        setApplications(responses);
        console.log("Fetched applications:", responses);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;

  return (
    <div className="job-listing">
      <h2>Applications Received</h2>
      {applications.length === 0 ? (
        <p>No applications submitted for your jobs yet.</p>
      ) : (
        applications.map((app) => (
          <div className="job-card" key={app.id}>
            <h3>{app.name}</h3>
            <p><strong>Email:</strong> {app.email}</p>
            <p>
              <strong>Resume:</strong>{" "}
              <a href={app.resumeLink} target="_blank" rel="noreferrer">
                View Resume
              </a>
            </p>
            <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
            <p><strong>Applied At:</strong> {new Date(app.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewApplication;
