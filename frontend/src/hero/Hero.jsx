import React, { useState, useEffect, useRef } from 'react'
import basketBallVid from './assects/basketBall.mp4'
import footBallVid   from './assects/footBall.mp4'
import tennisVid     from './assects/tennis.mp4'
import './hero.css'
const ITEM_SIZE = 100 
const videoItems = [
  { id: 0, video: basketBallVid, name: 'basketBall' },
  { id: 1, video: footBallVid,   name: 'footBall' },
  { id: 2, video: tennisVid,     name: 'tennis' },
  { id: 3, video: basketBallVid, name: 'basketBall' },
  { id: 4, video: footBallVid,   name: 'footBall' },
  { id: 5, video: tennisVid,     name: 'tennis' },
  { id: 6, video: basketBallVid, name: 'basketBall' },
  { id: 7, video: footBallVid,   name: 'footBall' },
  { id: 8, video: tennisVid,     name: 'tennis' },
  { id: 9, video: basketBallVid, name: 'basketBall' },
  { id: 10, video: footBallVid,   name: 'footBall' },
  { id: 11, video: tennisVid,     name: 'tennis' },
]

const Hero = () => {
  const [action, setAction] = useState(0)
  const ref = useRef(null)
    useEffect(() => {
  const el = ref.current;
  if (!el) return ;
  // Horizontal scroll on vertical mouse wheel
  const onWheel = (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  };

  el.addEventListener('wheel', onWheel, { passive: false });

  // existing scroll logic
  let timer;
  const onScroll = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const kids = Array.from(el.children);
      const idx = kids
        .map(k => Math.abs((k.getBoundingClientRect().left + ITEM_SIZE/2) - center))
        .reduce((minI, dist, i, arr) => dist < arr[minI] ? i : minI, 0);
      setAction(idx);

    }, 100);
  };
  el.addEventListener('wheel', onWheel, { passive: false });
  el.addEventListener('scroll', onScroll);

  return () => {
    el.removeEventListener('wheel', onWheel);
    el.removeEventListener('scroll', onScroll);
  };
}, []);

  return (
    <div className='hero-container'>
      <video
        className='video-size'
        src={videoItems[action].video}
        autoPlay loop muted playsInline
      />
      <div className="scroller" ref={ref}>
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
