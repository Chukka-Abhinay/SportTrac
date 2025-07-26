import React, { useState } from "react";
import { useGetAllMatchesQuery } from "../../redux/api/matchApiSlice";
import { useSport } from "../../context/SportContext"; // ✅ Import the context

const DisplayAll = () => {
  const { data: matches, isLoading, isError, error } = useGetAllMatchesQuery();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const { selectedSport } = useSport();

  if(isLoading) return <div className="p-4 text-white">Loading matches...</div>;
  if (isError)
    return (
      <div className="p-4 text-red-400">
        Error: {error?.data?.message || "Failed to load matches"}
      </div>
    );

  // Filter matches by selected sport
  const filteredMatches = selectedSport
    ? matches.filter((match) => match.sport?._id === selectedSport._id)
    : matches;

  return (
    <div className="p-4 flex flex-col md:flex-row gap-4 bg-[#1e1e2f] text-white">
      {/* Match List Panel */}
      <div className="w-full md:w-4/10 bg-[#2a2a3d] rounded-lg p-4 shadow-lg border border-gray-700 transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 text-orange-400 tracking-wider">
          Matches
        </h2>

        <div
          className="overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-[#1e1e2f] pr-2"
          style={{ maxHeight: "160px" }}
        >
          {filteredMatches.map((match) => (
            <div
              key={match._id}
              className={cursor-pointer p-4 rounded-lg mb-3 border border-transparent transition-all duration-300 ease-in-out group ${
                selectedMatch?._id === match._id
                  ? "bg-orange-400  text-black font-bold shadow-inner"
                  : "hover:bg-[#3b3b50] hover:border-yellow-400"
              }}
              onClick={() => setSelectedMatch(match)}
            >
              <p className="text-md font-medium group-hover:text-yellow-300">
                {/* <strong className="text-white">Team A:</strong>{" "} */}
                <span>{match.teamA?.name ?? "Team A"} vs {match.teamB?.name ?? "Team B"}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Match Details Panel */}
      <div className="w-full md:w-6/10 bg-[#2a2a3d] rounded-lg p-6 shadow-xl border border-gray-700 overflow-auto transition duration-300 hover:shadow-2xl hover:border-orange-400">
  {selectedMatch ? (
    <>
      {/* Top Row: Location (left) and Time (right) */}
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm text-gray-300 hover:text-white transition duration-200">
          <strong className="text-white">Location:</strong>{" "}
          {selectedMatch.location}
        </p>
        <p className="text-1xl  text-gray-300 hover:text-white transition duration-200">
          <strong>Scheduled: {new Date(selectedMatch.scheduledTime).toLocaleString()}</strong>
        </p>

      </div>

      {/* Centered Heading */}
      {/* <h2 className="text-3xl font-extrabold text-orange-400 mb-6 text-center tracking-wide hover:scale-105 transition duration-300">Match Details</h2> */}

      {/* Team A vs Team B */}
      
      <div className="w-full bg-[#2a2a3d] rounded-lg p-6 shadow-xl border border-gray-700 transition duration-300 hover:shadow-2xl">
  {selectedMatch ? (
    <>
      {/* Teams and Status */}
      <div className="flex justify-between items-center mb-6">
        
        {/* Team A */}
        <div className="flex items-center space-x-2">
          {selectedMatch.teamA?.logo && (
            <img
              src={selectedMatch.teamA.logo}
              alt="Team A Logo"
              className="w-8 h-8 object-contain"
            />
          )}
          <span className="text-white font-semibold text-lg">
            {selectedMatch.teamA?.name ?? "Team A"}
          </span>
        </div>

        {/* Match Status */}
        <div className="text-orange-400 font-semibold text-lg capitalize">
          {selectedMatch.calculatedStatus ?? "Completed"}
          {selectedMatch?.score && (
        <div className="text-center mt-4">
          <p className="text-lg text-gray-300 hover:text-white transition duration-200 inline-block bg-[#3a3a4d] px-4 py-2 rounded-md shadow-md">
            <strong className="text-white"></strong>{" "}
            {selectedMatch.score.teamA} - {selectedMatch.score.teamB}
          </p>
        </div>
      )}

        </div>

        {/* Team B */}
        <div className="flex items-center space-x-2">
          <span className="text-white font-semibold text-lg">
            {selectedMatch.teamB?.name ?? "Team B"}
          </span>
          {selectedMatch.teamB?.logo && (
            <img
              src={selectedMatch.teamB.logo}
              alt="Team B Logo"
              className="w-8 h-8 object-contain"
            />
          )}
        </div>
      </div>

      {/* Scores Centered Below */}
      
    </>
  ) : (
    <p className="text-gray-400 italic text-center">Select a match to view details</p>
  )}
</div>


      
    </>
  ) : (
    <p className="text-gray-400 italic text-center">
      Select a match 
    </p>
  )}
</div>

    </div>
  );
};

export default DisplayAll;
