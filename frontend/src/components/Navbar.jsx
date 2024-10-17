import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar(){
    const handleClick = () =>{
        Navigate('/login');
    }
   return(
    <>
    <div className='nav flex bg-blue-400'>
        <ul className='flex list-none justify-center w-2/3 '>
            <li className='cursor-pointer w-40 h-full hover:text-white font-bold text-center p-2 pt-5 hover:border-white hover:border-solid hover:border-b-2 hover:bg-blue-500'><Link to="/" >Home</Link></li>
            <li className='cursor-pointer w-40 h-full hover:text-white font-bold text-center p-2 pt-5 hover:border-white hover:border-solid hover:border-b-2 hover:bg-blue-500'><Link to="/" >About Us</Link></li>
            <li className='cursor-pointer w-40 h-full hover:text-white font-bold text-center p-2 pt-5 hover:border-white hover:border-solid hover:border-b-2 hover:bg-blue-500'><Link to="/" >Contact Us</Link></li>
            <li className='cursor-pointer w-40 h-full hover:text-white font-bold text-center p-2 pt-5 hover:border-white hover:border-solid hover:border-b-2 hover:bg-blue-500'><Link to="/" >Services</Link></li>
        </ul>
        <div className="options flex w-1/3 justify-end mr-5 p-3">
            <button className='text-white border-solid border-white border-2 rounded-3xl bg-transparent h-10 p-1 w-20 m-2' onClick={handleClick}> <Link to='/auth/login'>Log Out</Link> </button>
        </div>
    </div>
    </>
   )
}