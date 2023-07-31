import React from 'react'
import Navbar from '../components/Navbar'
import LoadingSpinner from '../components/LoadingSpinner'

function Generating() {
  return (
    <>
        <Navbar />
        <div className="mt-24 flex flex-row items-center justify-center">
          <LoadingSpinner text="generating lesson..." />
        </div>
    </>
  )
}

export default Generating