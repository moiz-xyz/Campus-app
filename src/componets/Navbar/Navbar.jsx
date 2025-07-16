import { useState, useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser, userData } = useContext(AuthContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err) {
      alert("Failed to logout: " + err.message);
    }
  };

  const isCompany = userData?.role === "Company";
  const isStudent = userData?.role === "Student";
  console.log(currentUser);
  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">RMS</h1>

        <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><Link to="/">Home</Link></li>

          {isCompany && (
            <>
              <li><Link to="/jobPost">Post Job</Link></li>
              <li><Link to="/viewjobs">View  Jobs</Link></li>
              <li><Link to="/viewApplication">View  Application</Link></li>
            </>
          )}

          {isStudent && (
            <>
              <li><Link to="/viewjobs">See Jobs</Link></li>
              <li><Link to="/appliedJobs">Applied Job</Link></li>
            </>
          )}

          {!currentUser && <li><Link to="/login">Login</Link></li>}

          {currentUser && (
            <li className="profile-dropdown">
              <div onClick={toggleDropdown} className="user-profile">
                👤 {userData?.name || "User"}
              </div>

              {dropdownOpen && (
                <div className="dropdown-modal">
                  <p><strong>Name:</strong> {userData?.name}</p>
                  <p><strong>Email:</strong> {userData?.email}</p>
                  <p><strong>Role:</strong> {userData?.role}</p>

                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
