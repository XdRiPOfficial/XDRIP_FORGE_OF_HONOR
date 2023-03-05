import React from 'react'
import forgeVideo from "../videos/forgeVideo.mp4";
import '../Hero.css';


const Hero = () => {
  return (
    <div className='hero'>
        <video src={forgeVideo} autoPlay loop muted />
        <div className="my-element">
            <h1></h1>
        </div>
    </div>
  )
}

export default Hero