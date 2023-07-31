import { React, useState } from 'react'
import { auth } from '../firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {ReactComponent as ArrowSVG} from '../assets/OnsightArrowGraphic-08 1.svg'
import LoadingSpinner from './LoadingSpinner';

function LoginForm() {

    // Login states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    let errorMessage;
    if (error) {
        console.error(error.message)
        switch (error.code) {
            case "auth/user-not-found":
                errorMessage = "incorrect email";
                break;
            case "auth/invalid-email":
                errorMessage = "please enter a valid email address";
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

    if (user) {
        console.log(user); // Just to get rid of assigned but never used warning
    }

  return (
    <div id="loginSection" className='flex flex-col justify-evenly'>
        <div className='flex flex-col items-start'>
            {loading ? 
                <LoadingSpinner />
                :
                <form className='flex flex-col items-start' onSubmit={handleLogin}>
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
                    <button type="submit" className='mt-9 flex flex-row items-center'>
                        <p className='text-primary font-primary font-normal text-6xl'>log in</p>
                        <ArrowSVG className='h-12 w-12 ml-4 fill-primary'/>
                    </button>
                </form>
            }   
        </div>
    </div>
  )
}

export default LoginForm