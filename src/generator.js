// Generates random ABC music encoding

const numToNote = {
    1: ["_C"],
    2: ["=C"],
    3: ["^C", "_D"],
    4: ["=D"],
    5: ["^D", "_E"],
    6: ["=E", "_F"],
    7: ["^E", "=F"],
    8: ["^F", "_G"],
    9: ["=G"],
    10: ["^G", "_A"],
    11: ["=A"],
    12: ["^A", "_B"],
    13: ["B"]
};

// Creates a sequence of arhythmic notes
export function generateNotes(numNotes, clef, intervals) {
    let abcString = `X:1\nT:Random Notes\nK:C clef=${clef}\n`
    if (numNotes === 0) return abcString;
    const intervalValues = Array.from(intervals);
    console.log(intervalValues)
    // Pick random starting note (num in range)
    let currentNum = Math.ceil(Math.random() * 13);
    let currentNote = numToNote[currentNum][Math.floor(Math.random() * numToNote[currentNum].length)];
    abcString = abcString + currentNote + "0 ";
    // For numNotes
    for (let i = 1; i < numNotes; i++) {
        // Pick random index for interval value
        let index = Math.floor(Math.random() * intervalValues.length)
        console.log(index)
        // 50/50 whether up or down
        let up = (Math.random() > 0.5) ? 1 : -1;
        console.log(up)
        currentNum = currentNum + (up * intervalValues[index]);
        console.log(currentNum)
        // While out of range, keep trying diff intervals
        while (currentNum > 13 || currentNum < 1) {
            currentNum = currentNum - (up * intervalValues[index]);
            // Pick random index for interval value
            index = Math.floor(Math.random() * intervalValues.length)
            // 50/50 whether up or down
            up = (Math.random() > 0.5) ? 1 : -1;
            currentNum = currentNum + (up * intervalValues[index]);
        }
        console.log(currentNum);
        currentNote = numToNote[currentNum][Math.floor(Math.random() * numToNote[currentNum].length)];
        abcString = abcString + currentNote + "0 ";
    }
    console.log(abcString);
    return abcString;
}