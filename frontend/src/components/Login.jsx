import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [isAuthenticating , setIsAuthenticating] = useState(false);
  const email = watch('username');
  const onSubmit = async (data) => {
    const {username , password} = data;
    let response = await authenticateUser(username, password);
    if(response.ok){
      console.log("The user is verified by the following data");
    }
    else{
      console.log("The user is not verified",username);

    }
    authenticateUser(email);
  };
  // useEffect(()=>{
  //   if(email){
  //     authenticateUser(email);
  //   }
  // },[email]);

  const authenticateUser = async (email,password)=>{
    try {
      let response = await fetch('http://localhost:3000/auth/authenticate-user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      return response;
    } catch (error) {
      console.error("Error authenticating user", error);
      return { ok: false };
    }
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="w-96 h-auto bg-slate-500 flex flex-col rounded-lg shadow-lg p-6">
          <h1 className="text-4xl font-bold underline text-white text-center mb-5">
            Log In
          </h1>
          {isSubmitting && <div>loading.........</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label htmlFor="username" className="text-white m-1">
              Email
            </label>
            <input
            autoComplete="off"
              type="email"
              className="w-full p-2 h-8"
              placeholder="Enter your registered Email"
              {...register("username", {
                required: { value: true, message: "**Required Field" },
                minLength: {
                  value: 4,
                  message: "The minimum length of username should be 4",
                },
              })}
            />
            <div className="h-6">
              {errors.username && (
                <span className="text-red-300">{errors.username.message}</span>
              )}
            </div>
            <label htmlFor="password" className="text-white mt-4">
              Password
            </label>
            <input
            autoComplete="off"
              type="password"
              className="w-full p-2 h-8"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <div className="h-6">
              {errors.password && (
                <span className="text-red-300">**Required Field</span>
              )}
            </div>
            <input
              disabled={isSubmitting}
              className="bg-blue-500 text-white p-2 w-11/12 rounded self-center hover:bg-blue-600 cursor-pointer mt-6"
              type="submit"
            />
          </form>
          <div className=" mt-3 flex text-blue-50 cursor-pointer justify-end">
            <a className="hover:underline hover:text-blue-200 " href="/">
              Forgot Password?
            </a>
          </div>
          <div className="text-center mt-6 hover:underline text-white hover:text-blue-200 cursor-pointer">
            <Link to="/auth/signup">Don't have an account? Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
}
