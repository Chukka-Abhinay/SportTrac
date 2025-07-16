import React, { useState, useRef, useEffect } from "react";
import { useSport } from "../Context/SportContext";
import { useFetchSportsQuery } from "../redux/api/sportApiSlice";
import "./hero.css";
import Loader from "../components/Loader";

const ITEM_SIZE = 100;

export default function Hero() {
  const { data: videoItems = [], isLoading, isError } = useFetchSportsQuery();
  const { selectedSport, setSelectedSport } = useSport();

  const [action, setAction] = useState(0);
  const containerRef = useRef(null);
  const scrollTimer = useRef(null);

  const handleWheel = (e) => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    containerRef.current.scrollBy({ left: e.deltaY, behavior: "smooth" });
  };

  const handleScroll = (e) => {
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const centerX = left + width / 2;
      const kids = Array.from(e.currentTarget.children);
      const idx = kids
        .map((k) =>
          Math.abs(k.getBoundingClientRect().left + ITEM_SIZE / 2 - centerX)
        )
        .reduce(
          (bestIdx, dist, i, arr) => (dist < arr[bestIdx] ? i : bestIdx),
          0
        );
      setAction(idx);
      setSelectedSport(videoItems[idx]); // globally update selected sport
    }, 10);
  };

  // When selectedSport changes (e.g. from elsewhere), update `action` index
  useEffect(() => {
    if (videoItems.length && selectedSport) {
      const index = videoItems.findIndex(
        (item) => item._id === selectedSport._id
      );
      if (index !== -1 && index !== action) {
        setAction(index);
      }
    }
  }, [videoItems, selectedSport]);

  // On initial load, set the selected sport if not already stored
  useEffect(() => {
    if (videoItems.length && !selectedSport) {
      const stored = localStorage.getItem("selectedSport");
      if (!stored) {
        setSelectedSport(videoItems[0]);
      }
    }
  }, [videoItems, selectedSport]);

  if (isLoading) return <Loader />;
  if (isError || !videoItems.length) return <div>No videos found.</div>;

  const currentVideo = videoItems[action]?.video?.replace(/\\/g, "/") || null;

  return (
    <div className="hero-container">
      {currentVideo && (
        <video
          key={videoItems[action]?._id}
          className="video-size"
          src={currentVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      <div
        className="scroller"
        ref={containerRef}
        onWheel={handleWheel}
        onScroll={handleScroll}
      >
        {videoItems.map((item, index) => (
          <div
            key={item._id}
            className={`box ${index === action ? "active" : ""}`}
            onClick={() => {
              setAction(index);
              setSelectedSport(item); // update on click
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
