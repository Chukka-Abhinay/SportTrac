import React, { useState } from 'react';
import { useGetAllMatchesQuery } from '../../redux/api/matchApiSlice';

const DisplayAll = () => {
  const { data: matches, isLoading, isError, error } = useGetAllMatchesQuery();
  const [selectedMatch, setSelectedMatch] = useState(null);

  if (isLoading) return <div className="p-4 text-white">Loading matches...</div>;
  if (isError) return <div className="p-4 text-red-400">Error: {error?.data?.message || 'Failed to load matches'}</div>;

  return (
    <div className="p-4 flex flex-col md:flex-row gap-4 bg-[#1e1e2f] text-white">
      
      {/* Match List Panel */}
      <div className="w-full md:w-4/10 bg-[#2a2a3d] rounded-lg p-4 shadow-lg border border-gray-700 transition-all duration-300">
        {/* Fixed Heading */}
        <h2 className="text-xl font-bold mb-4 text-orange-400 tracking-wider">
          Matches
        </h2>

        {/* Scrollable Match List */}
        <div
          className="overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-[#1e1e2f] pr-2"
          style={{ maxHeight: '160px' }}
        >
          {matches.map((match) => (
            <div
              key={match._id}
              className={`cursor-pointer p-4 rounded-lg mb-3 border border-transparent transition-all duration-300 ease-in-out group ${
                selectedMatch?._id === match._id
                  ? 'bg-yellow-500 text-black font-bold shadow-inner'
                  : 'hover:bg-[#3b3b50] hover:border-yellow-400'
              }`}
              onClick={() => setSelectedMatch(match)}
            >
              <p className="text-md font-medium group-hover:text-yellow-300">
                <strong className="text-white">Team A:</strong>{' '}
                <span>{match.teamA?.name}</span>
              </p>
              <p className="text-md font-medium group-hover:text-yellow-300">
                <strong className="text-white">Team B:</strong>{' '}
                <span>{match.teamB?.name}</span>
              </p>
              <p className="text-sm text-gray-400 group-hover:text-gray-200">
                {new Date(match.scheduledTime).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Match Details Panel */}
      <div className="w-full md:w-6/10 bg-[#2a2a3d] rounded-lg p-6 shadow-xl border border-gray-700 overflow-auto transition duration-300 hover:shadow-2xl hover:border-orange-400">
        {selectedMatch ? (
          <>
            <h2 className="text-3xl font-extrabold text-orange-400 mb-6 tracking-wide hover:scale-105 transition duration-300">
              Match Details
            </h2>

            <p className="text-xl font-semibold text-white mb-4 group">
              <span className="text-orange-300 group-hover:text-yellow-300 transition duration-200">
                {selectedMatch.teamA?.name}
              </span>
              <span className="mx-2 text-gray-400 group-hover:text-gray-200"> vs </span>
              <span className="text-orange-300 group-hover:text-yellow-300 transition duration-200">
                {selectedMatch.teamB?.name}
              </span>
            </p>

            <p className="text-lg text-gray-300 mb-2 hover:text-white transition duration-200">
              <strong className="text-white">Scheduled:</strong>{' '}
              {new Date(selectedMatch.scheduledTime).toLocaleString()}
            </p>

            <p className="text-lg text-gray-300 mb-2 hover:text-white transition duration-200">
              <strong className="text-white">Location:</strong>{' '}
              {selectedMatch.location}
            </p>

            <p className="text-lg text-gray-300 hover:text-white transition duration-200">
              <strong className="text-white">Duration:</strong>{' '}
              {selectedMatch.duration} mins
            </p>
          </>
        ) : (
          <p className="text-gray-400 italic">Select a match to view details</p>
        )}
      </div>
    </div>
  );
};

export default DisplayAll;
