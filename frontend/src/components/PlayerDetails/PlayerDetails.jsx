import React, { useState, useEffect } from 'react';
import './PlayerDetails.css';

export default function PlayerDetails({ team }) {
  const [player, setPlayer] = useState(team.players[0]);

  useEffect(() => {
    setPlayer(team.players[0]);
  }, [team]);

  if (!team) return null;

  return (
    <div className="player-details-container">
      <div className="player-profile">
        <img src={player.avatar} alt={player.name} className="player-avatar"/>
        <h3>{player.name}</h3>
        <p>{player.position}</p>
      </div>
      <div className="player-list">
        {team.players.map(p => (
          <div
            key={p.id}
            className={`player-list-item ${p.id === player.id ? 'active' : ''}`}
            onClick={() => setPlayer(p)}
          >
            {p.name.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
