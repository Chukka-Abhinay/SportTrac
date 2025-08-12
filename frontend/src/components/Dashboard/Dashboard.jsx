import React, { useState, useEffect, useCallback } from "react";
import MatchDisplay from "./MatchDisplay";
import MatchSidebar from "./MatchSidebar";
import socket from "../../socket.js";
import { useGetAllMatchesQuery } from "../../redux/api/matchApiSlice";

const Dashboard = ({ selectedSport }) => {
  const { data: apiMatches, isLoading, isError, refetch } = useGetAllMatchesQuery();
  const [orderedMatches, setOrderedMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Memoized function to organize matches.
  // This will only be recreated if selectedSport changes.
  const organizeMatches = useCallback(() => {
    if (!apiMatches || !selectedSport?.name) {
      setOrderedMatches([]);
      setSelectedMatch(null);
      return;
    }

    const sportMatches = apiMatches.filter(
      (m) => m.sport?.name === selectedSport.name
    );

    // Use the backend's `calculatedStatus` directly.
    const previous = sportMatches.filter((m) => m.calculatedStatus === "completed");
    const current = sportMatches.filter((m) => m.calculatedStatus === "live");
    const upcoming = sportMatches.filter((m) => m.calculatedStatus === "upcoming");

    // Create dummy matches for empty categories
    const previousMatch = previous.length > 0 ? previous.at(-1) : {
      id: "previous",
      status: "Previous Match",
      isEmpty: true,
    };
    const currentMatch = current.length > 0 ? current[0] : {
      id: "current",
      status: "Current Match",
      isEmpty: true,
    };
    const upcomingMatch = upcoming.length > 0 ? upcoming[0] : {
      id: "upcoming",
      status: "Upcoming Match",
      isEmpty: true,
    };

    const ordered = [previousMatch, currentMatch, upcomingMatch];
    setOrderedMatches(ordered);

    // Set the selected match, prioritizing live, then previous, then upcoming.
    setSelectedMatch(current[0] || previous.at(-1) || upcoming[0] || currentMatch);
  }, [apiMatches, selectedSport]);

  // Effect for initial load and when API data or selected sport changes.
  useEffect(() => {
    if (apiMatches) {
      organizeMatches();
    }
  }, [apiMatches, selectedSport, organizeMatches]);

  // Effect for socket listeners. This runs once on mount.
  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Connected to socket server with id:", socket.id);
    });

    const handleMatchUpdate = (updatedMatch) => {
      console.log("🔥 Received real-time update for match:", updatedMatch);
      // Refetch the data to keep the component state in sync with the server.
      // This is more reliable than manual state updates.
      refetch();
    };

    socket.on("matchUpdated", handleMatchUpdate);

    return () => {
      socket.off("connect");
      socket.off("matchUpdated", handleMatchUpdate);
    };
  }, [refetch]);

  if (isLoading) return <div className="text-white">Loading matches...</div>;
  if (isError) return <div className="text-red-500">Error loading matches.</div>;

  return (
    <div className="w-full bg-[#0f1125] rounded-xl px-6 pt-3 pb-4 mt-15">
      <h2 className="text-white text-[18px] pl-55 ml-[220px] mb-5 pb-3">
        Dashboard - {selectedSport?.name || "No Sport"}
      </h2>

      <div className="flex gap-6 h-full">
        <MatchSidebar
          matches={orderedMatches}
          onSelect={(match) => setSelectedMatch(match)}
          selectedMatch={selectedMatch}
        />
        {selectedMatch && <MatchDisplay selectedMatch={selectedMatch} />}
      </div>
    </div>
  );
};

export default Dashboard;