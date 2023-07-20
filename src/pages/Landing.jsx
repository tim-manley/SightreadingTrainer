import React from 'react';
import {ReactComponent as NotesSVG} from '../assets/NotesArtwork-07.svg'
import {ReactComponent as LogoSVG} from '../assets/officialLogo-06 1.svg'
import {ReactComponent as ArrowSVG} from '../assets/OnsightArrowGraphic-08 1.svg'
import { auth } from '../firebase.js';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from '../components/Loading';

function LandingPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    var errorMessage = null;

    if (error) {
        console.log(error.message)
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


      /*if (user) {
        setTimeout(() => {}, 10000)
        console.log(user.email);
        return (
          <Navigate to="/home" />
        );
      }*/

    return (
        <div id="" className='h-screen flex flex-nowrap' style={{width: '200%'}}>
            <div className='mt-24 ml-2.5 flex flex-col' style={{width: '60%'}}>
                <div className='ml-2.5'>
                    <LogoSVG style={{width: '805px', height: '241px'}} />
                </div>
                <div className='ml-12 mt-7' style={{width: '720px'}}>
                    <p className='text-black/60 text-xl font-primary font-normal'>
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
                <div className='h-80 w-72 px-9 py-11'>
                    {loading || user ? 
                        <Loading />
                        :
                        <form className='flex flex-col items-start' onSubmit={handleLogin}>
                            
                            <div className='flex flex-col items-start'>
                                <p className='h-8 font-primary font-normal text-2xl text-red-500'>
                                    {error ? errorMessage : null}
                                </p>
                                <input
                                    className='w-72 h-8 mt-3 bg-gray-200 rounded-lg font-primary font-normal text-lg text-black/50 px-2.5 outline-primary'
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
                            <button type="submit" className='mt-9 flex flex-row items-end'>
                                <p className='text-primary font-primary font-normal text-6xl'>log in</p>
                                <ArrowSVG className='h-12 w-12 ml-4'/>
                            </button>
                        </form>
                    }   
                </div>
                        
                <div className='ml-9 mt-10'>
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