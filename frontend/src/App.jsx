
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from 'react';
import Cookies from 'js-cookie';
import Login from './screens/Login';
import Signup from './screens/Signup';
import DashBoard from "./screens/DashBoard";
import Home from './screens/Home';
import ProtectedRoute from './components/ProtectedRoutes';
import ForgotPassword from './screens/ForgotPassword';
function App() {
  const isLoggedIn = Cookies.get("authToken");
  console.log(isLoggedIn); // This is just for debugging, you can remove this line

  return (
    <Router>
      <div className="App">
        
        <Routes>
          {/* Public Routes */}
          {
            !isLoggedIn && (
              <>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              </>
            )
          }
          <Route path='/' element={<Home />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<DashBoard />} />
          </Route>

          {/* Redirect if no matching route */}
          <Route path="*" element={isLoggedIn ? <DashBoard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
