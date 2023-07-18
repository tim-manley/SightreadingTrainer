import React from 'react';
import notes from '../assets/NotesArtwork-07.svg'
import logo from '../assets/officialLogo-06 1.svg'
import arrow from '../assets/OnsightArrowGraphic-08 1.svg'
import { auth } from '../firebase.js';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LandingPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    if (error) {
        return (
          <>
            <Navbar />
            <p>Error: {error.message}</p>
          </>
        );
      }
      if (loading) {
        return (
            <>
                <Navbar />
                <p>Loading...</p>
            </>
        )
      }
      if (user) {
        console.log(user.email);
        return (
          <Navigate to="/home" />
        );
      }

    return (
        <div id="" className='h-screen flex flex-nowrap' style={{width: '200%'}}>
            <div className='mt-24 ml-2.5 flex flex-col' style={{width: '60%'}}>
                <div className='ml-2.5'>
                    <img src={logo} alt='onsight logo' style={{width: '805px', height: '241px'}} />
                </div>
                <div className='ml-12 mt-7' style={{width: '720px'}}>
                    <p className='text-black/60 text-2xl leading-10 font-primary font-normal'>
                    <b className='inline font-semibold'>Onsight is </b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div className='ml-12 mt-8 flex flex-row items-center'>
                    <a href="#login">
                        <p className='text-primary font-primary font-normal text-6xl'>
                            Let's get started
                            <img className='h-12 w-12 ml-4 inline' src={arrow} alt="arrow"/>
                        </p> 
                    </a>
                </div>
            </div>
            <div className='h-full flex items-center overflow-hidden' style={{width: '80%'}}>
                <img className='w-full' src={notes} alt=''/>
            </div>
            <div className='flex flex-col' id="login" style={{width: '60%'}}>
                <div className='mt-24'>
                    <img src={logo} alt='onsight logo' style={{width: '649px', height: '194px'}} />
                </div>
                <form className='ml-9 flex flex-col items-start' onSubmit={handleLogin}>
                    <div className='mt-11 flex flex-col items-start'>
                        <input
                            className='w-72 h-8 bg-gray-200 rounded-lg font-primary font-normal text-lg text-black/50 px-2.5 outline-primary'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                            
                        />
                        <input
                            className='w-72 h-8 mt-3 bg-gray-200 rounded-lg font-primary font-normal text-lg text-black/50 px-2.5 outline-primary'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                        />
                    </div>
                    <button type="submit" className='mt-9 flex flex-row items-center'>
                        <p className='text-primary font-primary font-normal text-6xl'>log in</p>
                        <img className='h-12 w-12 ml-4' src={arrow} alt='arrow'/>
                    </button>
                </form>
                <div className='ml-9 mt-20'>
                    <p className='font-primary font-normal text-3xl text-stone-400'>new here? <a className='text-primary' href="#signup">sign up, it's free.</a></p>
                </div>
                <div className='ml-9'>
                    <a className='font-primary font-normal text-xl text-stone-400' href='#forgot'>forgot password</a>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;