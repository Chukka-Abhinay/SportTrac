import React, { useRef } from "react";
// import NavBar from "./components/NavBar/NavBar.jsx";
// import NavBar from "./pages/Auth/Navigation.jsx";
// import SportsSlider from "./components/Sports/SportsSlider.jsx";
// import Dashboard from "./components/Dashboard/Dashboard.jsx";
// import Matches from "./components/Matches/Matches.jsx";
// import Teams from "./components/Teams/Teams.jsx";
// import Schedule from "./components/Schedule/Schedule.jsx";
// import Register from "./components/Account/Register.jsx";
// // import Login from "./components/Account/Login.jsx";
// import Login from "./pages/Auth/Login.jsx";
// import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";
// import Hero from "./hero/Hero.jsx";
// import UserPageNav from "./components/UserPage/UserPageNav.jsx";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";

import Scroller from "./components/PlayerDetails/scroller/Scroller.jsx";
import Main from "./components/PlayerDetails/Main.jsx";

const App = () => {
  const dashboardRef = useRef(null);
  const teamsRef = useRef(null);
  const scheduleRef = useRef(null);
  const LeaderboardRef = useRef(null);

  return (
    <>
      <ToastContainer />
      <div className="app">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default App;
