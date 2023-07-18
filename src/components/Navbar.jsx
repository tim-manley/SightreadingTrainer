import React from 'react'
import logo from '../assets/officialLogo-06 1.svg'

function Navbar() {
  return (
    <nav className='flex flex-row'>
        <img className='w-65 h-20 ml-20 mt-14' src={logo} />
    </nav>
  )
}

export default Navbar