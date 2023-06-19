import React, { useState } from 'react'
import '../detector.css'
import { startPitchDetect } from '../pitchdetect'
import { checker } from '../checker'
import { newExample } from '../generator'
import { rangeVals, noteNumToLabel } from '../util'

function RandomGen() {

    const intervalNames = [
        "Unison",
        "Half-step",
        "Whole-step",
        "Minor third",
        "Major third",
        "Perfect fourth",
        "Tritone",
        "Perfect fifth",
        "Minor sixth",
        "Major sixth",
        "Minor seventh",
        "Major seventh",
        "Octave"
    ]

    
    const intervalVals = Array.from(Array(13).keys()); // Numbers 0-12

    const [params, setParams] = useState({
        numNotes: 10,
        clef: 'treble',
        intervals: [],
        range: [0, 0],
    })

    const handleNewExample = () => {
        newExample(params);
        checker();
    }

    const handleIntervalsChange = (e) => {
        let copyState = [...params.intervals];
        if (e.target.checked) {
            copyState.push(parseInt(e.target.value))
        } else {
            const index = copyState.indexOf(parseInt(e.target.value))
            if (index > -1) {
                copyState.splice(index, 1)
            }
        }
        setParams({...params, intervals: copyState});
    }

    const handleRangeChange = (e) => {
        let copyState = [...params.range];
        if (e.target.name === "fromRange") {
            copyState[0] = parseInt(e.target.value);
        } else if (e.target.name === "toRange") {
            copyState[1] = parseInt(e.target.value);
        } else {
            console.log("something went wrong");
            // TODO: Handle error...
        }
        setParams({...params, range: copyState});
    }

    return (
        <div>
            <div id="target"></div>
            <div id="options">
                <p>Choose how many notes:</p>
                <input type="number" name="numNotes" id="numNotes" value="10" onChange={(e) => setParams({...params, numNotes: e.target.value})}/>
                <p>Choose a clef:</p>
                <input type="radio" name="clef" id="trebleClef" value="treble" checked={params.clef==='treble'} onChange={(e) => setParams({...params, clef: e.target.value})}/>
                <label htmlFor="trebleClef">Treble</label><br />
                <input type="radio" name="clef" id="bassClef" value="bass" checked={params.clef==='bass'} onChange={(e) => setParams({...params, clef: e.target.value})}/>
                <label htmlFor="bassClef">Bass</label>
                <p>Select intervals to be included:</p>
                {intervalVals.map(num => (
                    <div key={intervalNames[num]}>
                        <input type="checkbox" name='intervals' id={intervalNames[num]} value={num} onChange={(e) => handleIntervalsChange(e)}/>
                        <label htmlFor={intervalNames[num]}>{intervalNames[num]}</label>
                    </div>
                ))}

                <select name="fromRange" id="fromRange" onChange={(e) => handleRangeChange(e)}>
                    {rangeVals.map(num => (
                        <option key={num} value={num}>{noteNumToLabel(num)}</option>
                    ))}
                </select>
                <select name="toRange" id="toRange" onChange={(e) => handleRangeChange(e)}>
                    {rangeVals.map(num => (
                        <option key={num} value={num}>{noteNumToLabel(num)}</option>
                    ))}
                </select>
            </div>

            <button id="newExample" onClick={handleNewExample}>Generate new example</button>
            <button id="pitchDetect" onClick={startPitchDetect}>Start pitch analysis</button><br />
            

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