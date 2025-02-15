import React, { useEffect, useState } from 'react'
import { startPitchDetect } from '../pitchdetect'
import { checker } from '../checker'
import { newExample } from '../generator'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import { doc } from 'firebase/firestore'
import Notation from '../components/Notation'
import Detector from '../components/Detector'

function RandomGen(props) {

    const [userDoc, loading, error] = useDocumentOnce(doc(db, "users", props.user.uid))

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

    useEffect(() => {
        // Sets initial parameters once userDoc has loaded
        if (userDoc) {
            setParams({...params, range: [userDoc.data().range[0], userDoc.data().range[1]]})
        }
    }, [userDoc, params])

    if (loading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <Notation />
            <div id="options">
                <p>Choose how many notes:</p>
                <input type="number" name="numNotes" id="numNotes" value={params.numNotes} onChange={(e) => {
                    setParams({...params, numNotes: parseInt(e.target.value)});}}/>
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
            </div>
            
            <div id="buttons">
                <button id="newExample" onClick={handleNewExample}>Generate new example</button>
                <button id="pitchDetect" onClick={() => {
                    startPitchDetect();
                    checker("overlayTarget", params.numNotes);}}>Start</button><br />
            </div>

            <Detector />
        </div>
    )
}

export default RandomGen