import React from 'react'
import Navbar from '../components/Navbar'
import account from '../assets/AccountIconOnsight.svg'
import notes from '../assets/NotesArtwork-07.svg'
import { useNavigate } from 'react-router-dom'

function AccountPrefs() {

    const navigate = useNavigate();

  return (
    <div className='h-screen flex flex-col'>
        <Navbar />
        <div className='pt-5 grow h-full flex flex-row overflow-hidden'>
            <div className='h-full w-7/12 flex flex-col'>
                <div className='pl-24 h-1/4 w-full flex flex-row'>
                    <div className='w-2/3 flex flex-row items-center justify-start'>
                        <button className='flex flex-row items-center justify-start' onClick={()=>navigate("/home")}>
                            <svg className='fill-stone-400 rotate-180 h-9 w-9' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.5 80.45"><path d="M80.45,40.27A40.23,40.23,0,1,1,40.29,0,40.23,40.23,0,0,1,80.45,40.27Zm-14.07,0L38.22,16.09l-4,8.05L50.08,36.06l-.06.18H14.14v8h36.1l-16.05,12,4,8Z"/></svg>
                            <p className='ml-2.5 font-adelle text-4xl text-stone-400'>return home</p>
                        </button>
                    </div>
                    <div className='w-1/3 flex flex-row items-center justify-end'>
                        <img className='h-32 w-32 opacity-50' src={account} alt="account" />
                    </div>
                </div>
                <div className='h-3/4 w-full flex flex-row items-start justify-end overflow-hidden'>
                    <img className='w-full' src={notes} alt="notes" />
                </div>
            </div>
            <div className='h-full w-5/12 flex flex-col pl-5 pr-24'>
                <div className='h-1/4 w-full flex items-center justify-start font-adelle font-normal'>
                    <div className='flex flex-col'>
                        <p className='text-account-light text-4xl'>Account Preferences</p>
                        <p className='mt-2 text-account-dark text-2xl'>Account Name</p>
                        <p className='text-account-dark text-xl'>Joined onsight in YYYY</p>
                    </div>
                </div>
                <div className='h-1/4 w-full flex flex-col items-start font-adelle font-normal text-lg text-black/50'>
                    <input
                        className='w-72 h-8 mt-3 bg-gray-200 rounded-lg outline-primary px-2.5'
                        type="text"
                        placeholder="stored full name"
                    />
                    <input
                        className='w-72 h-8 mt-3 bg-gray-200 rounded-lg outline-primary px-2.5'
                        type="email"
                        placeholder="stored email"
                    />
                </div>
                <div className='h-2/4 w-full flex flex-col justify-center font-primary text-3xl text-account-light'>
                    <button className='flex flex-row items-center justify-end'>
                        <p>edit info</p>
                        <svg className='ml-2.5 h-7 w-7' viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M25.6168 9.84462C25.7072 9.92898 25.7608 10.0454 25.7661 10.169C25.7715 10.2925 25.7282 10.4131 25.6455 10.505L19.8326 17.1748L13.7983 24.0906C13.7377 24.1638 13.6562 24.2167 13.5647 24.2424L8.57162 25.6863C8.49571 25.7098 8.41487 25.7124 8.33759 25.6939C8.26032 25.6753 8.18945 25.6363 8.13243 25.5809C8.07541 25.5256 8.03433 25.4558 8.01351 25.3791C7.99269 25.3024 7.9929 25.2214 8.01411 25.1448L9.18653 20.3989C9.20352 20.3212 9.24023 20.2491 9.29311 20.1897L15.3397 13.2533L21.1567 6.58769C21.235 6.49311 21.3477 6.43351 21.4699 6.42197C21.5921 6.41044 21.7139 6.44791 21.8085 6.52616L23.7147 8.20385L25.6168 9.84462Z" fill="#82C5DC"/>
                            <path id="Vector_2" d="M16.5001 2.55954C19.2567 2.55954 21.9515 3.3775 24.2435 4.90996C26.5356 6.44243 28.3221 8.62058 29.377 11.169C30.4319 13.7174 30.7079 16.5216 30.1701 19.2269C29.6323 21.9323 28.3049 24.4173 26.3556 26.3678C24.4064 28.3183 21.9229 29.6465 19.2192 30.1847C16.5155 30.7228 13.7131 30.4466 11.1663 29.391C8.61945 28.3354 6.44265 26.5479 4.91113 24.2544C3.37962 21.9609 2.56217 19.2645 2.56217 16.5061C2.56217 12.8072 4.03063 9.25988 6.64449 6.6444C9.25835 4.02891 12.8035 2.55954 16.5001 2.55954ZM16.5001 0.0983887C13.2569 0.0983887 10.0866 1.06068 7.39009 2.86359C4.69353 4.66649 2.59182 7.22902 1.35073 10.2271C0.109644 13.2253 -0.215082 16.5243 0.41762 19.7071C1.05032 22.8899 2.61203 25.8134 4.90527 28.1081C7.1985 30.4028 10.1203 31.9654 13.3011 32.5985C16.4819 33.2316 19.7789 32.9067 22.7751 31.6648C25.7714 30.423 28.3323 28.32 30.1341 25.6217C31.9359 22.9235 32.8976 19.7512 32.8976 16.5061C32.8976 12.1545 31.17 7.98114 28.0949 4.9041C25.0197 1.82705 20.849 0.0983887 16.5001 0.0983887Z" fill="#82C5DC"/>
                        </svg>
                    </button>
                    <button className='flex flex-row items-center justify-end'>
                        <p>change password</p>
                        <svg className='ml-2.5 h-7 w-7' viewBox="4.1704 -0.0232 22.6589 29.0271" xmlns="http://www.w3.org/2000/svg">
                            <path id="Vector" d="M24.4879 12.0186H6.51178C5.21868 12.0186 4.17041 13.0675 4.17041 14.3614V28.6611C4.17041 29.955 5.21868 31.0039 6.51178 31.0039H24.4879C25.781 31.0039 26.8293 29.955 26.8293 28.6611V14.3614C26.8293 13.0675 25.781 12.0186 24.4879 12.0186Z" fill="#82C5DC" transform="matrix(1, 0, 0, 1, 0, -2)"/>
                            <path id="Vector_2" d="M15.5001 4.67413C16.7009 4.67821 17.8512 5.15812 18.6992 6.00884C19.5473 6.85956 20.0239 8.01179 20.025 9.21335V21.7636H10.9637V9.21335C10.9647 8.00979 11.443 6.85581 12.2935 6.00477C13.144 5.15372 14.2973 4.67515 15.5001 4.67413ZM15.5001 1.97681C13.5821 1.97681 11.7426 2.73923 10.3863 4.09634C9.03001 5.45346 8.26807 7.2941 8.26807 9.21335V22.4919C8.26807 23.0141 8.47539 23.515 8.84443 23.8842C9.21347 24.2535 9.71399 24.461 10.2359 24.461H20.7643C21.2842 24.4579 21.7818 24.2491 22.1483 23.8802C22.5149 23.5112 22.7206 23.0121 22.7206 22.4919V9.21335C22.7206 7.2961 21.9603 5.45721 20.6065 4.10042C19.2527 2.74364 17.4162 1.97987 15.5001 1.97681Z" fill="#82C5DC" transform="matrix(1, 0, 0, 1, 0, -2)"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AccountPrefs