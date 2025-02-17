import React from "react";
import { Link } from "react-router-dom";
import '../assets/NavBar.css';

const NavBar = ({currUser, handleLogout}) => {
  return (
    <div className="navBarCss">
    <span>Hello {currUser.fullName}</span>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <button onClick={handleLogout}>Log Out</button>
      <Link to="/sign-up">Signup</Link>
    </div>

  );
};

export default NavBar;
