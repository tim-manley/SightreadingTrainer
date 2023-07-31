import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import LessonCard from '../components/LessonCard'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { newExample } from '../generator'
import { startPitchDetect } from '../pitchdetect'
import { checker } from '../checker'
import Detector from '../components/Detector'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Generating from './Generating'
import { auth } from '../firebase'

function Quick(props) {

    const [firestoreState, setFirestoreState] = useState('loading');

    let navigate = useNavigate();

    let date = moment().format("MMM D");

    const [params, setParams] = useState({numNotes: 10});

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    // Passed by reference to checker and updates as notes progress
    let intervals = [];
    let intervalsDelta = new Map(); // interval : delta

    useEffect(() => {
        setLoading(true);
        const unsub = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/');
            } else {
                setUser(user);
                const docRef = doc(db, 'users', user.uid);
                getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.data()) {
                        setUserData(docSnap.data());
                        let minThree = [null, null, null]
                        let minThreeVals = [1000, 1000, 1000];
                        for (const key in docSnap.data().intervalsScores) {
                            let thisScore = docSnap.data().intervalsScores[key];
                            let biggestVal = minThreeVals.reduce((a, b) => Math.max(a, b), -Infinity);
                            let biggestIndex = minThreeVals.indexOf(biggestVal);
                            if (thisScore < biggestVal) {
                                minThree[biggestIndex] = parseInt(key);
                                minThreeVals[biggestIndex] = thisScore;
                            }
                        }
                        console.log("Lowest three scores: ", minThree, minThreeVals);
                        minThree.push(-2,-1,0,1,2); // DESIGN CHOICE: always include unisons, wholes and halves (bidirectional)
                        setParams((p) => {return {...p, intervals: minThree, range: docSnap.data().range, clef: docSnap.data().clef}});
                        // Update loading/error state
                        setFirestoreState('done'); // Triggers effect to rerender abc
                    } else {
                        navigate('/');
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
            }
        })

        return (() => {
            unsub();
        })

    }, [navigate]);

    useEffect(() => {
        console.log("using effect")
        // Only load into dom if doc successfully loaded
        if (firestoreState === 'done') {
            newExample("notesTarget", params);
            console.log("loaded notes with: ", params);
        }
    }, [firestoreState, params])
    
    const createNewParams = useCallback(() => {
        let minThree = [null, null, null]
        let minThreeVals = [1000, 1000, 1000];
        for (const key in userData.intervalsScores) {
            let thisScore = userData.intervalsScores[key];
            let biggestVal = minThreeVals.reduce((a, b) => Math.max(a, b), -Infinity);
            let biggestIndex = minThreeVals.indexOf(biggestVal);
            if (thisScore < biggestVal) {
                minThree[biggestIndex] = parseInt(key);
                minThreeVals[biggestIndex] = thisScore;
            }
        }
        console.log("Lowest three scores: ", minThree, minThreeVals);
        minThree.push(-2,-1,0,1,2); // DESIGN CHOICE: always include unisons, wholes and halves (bidirectional)
        setParams((p) => {return {...p, intervals: minThree, range: userData.range, clef: userData.clef}});
        // Update loading/error state
        setFirestoreState('done'); // Triggers effect to rerender abc
    }, [userData])

    const handleStartClick = () => {
        startPitchDetect();
        intervals = []; // Empty the intervals array (or not? Just keep populating to pass into analyze?)
        checker("notesTarget", params.numNotes, intervals, intervalsDelta); // modifies last 2 params
    };

    const handleNextClick = () => {
        console.log(intervals);
        console.log(intervalsDelta);
        setFirestoreState('loading');
            // Extract data
        let currentData = userData;
        for (const key in intervalsDelta) {
            // Update interval scores
            currentData.intervalsScores[key] += intervalsDelta[key];

            // Keep between 0-100
            if (currentData.intervalsScores[key] > 100) {
                currentData.intervalsScores[key] = 100;
            }
            if (currentData.intervalsScores[key] < 0) {
                currentData.intervalsScores = 0;
            }
        }
        // Calculate total intervals score
        let vals = Object.values(currentData.intervalsScores);
        let newIntervalsScore = vals.reduce((acc, c) => acc + c, 0) / vals.length;
        currentData.intervalsScore = newIntervalsScore;
        setUserData(currentData);
        // Update the user in firebase
        setDoc(doc(db, "users", user.uid), currentData)
        .then(() => {
            console.log("successfully uploaded to firestore");
            createNewParams(); // Update the params (which causes new example to load)
        })
        .catch((error) => console.error(error));
    }

    if (firestoreState === 'loading') {
        return <Generating />
    }

  return (
    <>
        <div className="flex flex-row space-x-12">
            <div className='w-1/3'>
                <Navbar />
                <div className='ml-24 mt-10 flex flex-col'>
                    <div>
                        <button onClick={() => navigate(-1)}>
                            <svg className='rotate-180 fill-light-bg/20 w-11 h-11' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.5 80.45">
                                <path d="M80.45,40.27A40.23,40.23,0,1,1,40.29,0,40.23,40.23,0,0,1,80.45,40.27Zm-14.07,0L38.22,16.09l-4,8.05L50.08,36.06l-.06.18H14.14v8h36.1l-16.05,12,4,8Z"/>
                            </svg>
                        </button>
                    </div>
                    <div className='mt-4 w-full h-96 bg-light-bg/20 p-8 rounded-2xl'>
                        <LessonCard 
                            title="Quick Lesson"
                            color="bg-lesson-bg/45"
                            header="JUMP RIGHT IN."
                            text="This lesson will cover topics and skills from across your learning journey. Great for starting your practice session."
                        />
                    </div>
                </div>
            </div>
            <div className='w-2/3 ml-24 mt-20 flex flex-col'>
                <div>
                    <h1 className='font-adelle font-normal text-5xl'>{date}, Lesson name</h1>
                </div>
                <div className='mt-11'>
                    <button onClick={handleStartClick} className='flex flex-row items-center space-x-4'>
                        <p className='font-adelle font-normal text-4xl text-primary'>start</p>
                        <svg className='fill-primary w-8 h-8' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.5 80.45">
                            <path d="M80.45,40.27A40.23,40.23,0,1,1,40.29,0,40.23,40.23,0,0,1,80.45,40.27Zm-14.07,0L38.22,16.09l-4,8.05L50.08,36.06l-.06.18H14.14v8h36.1l-16.05,12,4,8Z"/>
                        </svg>
                    </button>
                </div>
                <div className='mt-6 mr-24 h-44 border-solid border-3 border-primary rounded-2xl flex flex-row items-center justify-center'>
                    <div id="notesTarget"></div>
                </div>
                <div className='mt-6 mr-24 flex flex-col items-end'>
                    <button className='flex flex-row items-center space-x-4' onClick={handleNextClick}>
                        <p className='font-adelle font-normal text-4xl text-primary'>new lesson</p>
                        <svg className='fill-primary w-8 h-8' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.5 80.45">
                            <path d="M80.45,40.27A40.23,40.23,0,1,1,40.29,0,40.23,40.23,0,0,1,80.45,40.27Zm-14.07,0L38.22,16.09l-4,8.05L50.08,36.06l-.06.18H14.14v8h36.1l-16.05,12,4,8Z"/>
                        </svg>
                    </button>
                    <button className='flex flex-row items-center space-x-4' onClick={() => navigate("/analysis")}>
                        <p className='font-adelle font-normal text-4xl text-account-dark'>finish session</p>
                        <svg className='fill-account-dark w-8 h-8' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.5 80.45">
                            <path d="M80.45,40.27A40.23,40.23,0,1,1,40.29,0,40.23,40.23,0,0,1,80.45,40.27Zm-14.07,0L38.22,16.09l-4,8.05L50.08,36.06l-.06.18H14.14v8h36.1l-16.05,12,4,8Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <Detector /> {/* Hidden detector element for note checking TODO: be better :( */}
    </>
  )
}

export default Quick