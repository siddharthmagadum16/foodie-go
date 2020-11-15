import React from "react";
import {NavLink} from "react-router-dom";
// import About from "./About";
import 'react-bootstrap'
import 'bootstrap'
import 'jquery'
// import 'bootstrap/dist/js/popper.min.js';
import './Navbar.css'

const Navbar = () => {
  return (
    // <Fragment>
    <div className="nav-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <p className="navbar-brand" to="/">Foodie-go</p>

  <div className="collapse navbar-collapse" >
    <ul className="navbar-nav ">
      <li className="nav-item">
        <NavLink className="nav-link " exact to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/about">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/signin">SignIn</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/register">Register</NavLink>
      </li>
    </ul>
  </div>
</nav>
    </div>
  );
};

export default Navbar;
