import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [authError, setAuthError] = useState(null);
    const navigate = useNavigate();  
    const onSubmit = async (data) => {
      const { username, password } = data;
      let response = await authenticateUser(username, password);
      if (response.ok) {
        console.log("redirecting to dashboard!!");
        navigate('/dashboard');
      } else {
        setAuthError("Invalid credentials, please try again.");
      }
    };
  
    const authenticateUser = async (email, password) => {
      try {
        
        let response = await fetch('http://localhost:3000/auth/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({ email, password })
        });
        
        return response;
      } catch (error) {
        console.error("Error authenticating user", error);
        return { ok: false };
      }
    };
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div className="flex flex-col text-center gap-3 mb-5">
        <div className="flex">
          <span className="text-3xl md:text-5xl font-bold">Welcome back</span>
          <span className="h-full flex items-center">
            <img className="m-1 h-8 md:m-2 md:h-10 md:w-30" src="/wave.png" alt="Logo" />
          </span>
        </div>
        <div className="text md:text-2xl">
          <p>To</p>
        </div>
        <div className="text-3xl md:text-5xl font-bold">
          <span>Sub</span>
          <span className="text-blue-500">Trackr</span>
        </div>
      </div>
      <div className="w-60 md:w-96">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" action="" className="flex flex-col">
          <div className="flex w-full">
            <h4 className="mt-2 md:mt-5 text-xl">Log In</h4>
          </div>
          <div className="h-6">
             {authError && <span className="text-red-300">{authError}</span>}
         </div>
          <div>
          <input
            autoComplete="off"
            type="email"
            className="email border-solid border-2 outline-none border-gray-300 focus:border-gray-500 my-4 w-full h-12 md:h-15 p-4"
            placeholder="Enter your registered Email"
            {...register("username", {
              required: { value: true, message: "**Required Field" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              },
              minLength: { value: 4, message: "The minimum length of username should be 4" }
            })}
          />
          </div>
          <div className="h-6">
             {errors.username && <span className="text-red-300">{errors.username.message}</span>}
         </div>
          <div>
             <input
            autoComplete="off"
            type="password"
            className="mail border-solid border-2 outline-none border-gray-300 focus:border-gray-500 my-4 w-full h-12 md:h-15 p-4 "
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          </div>
         <div className="h-6">
           {errors.password && <span className="text-red-300">**Required Field</span>}
          </div>
          <div className="w-full flex ">
            <button
            disabled={isSubmitting}
              type="submit"
              className="self-start w-32 md:w-40 px-6 py-3 text-white bg-blue-500 h-12 md:h-15 cursor-pointer active:scale-90"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="text-center w-full mt-5">
        <p>Or Continue With</p>
      </div>
      <div className="flex flex-row mt-5 justify-center gap-12 h-8 md:h-10">
        <img className="w-8 md:w-10 " src="/facebook.png" alt="" />
        <img className="w-8 md:w-10 " src="/google.png" alt="" />
        <img className="w-8 md:w-10 " src="/microsoft.png" alt="" />
      </div>
    </div>
  );
}
