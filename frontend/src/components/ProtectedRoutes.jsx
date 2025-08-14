import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { URLS } from "../routes/apiEndPoints";

export default function ProtectedRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(URLS.isProtected, {
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

    checkAuthentication();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading .... </div>; // Show loading state
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />; // Redirect to home if not logged in
}
