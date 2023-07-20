import React from 'react'
import {ReactComponent as PageDevelopmentSVG} from '../assets/UnderDev-09 1.svg';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function NotBuilt() {
    let navigate = useNavigate();
  return (
    <>
    <Navbar />
    <div className='flex flex-col items-center mt-11'>
        <div className='font-primary text-5xl font-normal'>This page is under development.</div>
        <div className='font-primary text-4xl text-black/30 font-normal mt-5'>
            <button onClick={() => navigate(-1)}>PREVIOUS PAGE</button>
        </div>
        <PageDevelopmentSVG className='w-96 h-80 mt-10' />
    </div>
    </>
  )
}

export default NotBuilt