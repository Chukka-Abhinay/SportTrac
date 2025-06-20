import React, { useState } from 'react';
import { teams } from './data';
import Scroller from './scroller/Scroller';
import PlayerDetails from './PlayerDetails';
import './main.css'
export default function Main() {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [selectedPlayer, setSelectedPlayer] = useState(teams[0].players[0]);

  return (
    <div className="main-container">
      <h2 >
        Teams & Players
      </h2>

      <div className="scroller-section">
        <Scroller
          items={teams}
          selected={selectedTeam}
          onSelectTeam={team => {
            setSelectedTeam(team);
            setSelectedPlayer(team.players[0]);
          }}
        />
      </div>

      <PlayerDetails
        team={selectedTeam}
        player={selectedPlayer}
        onPlayerSelect={setSelectedPlayer}
      />
    </div>
  );
}
