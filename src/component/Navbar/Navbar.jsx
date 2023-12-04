import React from "react";
import logo from "../../assets/images/logo-color.png";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Navbar = ({ userData, logOut }) => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-info bg-gradient nav">
        <div className="parentNav container d-flex justify-content-between">
          <NavLink className="navbar-brand col-md-2" to="/">
            <img style={{ width: "10%" }} src={logo} className="w-25" alt="" />
          </NavLink>

          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="about">
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="projects">
                    Projects
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="categorySlider">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="brands">
                    Brands
                  </NavLink>
                </li>
              </ul>
          </div>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i
                  className="fa-brands fa-facebook-f"
                  style={{ color: "#ed0c0c" }}
                />
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-tiktok"></i>
                <i className="fab mx-2 fa-linkedin"></i>
                <i className="fab mx-2 fa-youtube"></i>
              </li>
            </ul>

            <ul className="d-flex col-md-4 navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" onClick = {logOut}>
                    Logout
                  </Link>
                </li>
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="signup">
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      LogIn
                    </Link>
                  </li>
                </>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
