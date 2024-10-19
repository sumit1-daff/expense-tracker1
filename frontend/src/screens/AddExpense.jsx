import React from 'react'
import SideDrawer from '../components/SideDrawer'
import { useForm } from "react-hook-form";
export default function AddExpense() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  return (
    <>
    <div className="flex w-full h-screen">
    <SideDrawer/>
    <div className='w-full h-screen'>
      <div className="mx-auto my-10 border border-black  w-4/5">
        <h1 className='text-center font-bold text-5xl mx-auto my-10'>Add Expense</h1>
        <div className="my-10">
          <form action="" className='mx-auto '>
           <div className='w-4/5 mx-auto my-4'>
           <input type="text" {...register("name",{
              required : {value : true, message : "**Required Field"},
              pattern : {
                value:  /^[a-zA-Z ]+$/,
                message: "Invalid email address"
              }
            })} className='mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg' placeholder='Enter Expense Name' />
           </div>
           <div className='w-4/5 mx-auto my-4'>
           <input type="text" {...register("name",{
              required : {value : true, message : "**Required Field"},
              pattern : {
                value:  /^[a-zA-Z ]+$/,
                message: "Invalid email address"
              }
            })} className='mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg' placeholder='Enter Expense Name' />
           </div>
           <div className='w-4/5 mx-auto my-4'>
           <input type="text" {...register("name",{
              required : {value : true, message : "**Required Field"},
              pattern : {
                value:  /^[a-zA-Z ]+$/,
                message: "Invalid email address"
              }
            })} className='mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg' placeholder='Enter Expense Name' />
           </div>
           <div className='w-4/5 mx-auto my-4'>
           <input type="text" {...register("name",{
              required : {value : true, message : "**Required Field"},
              pattern : {
                value:  /^[a-zA-Z ]+$/,
                message: "Invalid email address"
              }
            })} className='mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg' placeholder='Enter Expense Name' />
           </div>
           <div className='w-4/5 mx-auto my-4'>
           <input type="text" {...register("name",{
              required : {value : true, message : "**Required Field"},
              pattern : {
                value:  /^[a-zA-Z ]+$/,
                message: "Invalid email address"
              }
            })} className='mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg' placeholder='Enter Expense Name' />
           </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  </>
  )
}


//desc date amount category sub-category name