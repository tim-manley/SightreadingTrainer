import { React, useState, Fragment } from 'react'
import {ReactComponent as ArrowSVG} from '../assets/OnsightArrowGraphic-08 1.svg'
import {ReactComponent as ChevronSVG} from '../assets/DropdownArrow.svg'
import LoadingSpinner from './LoadingSpinner';
import { rangeVals, noteNumToLabel } from '../util';
import { Listbox, Transition } from '@headlessui/react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function UserSetupForm(props) {

    const rangeLabels = rangeVals.map((v) => {
        return noteNumToLabel(v);
    })
    const clefs = ['treble', 'tenor', 'bass'];

    // Loading/error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form states
    const [fullName, setFullName] = useState('');
    const [highest, setHighest] = useState('range high');
    const [lowest, setLowest] = useState('range low');
    const [clef, setClef] = useState('clef');

    // Navigator
    const navigate = useNavigate();


    const handleSetup = () => {
        setLoading(true);
        console.log("called setup", fullName, highest, lowest, clef);
        const userData = {
            name: fullName,
            range: [lowest, highest],
            clef: clef,
            overallScore: 0,
            intervalsScore: 0,
            rhythmScore: 0,
            intervalsScores: {
                '-12': 0,
                '-11': 0,
                '-10': 0,
                '-9': 0,
                '-8': 0,
                '-7': 0,
                '-6': 0,
                '-5': 0,
                '-4': 0,
                '-3': 0,
                '-2': 0,
                '-1': 0,
                '0': 0,
                '1': 0,
                '2': 0,
                '3': 0,
                '4': 0,
                '5': 0,
                '6': 0,
                '7': 0,
                '8': 0,
                '9': 0,
                '10': 0,
                '11': 0,
                '12': 0
            }
        }
        console.log(userData, props.user.uid);
        const docRef = doc(db, "users", props.user.uid);
        setDoc(docRef, userData)
        .then(() => {
            console.log("set document");
            setLoading(false);
            navigate('/home');
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
            setError(err);
        })
    }

    // TODO: Handle errors
    let errorMessage = '';
    if (error) {
        console.error(error);
    }

  return (
    <div className='flex flex-col'>
        <div className='flex flex-col items-start'>
            {loading ? 
                <LoadingSpinner />
                :
                <>
                <div className='flex items-center mt-14 font-primary font-normal text-6xl text-account-dark'>
                    new user setup
                </div>
                <form className="flex flex-col items-start">
                    <p className='h-8 font-primary font-normal text-2xl text-red-500'>
                        {error ? errorMessage : null}
                    </p>
                    <input
                        className='w-72 h-8 mt-3 bg-gray-200 rounded-lg font-adelle font-normal text-lg text-black/50 px-2.5 outline-primary'
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="full name"
                    />
                    <div className="w-72 h-8 mt-3">
                        <Listbox value={highest} onChange={setHighest}>
                            <div className="relative">
                            <Listbox.Button className="h-8 w-full rounded-lg bg-gray-200 px-2.5 text-left font-adelle font-normal text-lg text-black/30">
                                <span className="block truncate">{rangeLabels[highest] ? rangeLabels[highest] : 'range high'}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronSVG className='rotate-180'/>
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="cursor-pointer z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {rangeLabels.map((noteLabel, noteIdx) => (
                                    <Listbox.Option
                                    key={noteLabel}
                                    className={({ active }) =>
                                        `flex items-center px-2.5 text-lg ${
                                        active ? 'text-primary' : 'text-black/30'
                                        }`
                                    }
                                    value={noteIdx}
                                    >
                                    {({ selected }) => (
                                        <span
                                            className={`${
                                            selected ? 'font-bold text-primary' : 'font-normal'
                                            }`}
                                        >
                                            {noteLabel}
                                        </span>
                                    )}
                                    </Listbox.Option>
                                ))}
                                </Listbox.Options>
                            </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div className="w-72 h-8 mt-3">
                        <Listbox value={lowest} onChange={setLowest}>
                            <div className="relative">
                            <Listbox.Button className="h-8 w-full rounded-lg bg-gray-200 px-2.5 text-left font-adelle font-normal text-lg text-black/30">
                                <span className="block truncate">{rangeLabels[lowest] ? rangeLabels[lowest] : 'range low'}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronSVG className='rotate-180'/>
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="cursor-pointer z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {rangeLabels.map((noteLabel, noteIdx) => (
                                    <Listbox.Option
                                    key={noteLabel}
                                    className={({ active }) =>
                                        `flex items-center px-2.5 text-lg ${
                                        active ? 'text-primary' : 'text-black/30'
                                        }`
                                    }
                                    value={noteIdx}
                                    >
                                    {({ selected }) => (
                                        <span
                                            className={`${
                                            selected ? 'font-bold text-primary' : 'font-normal'
                                            }`}
                                        >
                                            {noteLabel}
                                        </span>
                                    )}
                                    </Listbox.Option>
                                ))}
                                </Listbox.Options>
                            </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div className='w-72 h-8 mt-3'>
                        <Listbox value={clef} onChange={setClef}>
                            <div className="relative">
                            <Listbox.Button className="h-8 w-full rounded-lg bg-gray-200 px-2.5 text-left font-adelle font-normal text-lg text-black/30">
                                <span className="block truncate">{clef}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronSVG className='rotate-180'/>
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="cursor-pointer z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {clefs.map((clefLabel, clefIdx) => (
                                    <Listbox.Option
                                    key={clefIdx}
                                    className={({ active }) =>
                                        `flex items-center px-2.5 text-lg ${
                                        active ? 'text-primary' : 'text-black/30'
                                        }`
                                    }
                                    value={clefLabel}
                                    >
                                    {({ selected }) => (
                                        <span
                                            className={`${
                                            selected ? 'font-bold text-primary' : 'font-normal'
                                            }`}
                                        >
                                            {clefLabel}
                                        </span>
                                    )}
                                    </Listbox.Option>
                                ))}
                                </Listbox.Options>
                            </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <button type="button" className='mt-9 flex flex-row items-end' onClick={handleSetup}>
                        <p className='text-primary font-primary font-normal text-6xl'>continue</p>
                        <ArrowSVG className='h-12 w-12 ml-4 fill-primary'/>
                    </button>
                </form>
                </>
            }
        </div>
    </div>
  )
}

export default UserSetupForm