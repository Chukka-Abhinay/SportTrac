import React from 'react';
import './PlayerDetails.css';

export default function PlayerDetails({ team, player, onPlayerSelect }) {
  return (
    <div className="player-details-layout">
      {/* Left: Player Profile */}
      <div className="player-profile">
        <img src={player.avatar} alt={player.name} className="player-avatar" />
        <h2>{player.name}</h2>
        <p className="player-info">{player.position}</p>
        {/* Add more info as needed */}
      </div>

      {/* Right: Scrollable Player List */}
      <div className="player-list-scroll">
        {team.players.map(p => (
          <div
            key={p.id}
            className={`player-name-item ${p.id === player.id ? 'active' : ''}`}
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
