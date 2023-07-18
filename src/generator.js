import abcjs from 'abcjs'

// Generates random ABC music encoding

// Each note from lowest possible to highest possible is given a number, and mapped to its abcjs values
// For flat keys to be diatonic, take second enharmonic value, first for sharp
// TODO: Figure out C-major lol
export const numToNote = [
    ["=C,,"],
    ["^C,,", "_D,,"],
    ["=D,,"],
    ["^D,,", "_E,,"],
    ["=E,,", "_F,,"],
    ["^E,,", "=F,,"],
    ["^F,,", "_G,,"],
    ["=G,,"],
    ["^G,,", "_A,,"],
    ["=A,,"],
    ["^A,,", "_B,,"],
    ["=B,,", "_C,"],
    ["^B,,", "=C,"],
    ["^C,", "_D,"],
    ["=D,"],
    ["^D,", "_E,"],
    ["=E,", "_F,"],
    ["^E,", "=F,"],
    ["^F,", "_G,"],
    ["=G,"],
    ["^G,", "_A,"],
    ["=A,"],
    ["^A,", "_B,"],
    ["=B,", "_C"],
    ["^B,", "=C"],
    ["^C", "_D"],
    ["=D"],
    ["^D", "_E"],
    ["=E", "_F"],
    ["^E", "=F"],
    ["^F", "_G"],
    ["=G"],
    ["^G", "_A"],
    ["=A"],
    ["^A", "_B"],
    ["=B", "_c"],
    ["^B", "=c"],
    ["^c", "_d"],
    ["=d"],
    ["^d", "_e"],
    ["=e", "_f"],
    ["^e", "=f"],
    ["^f", "_g"],
    ["=g"],
    ["^g", "_a"],
    ["=a"],
    ["^a", "_b"],
    ["=b", "_c'"],
    ["^b", "=c'"]
];

// Creates a sequence of arhythmic notes
function generateNotes(params) {
    // Parse params
    const numNotes = params.numNotes;
    const clef = params.clef;
    const intervals = params.intervals;
    const range = params.range;

    //TODO: Input validation
    // Check numNotes > 0
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

    let abcString = `X:1\nK:C clef=${clef}\n`
    if (numNotes === 0) return abcString;
    // Pick random starting note (num in range)
    let currentNum = Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
    let currentNote = numToNote[currentNum][Math.floor(Math.random() * numToNote[currentNum].length)];
    abcString = abcString + currentNote + "0 ";
    // For numNotes
    for (let i = 1; i < numNotes; i++) {
        // Pick random index for interval value
        let index = Math.floor(Math.random() * intervals.length)
        // 50/50 whether up or down
        let up = (Math.random() > 0.5) ? 1 : -1;
        currentNum = currentNum + (up * intervals[index]);
        // While out of range, keep trying diff intervals
        while (currentNum > range[1] || currentNum < range[0]) {
            currentNum = currentNum - (up * intervals[index]);
            // Pick random index for interval value
            index = Math.floor(Math.random() * intervals.length)
            // 50/50 whether up or down
            up = (Math.random() > 0.5) ? 1 : -1;
            currentNum = currentNum + (up * intervals[index]);
        }
        currentNote = numToNote[currentNum][Math.floor(Math.random() * numToNote[currentNum].length)];
        abcString = abcString + currentNote + "0 ";
    }
    return abcString;
}

let globalOverlayAbcString = "";

export function newExample(params) {
    const abcString = generateNotes(params);
    globalOverlayAbcString = abcString;
    console.log(abcString);
    // Render overlay example (for live feedback)
    abcjs.renderAbc("overlayTarget", abcString, { add_classes: true });
}

export function reRenderOverlay(noteIndex, newNoteNum) {
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
    abcjs.renderAbc("overlayTarget", newAbcString, { add_classes: true })
}