import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { URLS } from "../routes/apiEndPoints";

export default function PublicRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(URLS.isProtected, {
          method: 'GET',
          credentials: 'include',
        });
        setIsLoggedIn(response.ok); 
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading .... </div>; 
  }

  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
}
