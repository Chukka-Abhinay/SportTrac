import React from "react";
import "./NavBar.css";

const NavBar = () => (
  <div className="navbar flex justify-around m-10 ml-1.5 py-10">
    <h1 className="w-1/3 font-bold font-sans text-4xl">🏀SPORTRAC</h1>
    <div className="menu w-1/3 flex flex-row justify-evenly items-center text-xl font-sans">
      <a
        href="/"
        className="font-bold hover:underline hover:decoration-emerald-400 hover:decoration-4 hover:underline-offset-4 p-0.5"
      >
        Home
      </a>
      <a
        href="/teams"
        className="font-bold hover:underline hover:decoration-emerald-400 hover:decoration-4 hover:underline-offset-4"
      >
        Teams & Players
      </a>
      <a
        href="/tournaments"
        className="font-bold hover:underline hover:decoration-emerald-400 hover:decoration-4 hover:underline-offset-4"
      >
        Tournaments
      </a>
      <a
        href="/leaderboard"
        className="font-bold hover:underline hover:decoration-emerald-400 hover:decoration-4 hover:underline-offset-4"
      >
        Leaderboard
      </a>
    </div>
  </div>
);

export default NavBar;
