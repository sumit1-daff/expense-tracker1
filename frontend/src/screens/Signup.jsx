import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function Signup() {
  const [isEmailAvailable, setEmailAvailable] = useState(true);
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
   try{
    let response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = checkIfExists(data.email);
    
    if(response.ok){
      reset();
      alert("User was added successfully");
      navigate('/auth/login');

    }else{
      console.log("Sign Up Failed");
    }
   }
   catch (error){
    console.log("error occured at the sign up page" , error);
   }
  };

  const checkIfExists = async (email) =>{
    setIsEmailChecking(true);
    let response = await fetch('http://localhost:3000/auth/check-email',{
      method:"POST",
      headers : {
        'Content-type': "application/json"
      },
      body : JSON.stringify({email})
    });
    const result = await response.json();
    console.log(result);
    setEmailAvailable(response.ok);
    setIsEmailChecking(false);
  }
  const emailValue = watch("email");

  useEffect(()=>{
    if(emailValue){
      console.log("checking email!!");
    checkIfExists(emailValue);
    }
  },[emailValue]);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/3 h-auto bg-slate-500 flex flex-col rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold underline text-white text-center mb-5">
          Sign Up
        </h1>
        {isSubmitting && <div>loading.........</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-6">
          <label htmlFor="name" className="text-white m-1">
            Name
          </label>
          <input
          autoComplete="off"
            className="w-full p-2 h-8"
            placeholder="Enter your Full name"
            {...register("name", {
              required: { value: true, message: "**Required Field" },
              minLength: {
                value: 4,
                message: "The minimum length of user's name should be 4",
              },
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: "Name can only contain letters.",
              },
            })}
          />
          <div className="h-6">
          {errors.name && (
            <span className="text-red-300">{errors.name.message}</span>
          )}
          </div>
          <label htmlFor="email" className="text-white m-1">
            Email
          </label>
          <input
          autoComplete="off"
            type="email"
            className="w-auto p-2 h-8"
            placeholder="Enter your registered E-mail"
            {...register("email", {
              required: { value: true, message: "**Required Field" },
              minLength: {
                value: 4,
                message: "Invalid E-mail",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              },
              validate : () => isEmailAvailable || "Email is already registered."
            })}
          />
           <div className="h-6">
          {errors.email && (
            <span className="text-red-300">{errors.email.message}</span>
          )}
          </div>
          <label htmlFor="password" className="text-white mt-4">
            Password
          </label>
          <input
          autoComplete="off"
            type="password"
            className={`w-full p-2 h-8 
              ${
                errors.password || errors["conf-password"]
                  ? "border border-red-400"
                  : ""
              }`}
          
            placeholder="Enter your password"
            {...register("password", {
              required: { value: true, message: "**Required Field" },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must contain at least 8 characters, including letters, numbers, and special characters.",
              },
            }
            )}
          />
          <div className="h-6">
          {errors.password && (
            <span className="text-red-300">{errors.password.message}</span>
          )}
          </div>
          <label htmlFor="conf-password" className="text-white mt-4">
            Confirm Password
          </label>
          <input
          autoComplete="off"
            type="password"
            className={`w-full p-2 h-8   outline-none
              ${
                errors.password || errors["conf-password"]
                  ? "border border-red-500"
                  : ""
              }`}
            placeholder="Confirm password"
            {...register("conf-password", {
              required: { value: true, message: "**Required Field" },
              validate: (value) => {
                const password = watch("password");
                return value === password || "Passwords do not match";
              },
            })}
          />
           <div className="h-6">
          {errors["conf-password"] && (
            <span className="text-red-300">
              {errors["conf-password"].message}
            </span>
          )}
          </div>
          <input
            disabled={isSubmitting}
            className="bg-blue-500 text-white p-2 w-11/12 rounded self-center hover:bg-blue-600 cursor-pointer mt-6"
            type="submit"
          />
        </form>
        <div className="text-center mt-6 hover:underline text-white hover:text-blue-200 cursor-pointer">
          <Link to="/login">Already have an account? Log In</Link>
        </div>
      </div>
    </div>
  );
}
