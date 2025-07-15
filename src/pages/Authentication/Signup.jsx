import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/auth";
import "./Auth.css";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  role: Yup.string()
    .oneOf(["Company", "Student"], "Select either Company or Student")
    .required("You must select a role"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await registerUser(values.email, values.password, values.name, values.role);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert("Error: " + err.message);
      console.log("errr >>" , err);
      
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", role: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="signup-wrapper">
          <h2>Create an account</h2>

          <Field name="name" type="text" placeholder="Enter your name" />
          <ErrorMessage name="name" component="div" className="error" />

          <Field name="email" type="email" placeholder="Enter your email address" />
          <ErrorMessage name="email" component="div" className="error" />

          <Field as="select" name="role">
            <option value="" disabled hidden>
              Create account as
            </option>
            <option value="Company">Company</option>
            <option value="Student">Student</option>
          </Field>
          <ErrorMessage name="role" component="div" className="error" />

          <Field name="password" type="password" placeholder="Enter your password" />
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign-Up"}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
