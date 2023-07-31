import { React, useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import {ReactComponent as ArrowSVG} from '../assets/OnsightArrowGraphic-08 1.svg'

function SignUpForm() {

    // Sign up states
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    // Firebase hooks
    const [createUserWithEmailAndPassword, newUser, newLoading, newError] = useCreateUserWithEmailAndPassword(auth);

    

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
    <div id="signUpSection">
        <div className='flex flex-col items-start'>
            {newLoading ? 
                <LoadingSpinner />
                :
                <form className="flex flex-col items-start">
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
                        <button type="button" className='mt-9 flex flex-row items-end' onClick={handleSignUp}>
                        <p className='text-primary font-primary font-normal text-6xl'>sign up</p>
                        <ArrowSVG className='h-12 w-12 ml-4 fill-primary'/>
                    </button>
                </form>
            }
        </div>
    </div>
  )
}

export default SignUpForm