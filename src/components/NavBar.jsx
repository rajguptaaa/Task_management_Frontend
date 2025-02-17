import React from "react";
import { Link } from "react-router-dom";
import '../assets/NavBar.css';

const NavBar = () => {
  return (
    <div className="navBarCss">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/sign-up">Signup</Link>
    </div>

  );
};

export default NavBar;
