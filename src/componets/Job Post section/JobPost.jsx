import  { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./jobpost.css";
import { postJob } from "../../utils/post";

const JobSchema = Yup.object().shape({
  title: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
  company: Yup.string().min(2, "Company name too short").required("Company is required"),
  location: Yup.string().required("Location is required"),
  type: Yup.string().required("Job type is required"),
  description: Yup.string().min(10, "Description too short").required("Description is required"),
  logo: Yup.string().url("Must be a valid URL").required("Logo URL is required"),
  salary: Yup.string().required("Salary is required"),
});

const JobPost = () => {
  const initialValues = {
    title: "",
    company: "",
    location: "",
    type: "Full-Time",
    description: "",
    logo: "",
    salary: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await postJob(values);
      alert("Job posted successfully!");
      resetForm();
    } catch (err) {
      console.error("Error posting job:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={JobSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="job-post-form">
          <h2>Post a Job</h2>

          <Field name="title" placeholder="Job Title" />
          <ErrorMessage name="title" component="div" className="error" />

          <Field name="company" placeholder="Company Name" />
          <ErrorMessage name="company" component="div" className="error" />

          <Field name="location" placeholder="Location" />
          <ErrorMessage name="location" component="div" className="error" />

          <Field as="select" name="type">
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </Field>
          <ErrorMessage name="type" component="div" className="error" />

          <Field as="textarea" name="description" placeholder="Job Description" rows={4} />
          <ErrorMessage name="description" component="div" className="error" />

          <Field name="logo" placeholder="Company Logo URL" />
          <ErrorMessage name="logo" component="div" className="error" />

          <Field name="salary" placeholder="Salary" />
          <ErrorMessage name="salary" component="div" className="error" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Job"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default JobPost;
