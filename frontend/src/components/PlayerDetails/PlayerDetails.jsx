import React from "react";
import "./PlayerDetails.css";

export default function PlayerDetails({ team, player, onPlayerSelect }) {
  if (!team.players.length) {
    return (
      <div className="player-details-layout">No players in this team.</div>
    );
  }

  return (
    <div className="player-details-layout">
      {/* Left: Player Profile */}
      {player && (
        <div className="player-profile">
          <img
            src={player.avatar}
            alt={player.name}
            className="player-avatar"
          />
          <h2>{player.name}</h2>
          <p className="player-info">{player.position}</p>
        </div>
      )}

      {/* Right: Scrollable Player List */}
      <div className="player-list-scroll">
        {team.players.map((p) => (
          <div
            key={p._id}
            className={`player-name-item ${
              player && p._id === player._id ? "active" : ""
            }`}
            onClick={() => onPlayerSelect(p)}
          >
            <span className="player-name-left">{p.name}</span>
            <span className="player-role-right">
              {p.position.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
