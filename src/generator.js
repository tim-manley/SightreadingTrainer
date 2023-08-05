import abcjs from 'abcjs'
import { max } from 'moment';

// Generates random ABC music encoding

// Each note from lowest possible to highest possible is given a number, and mapped to its abcjs values
// For flat keys to be diatonic, take second enharmonic value, first for sharp
// TODO: Figure out C-major lol
export const numToNote = [
    ["=C,,"], // 0
    ["^C,,", "_D,,"], // 1
    ["=D,,"], // 2
    ["^D,,", "_E,,"], // 3
    ["=E,,", "_F,,"], // 4
    ["^E,,", "=F,,"], // 5
    ["^F,,", "_G,,"], // 6
    ["=G,,"], // 7
    ["^G,,", "_A,,"], // 8
    ["=A,,"], // 9
    ["^A,,", "_B,,"], // 10
    ["=B,,", "_C,"], // 11
    ["^B,,", "=C,"], // 12
    ["^C,", "_D,"], // 13
    ["=D,"], // 14
    ["^D,", "_E,"], // 15
    ["=E,", "_F,"], // 16
    ["^E,", "=F,"], // 17
    ["^F,", "_G,"], // 18
    ["=G,"], // 19
    ["^G,", "_A,"], // 20
    ["=A,"], // 21
    ["^A,", "_B,"], // 22
    ["=B,", "_C"], // 23
    ["^B,", "=C"], // 24
    ["^C", "_D"], // 25
    ["=D"], // 26
    ["^D", "_E"], // 27
    ["=E", "_F"], // 28
    ["^E", "=F"], // 29
    ["^F", "_G"], // 30
    ["=G"], // 31
    ["^G", "_A"], // 32
    ["=A"], // 33
    ["^A", "_B"], // 34
    ["=B", "_c"], // 35
    ["^B", "=c"], // 36
    ["^c", "_d"], // 37
    ["=d"], // 38
    ["^d", "_e"], // 39
    ["=e", "_f"], // 40
    ["^e", "=f"], // 41
    ["^f", "_g"], // 41
    ["=g"], // 43
    ["^g", "_a"], // 44
    ["=a"], // 45
    ["^a", "_b"], // 46
    ["=b", "_c'"], // 47
    ["^b", "=c'"] // 48
];

const flatKeys = new Set([
    'Bb', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'C'
])

const sharpKeys = new Set([
    'A', 'B', 'C#', 'D', 'E', 'F#', 'G'
])

const diatonicNotesForKey = {
    'Bb': new Set([0, 2, 3, 5, 7, 9, 10])
}

// Rhythms to avoid bc they're too weird
const avoidRhythms = new Set([
    5, 9, 11, 13, 15, 17, 19, 21, 23, 25, 26, 27, 29, 31
]);

// Maps non-representable and weird rhythms to representable and normal rhythms
const rhythmTranslate = {
    10: [8, 2],
    18: [16, 2],
    20: [16, 4],
    22: [16, 6],
    30: [24, 6]
};

/**
 * Helper function to determine if a noteNum is diatonic to a keySignature
 * @param {number} noteNum 
 * @param {string} keySignature 
 * @returns true if noteNum is diatonic to keySignature, false otherwise
 */
function isDiatonic(noteNum, keySignature) {
    return diatonicNotesForKey[keySignature].has(noteNum % 12);
}

/**
 * Helper function to determine if a noteNum is within a range
 * @param {number} noteNum The note number to check
 * @param {[number, number]} range A tuple with the lowest and highest note for the example
 * @returns {boolean} true if noteNum is within range, false otherwise
 */
function noteNumInRange(noteNum, range) {
    return (noteNum >= range[0] && noteNum <= range[1]); 
}

