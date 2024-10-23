import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DrawerItem from './DrawerItem';
import { IoIosLogOut } from "react-icons/io";

export default function AccountDrawer(props) {
  const location = useLocation(); 
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      let response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.log("Some error occurred during log out");
      }
    } catch (err) {
      console.log("Some error occurred", err);
    }
  };
  const isActive = (path) => location.pathname === path ? 'bg-blue-500 text-white rounded-3xl' : '';

  return (
    <>
      <div className="h-screen border-solid border-2 shadow-xl w-80 justify-center bg-white">
        <div className="text-center p-6 text-4xl font-bold flex items-center ">
          <p className="text-center">Expense
            <span className="text-blue-500">Trackr</span></p>
        </div>
        <div className="my-5">
          <Link to="/dashboard">
            <div className={isActive('/dashboard')}>
              <DrawerItem title="Back to Dashboard" />
            </div>
          </Link>
          <Link to="/profile">
            <div className={isActive('/profile')}>
              <DrawerItem title="Account Details" />
            </div>
          </Link>
          <Link to="/update-account">
            <div className={isActive('/update-account') || isActive('/edit-transaction/')}>
              <DrawerItem title="Update Details" />
            </div>
          </Link>
          <Link to="/change-password">
            <div className={isActive('/change-password')}>
              <DrawerItem  title="Change Password" />
            </div>
          </Link>
        </div>
        <div className="mt-20">
          {/* <Link to="/switch-account">
            <div className={isActive('/switch-account')}>
              <DrawerItem icon={<IoToggle />} title="Switch Accounts" />
            </div>
          </Link> */}
          <Link onClick={handleLogout} to="/logout">
            <div className={isActive('/logout')}>
              <DrawerItem icon={<IoIosLogOut />} title="Log Out" />
            </div>
          </Link>
        </div>
      </div>
      <div></div>
    </>
  );
}

