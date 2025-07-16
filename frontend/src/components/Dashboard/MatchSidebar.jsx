  import React from 'react';

  const MatchSidebar = ({ matches, onSelect, selectedMatch }) => {
    return (
      <div className="flex flex-col gap-4 w-52">
        {matches.map((match, index) => {
          const isSelected = selectedMatch?.id === match.id;
          const isEmpty = match.isEmpty;

          return (
            <div key={index} className="bg-slate-800 rounded-lg p-2">
              <p className="text-sm text-white text-center font-semibold mb-1">
                {match.status}
              </p>
              <div
                onClick={() => onSelect(match)}
                className={`transition p-3 rounded text-white text-sm text-center cursor-pointer truncate
                  ${isSelected ? 'bg-slate-600' : 'bg-slate-700 hover:bg-slate-600'}
                `}
              >
                {isEmpty
                  ? 'No match'
                  : `${match.teamA?.name ?? 'Team A'} vs ${match.teamB?.name ?? 'Team B'}`}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  export default MatchSidebar;
