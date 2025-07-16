import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../job.css";
import { responseForjob } from "../../../utils/post";
const JobApplicationForm = ({ jobId, onClose }) => {
  const initialValues = {
    name: "",
    email: "",
    resumeLink: "",
    coverLetter: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too short").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    resumeLink: Yup.string()
      .url("Enter a valid URL")
      .required("Resume link is required"),
    coverLetter: Yup.string()
      .min(10, "Cover letter should be at least 10 characters")
      .required("Cover letter is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await responseForjob({ ...values, jobId });
      Swal.fire({
        title: "Job Posted!",
        icon: "success",
        draggable: true
      });
      resetForm();
      onClose(); // close modal
    } catch (error) {
      console.error("Error submitting application:", error);
      Swal.fire({
        title: "Job !",
        icon: "success",
        draggable: true
      });
    }
  };

  return (
    <div className="job-application-form">
      <h4>Apply for this Job</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <Field name="name" placeholder="Your Name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <Field name="email" placeholder="Your Email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div>
            <Field name="resumeLink" placeholder="Resume Link (URL)" />
            <ErrorMessage name="resumeLink" component="div" className="error" />
          </div>

          <div>
            <Field
              as="textarea"
              name="coverLetter"
              placeholder="Cover Letter"
              rows="4"
            />
            <ErrorMessage name="coverLetter" component="div" className="error" />
          </div>

          <button type="submit">Submit Application</button>
        </Form>
      </Formik>
    </div>
  );
};

export default JobApplicationForm;
