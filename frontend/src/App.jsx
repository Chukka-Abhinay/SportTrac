import React from "react";
import NavBar from "./components/NavBar/NavBar.jsx";
import SportsSlider from "./components/Sports/SportsSlider.jsx";
import Matches from "./components/Matches/Matches.jsx";
import Teams from "./components/Teams/Teams.jsx";
import PlayerDetails from "./components/PlayerDetails/PlayerDetails.jsx";
import Schedule from "./components/Schedule/Schedule.jsx";
import Register from "./components/Account/Register.jsx";
import Login from "./components/Account/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => (
  <div className="app">
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/matches" element={<Matches />}></Route>
        <Route path="/teams" element={<Teams />}></Route>
      </Routes>
    </BrowserRouter>

    <SportsSlider></SportsSlider>
    <Matches />
    <Teams />

    <Schedule />
  </div>
);

export default App;
