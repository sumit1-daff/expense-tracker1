import React from 'react'
import DrawerItem from '../components/DrawerItem';
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import { IoToggle } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Navbar from '../components/Navbar';
export default function DashBoard(props) {
    return (
      <>
        <div className="h-screen border-solid border-2 shadow-xl w-80 justify-center">
          <div className="text-center p-6 text-4xl font-bold flex items-center ">
            <p className='text-center'>Expense
            <span className='text-blue-500'>Trackr</span></p>
          </div>
         <div className='my-5'>
         <DrawerItem icon={<LuLayoutDashboard />} title="DashBoard" />
          <DrawerItem icon={<IoIosAddCircleOutline />} title="Add New" />
          <DrawerItem icon={<GrTransaction />} title="Transactions" />
          <DrawerItem icon={<MdManageAccounts />} title="Account" />
         </div>
       <div className='mt-20'>
       <DrawerItem icon={<IoToggle />} title="Switch Accounts" />
       <DrawerItem icon={<IoIosLogOut />} title="Log Out" />
       </div>
        </div>
        <div>
        </div>
      </>
    )
}
