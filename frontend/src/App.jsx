import React from "react";
import NavBar from "./components/NavBar/NavBar.jsx";
import SportsSlider from "./components/Sports/SportsSlider.jsx";
import Matches from "./components/Matches/Matches.jsx";
import Teams from "./components/Teams/Teams.jsx";
import PlayerDetails from "./components/PlayerDetails/PlayerDetails.jsx";
import Schedule from "./components/Schedule/Schedule.jsx";
import "./App.css";
import Hero from "./hero/Hero.jsx";

const App = () => (
  <div className="app">
    <NavBar/>
    <Hero/> 
  </div>
);

export default App;
