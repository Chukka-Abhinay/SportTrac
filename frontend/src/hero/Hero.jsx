import React, { useState, useRef, useEffect } from "react";
import { useFetchSportsQuery } from "../redux/api/sportApiSlice";
import "./hero.css";
import Loader from "../components/Loader";
import { useSport } from "../Context/SportContext";
export default function Hero() {
  const { data: videoItems = [], isLoading, isError } = useFetchSportsQuery();
  const { selectedSport, setSelectedSport } = useSport(); // ← access global setter

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
      setSelectedSport(videoItems[idx]); // ← globally update selected sport
    }, 10);
  };
  useEffect(() => {
    // Sync selected sport whenever action or data changes
    if (videoItems.length && videoItems[action]) {
      setSelectedSport(videoItems[action]);
    }
  }, [action, videoItems]);

  useEffect(() => {
    // Initialize only once if not already set
    if (videoItems.length && !selectedSport) {
      setSelectedSport(videoItems[0]);
    }
  }, [videoItems]);
  // console.log(selectedSport);
  if (isLoading) return <Loader />;
  if (isError || !videoItems.length) return <div>No videos found.</div>;

  return (
    <div className="hero-container">
      <video
        key={videoItems[action]?._id}
        className="video-size"
        src={videoItems[action]?.video?.replace(/\\/g, "/")}
        autoPlay
        loop
        muted
        playsInline
      />
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
              setSelectedSport(item); // ← also update on click
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
