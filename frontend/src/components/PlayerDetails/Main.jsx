import React, { useState, useEffect } from "react";
import { useAllTeamsQuery } from "../../redux/api/teamApiSlice";
import Scroller from "./scroller/Scroller";
import PlayerDetails from "./PlayerDetails";
import Loader from "../Loader";
import "./main.css";

export default function Main() {
  const [selectedSport, setSelectedSport] = useState(
    "6866cb58d26fa140d14e9eca"
  );
  const {
    data: allteams = [],
    refetch,
    isLoading,
    isError,
  } = useAllTeamsQuery();

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const teams = allteams?.filter((t) => t.sport._id === selectedSport);

  // Only log when allteams is updated
  useEffect(() => {
    console.log("Fetched teams:", allteams);

    if (teams && teams.length > 0) {
      setSelectedTeam(teams[0]);
      setSelectedPlayer(teams[0].players?.[0] || null);
      refetch();
    }
  }, [allteams, selectedSport]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error Loading Teams</div>;
  if (!selectedTeam || !selectedPlayer)
    return <div>No teams or players available</div>;

  return (
    <div className="main-container">
      <h2>Teams & Players</h2>
      <div className="scroller-section">
        <Scroller
          items={teams}
          selected={selectedTeam}
          onSelectTeam={(team) => {
            setSelectedTeam(team);
            setSelectedPlayer(team.players?.[0] || null);
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
