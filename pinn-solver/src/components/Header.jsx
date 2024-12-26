import React from "react";
import "../styles/Header.css";

function Header() {
  return (
    <div className="header-container">
      <img
        src="../header.jpeg" // Replace with your image URL
        alt="Header Background"
        className="header-image"
      />
      <div className="header-text">
        <h1 className="header-title">ODE & PDE Solver</h1>
        <p className="header-subtitle">SOLVE PDE AND ODE EQUATIONS</p>
      </div>
    </div>
  );
}

export default Header;
