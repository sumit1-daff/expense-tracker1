import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PublicRoute() {
    const [isLoggedIn , setLoggedIn] = useState(false);
    const checkLoggedIn = () =>{
    
    }

    useEffect(()=>{
        
    },[]);

  return !isLoggedIn ? <Outlet/> : <Navigate to='/dashboard'/> 
}
