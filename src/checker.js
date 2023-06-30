import { abcNoteToNote } from "./abcutil";
import $ from "jquery"

let currentNoteIndex;
let currentNote;

function getNoteWrapper(noteIndex) {
    const noteWrapper = $("#mainTarget").find(`[data-index='${noteIndex}']`);
    if (noteWrapper == null) { // Note out of range
        return null;
    }
    return noteWrapper;
}

// Extracts the abc note value
function getNoteTag(noteIndex) {
    const noteWrapper = getNoteWrapper(noteIndex);
    if (noteWrapper == null) {
        return null;
    }
    const note = noteWrapper.children()[1]; // Need to be more specific than 1 in future (doesn't take into acc no accidentals)
    return note;
}

function getAbcNote(noteIndex) {
    let note = getNoteTag(noteIndex);
    try {
        let abcNoteVal = note.getAttribute("data-name");
        return abcNoteVal;
    } catch (error) {
        console.log("No notes");
        return null;
    }
}

function highlightNote(noteIndex, color) {
    const noteWrapper = getNoteWrapper(noteIndex); // Extracts html element from wrapper
    if (noteWrapper == null) {
        return -1;
    }
    const note = noteWrapper[0];
    if (note == null) {
        return -1;
    }
    console.log(note);
    note.setAttribute("fill", color);
    return 1;
}

function nextNote() {
    highlightNote(currentNoteIndex, 'green');
    currentNoteIndex++;
    // Check for end of line
    if (highlightNote(currentNoteIndex, 'blue') === -1) { 
        return;
    };
    let abcNote = getAbcNote(currentNoteIndex);
    currentNote = abcNoteToNote(abcNote);
}

export function checker(numNotes) {
    // Color the first note blue
    highlightNote(0, 'blue');
    currentNoteIndex = 0;
    currentNote = abcNoteToNote(getAbcNote(currentNoteIndex));

    // Set checking params
    const timeThresh = 600;
    const interval = 100;
    let elapsed = 0;

    // Private checker helper
    function checkCorrect() {
        let playedNote = document.getElementById('note');
        // Check if the element exists (prevents error when navigating away)
        if (!playedNote) {
            clearInterval(checkerInterval);
            return;
        }
        let playedNoteText = playedNote.innerHTML;

        if (currentNoteIndex >= numNotes) {
            clearInterval(checkerInterval);
        }
    
        if (playedNoteText === currentNote) {
            elapsed += interval;
    
            if (elapsed >= timeThresh) {
                nextNote();
                elapsed = 0;
            }
        } else {
            elapsed = 0;
        }
    }

    // Start listening and comparing to current note
    const checkerInterval = setInterval(checkCorrect, interval);
}