import { generateNotes } from './generation.js';
import { startPitchDetect } from './pitchdetect.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

var firebase = require('firebase');
var firebaseui = require('firebaseui');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5KkEysKgxhPn2rOTVE76Hf3JGU37U5_Y",
  authDomain: "sight-reading-trainer-898b0.firebaseapp.com",
  projectId: "sight-reading-trainer-898b0",
  storageBucket: "sight-reading-trainer-898b0.appspot.com",
  messagingSenderId: "6764430054",
  appId: "1:6764430054:web:b7fce180a936b4e25ab127",
  measurementId: "G-PDT5BBJ6MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


let currentNoteIndex;
let currentNote;

var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function abcNoteToNote(abcNote) {
    if (abcNote[0] == "^") {
        if (abcNote[1] == "E") {
            return "F";
        } else if (abcNote[1] == "B") {
            return "C";
        } else {
            return abcNote[1] + "#";
        }
    } else if (abcNote[0] == "_") {
        if (abcNote[1] == "F") {
            return "E";
        } else if (abcNote[1] == "C") {
            return "B";
        } else if (abcNote[1] == "A") {
            return "G#";
        } else {
            return String.fromCharCode(abcNote[1].charCodeAt(0) - 1) + "#";
        }
    } else if (abcNote[0] == "=") {
        return abcNote[1];
    } else {
        return abcNote[0];
    }
}

function getNoteTag(noteIndex) {
    let noteWrapper = $("#target").find(`[data-index='${noteIndex}']`);
    if (noteWrapper == null) { // Note out of range
        return null;
    }
    let note = noteWrapper.children()[1]; // Need to be more specific than 1 in future
    return note;
}

function getAbcNote(noteIndex) {
    let note = getNoteTag(noteIndex);
    let abcNoteVal = note.getAttribute("data-name");
    return abcNoteVal;
}

function highlightNote(noteIndex, color) {
    let note = getNoteTag(noteIndex);
    if (note == null) {
        return -1;
    }
    note.style.color = color;
    return 1;
}

function nextNote() {
    highlightNote(currentNoteIndex, 'green');
    currentNoteIndex++;
    if (highlightNote(currentNoteIndex, 'red') == -1) {
        return;
    };
    let abcNote = getAbcNote(currentNoteIndex);
    currentNote = abcNoteToNote(abcNote);
}

function newExample() {
    var abcString = generateNotes(8);
    ABCJS.renderAbc("target", abcString);
    // Color the first note blue
    highlightNote(0, 'red');
    currentNoteIndex = 0;
    currentNote = abcNoteToNote(getAbcNote(currentNoteIndex));
}

window.onload = () => {
    newExample();
    currentNoteIndex = 0;
    // Add event handlers
    document.getElementById("newExample").addEventListener('click', () => {
        newExample();
    });
    document.getElementById("pitchDetect").addEventListener('click', () => {
        startPitchDetect();
    });
}


let timeThresh = 600;
let interval = 100;
let elapsed = 0;


function checkCorrect() {
    let playedNote = document.getElementById('note').innerHTML;

    if (playedNote == currentNote) {
        elapsed += interval;

        if (elapsed >= timeThresh) {
            nextNote();
            elapsed = 0;
        }
    } else {
        elapsed = 0;
    }
}

let checker = setInterval(checkCorrect, interval);