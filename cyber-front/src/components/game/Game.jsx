import React from 'react';
import './Game.css';
import longline from '../../img/longline.png'
const Game=({img, alt, text}) => {
  return (
    <div className='wrapper'>
      <div className="cont">
        <img src={img} alt={alt}/>
        <p>{text}</p>
      </div>
      <img className="longline" src={longline} alt="longline"/>
    </div>
  )
}
export default Game