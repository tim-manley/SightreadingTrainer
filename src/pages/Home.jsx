import React from 'react'
import Navbar from '../components/Navbar'
import settings from '../assets/SettingsIconOnsight.svg'
import account from '../assets/AccountIconOnsight.svg'
import progress from '../assets/ProgressIllustration-19 1.svg'
import LessonCard from '../components/LessonCard'
import { db } from '../firebase'
import { doc } from 'firebase/firestore'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { useState, useEffect } from 'react'
import Loading from './Loading'
import ProgressWheel from '../components/ProgressWheel'

function Home(props) {

    const [userDoc, loading, error] = useDocumentOnce(doc(db, "users", props.user.uid));

    const [user, setUser] = useState({
      range: [0, 48],
      intervalsScore: 10,
    })

    useEffect(() => {
      console.log("userDoc changed");
      if (userDoc) {
        console.log("userDoc true")
        console.log(userDoc.data())
        setUser(userDoc.data())
      }
    }, [userDoc])

    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <p>Error: {error.message}</p>
        );
    }

  return (
    <>
        <Navbar />
        <div className="mx-24 my-5 flex flex-col">
            <div className="flex flex-row items-center">
                <div className='w-2/3 text-5xl font-primary font-normal'>
                    Welcome back, {user ? user.name : null}
                </div>
                <div className="w-1/3 flex flex-row justify-end space-x-8">
                    <div>
                        <a href="/settings">
                            <img className='w-16 h-16 opacity-50' src={settings} alt="settings" />
                        </a>
                    </div>
                    <div>
                        <a href="/account">
                            <img className='w-16 h-16 opacity-50' src={account} alt="account" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-5 h-96 flex flex-row justify-evenly bg-light-bg/20 rounded-2xl py-8">
                <div className='w-1/3 h-full'>
                    <div className='ml-8 mr-4 h-full'>
                        <LessonCard 
                            title="Quick Lesson"
                            color="bg-lesson-bg/45"
                            link="/quick"
                            header="JUMP RIGHT IN."
                            text="This lesson doesn’t require any building. It’ll cover topics and skills from across your learning journey. Great for starting your practice session."
                        />
                    </div>
                </div>
                <div className='w-1/3 h-full'>
                    <div className='mx-4 h-full'>
                        <LessonCard 
                            title="Focused Lesson"
                            color="bg-lesson-bg/75"
                            link="/focused"
                            header="TRAIN YOUR WEAK SPOTS."
                            text="You pick the specific skills that this lesson will focus on. Great for strengthening weak spots in a  targeted practice setting."
                        />
                    </div>
                </div>
                <div className='w-1/3 h-full'>
                    <div className='ml-4 mr-8 h-full'>
                        <LessonCard 
                            title="Custom Build"
                            color="bg-lesson-bg/100"
                            link="/custom"
                            header="TOTAL CUSTOMIZATION."
                            text="You carefully craft this lesson using our wide array of build tools. Everything you can imagine is customizable. Great for users with specific preferences for their lesson content."
                        />
                    </div>
                </div>
            </div>
            <div className='mt-10 h-96 flex flex-row'>
                <div className='w-1/3 flex justify-center'>
                    <img src={progress} alt="progress graphic" />
                </div>
                <div className='w-2/3 h-full font-primary text-lesson-bg/100'>
                    <div className='ml-4 h-full flex flex-col p-4 bg-light-bg/20 rounded-2xl'>
                        <div className='h-1/6 text-5xl flex items-center'>
                            Progress
                        </div>
                        <div className='h-4/6 flex flex-row pb-16'>
                            <div className='w-1/2 text-xl pr-16'>
                                Track your progress using our Progress Analytics tools. 
                                View your skill breakdown at a glance and dive into more detailed analytics pages using the buttons below. 
                            </div>
                            <div className='w-1/2 h-full flex flex-col'>
                                <div className='w-full h-5/6 flex flex-row items-center justify-between font-adelle'>
                                    <ProgressWheel radius={ 60 } stroke={ 12 } progress={ user.overallScore ? user.overallScore: 0 } text="OVERALL" />
                                    <ProgressWheel radius={ 60 } stroke={ 4 } progress={ user.intervalsScore ? user.intervalsScore : 0 } text='INTERVALS'/>
                                    <ProgressWheel radius={ 60 } stroke={ 4 } progress={ user.rhythmScore ? user.rhythmScore : 0 } text='RHYTHM'/>
                                </div>
                                <div className='w-full h-1/6 pr-5 flex flex-row justify-end items-center font-primary text-xl text-account-dark/70'>
                                    <a href="/home">
                                        More Skills...
                                    </a> 
                                </div>
                            </div>
                        </div>
                        <div className='h-1/6 flex flex-row items-center text-4xl text-account-dark'>
                            <div>
                                <a href="/home" className='h-full flex flex-row items-center'>
                                    <p>Lesson Stats</p>
                                    <svg className='ml-2 w-9 h-9 fill-account-dark' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.5 80.45"><path d="M80.45,40.27A40.23,40.23,0,1,1,40.29,0,40.23,40.23,0,0,1,80.45,40.27Zm-14.07,0L38.22,16.09l-4,8.05L50.08,36.06l-.06.18H14.14v8h36.1l-16.05,12,4,8Z"/></svg>
                                </a>
                            </div>
                            <div className='ml-16'>
                                <a href="/home" className='h-full flex flex-row items-center'>
                                    <p>Skill Bank</p>
                                    <svg className='ml-2 w-9 h-9 fill-account-dark' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.5 80.45"><path d="M80.45,40.27A40.23,40.23,0,1,1,40.29,0,40.23,40.23,0,0,1,80.45,40.27Zm-14.07,0L38.22,16.09l-4,8.05L50.08,36.06l-.06.18H14.14v8h36.1l-16.05,12,4,8Z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10 h-96 flex flex-row'>
                <div className='w-1/3 h-full'>
                    <div className='mr-4 h-full flex flex-col bg-light-bg/20 rounded-2xl'>

                    </div>
                </div>
                <div className='w-2/3 h-full'>
                    <div className='ml-4 px-4 h-full flex flex-col justify-between'>
                        <div className='w-1/2 h-1/6 bg-lesson-bg/75 rounded-2xl'>

                        </div>
                        <div className='w-1/2 h-1/6 bg-lesson-bg/75 rounded-2xl'>

                        </div>
                        <div className='w-1/2 h-1/6 bg-lesson-bg/75 rounded-2xl'>

                        </div>
                        <div className='w-1/2 h-1/6 bg-lesson-bg/75 rounded-2xl'>

                        </div>
                        <div className='w-1/2 h-1/6 bg-lesson-bg/75 rounded-2xl'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home