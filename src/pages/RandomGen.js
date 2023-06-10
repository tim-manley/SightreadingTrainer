import React from 'react'
import '../detector.css'
import { startPitchDetect } from '../pitchdetect'
import { newExample, checker } from '../checker'

function RandomGen() {

    React.useEffect(() => {
        // Generate first example
        newExample();
        // Start note checker
        checker();
    })

    return (
        <div>
            <div id="target"></div>
            <button id="newExample" onClick={newExample}>Generate new example</button>
            <button id="pitchDetect" onClick={startPitchDetect}>Start pitch analysis</button>

            <div id="detector" className="vague">
                <div className="pitch"><span id="pitch">--</span>Hz</div>
                <div className="note"><span id="note">--</span></div>   
                <canvas id="output" width="300" height="42"></canvas>
                <div id="detune"><span id="detune_amt">--</span><span id="flat">cents &#9837;</span><span id="sharp">cents &#9839;</span></div>
            </div>
        </div>
    )
}

export default RandomGen