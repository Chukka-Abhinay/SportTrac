import React, { useState, useEffect } from 'react';
import MatchDisplay from './MatchDisplay';
import MatchSidebar from './MatchSidebar';

const initialMatchData = [
  {
    name: 'NIT Delhi vs NIT Warangal',
    team1: { name: 'NIT Delhi', logo: '/t1.png', details: { startTime: "10:00", endTime: "12:00", score: 30 } },
    team2: { name: 'NIT Warangal', logo: '/t2.png', details: { startTime: "10:00", endTime: "12:00", score: 42 } }
  },
  {
    name: 'NIT Rourkela vs NIT Surat',
    team1: { name: 'NIT Rourkela', logo: '/t3.png', details: { startTime: "13:00", score: 32 } },
    team2: { name: 'NIT Surat', logo: '/t4.png', details: { startTime: "13:00", score: 36 } }
  },
  {
    name: 'NIT Trichy vs NIT Calicut',
    team1: { name: 'NIT Trichy', logo: '/t5.png', details: { startTime: "22:00", score: 0 } },
    team2: { name: 'NIT Calicut', logo: '/t6.png', details: { startTime: "22:00", score: 0 } }
  }
];

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

  if (end && now > end) return 'previous';
  if (now >= start && (!end || now <= end)) return 'current';
  if (now < start) return 'upcoming';
  return null;
};

const Dashboard = () => {
  const [matches, setMatches] = useState(initialMatchData);
  const [selectedMatchIndex, setSelectedMatchIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prev => {
        const updated = [...prev];
        updated[1].team1.details.score += Math.floor(Math.random() * 3);
        updated[1].team2.details.score += Math.floor(Math.random() * 3);
        return updated;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0f1125] rounded-xl px-6 pt-5 pb-6" style={{ marginTop: '1rem' }}>
      <h2 className="text-white text-[18px] pl-55 ml-[220px] -mt-1 mb-5">Dashboard</h2>

      <div className="flex gap-6 h-full">
        <MatchSidebar
          matches={matches}
          onSelect={(match, index) => setSelectedMatchIndex(index)}
          selectedMatch={matches[selectedMatchIndex]}
        />
        <MatchDisplay
          selectedMatch={matches[selectedMatchIndex]}
          matchType={getMatchType(matches[selectedMatchIndex])}
        />
      </div>
    </div>
  );
};

export default Dashboard;
