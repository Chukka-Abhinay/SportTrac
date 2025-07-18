import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useGetAllMatchesQuery } from "../../redux/api/matchApiSlice";
import Loader from "../Loader";

const Leaderboard = ({ selectedSport }) => {
  const { data: matches, isLoading, isError } = useGetAllMatchesQuery();

  const leaderboard = useMemo(() => {
    if (!matches || !selectedSport?.name) return [];

    const completedMatches = matches.filter((match) => {
      if (match?.sport?.name !== selectedSport.name) return false;

      const start = new Date(match.scheduledTime);
      const end = new Date(start.getTime() + (match.duration ?? 0) * 60000);
      return new Date() > end;
    });

    const teams = {};

    completedMatches.forEach((match) => {
      const { teamA, teamB, score } = match;
      const scoreA = score?.teamA ?? 0;
      const scoreB = score?.teamB ?? 0;

      const teamAName = teamA.name;
      const teamBName = teamB.name;

      [teamAName, teamBName].forEach((teamName) => {
        if (!teams[teamName]) {
          teams[teamName] = {
            name: teamName,
            matchesPlayed: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsScored: 0,
            goalsConceded: 0,
            points: 0,
          };
        }
      });

      teams[teamAName].matchesPlayed += 1;
      teams[teamBName].matchesPlayed += 1;

      teams[teamAName].goalsScored += scoreA;
      teams[teamAName].goalsConceded += scoreB;
      teams[teamBName].goalsScored += scoreB;
      teams[teamBName].goalsConceded += scoreA;

      if (scoreA > scoreB) {
        teams[teamAName].wins += 1;
        teams[teamBName].losses += 1;
        teams[teamAName].points += 3;
      } else if (scoreA < scoreB) {
        teams[teamBName].wins += 1;
        teams[teamAName].losses += 1;
        teams[teamBName].points += 3;
      } else {
        teams[teamAName].draws += 1;
        teams[teamBName].draws += 1;
        teams[teamAName].points += 1;
        teams[teamBName].points += 1;
      }
    });

    return Object.values(teams).sort((a, b) => b.points - a.points);
  }, [matches, selectedSport]);

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-500">Error loading leaderboard.</div>;
  if (!leaderboard.length) return <div className="text-white">No completed matches yet.</div>;

  return (
    <div className="w-full bg-[#0f1125] rounded-xl px-6 pt-3 pb-6 mt-5">
      <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6 tracking-wide">
        🏆 Leaderboard - {selectedSport?.name}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#2a2a3d] text-yellow-300 uppercase text-sm">
              <th className="py-3 px-4 border border-gray-700">Rank</th>
              <th className="py-3 px-4 border border-gray-700 text-left">Team</th>
              <th className="py-3 px-4 border border-gray-700">Matches Played</th>
              <th className="py-3 px-4 border border-gray-700">Wins</th>
              <th className="py-3 px-4 border border-gray-700">Draws</th>
              <th className="py-3 px-4 border border-gray-700">Losses</th>
              {/* <th className="py-3 px-4 border border-gray-700">GF</th>
              <th className="py-3 px-4 border border-gray-700">GA</th> */}
              <th className="py-3 px-4 border border-gray-700">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, index) => (
              <motion.tr
                key={team.name}
                className="text-center bg-[#2a2a3d] text-white hover:bg-yellow-500 hover:text-black hover:font-semibold transition duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="py-3 px-4 border border-gray-700">{index + 1}</td>
                <td className="py-3 px-4 border border-gray-700 text-left">{team.name}</td>
                <td className="py-3 px-4 border border-gray-700">{team.matchesPlayed}</td>
                <td className="py-3 px-4 border border-gray-700">{team.wins}</td>
                <td className="py-3 px-4 border border-gray-700">{team.draws}</td>
                <td className="py-3 px-4 border border-gray-700">{team.losses}</td>
                {/* <td className="py-3 px-4 border border-gray-700">{team.goalsScored}</td>
                <td className="py-3 px-4 border border-gray-700">{team.goalsConceded}</td> */}
                <td className="py-3 px-4 border border-gray-700 font-bold">{team.points}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
