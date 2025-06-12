import React, { useState, useEffect, useRef } from 'react'
import basketBallVid from './assects/basketBall.mp4'
import footBallVid   from './assects/footBall.mp4'
import tennisVid     from './assects/tennis.mp4'
import './hero.css'

const videoItems = [
  { id: 0, video: basketBallVid, name: 'basketBall' },
  { id: 1, video: footBallVid,   name: 'footBall' },
  { id: 2, video: tennisVid,     name: 'tennis' },
  { id: 3, video: tennisVid,     name: 'tennis1' },
  { id: 4, video: tennisVid,     name: 'tennis2' },
  { id: 5, video: tennisVid,     name: 'tennis3' },
  { id: 6, video: tennisVid,     name: 'tennis4' },
  { id: 7, video: tennisVid,     name: 'tennis5' },
  { id: 8, video: tennisVid,     name: 'tennis6' },
  { id: 9, video: tennisVid,     name: 'tennis7' },
  { id: 10, video: tennisVid,     name: 'tennis8' },
  { id: 11, video: tennisVid,     name: 'tennis9' },
  { id: 12, video: tennisVid,     name: 'tennis10' },
  { id: 13, video: tennisVid,     name: 'tennis11' }
]

const Hero = () => {
  const [action, setAction] = useState(0)

  return (
    <div className='hero-container'>
      <video
        className='video-size'
        src={videoItems[action].video}
        autoPlay loop muted playsInline
      />
      <div className="scroller" >
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
