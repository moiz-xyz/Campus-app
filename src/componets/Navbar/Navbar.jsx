import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">RMS</h1>

        <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><a href="#">Home</a></li>
          <li><a href="#">See jobs </a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Login</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
