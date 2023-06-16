import React, { useState } from 'react'
import '../detector.css'
import { startPitchDetect } from '../pitchdetect'
import { newExample, checker } from '../checker'

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

    const noteLabels = [
        "C",
        "C#/Db",
        "D",
        "D#/Eb",
        "E",
        "F",
        "F#/Gb",
        "G",
        "G#/Ab",
        "A",
        "A#/Bb",
        "B"
    ]

    const [intervals, setIntervals] = useState([]);
    const [clef, setClef] = useState('');
    const [numNotes, setNumNotes] = useState(0);
    const [range, setRange] = useState([0, 0]); // Default is whole thing

    const rangeVals = Array.from(Array(49).keys()); // Numbers 0-48
    const intervalVals = Array.from(Array(13).keys()); // Numbers 0-12

    const handlePitchDetect = () => {
        startPitchDetect();
        checker();
    }

    const handleNewExample = () => {
        const params = {
            "numNotes": numNotes,
            "clef": clef,
            "intervals": intervals,
            "range": range
        }
        newExample(params);
    }

    const handleIntervalsChange = (e) => {
        let copyState = [...intervals];
        if (e.target.checked) {
            copyState.push(parseInt(e.target.value))
        } else {
            const index = copyState.indexOf(parseInt(e.target.value))
            if (index > -1) {
                copyState.splice(index, 1)
            }
        }
        setIntervals(copyState);
    }

    const handleRangeChange = (e) => {
        let copyState = [...range];
        if (e.target.name === "fromRange") {
            copyState[0] = parseInt(e.target.value);
        } else if (e.target.name === "toRange") {
            copyState[1] = parseInt(e.target.value);
        } else {
            console.log("something went wrong");
            // TODO: Handle error...
        }
        setRange(copyState);
    }

    return (
        <div>
            <div id="target"></div>
            <div id="options">
                <p>Choose how many notes:</p>
                <input type="number" name="numNotes" id="numNotes" onChange={(e) => setNumNotes(e.target.value)}/>
                <p>Choose a clef:</p>
                <input type="radio" name="clef" id="trebleClef" value="treble" onChange={(e) => {
                    setClef(e.target.value)
                    }}/>
                <label htmlFor="trebleClef">Treble</label><br />
                <input type="radio" name="clef" id="bassClef" value="bass" onChange={(e) => setClef(e.target.value)}/>
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
                        <option key={num} value={num}>{noteLabels[num % 12] + (Math.floor(num/12) + 2).toString()}</option>
                    ))}
                </select>
                <select name="toRange" id="toRange" onChange={(e) => handleRangeChange(e)}>
                    {rangeVals.map(num => (
                        <option key={num} value={num}>{noteLabels[num % 12] + (Math.floor(num/12) + 2).toString()}</option>
                    ))}
                </select>
            </div>

            <button id="newExample" onClick={handleNewExample}>Generate new example</button>
            <button id="pitchDetect" onClick={handlePitchDetect}>Start pitch analysis</button><br />
            

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