import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/auth";
import * as Yup from "yup";
import "./Auth.css";
import Swal from 'sweetalert2'

// ✅ Validation Schema (optional if you manually validate)
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await LoginSchema.validate(form);

      await loginUser(form.email, form.password);
      Swal.fire({
        title: "Log in Sucessfully!",
        icon: "success",
        draggable: true
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
      <form className="signup-wrapper" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="email">
        <input
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="password">
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            &nbsp;Logging in…
          </>
        ) : (
          "Login"
        )}
      </button>

      <p className="auth-switch">
        Don&apos;t have an account? <Link to="/register">Sign up</Link>
      </p>
      <p className="auth-switch">
      </p>
    </form>
  );
};

export default Login;
