import React from "react";
import "./Matches.css";

const Matches = () => (
  <div className="matches">
    <h3>Upcoming Matches</h3>
    {[1, 2, 3].map((_, index) => (
      <div key={index} className="match">
        Upcoming Matches
      </div>
    ))}
  </div>
);

export default Matches;
