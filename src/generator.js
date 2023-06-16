// Generates random ABC music encoding

// Each note from lowest possible to highest possible is given a number, and mapped to its abcjs values
// For flat keys to be diatonic, take second enharmonic value, first for sharp
// TODO: Figure out C-major lol
const numToNote = {
    1: ["=C,,"],
    2: ["^C,,", "_D,,"],
    3: ["=D,,"],
    4: ["^D,,", "_E,,"],
    5: ["=E,,", "_F,,"],
    6: ["^E,,", "=F,,"],
    7: ["^F,,", "_G,,"],
    8: ["=G,,"],
    9: ["^G,,", "_A,,"],
    10: ["=A,,"],
    11: ["^A,,", "_B,,"],
    12: ["=B,,", "_C,"],
    13: ["^B,,", "=C,"],
    14: ["^C,", "_D,"],
    15: ["=D,"],
    16: ["^D,", "_E,"],
    17: ["=E,", "_F,"],
    18: ["^E,", "=F,"],
    19: ["^F,", "_G,"],
    20: ["=G,"],
    21: ["^G,", "_A,"],
    22: ["=A,"],
    23: ["^A,", "_B,"],
    24: ["=B,", "_C"],
    25: ["^B", "=C"],
    26: ["^C", "_D"],
    27: ["=D"],
    28: ["^D", "_E"],
    29: ["=E", "_F"],
    30: ["^E", "=F"],
    31: ["^F", "_G"],
    32: ["=G"],
    33: ["^G", "_A"],
    34: ["=A"],
    35: ["^A", "_B"],
    36: ["=B", "_c"],
    37: ["^B", "=c"],
    38: ["^c", "_d"],
    39: ["=d"],
    40: ["^d", "_e"],
    41: ["=e", "_f"],
    42: ["^e", "=f"],
    43: ["^f", "_g"],
    44: ["=g"],
    45: ["^g", "_a"],
    46: ["=a"],
    47: ["^a", "_b"],
    48: ["=b", "_c'"],
    49: ["^b", "=c'"]
};

// Creates a sequence of arhythmic notes
export function generateNotes(params) {
    // Parse params
    const numNotes = params["numNotes"];
    const clef = params["clef"];
    const intervals = params["intervals"];
    const range = params["range"];

    //TODO: Input validation

    let abcString = `X:1\nT:Random Notes\nK:C clef=${clef}\n`
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