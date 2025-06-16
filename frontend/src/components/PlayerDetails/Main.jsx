import React, { useState } from 'react'
import Scroller from './scroller/Scroller'
import PlayerDetails from './PlayerDetails'
import {teams} from './data'
export default function Main() {
  const [   selectedTeam, setSelectedTeam] = useState(teams[0])

  return (
    <div>
      <h3 style={{ textAlign: "center", color: "#EAB308", margin: "4px" }}>
        Teams & Players
      </h3>
      <Scroller onSelectTeam={setSelectedTeam} />
      <PlayerDetails team={selectedTeam} />
    </div>
  )
}
