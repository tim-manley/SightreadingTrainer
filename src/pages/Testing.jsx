import React, { useEffect } from 'react'
import abcjs from 'abcjs';
import { newExample } from '../generator';

function Testing() {

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

        const [abcString] = newExample('deprecated', params)

        console.log(abcString);

        abcjs.renderAbc("target", abcString, { add_classes: true, staffwidth: 600 });

    }, []);

  return (
    <div>
        <p>Testing stuff below</p>
        <div id="target">

        </div>
    </div>
  )
}

export default Testing