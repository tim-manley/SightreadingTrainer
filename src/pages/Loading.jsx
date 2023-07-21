import React from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import Navbar from '../components/Navbar'

function Loading() {
  return (
    <>
        <Navbar />
        <div className="mt-24 flex flex-row items-center justify-center">
          <LoadingSpinner text="loading..." />
        </div>
    </>
  )
}

export default Loading