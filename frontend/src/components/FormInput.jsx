import React from 'react'
import { useForm } from 'react-hook-form';
export default function FormInput(props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  return (
    <>
      <div className='w-4/5 mx-auto my-4'>
           <input type="textarea" {...register(`${props.name}`,{
              required : {value : true, message : "**Required Field"},
              pattern : {
                value:  /^[a-zA-Z ]+$/,
                message: "Invalid data"
              }
            })} className='mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg' placeholder= {props.placeholder ? props.placeholder : 'Enter Expense Name'} />
           </div>  
    </>
  )
}
