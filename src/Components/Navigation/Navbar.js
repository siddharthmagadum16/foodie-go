import React from "react";
import {NavLink} from "react-router-dom";
// import About from "./About";
import 'react-bootstrap'
import 'bootstrap'
import 'jquery'
// import 'bootstrap/dist/js/popper.min.js';
import './Navbar.css'


const Navbar = ({authorised}) => {

  const SignOut=()=>{
    window.location.href="/signin"
    window.localStorage.setItem("authorised","0")
  }
  // console.log("AUTHORISED: "+ authorised)
  return (
    // <Fragment>
    <div className="nav-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <p className="navbar-brand" to="/">Foodie-go</p>

  <div className="co" >
      {
      (parseInt(authorised)===1)?(
      <ul className="navbar-nav ">

        <li className="nav-item">
          <NavLink className="nav-link " exact to="/home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="" exact to="/about">  About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/signin" onClick={SignOut}>
            Sign Out
          </NavLink>
        </li>

      </ul>
      ):(
      <ul className="navbar-nav ">

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

      )
      }
  </div>
</nav>
    </div>
  );
};

export default Navbar;
