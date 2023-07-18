import React from 'react'
import PageDevelopment from '../assets/UnderDev-09 1.svg';
import Navbar from '../components/Navbar';

function NotBuilt() {
  return (
    <>
    <Navbar />
    <div className='flex flex-col items-center mt-11'>
        <div className='font-primary text-5xl font-normal'>This page is under development.</div>
        <div className='font-primary text-4xl text-black/30 font-normal mt-5'>
            <a href="">PREVIOUS PAGE</a>
        </div>
        <img className='w-96 h-80 mt-10' src={PageDevelopment} />
    </div>
    </>
  )
}

export default NotBuilt