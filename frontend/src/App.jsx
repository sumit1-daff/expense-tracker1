import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import DashBoard from "./screens/DashBoard";
import SideDrawer from "./components/SideDrawer";
import Home from "./screens/Home";
import ProtectedRoute from "./components/ProtectedRoutes";
import ForgotPassword from "./screens/ForgotPassword";
import About from "./screens/About";
import ContactUs from "./screens/ContactUs";
import Services from "./screens/Services";
import Navbar from "./components/Navbar";
function App() {
  const isLoggedIn = Cookies.get("authToken");
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            </>
          )}
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<DashBoard isLoggedIn={isLoggedIn} />}
            />
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="*" element={<Navigate to={"/dashboard"} />} />
          </Route>
          <Route
            path="*"
            element={isLoggedIn ? <DashBoard /> : <Navigate to="/" />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
