import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logoutHander = () => {
    auth.logout();
    navigate("/auth");
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button
            onClick={logoutHander}
            style={{ backgroundColor: "#eee", color: "black" }}
          >
            LOGOUT
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
