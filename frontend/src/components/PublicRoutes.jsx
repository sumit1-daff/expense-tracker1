import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PublicRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const checkAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/is_protected", {
        method: 'GET',
        credentials: 'include', 
      });
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading .... </div>;
  }

  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
}
