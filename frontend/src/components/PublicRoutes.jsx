import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PublicRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/is_protected", {
          method: 'GET',
          credentials: 'include',
        });
        setIsLoggedIn(response.ok); // Set login state based on response
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading .... </div>; // Show loading state
  }

  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
}
