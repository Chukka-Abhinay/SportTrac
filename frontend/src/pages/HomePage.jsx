import React, { useRef } from "react";
import NavBar from "../pages/Auth/Navigation.jsx";
import Dashboard from "../components/Dashboard/Dashboard.jsx";
import Hero from "../hero/Hero.jsx";
import Main from "../components/PlayerDetails/Main.jsx";
import Schedule from "../components/Schedule/Schedule.jsx";
import Leaderboard from "../components/Leaderboard/Leaderboard.jsx";
import { useSport } from "../Context/SportContext";
import { useSelector } from "react-redux";
import AdminMenu from "./Admin/AdminMenu.jsx";
const HomePage = () => {
  const { selectedSport } = useSport();

  const dashboardRef = useRef(null);
  const teamsRef = useRef(null);
  const scheduleRef = useRef(null);
  const LeaderboardRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  return (
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
          LeaderboardRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <Hero /> {/* ✅ Props removed */}
      <div className="mt-40" ref={dashboardRef}>
        <Dashboard selectedSport={selectedSport} />
      </div>
      <div ref={teamsRef}>
        <Main />
      </div>
      <div ref={scheduleRef}>
        <Schedule />
      </div>
      <div ref={LeaderboardRef}>
        <Leaderboard />
      </div>
      {userInfo?.isAdmin && <AdminMenu />}
    </>
  );
};

export default HomePage;
