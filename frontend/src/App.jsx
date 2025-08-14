import React from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Login from "./screens/public/Login";
import Signup from "./screens/public/Signup";
import DashBoard from "./screens/protected/DashBoard";
import Home from "./screens/public/Home";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoutes";
import EditTransaction from "./screens/protected/EditTransaction";
import About from "./screens/public/About";
import ContactUs from "./screens/public/ContactUs";
import Services from "./screens/public/Services";
import AddTransaction from "./screens/protected/AddTransaction";
import Transactions from "./screens/protected/Transactions";
import UserProfile from "./screens/protected/UserProfile";
import VerifyEmail from "./screens/public/VerifyEmail";
import ResetPassword from "./screens/public/ResetPassword";
import { ROUTES } from "./routes/routes";

function App() {
  return (
   <Router>
  <Toaster position="top-center" reverseOrder={false} />
  <Routes>
    <Route element={<ProtectedRoute />}>
      <Route path={ROUTES.DASHBOARD} element={<DashBoard />} />
      <Route path={ROUTES.ADD_TRANSACTION} element={<AddTransaction />} />
      <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
      <Route path={ROUTES.EDIT_TRANSACTION} element={<EditTransaction />} />
      <Route path={ROUTES.PROFILE} element={<UserProfile />} />
      <Route path={ROUTES.WILDCARD} element={<Navigate to={ROUTES.DASHBOARD} />} />
    </Route>

    <Route element={<PublicRoute />}>
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.CONTACT} element={<ContactUs />} />
      <Route path={ROUTES.SERVICES} element={<Services />} />
      <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
    </Route>
  </Routes>
</Router>

  );
}

export default App;
