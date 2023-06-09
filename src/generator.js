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

// Creates a sequence of arhythmic notes
export function generateNotes(numNotes) {
    let abcString = "X:1\nT:Random Notes\nK:C\n"
    for (let i = 0; i < numNotes; i++) {
        let altered = Math.random();
        if (altered < 0.3) {
            abcString = abcString + "^";
        } else if (altered > 0.7) {
            abcString = abcString + "_";
        } else {
            abcString = abcString + "=";
        }
        let newNote = numToNote[1 + Math.floor(Math.random() * 7)];
        abcString = abcString + newNote + "0 ";
    }
    return abcString;
}