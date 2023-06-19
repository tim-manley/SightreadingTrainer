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

export const rangeVals = Array.from(Array(49).keys()); // Numbers 0-48

export function noteNumToLabel(num) {
    return noteLabels[num % 12] + (Math.floor(num/12) + 2).toString();
}