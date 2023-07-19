import React from 'react'
import Navbar from '../components/Navbar'
import settings from '../assets/SettingsIconOnsight.svg'
import account from '../assets/AccountIconOnsight.svg'
import LessonCard from '../components/LessonCard'

function Lessons() {
  return (
    <>
        <Navbar />
        <div className="mx-24 my-5 flex flex-col">
            <div className="flex flex-row items-center">
                <div className='w-2/3 text-5xl font-primary font-normal'>
                    Welcome back, Account Name
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
            <div className="mt-5 w-full h-96 flex flex-row justify-around bg-light-bg/20 rounded-2xl p-8 space-x-8">
                <LessonCard 
                    title="Quick Lesson"
                    color="bg-lesson-bg/45"
                    link="/quick"
                    header="JUMP RIGHT IN."
                    text="This lesson doesn’t require any building. It’ll cover topics and skills from across your learning journey. Great for starting your practice session."
                />
                <LessonCard 
                    title="Focused Lesson"
                    color="bg-lesson-bg/75"
                    link="/focused"
                    header="TRAIN YOUR WEAK SPOTS."
                    text="You pick the specific skills that this lesson will focus on. Great for strengthening weak spots in a  targeted practice setting."
                />
                <LessonCard 
                    title="Custom Build"
                    color="bg-lesson-bg/100"
                    link="/custom"
                    header="TOTAL CUSTOMIZATION."
                    text="You carefully craft this lesson using our wide array of build tools. Everything you can imagine is customizable. Great for users with specific preferences for their lesson content."
                />
            </div>
        </div>
    </>
  )
}

export default Lessons