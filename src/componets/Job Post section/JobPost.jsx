import React, { useState } from "react";
import "./jobpost.css";

const JobPost = ({ onPost }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-Time",
    description: "",
    logo: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log or pass to parent (e.g. Firebase)
    console.log("Job Posted:", formData);
    if (onPost) onPost(formData);

    alert("Job posted successfully!");
    setFormData({
      title: "",
      company: "",
      location: "",
      type: "Full-Time",
      description: "",
      logo: "",
      salary: "",
    });
  };

  return (
    <form className="job-post-form" onSubmit={handleSubmit}>
      <h2>Post a Job</h2>

      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="company"
        placeholder="Company Name"
        value={formData.company}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Internship">Internship</option>
        <option value="Remote">Remote</option>
      </select>

      <textarea
        name="description"
        placeholder="Job Description"
        value={formData.description}
        onChange={handleChange}
        rows={5}
        required
      />

      <input
        type="text"
        name="logo"
        placeholder="Company Logo URL"
        value={formData.logo}
        onChange={handleChange}
      />

      <input
        type="text"
        name="salary"
        placeholder="Salary (Optional)"
        value={formData.salary}
        onChange={handleChange}
      />

      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobPost;
