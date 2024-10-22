import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const checkProtected = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/is_protected", {
          method: 'GET',
          credentials: 'include', // Include cookies if needed for auth
        });
        const result = await response.json();

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false); // Set loading to false after the request
      }
    };

    checkProtected(); // Call the async function
  }, []);

  // Show a loading state while the authentication check is in progress
  if (loading) {
    return <div>Loading...</div>; // or any loading spinner component
  }

  // Return Outlet or redirect based on login status
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
