import { React, useState } from 'react';
import {ReactComponent as NotesSVG} from '../assets/NotesArtwork-07.svg'
import {ReactComponent as LogoSVG} from '../assets/officialLogo-06 1.svg'
import {ReactComponent as ArrowSVG} from '../assets/OnsightArrowGraphic-08 1.svg'
import { auth } from '../firebase.js';
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import LoadingSpinner from '../components/LoadingSpinner';
import { Navigate } from 'react-router-dom';

function LandingPage() {

    // Switch state
    const [signUp, setSignUp] = useState(false);

    // Login states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Sign up states
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    // Firebase hooks
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [createUserWithEmailAndPassword, newUser, newLoading, newError] = useCreateUserWithEmailAndPassword(auth);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [blocked, setBlocked] = useState(true);

    const handleNewPassword = (e) => {
        setPasswordMatch(e.target.value === rePassword);
        setNewPassword(e.target.value);
    }

    const handleReType = (e) => {
        setPasswordMatch(e.target.value === newPassword);
        setRePassword(e.target.value);
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!passwordMatch) {
            return;
        }
        console.log(newEmail, newPassword, rePassword);
        createUserWithEmailAndPassword(newEmail, newPassword);
    }

    if (user) {
        console.log("Signed in!");
        return (<Navigate to="/home"/>);
    }
    let errorMessage;
    if (error) {
        console.error(error.message)
        switch (error.code) {
            case "auth/user-not-found":
                errorMessage = "incorrect email";
                break;
            case "auth/wrong-password":
                errorMessage = "incorrect password";
                break;
            case "auth/too-many-requests":
                errorMessage = "too many log in attempts, please try again later";
                break;
            default:
                errorMessage = "something went wrong..."
                break;
        }
    }

    if (newUser) {
        console.log("new user here", newUser);
        return (<Navigate to="/home" />);
    }
    let newErrorMessage;
    if (newError) {
        console.error(newError.message)
        switch (newError.code) {
            case "auth/email-already-in-use":
                newErrorMessage = "a user with that email already exists";
                break;
            case "auth/invalid-email":
            newErrorMessage = "please enter a valid email address";
            break;
            case "auth/weak-password":
                newErrorMessage = "password must contain at least 6 characters";
                break;
            case "auth/too-many-requests":
                newErrorMessage = "too many log in attempts, please try again later";
                break;
            default:
                newErrorMessage = "something went wrong..."
                break;
        }
    }

    return (
        <div id="landingPage" className='h-screen flex flex-nowrap' style={{width: '200%', height: '100vh', overflow: 'hidden'}}>
            <div className='mt-24 ml-2.5 flex flex-col' style={{width: '60%'}}>
                <div className='ml-2.5'>
                    <LogoSVG style={{width: '805px', height: '241px'}} />
                </div>
                <div className='ml-12 mt-7' style={{width: '720px'}}>
                    <p className='text-black/60 text-xl font-adelle font-normal'>
                    Onsight is a novel learning platform that offers an <b className='font-bold text-primary'>immersive</b>, <br />
                    <b className='font-bold text-primary'> personalized</b> sight reading experience for musicians of all levels. 
                    <br /><br />
                    Onsight’s lessons are tailored to <b className='font-bold text-primary'>your unique preferences</b> and skill level,
                    enabling you to progress at your own pace while enjoying the process. <br />
                    <b className='font-bold text-primary'> No two lessons in Onsight are the same, because no two learners are.</b>
                    </p>
                </div>
                <div className='ml-12 mt-8 flex flex-row items-center'>
                    <a href="#login" className='flex flex-row items-end'>
                        <p className='text-primary font-primary font-normal text-6xl'>
                            Let's get started
                        </p> 
                        <ArrowSVG className='h-12 w-12 ml-4 inline'/>
                    </a>
                </div>
            </div>
            <div className='h-full flex items-center overflow-hidden' style={{width: '80%'}}>
                <NotesSVG className='w-full'/>
            </div>
            <div className='flex flex-col' id="login" style={{width: '60%'}}>
                <div className='mt-24'>
                    <LogoSVG style={{width: '649px', height: '194px'}} />
                </div>
                {signUp ? 
                    <div id="signUpSection">
                        <div className='flex flex-col items-start px-9 py-11'>
                            {newLoading ? 
                                <LoadingSpinner />
                                :
                                <form className="flex flex-col items-start" onSubmit={handleSignUp}>
                                        <p className='h-8 font-primary font-normal text-2xl text-red-500'>
                                            {newError ? newErrorMessage : null}
                                        </p>
                                        <input
                                            className='w-72 h-8 mt-3 bg-gray-200 rounded-lg font-adelle font-normal text-lg text-black/50 px-2.5 outline-primary'
                                            type="email"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            placeholder="email"
                                        />
                                        <input
                                            className='w-72 h-8 mt-3 bg-gray-200 rounded-lg font-adelle font-normal text-lg text-black/50 px-2.5 outline-primary'
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => handleNewPassword(e)}
                                            placeholder="password"
                                        />
                                        <input
                                            className={`w-72 h-8 mt-3 bg-gray-200 rounded-lg font-adelle font-normal text-lg text-black/50 px-2.5 ${(passwordMatch || blocked) ? 'outline-primary' : 'outline-none border-2 border-red-500' }`}
                                            type="password"
                                            value={rePassword}
                                            onChange={(e) => handleReType(e)}
                                            onClick={() => setBlocked(false)}
                                            placeholder="retype password"
                                        /> <p className={`h-8 font-primary font-normal text-2xl inline text-red-500`}>
                                        {(passwordMatch || blocked) ? null : "passwords must match"}
                                        </p> 
                                        <button type="submit" className='mt-9 flex flex-row items-end'>
                                        <p className='text-primary font-primary font-normal text-6xl'>sign up</p>
                                        <ArrowSVG className='h-12 w-12 ml-4'/>
                                    </button>
                                </form>
                            }
                        </div>
                    </div>
                    : 
                    <div id="loginSection">
                        <div className='h-80 w-72 px-9 py-11'>
                            {loading ? 
                                <LoadingSpinner />
                                :
                                <form className='flex flex-col items-start' onSubmit={handleLogin}>
                                    
                                    <div className='flex flex-col items-start'>
                                        <p className='h-8 font-primary font-normal text-2xl text-red-500'>
                                            {error ? errorMessage : null}
                                        </p>
                                        <input
                                            className='w-72 h-8 mt-3 bg-gray-200 rounded-lg font-adelle font-normal text-lg text-black/50 px-2.5 outline-primary'
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="email"
                                        />
                                        <input
                                            className='w-72 h-8 mt-3 bg-gray-200 rounded-lg font-adelle font-normal text-lg text-black/50 px-2.5 outline-primary'
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="password"
                                        />
                                    </div>
                                    <button type="submit" className='mt-9 flex flex-row items-end'>
                                        <p className='text-primary font-primary font-normal text-6xl'>log in</p>
                                        <ArrowSVG className='h-12 w-12 ml-4'/>
                                    </button>
                                </form>
                            }   
                        </div>
                                
                        <div className='ml-9 mt-10'>
                            <p className='font-primary font-normal text-3xl text-stone-400'>new here? <button className='text-primary' onClick={() => setSignUp(true)}>sign up, it's free.</button></p>
                        </div>
                        <div className='ml-9'>
                            <a className='font-primary font-normal text-xl text-stone-400' href='#forgot'>forgot password</a>
                        </div>
                    </div>
                }
            </div>
        </div>
        
    );
};

export default LandingPage;