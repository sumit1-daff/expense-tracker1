import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "../../components/ForgotPassword";

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [authError, setAuthError] = useState(null);
    const navigate = useNavigate();  
    const onSubmit = async (data) => {
      const { username, password } = data;
      let response = await authenticateUser(username, password);
      if (response.ok) {
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
      <div className="p-10 w-1/2 flex flex-col justify-center items-center">
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
          <span>Expense</span>
          <span className="text-blue-500">Trackr</span>
        </div>
      </div>
      <div className="w-60 md:w-96">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" action="" className="flex flex-col">
          <div className="flex w-full">
            <h4 className="mt-2 md:mt-5 text-xl">Log In</h4>
          </div>
          <div className="h-6">
             {authError && <span className="text-red-500">{authError}</span>}
         </div>
          <div>
          <input
            autoComplete="off"
            type="email"
            value={'sngsumit@gmail.com'}

            className="email border-solid border-2 outline-none border-gray-300 focus:border-gray-500 w-full h-12 md:h-15 p-4"
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
          <div className="h-8">
             {errors.username && <span className="text-red-500">{errors.username.message}</span>}
         </div>
          <div>
             <input
            autoComplete="off"
            type="password"
            value = {"sumit@1234"}
            className="mail border-solid border-2 outline-none border-gray-300 focus:border-gray-500 w-full h-12 md:h-15 p-4 "
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          </div>
         <div className="h-8">
           {errors.password && <span className="text-red-500">**Required Field</span>}
          </div>
          <div className="w-full">
            <button
            disabled={isSubmitting}
              type="submit"
              className="self-start w-full md:w-full px-6 py-3 text-white bg-blue-500 h-12 md:h-15 cursor-pointer active:scale-90"
            >
              Login
            </button>
          </div>
          <div className="text-right mt-2"><ForgotPassword/></div>
          <div className="underline text-blue-500 decoration-2 text-center mt-5 hover:text-blue-800"><Link to={'/signup'}>Don't have an Account? Sign Up</Link></div>
        </form>
      </div>
      <hr className="border-gray-200 border w-1/2 mt-6" />
      <div className="text-center w-full mt-2">
        <p>Or Continue With</p>
      </div>
      <div className="flex flex-row mt-5 justify-center gap-12 h-8 md:h-10">
        <img className="w-8 md:w-10 " src="/facebook.png" alt="" />
        <img className="w-8 md:w-10 " src="/google.png" alt="" />
        <img className="w-8 md:w-10 " src="/microsoft.png" alt="" />
      </div>
      </div>
    </div>
  );
}
