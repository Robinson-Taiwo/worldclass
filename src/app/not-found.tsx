import React from 'react'

const NotFound = () => {
  return (
    <div className='m-0 p-0 flex items-center space-y-4 justify-center h-screen flex-col w-full' >
        <p className="text-white text-5xl font-mono font-bold">
            404
        </p>
        <h1 className="text-red-500 text-3xl ">
            This page is not found on the main server
        </h1>
    </div>
  )
}

export default NotFound