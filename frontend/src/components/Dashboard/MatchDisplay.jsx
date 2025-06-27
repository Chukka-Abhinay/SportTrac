import React from 'react';

const MatchDisplay = ({ selectedMatch, matchType }) => {
  if (!selectedMatch) return null;

  const { name, team1, team2 } = selectedMatch;

  const getMiddleLabel = () => {
    if (matchType === 'previous') {
      if (team1.details.score > team2.details.score) return `${team1.name} Won`;
      if (team2.details.score > team1.details.score) return `${team2.name} Won`;
      return "Draw";
    }
    if (matchType === 'upcoming') {
      return `Scheduled at ${team1.details.startTime}`;
    }
    if(matchType === 'current'){
      return 'Live now';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl px-5 pt-4 pb-5 flex-1 text-white flex flex-col gap-3 h-[274px] justify-between">
      {/* Title */}
      <h2 className="text-xl font-bold text-center">{name}</h2>

      {/* Logos and middle label */}
      <div className="flex justify-around items-center relative mt-[-8px]">
        <div className="flex justify-center w-1/2">
          <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center">
            <img
              src={team1.logo}
              className="w-20 h-20 object-contain transition-transform hover:scale-105"
              alt={team1.name}
            />
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-sm bg-slate-700 px-3 py-1 rounded shadow-md border border-slate-500">
          {getMiddleLabel()}
        </div>

        <div className="flex justify-center w-1/2">
          <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center">
            <img
              src={team2.logo}
              className="w-20 h-20 object-contain transition-transform hover:scale-105"
              alt={team2.name}
            />
          </div>
        </div>
      </div>

      {/* Bottom Boxes */}
      <div className="flex gap-4 flex-1 mt-[-20px]">
        <div className="bg-slate-700 rounded-lg px-4 py-2 flex-1 flex flex-col justify-center items-center h-[120px] shadow-md border border-slate-600">
          <p className="font-bold text-lg">{team1.name}</p>
          <p className="text-sm mt-2">Score : {team1.details.score}</p>
        </div>
        <div className="bg-slate-700 rounded-lg px-4 py-2 flex-1 flex flex-col justify-center items-center h-[120px] shadow-md border border-slate-600">
          <p className="font-bold text-lg">{team2.name}</p>
          <p className="text-sm mt-2">Score : {team2.details.score}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchDisplay;
