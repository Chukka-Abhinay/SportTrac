import React, { useState, useEffect, useRef } from 'react'
import basketBallVid from './assects/basketBall.mp4'
import footBallVid   from './assects/footBall.mp4'
import tennisVid     from './assects/tennis.mp4'
import './hero.css'

const videoItems = [
  { id: 0, video: basketBallVid, name: 'basketBall' },
  { id: 1, video: footBallVid,   name: 'footBall' },
  { id: 2, video: tennisVid,     name: 'tennis' },
]

const Hero = () => {
  const [action, setAction] = useState(0)
  const scrollerRef = useRef(null)

  useEffect(() => {
    const selected = scrollerRef.current?.children[action]
    if (selected) {
      selected.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }
  }, [action])

  return (
    <div className='hero-container'>
      <video
        className='video-size'
        src={videoItems[action].video}
        autoPlay loop muted playsInline
      />
      <div className="selector-overlay" />
      <div className="scroller" ref={scrollerRef}>
        {videoItems.map(item => (
          <div
            key={item.id}
            className={`box ${item.id === action ? 'active' : ''}`}
            onClick={() => setAction(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
