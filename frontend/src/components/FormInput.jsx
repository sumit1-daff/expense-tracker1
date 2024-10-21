import React from 'react'
import { useForm } from 'react-hook-form';
export default function FormInput(props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const name = props.name;
  return (
    <>
      <div className= {`w-4/5 mx-auto my-4 ${props.name === "description" ? 'mt-1': 'mt-1'}`} >
           <input type="text" {...register(`${props.name}`,{
              required : {value : true, message : "**Required Field"},
              pattern : {
                value:  /^[a-zA-Z ]+$/,
                message: "Invalid data"
              }
            })} className='mx-auto w-full h-12 p-2 border border-slate-500 rounded-lg' placeholder= {props.placeholder ? props.placeholder : 'Enter Expense Name'} />
            {errors.name && <span>{errors.name.message}</span> }
           </div>  
       
    </>
  )
}
