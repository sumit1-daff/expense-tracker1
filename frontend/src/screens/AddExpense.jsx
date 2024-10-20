import React from 'react'
import SideDrawer from '../components/SideDrawer'
import { useForm } from "react-hook-form";
import FormInput from '../components/FormInput';
import Dropdown from '../components/Dropdown';
import CategoryDropdown from '../components/CategoryDropdown';
export default function AddExpense() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  return (
    <>
    <div className="flex w-full h-screen">
    <SideDrawer/>
    <div className='w-full h-screen'>
      <div className="mx-auto my-10   w-4/5">
        <h1 className='text-center font-bold text-5xl mx-auto my-10'>Add Transaction</h1>
        <div className="my-10">
          <form action="" className='mx-auto '>
           <FormInput name="name"  />
           <FormInput name="description" placeholder="Enter expense description"  />
           <div className='w-4/5 mx-auto my-4'> <CategoryDropdown/> </div>
           <div className='w-4/5 mx-auto my-4'>
           <input type="number" {...register("amount",{
              required : {value : true, message : "**Required Field"},
              pattern : {
                value:  /^[0-9]+$/,
                message: "Enter Valid Amount"
              }
            })} className='mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg' placeholder='Enter Expense Amount' />
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