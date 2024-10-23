import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); 
  const checkProtected = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/is_protected", {
        method: 'GET',
        credentials: 'include', 
      });
      if (response.ok) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    checkProtected(); 
  }, []);
  
  if(isLoggedIn === null ){ //Do not remove this condition, it is one of the most important condition.
    return <div>Loading .... </div>
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
