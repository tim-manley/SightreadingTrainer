//var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

/*export function abcNoteToNote(abcNote) {
    if (!abcNote) {
        return null;
    }
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
}*/

import { noteNumToLabel } from "./util";

function isLetter(str) {
    return str.length === 1 && str.toLowerCase() !== str.toUpperCase();
}

function isLower(str) {
    return str === str.toLowerCase();
}

export function abcNoteToNote(abcNote) {
    let noteLetterIndex = -1;
    for (let i = 0; i < abcNote.length; i++) {
        if (isLetter(abcNote.charAt(i))) {
            noteLetterIndex = i;
        }
    }
    if (noteLetterIndex === -1) {
        throw new Error("abcNote string doesn't contain a note letter")
    }
    // Number of semitones to shift based on note name
    let shiftMap = {
        "C" : 0,
        "D" : 2,
        "E" : 4,
        "F" : 5,
        "G" : 7,
        "A" : 9,
        "B" : 11
    }
    // Need to map to a number between 0-48
    // Start at note shift value
    let noteNum = shiftMap[abcNote.charAt(noteLetterIndex).toUpperCase()];
    // Shift based on accidental
    if (noteLetterIndex > 0 && abcNote.charAt(noteLetterIndex - 1) === "_") {
        noteNum -= 1;
    } else if (noteLetterIndex > 0 && abcNote.charAt(noteLetterIndex - 1) === "^") {
        noteNum += 1;
    }

    if (isLower(abcNote.charAt(noteLetterIndex))) { // If lower case, add 36
        noteNum += 36;
        // Check for apostraphe
        if (abcNote.length > noteLetterIndex + 1 && abcNote.charAt(noteLetterIndex + 1) === "'") {
            noteNum += 12;
        }
    } else {
        // If there's a character after note letter
        if (abcNote.length > noteLetterIndex + 1) {
            // If there's 1 comma then we add 12
            if (abcNote.length === noteLetterIndex + 2 && abcNote.charAt(noteLetterIndex + 1) === ",") {
                noteNum += 12;
            }
            // If there's 2 commas we don't add anything
        } else {
            noteNum += 24; // No comma means higher
        }
    }
    return noteNumToLabel(noteNum);
}