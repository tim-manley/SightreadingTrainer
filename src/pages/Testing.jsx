import React, { useEffect, useState } from 'react'
import abcjs from 'abcjs';
import { newExample } from '../generator';
import Detector from '../components/Detector';
import { startChecker } from '../checker';
import { abcSynthToRefArray } from '../abcutil';

function Testing() {

  // Returned abcjs object
  const [renderObj, setRenderObj] = useState(null);

    useEffect(() => {

        const params = {
            clef: 'bass',
            range: [7, 26],
            intervals: [-7, -5, -2, -1, 0, 1, 2, 5, 7],
            numNotes: 10,
            rhythms: [4, 8, 12, 16, 24, 32],
            tempo: 100,
            timeSignature: '4/4',
            keySignature: 'Bb',
            diatonic: true
        }

        const [abcString, intervalNums, noteLengths] = newExample(params)

        console.log(abcString);
        console.log(intervalNums);
        console.log(noteLengths);

        setRenderObj(abcjs.renderAbc("target", abcString, { add_classes: true, staffwidth: 600 })[0]);
    }, []);

    const handleStart = () => {
      console.log("start pressed");
      var audioContext = new window.AudioContext();
        
        audioContext.resume().then(() => {
          let synth = new abcjs.synth.CreateSynth();

          synth.init({
            visualObj: renderObj
          }).then((response) => {
            console.log("Notes loaded: ", response);
            synth.prime().then((response) => {
              console.log(response);
              console.log(synth.getAudioBuffer());
              let noteData = synth.flattened.tracks[0];
              const correctArr = abcSynthToRefArray(noteData);
              console.log("Reference array: ", correctArr);
            });
          });
        });
    }

  return (
    <div>
        <p>Testing stuff below</p>
        <div id="target">

        </div>
        <button onClick={handleStart}>
          Start
        </button>
        <Detector />
    </div>
  )
}

export default Testing