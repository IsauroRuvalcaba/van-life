import React from "react";
import { Link, NavLink } from "react-router-dom";
import imageUrl from "../assets/images/avatar-icon.png";

export default function Header() {
  //HostLayout.jsx has the other verstion of active link with NavLink

  return (
    <>
      <header>
        <Link to="/">#VANLIFE</Link>
        <nav>
          <NavLink
            to="/host"
            // end variable is not needed here because no matching continues like in HostLayout
            className={({ isActive }) => (isActive ? "active-link" : null)}
          >
            Host
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active-link" : null)}
          >
            About
          </NavLink>
          <NavLink
            to="/vans"
            className={({ isActive }) => (isActive ? "active-link" : null)}
          >
            Vans
          </NavLink>
          <Link to="login" className="login-link">
            <img src={imageUrl} className="login-icon" />
          </Link>
        </nav>
      </header>
    </>
  );
}
