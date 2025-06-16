import React, { useState, useRef } from 'react'
import './Scroller.css'

const ITEM_SIZE = 100
const items = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  name: `Team ${String.fromCharCode(65 + (i % 26))}`
}))

export default function Scroller({ onSelectTeam }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const scrollTimer = useRef(null)

  const onWheelScroll = (e) => {
    if (e.deltaY === 0) return
    e.preventDefault()
    containerRef.current.scrollBy({
      left: e.deltaY * 0.8, // slower scroll feel
      behavior: 'smooth'
    })
  }

  const onScrollerScroll = () => {
    clearTimeout(scrollTimer.current)
    scrollTimer.current = setTimeout(() => {
      const el = containerRef.current
      const { left, width } = el.getBoundingClientRect()
      const centerX = left + width / 2

      const kids = Array.from(el.children)
      const nearest = kids.map(k => 
        Math.abs(k.getBoundingClientRect().left + ITEM_SIZE / 2 - centerX)
      ).reduce(
        (best, cur, idx, arr) => (cur < arr[best] ? idx : best), 0
      )

      setActiveIndex(nearest)
    }, 60)
  }

  return (
    <div className="scroller-root">
      <div
        className="scroller-track"
        ref={containerRef}
        onWheel={onWheelScroll}
        onScroll={onScrollerScroll}
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`scroller-item ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => {
                setActiveIndex(idx)
                onSelectTeam(item)
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}
