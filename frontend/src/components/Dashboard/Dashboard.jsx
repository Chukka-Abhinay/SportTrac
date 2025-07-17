import React, { useState, useEffect } from "react";
import MatchDisplay from "./MatchDisplay";
import MatchSidebar from "./MatchSidebar";
import socket from "../../socket.js";
import { useGetAllMatchesQuery } from "../../redux/api/matchApiSlice";

const getMatchType = (match) => {
  const now = new Date();
  const start = new Date(match.scheduledTime);
  const end = match.duration
    ? new Date(start.getTime() + match.duration * 60000)
    : null;

  if (end && now > end) return "Previous Match";
  if (now >= start && (!end || now <= end)) return "Current Match";
  if (now < start) return "Upcoming Match";
  return null;
};

const Dashboard = ({ selectedSport }) => {
  const { data: apiMatches, isLoading, isError } = useGetAllMatchesQuery();
  console.log(apiMatches);
  const [orderedMatches, setOrderedMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  // ✅ Organize matches on load from API
  useEffect(() => {
    if (
      apiMatches &&
      apiMatches.length > 0 &&
      selectedSport &&
      selectedSport.name
    ) {
      const sportMatches = apiMatches.filter(
        (m) => m.sport?.name === selectedSport.name
      );

      const categorized = sportMatches.map((m) => ({
        ...m,
        status: getMatchType(m),
      }));

      const previous = categorized.filter((m) => m.status === "Previous Match");
      const current = categorized.filter((m) => m.status === "Current Match");
      const upcoming = categorized.filter((m) => m.status === "Upcoming Match");

      const previousMatch = previous.at(-1) ?? {
        id: "previous",
        status: "Previous Match",
        isEmpty: true,
      };
      const currentMatch = current[0] ?? {
        id: "current",
        status: "Current Match",
        isEmpty: true,
      };
      const upcomingMatch = upcoming[0] ?? {
        id: "upcoming",
        status: "Upcoming Match",
        isEmpty: true,
      };

      const ordered = [previousMatch, currentMatch, upcomingMatch];
      setOrderedMatches(ordered);

      setSelectedMatch(
        current[0] ?? previous.at(-1) ?? upcoming[0] ?? currentMatch
      );
    }
  }, [apiMatches, selectedSport]);

  // ✅ Log socket connection once
  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Connected to socket server with id:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  // ✅ Listen for match updates
  useEffect(() => {
    console.log("🧲 Setting up socket listener for matchUpdated");
    const handleMatchUpdate = (updatedMatch) => {
      console.log("🔥 Received real-time update for match:", updatedMatch);

      if (
        !selectedSport?.name ||
        updatedMatch?.sport?.name !== selectedSport.name
      )
        return;

      const updatedStatus = getMatchType(updatedMatch);

      setOrderedMatches((prevMatches) => {
        const matchesWithoutDummy = prevMatches.filter((m) => !m.isEmpty);

        const updatedList = matchesWithoutDummy.map((m) =>
          m._id === updatedMatch._id
            ? { ...updatedMatch, status: updatedStatus }
            : m
        );

        const previous = updatedList.filter(
          (m) => m.status === "Previous Match"
        );
        const current = updatedList.filter((m) => m.status === "Current Match");
        const upcoming = updatedList.filter(
          (m) => m.status === "Upcoming Match"
        );

        const previousMatch = previous.at(-1) ?? {
          id: "previous",
          status: "Previous Match",
          isEmpty: true,
        };
        const currentMatch = current[0] ?? {
          id: "current",
          status: "Current Match",
          isEmpty: true,
        };
        const upcomingMatch = upcoming[0] ?? {
          id: "upcoming",
          status: "Upcoming Match",
          isEmpty: true,
        };

        return [previousMatch, currentMatch, upcomingMatch];
      });

      if (selectedMatch && selectedMatch._id === updatedMatch._id) {
        setSelectedMatch({
          ...updatedMatch,
          status: updatedStatus,
        });
      }
    };

    socket.on("matchUpdated", handleMatchUpdate);

    return () => {
      socket.off("matchUpdated", handleMatchUpdate);
    };
  }, [selectedSport, selectedMatch]);

  if (isLoading) return <div className="text-white">Loading matches...</div>;
  if (isError)
    return <div className="text-red-500">Error loading matches.</div>;

  return (
    <div className="w-full bg-[#0f1125] rounded-xl px-6 pt-3 pb-6 mt-5">
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
