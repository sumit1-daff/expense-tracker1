import React from 'react'
import { Link } from 'react-router-dom';
import DrawerItem from './DrawerItem';
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import { IoToggle } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Navbar from './Navbar';
export default function SideDrawer(props) {
  const handleLogout = async () => {
    try {
      let response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        location.reload();
        const navigate = useNavigate();
        navigate("/");
        isLoggedIn = false;
      } else {
        console.log("Some error occured during log out");
      }
    } catch (err) {
      console.log("Some error occurred", err);
    }
  };
    return (
      <>
        <div className="h-screen border-solid border-2 shadow-xl w-80 justify-center">
          <div className="text-center p-6 text-4xl font-bold flex items-center ">
            <p className='text-center'>Expense
            <span className='text-blue-500'>Trackr</span></p>
          </div>
         <div className='my-5'>
         <Link to={'/dashboard'}><DrawerItem icon={<LuLayoutDashboard />} title="DashBoard" /></Link>
          <Link to={'/addtransaction'}><DrawerItem icon={<IoIosAddCircleOutline />} title="Add New" /></Link>
          <Link to={'/transactions'}><DrawerItem icon={<GrTransaction />} title="Transactions" /></Link>
          <Link to={'/profile'}><DrawerItem icon={<MdManageAccounts />} title="Account" /></Link>
         </div>
       <div className='mt-20'>
       <Link to={'/switch-account'}><DrawerItem icon={<IoToggle />} title="Switch Accounts" /></Link>
       <Link onClick={handleLogout} to={'/logout'}><DrawerItem icon={<IoIosLogOut />} title="Log Out" /></Link>
       </div>
        </div>
        <div>
        </div>
      </>
    )
}
