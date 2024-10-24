import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import Login from "./screens/public/Login";
import Signup from "./screens/public/Signup";
import DashBoard from "./screens/protected/DashBoard";
import Home from "./screens/public/Home";
import ProtectedRoute from "./components/ProtectedRoutes";
import EditTransaction from "./screens/protected/EditTransaction";
import ForgotPassword from "./components/ForgotPassword";
import About from "./screens/public/About";
import ContactUs from "./screens/public/ContactUs";
import Services from "./screens/public/Services";
import AddTransaction from "./screens/protected/AddTransaction";
import Transactions from "./screens/protected/Transactions";
import UserProfile from "./screens/protected/UserProfile";
import ChangePasword from "./components/ChangePasword";
import UpdateAccount from "./components/UpdateAccount";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/addtransaction" element={<AddTransaction />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/edit-transaction/:id" element={<EditTransaction />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/change-password" element={<ChangePasword />} />
          <Route path="/update-account" element={<UpdateAccount />} />
          <Route path="*" element={<Navigate to={"/dashboard"} />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default App;
