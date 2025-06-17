import React, { useRef } from "react";
import NavBar from "./components/NavBar/NavBar.jsx";
import SportsSlider from "./components/Sports/SportsSlider.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Matches from "./components/Matches/Matches.jsx";
import Teams from "./components/Teams/Teams.jsx";
import Schedule from "./components/Schedule/Schedule.jsx";
import Register from "./components/Account/Register.jsx";
import Login from "./components/Account/Login.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";
import Hero from "./hero/Hero.jsx";
import UserPageNav from "./components/UserPage/UserPageNav.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const dashboardRef = useRef(null);
  const teamsRef = useRef(null);
  const scheduleRef = useRef(null);
  const LeaderboardRef = useRef(null);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar
                  scrollToDashboard={() =>
                    dashboardRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  scrollToTeams={() =>
                    teamsRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  scrollToSchedule={() =>
                    scheduleRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  scrollToLeaderboard={() =>
                    LeaderboardRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                />
                <Hero></Hero>
                <div ref={dashboardRef}>
                  <Dashboard></Dashboard>
                </div>
                <div ref={teamsRef}>
                  <Teams />
                </div>
                <div ref={scheduleRef}>
                  <Schedule />
                </div>
                <div ref={LeaderboardRef}>
                  <Leaderboard></Leaderboard>
                </div>
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/:username"
            element={
              <>
                <UserPageNav
                  scrollToDashboard={() =>
                    dashboardRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  scrollToTeams={() =>
                    teamsRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  scrollToSchedule={() =>
                    scheduleRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  scrollToLeaderboard={() =>
                    LeaderboardRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                />
                <Hero></Hero>
                <div ref={dashboardRef}>
                  <Dashboard></Dashboard>
                </div>
                <div ref={teamsRef}>
                  <Teams />
                </div>
                <div ref={scheduleRef}>
                  <Schedule />
                </div>
                <div ref={LeaderboardRef}>
                  <Leaderboard></Leaderboard>
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
