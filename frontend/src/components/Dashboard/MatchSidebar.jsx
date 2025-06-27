import React from 'react';

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

const getMatchType = (match) => {
  const now = new Date();
  const start = parseTime(match.team1.details.startTime);
  const end = match.team1.details.endTime ? parseTime(match.team1.details.endTime) : null;

  if (end && now > end) return 'Previous Match';
  if (now >= start && (!end || now <= end)) return 'Current Match';
  if (now < start) return 'Upcoming Match';
  return null;
};

const MatchSidebar = ({ matches, onSelect }) => {
  return (
    <div className="flex flex-col gap-4 w-52">
      {matches.map((match, index) => (
        <div key={index} className="bg-slate-800 rounded-lg p-2">
          <p className="text-sm text-white text-center font-semibold mb-1">
            {getMatchType(match)}
          </p>
          <div
            onClick={() => onSelect(match, index)}
            className="bg-slate-700 hover:bg-slate-600 transition p-3 rounded text-white text-sm text-center cursor-pointer"
          >
            {match.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchSidebar;