/**
 * Generates the pitch attribute of a note based on the previous note, the allowed intervals
 * the range, the key signature and whether the example should be diatonic
 * @param {number} prevNoteNum The previous note number
 * @param {[number]} intervals An array of the permitted intervals for the example
 * @param {[number, number]} range A tuple with the lowest and highest note for the example
 * @param {string} keySignature The key signature of the example
 * @param {boolean} diatonic Specifies whether next note should be diatonic to keySignature
 * @returns {[number, string]} The new note number and note string after finding a valid next pitch
 */
function generatePitch(prevNoteNum, intervals, range, keySignature, diatonic) {
    // Need to know previous note, key signature, valid intervals, range
    const flatKey = flatKeys.has(keySignature);
    let intervalNum = Math.floor(intervals[Math.random() * intervals.length]);
    let noteNum = prevNoteNum + intervalNum;
    // While the note is out of range or not diatonic (if specified) then find a new note
    while (!noteNumInRange(noteNum, range) || (diatonic && !isDiatonic(noteNum, keySignature))) {
        intervalNum = intervals[Math.floor(Math.random() * intervals.length)];
        noteNum = prevNoteNum + intervalNum;
    }
    // Retrieve the note string from the lookup table
    let noteString;
    if (numToNote[noteNum].length > 1) {
        // If flat key take the second value
        noteString = numToNote[noteNum][flatKey ? 1 : 0];
    } else {
        noteString = numToNote[noteNum][0];
    }
    // Remove accidental if it's diatonic
    if (isDiatonic(noteNum, keySignature)) {
        noteString = noteString.slice(1);
    }
    console.log("Pitch string: ", noteString);
    return [noteNum, noteString];
}

/**
 * Modifies the supplied noteString by giving it a note length. Ensures
 * the rhythm is displayed semantically (no notes over beat 3) and 
 * doesn't overflow the measure. Modifies currentMeasureLength to include
 * the new note length.
 * @param {[number]} rhythms An array of the permitted note lengths
 * @param {number} currentMeasureLength The current length of the measure
 * @param {number} maxMeasureLength The maximum length of a measure
 * @param {string} noteString The current note string
 * @returns {[number, string]} The new currentMeasureLength and noteString after new note length is appended
 */
function generateRhythm(rhythms, currentMeasureLength, maxMeasureLength, noteString) {
    // Note string should just be the pitch
    console.log("Before rhythm added: ", noteString);
    let noteLength = rhythms[Math.floor(Math.random() * rhythms.length)];
    // DESIGN CHOICE: no ties into next bar
    if (currentMeasureLength + noteLength > maxMeasureLength) {
        noteLength = maxMeasureLength - currentMeasureLength;
    }
    let newNoteString = ""
    // Check if crosses into beat 3
    if (currentMeasureLength < 16 && noteLength + currentMeasureLength > 16) {
        if (currentMeasureLength === 0 && (noteLength === 24 || noteLength === 32)) {
            newNoteString = noteString + noteLength;
        } else {
            let length1 = 16 - currentMeasureLength;
            let length2 = noteLength + currentMeasureLength - 16;
            if (noteString[0] === "_" || noteString[0] === "^" || noteString[0] === "="){
                newNoteString = noteString + length1 + "-" + noteString.slice(1) + length2;
            } else {
                newNoteString = noteString + length1 + "-" + noteString + length2;
            }
        }
    } else {
        newNoteString = noteString + noteLength;
    }
    currentMeasureLength += noteLength;
    if (currentMeasureLength === maxMeasureLength) {
        newNoteString += "|";
        currentMeasureLength = 0;
    } else {
        newNoteString += " ";
    }
    console.log("After rhythm added: ", newNoteString);
    return [currentMeasureLength, newNoteString];
}

