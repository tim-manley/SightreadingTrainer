import { React, useEffect, useMemo, useState } from 'react'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js"
import { useDocumentOnce } from "react-firebase-hooks/firestore"
import { rangeVals, noteNumToLabel } from '../util.js';
import {ReactComponent as NotesSVG} from '../assets/NotesArtwork-07.svg'
import notes from '../assets/NotesArtwork-07.svg'

function SetupUser(props) {

  const docRef = doc(db, "users", props.user.uid);
    

  return (
    
    <div className='h-screen flex flex-row'>
      <div className='w-1/3 h-full flex flex-row justify-end items-center overflow-hidden bg-red-500'>
        <NotesSVG className='object-none'/>
      </div>
      <div className='w-2/3 h-full bg-primary'>
        Form
      </div>
    </div>
  )
}

export default SetupUser