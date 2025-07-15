import React from "react";
import "./Job.css";

const JobList = () => {
  const jobPosts = [
    {
      title: "Frontend Developer",
      company: "Google",
      location: "Karachi, Pakistan",
      type: "Full-Time",
      description: "We are looking for a talented Frontend Developer to join our team.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      salary: "120,000 PKR",
    },
    {
      title: "Backend Engineer",
      company: "Microsoft",
      location: "Remote",
      type: "Remote",
      description: "Work with modern backend technologies and scalable systems.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      salary: "",
    },
    {
      title: "UI/UX Designer",
      company: "Airbnb",
      location: "Lahore, Pakistan",
      type: "Part-Time",
      description: "Design experiences that delight users across all platforms.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
      salary: "100,000 PKR",
    },
  ];

  return (
    <div>
      {jobPosts.map((job, index) => (
        <div key={index} className="job-card">
          <div className="job-card-left">
            <img src={job.logo} alt="Company Logo" className="job-logo" />
            <div className="job-details">
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>
              <p className="location">{job.location}</p>
            </div>
          </div>

          <div className="job-card-right">
            <p className="type">{job.type}</p>
            {job.salary && <p className="salary">💸 {job.salary}</p>}
            <p className="description">{job.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
