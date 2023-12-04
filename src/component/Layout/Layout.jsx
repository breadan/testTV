import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

export const Layout = ({userData, setUserData}) => {

  //to set logOut
  let navigate = useNavigate()
  function logOut(){
    localStorage.removeItem('UserToken');
    setUserData(null);
    navigate('/login');

  }
  return (
    <>
      <Navbar logOut = {logOut} userData = {userData}/>

      <div className="container mt-5">
        <Outlet>

          
        </Outlet>
      </div>
      <Footer/>
    </>
  );
};
