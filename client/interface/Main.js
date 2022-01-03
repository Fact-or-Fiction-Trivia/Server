/* eslint-disable no-unused-vars */
import React from "react";
import Routes from "../routes/Routes";
import Nav from "./Nav";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";
import NavbarVertical from "../views/NavbarVertical";
import NavbarTop from "../views/NavbarTop";

const Main = () => {
  return (
    <div className="container">
      <NavbarVertical />

      <div className="content">
        <NavbarTop />

        <Routes />
      </div>
    </div>
    // <main
    //   style={{
    //     height: "100vh",
    //     width: "100vw",
    //   }}
    // >
    // <Router>
    //   <Routes />
    //  <Nav />
    //   <div
    //     className="container-fluid"
    //     style={{
    //       paddingLeft: 0,
    //       paddingRight: 0,
    //       paddingTop: 56,
    //       width: "100%",
    //     }}
    //   >
    //     <Routes />
    //     <Footer />
    //   </div>
    // </Router>
    // </main>
  );
};

export default Main;
