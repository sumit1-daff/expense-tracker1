import React, { useEffect } from 'react'
import SideDrawer from '../../components/SideDrawer'

export default function DashBoard() {

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/transactions/get-transactions",
        {
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(()=>{
    fetchTransactions();
  },[]);

  return (
     <div className="flex">
     <SideDrawer/>
     <div className='mx-10 mt-10 flex flex-col w-full'>
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
        <h1 className='text-2xl font-bold underline my-2'>Recent Expenses</h1>
        <div className="flex justify-between p-2 w-full border border-black h-32 ">
          <div className='w-60 h-28 border border-black  '>

          </div>
        </div>
        <div className='w-2/3 border border-black my-10 h-96'>
            <h1>Transaction tables or fixed expenses</h1>
        </div>
     </div>
     </div>
  )
}
