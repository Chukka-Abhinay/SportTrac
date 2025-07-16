import React, { useState, useRef, useEffect } from "react";
import { useFetchSportsQuery } from "../redux/api/sportApiSlice";
import "./hero.css";
import Loader from "../components/Loader";

const ITEM_SIZE = 100;

export default function Hero({ selectedSport, setSelectedSport }) {
  const { data: videoItems = [], isLoading, isError } = useFetchSportsQuery();
  const [action, setAction] = useState(0);
  const containerRef = useRef(null);
  const scrollTimer = useRef(null);

  const handleWheel = (e) => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    const el = containerRef.current;
    el.scrollBy({ left: e.deltaY, behavior: "smooth" });
  };

  const handleScroll = (e) => {
    const el = e.currentTarget;
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const { left, width } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const kids = Array.from(el.children);
      const idx = kids
        .map((k) =>
          Math.abs(k.getBoundingClientRect().left + ITEM_SIZE / 2 - centerX)
        )
        .reduce(
          (bestIdx, dist, i, arr) => (dist < arr[bestIdx] ? i : bestIdx),
          0
        );
      setAction(idx);
    }, 10);
  };

  useEffect(() => {
    if (videoItems[action]) {
      setSelectedSport(videoItems[action].name);
    }
  }, [action, videoItems, setSelectedSport]);

  if (isLoading) return <Loader />;
  if (isError || !videoItems.length) return <div>No videos found.</div>;

  const currentVideo =
    videoItems[action]?.video?.replace(/\\/g, "/") || null;

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
              setSelectedSport(item.name);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
