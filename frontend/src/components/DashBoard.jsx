import React from 'react'
import { useParams } from 'react-router-dom'
import DrawerItem from './DrawerItem';
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import { IoToggle } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Navbar from './Navbar';
import { isAuthenticated } from '../utils/isAuthenticated';
export default function DashBoard(props) {
   const isAuthenticated = isAuthenticated();
   if(isAuthenticated){
    return (
      <>
      <Navbar/>
        <div className="h-fit-content border-solid border-2 shadow-xl w-80 justify-center">
          <div className="heading text-center p-9 text-4xl ml-8 font-bold flex items-center ">
            <p className='text-center'>Sub
            <span className='text-blue-500'>Trackr</span></p>
          </div>
         <div className='my-20'>
         <DrawerItem icon={<LuLayoutDashboard />} title="DashBoard" />
          <DrawerItem icon={<IoIosAddCircleOutline />} title="Add New" />
          <DrawerItem icon={<GrTransaction />} title="Transactions" />
          <DrawerItem icon={<MdManageAccounts />} title="Account" />
         </div>
       <div className='my-20'>
       <DrawerItem icon={<IoToggle />} title="Switch Accounts" />
       <DrawerItem icon={<IoIosLogOut />} title="Log Out" />
       </div>
        </div>
        <div>
        </div>
      </>
    )
   }
   else{
    return(
      <div>You need to login first!!</div>
    )
   }
  
}