// Creates a sequence of arhythmic notes
export function generateAbcString(params) {
    console.log(params);
    // Parse params
    const numNotes = params.numNotes;
    const clef = params.clef;
    const intervals = params.intervals;
    const range = params.range;
    const rhythms = params.rhythms;
    const tempo = params.tempo;
    const timeSignature = params.timeSignature;
    const keySignature = params.keySignature;
    const diatonic = params.diatonic;

    //TODO: Input validation
    // Check numNotes >= 0
    if (numNotes <= 0) {
        throw new Error("Number of notes cannot be zero")
    }
    // Check at least one interval chosen
    if (intervals.length <= 0) {
        throw new Error("Must select at least one interval")
    }
    // Check range is in valid order
    if (range[1] < range[0]) {
        throw new RangeError("Invalid range chosen");
    }
    // Check every interval is smaller than the range
    for (let j = 0; j < intervals.length; j++) {
        if (intervals[j] > (range[1] - range[0])) {
            throw new RangeError("One or more supplied intervals is too large for the supplied range");
        }
    }

    let abcString = `X:1\nM:${timeSignature}\nL:1/32\nK:${keySignature} clef=${clef}\nQ:${tempo}\n`;

    const flatKey = flatKeys.has(keySignature);

    // Set max 32nds in bar
    const nums = timeSignature.split('/');
    const firstNum = parseFloat(nums[0]);
    const secondNum = parseFloat(nums[1]);
    const maxMeasureLength = (firstNum/secondNum) * 32; // Time signature is fraction of a whole bar
    
    // Length tracker
    let currentMeasureLength = 0;

    // Pick random starting note (num in range)
    let noteNum = Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
    while (diatonic && !isDiatonic(noteNum, keySignature)) {
        noteNum = Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
    }
    let noteString;
    if (numToNote[noteNum].length > 1) {
        noteString = numToNote[noteNum][flatKey ? 1 : 0];
    } else {
        noteString = numToNote[noteNum][0];
    }
    if (isDiatonic(noteNum, keySignature)) {
        noteString = noteString.slice(1);
    }
    console.log("new note pitch string: ", noteString);
    // Add rhythm to first note
    [currentMeasureLength, noteString] = generateRhythm(rhythms, currentMeasureLength, maxMeasureLength, noteString);
    // Append final note to abcString
    abcString += noteString;
    // For the remaining notes
    for (let i = 1; i < numNotes - 1; i++) {
        // Generate pitch and rhythm for each note, then append the note to abcString
        console.log("Note number: ", i+1);
        [noteNum, noteString] = generatePitch(noteNum, intervals, range, keySignature, diatonic);
        console.log("new note pitch string: ", noteString);
        [currentMeasureLength, noteString] = generateRhythm(rhythms, currentMeasureLength, maxMeasureLength, noteString);
        abcString += noteString;
        console.log("string is now: ", abcString);
    }
    // If there is still space in the last measure, add a final note
    if (currentMeasureLength < maxMeasureLength) {
        [noteNum, noteString] = generatePitch(noteNum, intervals, range, keySignature, diatonic);
        abcString += noteString + (maxMeasureLength - currentMeasureLength) + "|]";
    } else {
        abcString += "|]";
    }
    return abcString;
}

let globalOverlayAbcString = "";

export function newExample(targetID, params) {
    const abcString = generateAbcString(params);
    globalOverlayAbcString = abcString;
    console.log(abcString);
    // Render overlay example (for live feedback)
    
    return [abcString];
}

export function reRenderOverlay(targetID, noteIndex, newNoteNum) {
    const abcLines = globalOverlayAbcString.split("\n");
    const notesLine = abcLines[abcLines.length - 1];
    const notes = notesLine.split(" ");
    notes[noteIndex] = "[" + notes[noteIndex] + numToNote[newNoteNum][0] + "0]"; // always the "flatter" option for now, need to change in future to deal w keys
    let newAbcString = "";
    for (let i = 0; i < abcLines.length; i++) {
        if (i < abcLines.length - 1) {
            newAbcString += abcLines[i] + "\n";
        } else {
            for (let j = 0; j < notes.length; j++) {
                if (j < notes.length - 1) {
                    newAbcString += notes[j] + " ";
                } else {
                    newAbcString += notes[j];
                }
            }
        }
    }
    globalOverlayAbcString = newAbcString;
    abcjs.renderAbc(targetID, newAbcString, { add_classes: true, staffwidth: 600 })
}