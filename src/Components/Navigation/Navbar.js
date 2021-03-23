import React from "react";
import {NavLink} from "react-router-dom";
// import About from "./About";
// import 'react-bootstrap'
// import 'bootstrap'
// import 'jquery'
// import 'bootstrap/dist/js/popper.min.js';
import './Navbar.css'


const Navbar = ({authorised}) => {

  const SignOut=()=>{
    window.location.href="/signin"
    window.localStorage.setItem("authorised","0")
  }
  // console.log("AUTHORISED: "+ authorised)
  return (
      <nav className='sticky'>

            {
            (parseInt(authorised)===1)?(
            <ul className="">

              <li className="name">
                <NavLink className="name-link" exact to="/"> <div>Foodie-go</div></NavLink>
              </li>
              <li className="items">
                <NavLink className=" " exact to="/home">Home</NavLink>
              </li>
              <li className="items">
                <NavLink className="" exact to="/about">  About</NavLink>
              </li>
              <li className="items">
                <NavLink className="" exact to="/signin" onClick={SignOut}>
                  Sign Out
                </NavLink>
              </li>
            </ul>
            ):(
            <ul className=" ">
             <li className="name">
                <NavLink className=" " exact to="/">Foodie-go</NavLink>
              </li>
              <li className="items">
                <NavLink className="" exact to="/about">About</NavLink>
              </li>
              <li className="items">
                <NavLink className="" exact to="/signin">SignIn</NavLink>
              </li>
              <li className="items">
                <NavLink className="" exact to="/register">Register</NavLink>
              </li>
            </ul>

            )
            }
      </nav>
  );
};

export default Navbar;
