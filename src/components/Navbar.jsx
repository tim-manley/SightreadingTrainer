import React from 'react'
import {ReactComponent as LogoSVG} from '../assets/officialLogo-06 1.svg'

function Navbar() {
  return (
    <nav className='flex flex-row'>
        <a href="/home"><LogoSVG className='w-64 h-20 ml-20 mt-14'/></a>
    </nav>
  )
}

export default Navbar