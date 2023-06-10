//var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function abcNoteToNote(abcNote) {
    if (abcNote[0] === "^") {
        if (abcNote[1] === "E") {
            return "F";
        } else if (abcNote[1] === "B") {
            return "C";
        } else {
            return abcNote[1] + "#";
        }
    } else if (abcNote[0] === "_") {
        if (abcNote[1] === "F") {
            return "E";
        } else if (abcNote[1] === "C") {
            return "B";
        } else if (abcNote[1] === "A") {
            return "G#";
        } else {
            return String.fromCharCode(abcNote[1].charCodeAt(0) - 1) + "#";
        }
    } else if (abcNote[0] === "=") {
        return abcNote[1];
    } else {
        return abcNote[0];
    }
}