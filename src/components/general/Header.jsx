import React from "react";
import { NavLink } from "react-router-dom";

export default function Header({ user, userLoggedIn }) {
  function handleLogOut() {
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("userName", "");
    localStorage.setItem("id", "");
    userLoggedIn("", "");
  }

  return (
    <div className="headerDiv">
      <div className="headlineDiv">
        <h1>
          <NavLink className="headlineNavLink" to="/">
            MemeIt
          </NavLink>
        </h1>
        {user.loggedIn ? (
          <div className="userNameHeader">
            <input
              type="button"
              value="LogOut"
              onClick={() => handleLogOut()}
            />
            <p>{user.userName}</p>
          </div>
        ) : null}
      </div>
      <nav className="headerNavbar">
        <NavLink className="navLink" to="/generate-meme">
          MemeIt!
        </NavLink>
        <NavLink className="navLink" to="/user">
          {user.loggedIn ? "MyMemes" : "LogIn"}
        </NavLink>
      </nav>
    </div>
  );
}
