import React from "react";
import "./Teams.css";
import PlayerDetails from "../PlayerDetails/PlayerDetails";
const Teams = () => (
  <div className="teams">
    <h2>Teams & Players</h2>
    <div className="teams-list">
      {["Team A", "Team B", "Team C", "Team D"].map((team, index) => (
        <button key={index}>{team}</button>
      ))}
    </div>
    <PlayerDetails />
  </div>
);

export default Teams;
