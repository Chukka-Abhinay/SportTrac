import React from 'react';

const MatchDisplay = ({ selectedMatch }) => {
  if (!selectedMatch) return null;

  if (selectedMatch.isEmpty) {
    return (
      <div className="bg-slate-800 rounded-xl px-5 pt-4 pb-5 flex-1 text-white flex flex-col items-center justify-center h-[274px]">
        <p className="text-xl font-semibold">No match</p>
      </div>
    );
  }

  const { teamA, teamB, scheduledTime, score, status } = selectedMatch;

  const getMiddleLabel = () => {
    if (status === 'Previous Match') {
      if (score.teamA > score.teamB) return `${teamA?.name} Won`;
      if (score.teamB > score.teamA) return `${teamB?.name} Won`;
      return "Draw";
    }
    if (status === 'Upcoming Match') {
      return `Scheduled at ${new Date(scheduledTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
    if (status === 'Current Match') {
      return 'Live Now';
    }
    return '';
  };

  return (
    <div className="bg-slate-800 rounded-xl px-5 pt-4 pb-5 flex-1 text-white flex flex-col gap-3 h-[274px] justify-between">
      <h2 className="text-xl font-bold text-center">
        {`${teamA?.name ?? 'Team A'} vs ${teamB?.name ?? 'Team B'}`}
      </h2>

      <div className="flex justify-around items-center relative mt-[-8px]">
        <div className="flex justify-center w-1/2">
          <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center">
            <img
              src={teamA?.logo && teamA.logo.trim() !== "" ? teamA.logo : '/t1.png'}
              className="w-20 h-20 object-contain transition-transform hover:scale-105"
              alt={teamA?.name ?? 'Team A'}
            />
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-sm bg-slate-700 px-3 py-1 rounded shadow-md border border-slate-500">
          {getMiddleLabel()}
        </div>

        <div className="flex justify-center w-1/2">
          <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center">
            <img
              src={teamB?.logo && teamB.logo.trim() !== "" ? teamB.logo : '/t2.png'}
              className="w-20 h-20 object-contain transition-transform hover:scale-105"
              alt={teamB?.name ?? 'Team B'}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-1 mt-[-20px]">
        <div className="bg-slate-700 rounded-lg px-4 py-2 flex-1 flex flex-col justify-center items-center h-[120px] shadow-md border border-slate-600">
          <p className="font-bold text-lg">{teamA?.name ?? 'Team A'}</p>
          <p className="text-sm mt-2">Score : {score?.teamA ?? 0}</p>
        </div>
        <div className="bg-slate-700 rounded-lg px-4 py-2 flex-1 flex flex-col justify-center items-center h-[120px] shadow-md border border-slate-600">
          <p className="font-bold text-lg">{teamB?.name ?? 'Team B'}</p>
          <p className="text-sm mt-2">Score : {score?.teamB ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchDisplay;
