import React, { useState, useEffect } from "react";
import { useAllTeamsQuery } from "../../redux/api/teamApiSlice";
import Scroller from "./scroller/Scroller";
import PlayerDetails from "./PlayerDetails";
import Loader from "../Loader";
import "./main.css";
import { useSport } from "../../Context/SportContext";

export default function Main() {
  const { selectedSport } = useSport();
  const { data: allteams = [], isLoading, isError } = useAllTeamsQuery();

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const filteredTeams = allteams.filter(
    (t) => t?.sport?._id === selectedSport?._id
  );

  useEffect(() => {
    if (!selectedSport) return;

    if (filteredTeams.length > 0) {
      setSelectedTeam(filteredTeams[0]);
      setSelectedPlayer(filteredTeams[0].players?.[0] || null);
    } else {
      setSelectedTeam(null);
      setSelectedPlayer(null);
    }
  }, [selectedSport, allteams]);

  if (isLoading || !selectedSport) return <Loader />;
  if (isError) return <div>Error Loading Teams</div>;
  if (!filteredTeams.length)
    return <div>No teams available for this sport.</div>;
  if (!selectedTeam) return <div>No team selected.</div>;

  return (
    <div className="main-container">
      <h2>Teams & Players</h2>
      <div className="scroller-section">
        <Scroller
          items={filteredTeams}
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
