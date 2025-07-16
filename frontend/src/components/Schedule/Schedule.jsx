import React from "react";
import "./Schedule.css";
import DisplayAll from "../MatchesSec/DisplayAll";

const Schedule = () => (
  <div className="schedule">
    <h1 className="text-4xl font-extrabold text-yellow-400 mb-6 text-center font-sans tracking-wider">Schedule</h1>
    <div className="schedule-list">
      <DisplayAll />
    </div>
  </div>
);

export default Schedule;
