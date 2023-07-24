import { abcNoteToNoteNum } from "./abcutil";
import { reRenderOverlay } from "./generator";

let noteCount;

let currentNoteIndex;
let currentNoteNum;

let overlayNotes;

// Extracts the abc note value
function getNoteTag(noteIndex) {
    const noteWrapper = overlayNotes[noteIndex];
    if (noteWrapper == null) {
        return null;
    }
    const noteWrapperChildren = noteWrapper.childNodes;
    if (noteWrapperChildren[0].getAttribute("data-name").includes("accidental")) {
        return noteWrapperChildren[1];
    } else {
        return noteWrapperChildren[0]
    }
}

function getAbcNote(noteIndex) {
    let note = getNoteTag(noteIndex);
    try {
        let abcNoteVal = note.getAttribute("data-name");
        return abcNoteVal;
    } catch (error) {
        console.error("No notes");
        return null;
    }
}

function highlightNote(noteIndex, color) {
    let note = overlayNotes[noteIndex];
    if (note == null) {
        return null;
    }
    let colorCode;
    switch (color) {
        case "primary":
            colorCode = '#31B2EA';
            break;
        case "red-500":
            colorCode = '#ef4444';
            break;
        case "green-500":
            colorCode = '#22c55e';
            break;
        default:
            colorCode = 'black';
            break;
    }
    note.setAttribute("fill", colorCode);
    note.setAttribute("opacity", "1");
    return 1;
}

function nextNote() {
    currentNoteIndex++;
    // Check for end of line
    if (currentNoteIndex >= noteCount) { 
        return;
    };
    let abcNote = getAbcNote(currentNoteIndex);
    currentNoteNum = abcNoteToNoteNum(abcNote);
}

export function checker(targetID, numNotes) {

    noteCount = numNotes;
    let correctArray = new Array(noteCount).fill(0);

    overlayNotes = document.getElementById(targetID).querySelectorAll(".abcjs-note");

    // Color the first note blue
    highlightNote(0, 'primary');
    currentNoteIndex = 0;
    currentNoteNum = abcNoteToNoteNum(getAbcNote(currentNoteIndex));

    // Set checking params
    const timeThresh = 600; // Thresh will be dependent on rhythm
    const interval = 100;
    let elapsed = 0;
    let currentPlayedNoteNum = -1;

    // Private checker helper
    function checkCorrect() {
        let playedNoteEl = document.getElementById('note');
        // Check if the element exists (prevents error when navigating away)
        if (!playedNoteEl) {
            clearInterval(checkerInterval);
            return;
        }
        let playedNoteNum = parseInt(playedNoteEl.innerHTML);
        //console.log("Played num: ", playedNoteNum);

        // If past last note, clear the checker interval
        if (currentNoteIndex >= numNotes) {
            clearInterval(checkerInterval);
        }
    
        // If the played note is the same as before (i.e. not changing note)
        if (playedNoteNum === currentPlayedNoteNum) {
            elapsed += interval; // Add to elapsed time singing the note
            if (elapsed >= timeThresh) { // If sung for long enough, check if note is correct
                //console.log("threshold reached");
                if (playedNoteNum === currentNoteNum) {
                    correctArray[currentNoteIndex] = 1;
                    highlightNote(currentNoteIndex, "green-500")
                    nextNote();
                    highlightNote(currentNoteIndex, "primary")
                } else {
                    // Set wrong in correctArray
                    correctArray[currentNoteIndex] = -1;
                    // Move overlay note to the note that's being sung
                    reRenderOverlay(targetID, currentNoteIndex, playedNoteNum);
                    // Refind overlay notes
                    overlayNotes = document.getElementById(targetID).querySelectorAll(".abcjs-note");
                    // Recolor notes up to and including current
                    for (let i = 0; i <= currentNoteIndex; i++) {
                        if (correctArray[i] === 1) {
                            highlightNote(i, "green-500");
                        } else if (correctArray[i] === -1) {
                            highlightNote(i, "red-500");
                        }
                    }
                    // Next note
                    nextNote();
                    highlightNote(currentNoteIndex, "primary");
                }
                clearInterval(checkerInterval);
                setTimeout(() => {checkerInterval = setInterval(checkCorrect, interval)}, 600); // Only for arhythmic things
                elapsed = 0;
            }
        } else {
            elapsed = 0;
            currentPlayedNoteNum = playedNoteNum;
        }
    }

    // Start listening and comparing to current note
    let checkerInterval = setInterval(checkCorrect, interval);
}