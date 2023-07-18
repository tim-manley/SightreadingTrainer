import React from 'react'

function Detector() {
  return (
    <div id="detector" className="vague" style={{display: 'none'}}>
        <div className="pitch"><span id="pitch">--</span>Hz</div>
        <div className="note"><span id="note">--</span></div>   
        <canvas id="output" width="300" height="42"></canvas>
        <div id="detune"><span id="detune_amt">--</span><span id="flat">cents &#9837;</span><span id="sharp">cents &#9839;</span></div>
    </div>
  )
}

export default Detector