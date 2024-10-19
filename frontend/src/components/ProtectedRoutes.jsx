// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoute = ({ element: Element, ...rest }) => {
//     const [isAuth, setIsAuth] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/auth/dashboard', {
//                     credentials: 'include',
//                 });
//                 if (response.ok) {
//                     setIsAuth(true); 
//                 } else {
//                     alert('You need to log in first');
//                     navigate('/login');  
//                 }
//             } catch (error) {
//                 console.error('Authentication failed', error);
//                 alert('You need to log in first');
//                 navigate('/login');
//             }
//             setLoading(false);
//         };

//         checkAuth();
//     }, [navigate]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return isAuth ? <Element {...rest} /> : null;
// };
// export default ProtectedRoute;


import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import Cookies from 'js-cookie'
export default function ProtectedRoute(){
    const isLoggedIn = Cookies.get("authToken");
    console.log(isLoggedIn);
    return isLoggedIn ? <Outlet/> : <Navigate to="login" />
}