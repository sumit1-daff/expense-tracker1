import React from 'react'
import SideDrawer from '../components/SideDrawer'

export default function DashBoard() {
  return (
   <>
     <div className="flex">
     <SideDrawer/>
     <div className='mx-10 my-10 flex flex-col w-full'>
        <div className='flex mb-10 '>
          <div className='mr-5 w-1/2 h-72 bg-slate-300'>
            <h1 className='font-bold text-2xl p-3'>Income</h1>
            <div className='border-2 border-black mx-10 h-48'>
                I will draw graph in this div.
            </div>
          </div>
          <div className='ml-5 w-1/2 h-72 bg-slate-300'>
            <h1 className='font-bold text-2xl p-3'>Expense</h1>
            <div className='border-2 border-black mx-10 h-48'>
                I will draw graph in this div.
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between p-2 w-full bg-gray-300 border border-black h-32 ">
          <div className='w-60 h-28 border border-black  '></div>
          <div className='w-60 h-28 border border-black  '></div>
          <div className='w-60 h-28 border border-black  '></div>
          <div className='w-60 h-28 border border-black  '></div>
        </div>
        <div className='w-2/3 border border-black my-10 h-96'>
            <h1>Transaction tables or fixed expenses</h1>
        </div>
     </div>
     </div>
   </>
  )
}
