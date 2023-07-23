import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import LessonCard from '../components/LessonCard'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { generateNotes, newExample } from '../generator'
import abcjs from 'abcjs'
import { startPitchDetect } from '../pitchdetect'
import { checker } from '../checker'
import Detector from '../components/Detector'

function Quick() {

    let navigate = useNavigate();

    let date = moment().format("MMM D");

    // Initial load
    useEffect(() => {
        // TODO: Get user scores
        // TODO: Pick weakest few + determine how many and whether to do in iso
        // Set generator params based on skills to test (for now manually set)
        let params = {
            numNotes: 10,
            clef: 'bass',
            intervals: [5, 7], // Just 4ths and 5ths
            range: [7, 24],
        }
        // Generate abc and render it
        newExample("notesTarget", params);
    }, []);

    const handleStartClick = () => {
        startPitchDetect();
        checker("notesTarget", 10); // 2nd shld be params.numNotes
    };

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
                <div className='mt-6 mr-24 flex flex-row justify-end'>
                    <button className='flex flex-row items-center space-x-4'>
                        <p className='font-adelle font-normal text-4xl text-primary'>analyze lesson</p>
                        <svg className='fill-primary w-8 h-8' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.5 80.45">
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