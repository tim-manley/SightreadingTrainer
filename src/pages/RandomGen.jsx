import React, { useState } from 'react'
import '../detector.css'
import { startPitchDetect } from '../pitchdetect'
import { newExample, checker } from '../checker'

function RandomGen() {

    const intervals = new Set();
    const [clef, setClef] = useState('');
    const [numNotes, setNumNotes] = useState(0);

    const handlePitchDetect = () => {
        startPitchDetect();
        checker();
    }

    const handleNewExample = () => {
        newExample(numNotes, clef, intervals);
    }

    return (
        <div>
            <div id="target"></div>
            <form>
                <p>Choose how many notes:</p>
                <input type="number" name="numNotes" id="numNotes" onChange={(e) => setNumNotes(e.target.value)}/>
                <p>Choose a clef:</p>
                <input type="radio" name="clef" id="trebleClef" value="treble" onChange={(e) => setClef(e.target.value)}/>
                <label htmlFor="trebleClef">Treble</label><br />
                <input type="radio" name="clef" id="bassClef" value="bass" onChange={(e) => setClef(e.target.value)}/>
                <label htmlFor="bassClef">Bass</label>
                <p>Select intervals to be included:</p>
                <input type="checkbox" name='intervals' id="fourth" onChange={(e) => {
                    e.target.checked ? intervals.add(5) : intervals.delete(5);
                }}/>
                <label htmlFor="fourth">Fourths</label>
                <input type="checkbox" name='intervals' id="fifth" onChange={(e) => {
                    e.target.checked ? intervals.add(7) : intervals.delete(7);
                }}/>
                <label htmlFor="fifth">Fifths</label>
            </form>
            <button id="newExample" onClick={handleNewExample}>Generate new example</button>
            <button id="pitchDetect" onClick={handlePitchDetect}>Start pitch analysis</button>

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