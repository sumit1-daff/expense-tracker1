import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
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

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
