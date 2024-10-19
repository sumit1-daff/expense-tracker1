import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import Cookies from 'js-cookie'
export default function ProtectedRoute(){
    const isLoggedIn = Cookies.get("authToken");
    console.log(isLoggedIn);
    return isLoggedIn ? <Outlet/> : <Navigate to="/" />
}