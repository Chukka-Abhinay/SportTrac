import React from "react";
import "./NavBar.css";

const NavBar = () => (
  <div className="navbar">
    <h1>🏀SPORTRAC</h1>
    <div className="menu">
      <a href="/">Home</a>
      <a href="/teams">Teams & Players</a>
      <a href="/tournaments">Tournaments</a>
      <a href="/leaderboard">Leaderboard</a>
    </div>
  </div>
);

export default NavBar;
