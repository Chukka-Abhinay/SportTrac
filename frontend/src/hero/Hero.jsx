import React, { useState, useRef } from "react";
import basketBallVid from "./assects/basketBall.mp4";
import footBallVid from "./assects/footBall.mp4";
import tennisVid from "./assects/tennis.mp4";
import "./hero.css";

const ITEM_SIZE = 100;
const videoItems = [
  { id: 0, video: basketBallVid, name: "basketBall" },
  { id: 1, video: footBallVid, name: "footBall" },
  { id: 2, video: tennisVid, name: "tennis" },
  { id: 3, video: basketBallVid, name: "basketBall" },
  { id: 4, video: footBallVid, name: "footBall" },
  { id: 5, video: tennisVid, name: "tennis" },
  { id: 6, video: basketBallVid, name: "basketBall" },
  { id: 7, video: footBallVid, name: "footBall" },
  { id: 8, video: tennisVid, name: "tennis" },
  { id: 9, video: basketBallVid, name: "basketBall" },
  { id: 10, video: footBallVid, name: "footBall" },
  { id: 11, video: tennisVid, name: "tennis" },
  { id: 20, video: basketBallVid, name: "basketBall" },
  { id: 21, video: footBallVid, name: "footBall" },
  { id: 22, video: tennisVid, name: "tennis" },
  { id: 23, video: basketBallVid, name: "basketBall" },
  { id: 24, video: footBallVid, name: "footBall" },
  { id: 25, video: tennisVid, name: "tennis" },
  { id: 26, video: basketBallVid, name: "basketBall" },
  { id: 27, video: footBallVid, name: "footBall" },
  { id: 28, video: tennisVid, name: "tennis" },
  { id: 29, video: basketBallVid, name: "basketBall" },
  { id: 30, video: footBallVid, name: "footBall" },
  { id: 31, video: tennisVid, name: "tennis" },
];

export default function Hero() {
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

  return (
    <div className="hero-container ">
      <video
        key={action}
        className="video-size"
        src={videoItems[action].video}
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
        {videoItems.map((item) => (
          <div
            key={item.id}
            className={`box ${item.id === action ? "active" : ""}`}
            onClick={() => setAction(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
