import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
export default function DashBoard(props) {
    const {username} = useParams();
  return (
  <>
    <Navbar />
    <div className=" mt-10">
    <div className='mx-auto hover:scale-110 w-1/2 h-60 rounded-3xl text-center bg-white flex justify-center items-center flex-col shadow-lg shadow-blue-900'>
        <h1 className='text-4xl font-bold'>Welcome to the Expense Tracker App!!</h1>
    </div>
    </div>
  </>
  )
}
