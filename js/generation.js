// Generates random ABC music encoding

const numToNote = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G"
};

function generateHeader() {
    let abcString = "X:1\nT:Random Bars\nM:4/4\nQ:1/4 = 100\nL:1/8\nK:C\n";
    return abcString;
}

// Creates one random bar in C, 4/4, using string concatenation
function generateBar(needsHeader) {
    let abcString = "";
    if (needsHeader) {
        abcString = abcString + generateHeader();
    }
    let length = 0; // Length of notes selected
    while (length < 8) { // While not full
        let newNote = "";
        let altered = Math.random();
        if (altered < 0.3) {
            newNote = newNote + "^";
        } else if (altered > 0.7) {
            newNote = newNote + "_";
        }
        let noteValue = Math.floor(1 + Math.random() * 7);
        newNote = newNote + numToNote[noteValue];
        let newNoteLength = Math.floor(1 + Math.random() * 8); // Maybe just use remaining time?
        while (length + newNoteLength > 8 || newNoteLength == 5) { // 5 is not well defined
            newNoteLength = Math.floor(1 + Math.random() * 8)
        }
        newNote = newNote + newNoteLength;
        length = length + newNoteLength;
        abcString = abcString + newNote + " ";
    }
    return abcString;
}

function generateBars(numBars) {
    let abcString = generateHeader();
    for (let i = 0; i < numBars; i++) {
        abcString = abcString + generateBar(false) + "| ";
    }
    return abcString;
}

// Creates a sequence of arhythmic notes
function generateNotes(numNotes) {
    let abcString = "X:1\nT:Random Notes\nK:C\n"
    for (let i = 0; i < numNotes; i++) {
        let altered = Math.random();
        if (altered < 0.3) {
            abcString = abcString + "^";
        } /*else if (altered > 0.7) {
            abcString = abcString + "_";
        } */else {
            abcString = abcString + "=";
        }
        let newNote = numToNote[1 + Math.floor(Math.random() * 7)];
        abcString = abcString + newNote + "0 ";
    }
    return abcString;
}