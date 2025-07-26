import React, { useEffect, useRef } from "react";
import "./Scroller.css";

export default function Scroller({ items, selected, onSelectTeam }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (!selected || !items.length) return;
    const idx = items.findIndex((t) => t._id === selected._id);
    const el = itemRefs.current[idx];
    el?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [selected, items]);

  return (
    <div className="scroller-root">
      <div
        className="scroller-track"
        ref={containerRef}
        onWheel={(e) => {
          if (e.deltaY !== 0) {
            e.preventDefault();
            containerRef.current.scrollBy({
              left: e.deltaY * 0.8,
              behavior: "smooth",
            });
          }
        }}
      >
        {items.map((team, idx) => (
          <div
            key={team._id}
            ref={(el) => (itemRefs.current[idx] = el)}
            className={`scroller-item ${
              selected && team._id === selected._id ? "active" : ""
            }`}
            onClick={() => onSelectTeam(team)}
          >
            {team.name}
          </div>
        ))}
      </div>
    </div>
  );
}
