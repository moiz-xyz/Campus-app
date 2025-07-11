import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
  return (
    <form className="signup-wrapper">
      <h2>Login</h2>

     
      <div className="email">
        <input
          name="email"
          type="email"
          placeholder="Enter your email address"
          required
        />
      </div>

      <div className="password">
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Spin size="small" /> &nbsp;Logging in…
          </>
        ) : (
          "Login"
        )}
      </button>

      <p className="auth-switch">
        Don&apos;t have an account? <Link to="/register">Sign up</Link>
      </p>
      <p className="auth-switch">
        <Link to="/forgotPassword">Forget password</Link>
      </p>
    </form>
  );
};

export default Login;