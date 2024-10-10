import React from 'react'
import Navbar from './Navbar'
export default function Home() {
  return (
    <>
    <Navbar/>
    <div className=" mt-10">
    <div className='mx-auto hover:scale-110 w-1/2 h-60 rounded-3xl text-center bg-white flex justify-center items-center flex-col shadow-lg shadow-blue-900'>
        <h1 className='text-4xl font-bold'>Welcome to the Expense Tracker App!!</h1>
        <p className='mt-2 text-1xl'>Login to your account for better experience!</p>
    </div>
    </div>
    </>
  )
}
