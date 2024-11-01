import React , {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function () {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [emailError,setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confPasswordError, setConfPasswordError] = useState(null);
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      })
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        reset();
        alert("User added successfully!!!");
        const {email, password} = data;
        const loginResponse = await authenticateUser(email, password);
        if(loginResponse.ok){
          navigate('/dashboard');
        }else{
          console.log("Error in redirecting to the dashboard");
        }
      }else if(result.message === 'User with Email already exists'){
         setEmailError("User already Exists!!");
      }else if(result.message === "Validation Failed"){
        setEmailError(result.errors.email);
        setNameError(result.errors.name);
        setPasswordError(result.errors.password);
        setConfPasswordError(result.errors.confirmPassword);
      }
      else {
        alert("Some error occurred.");
      }
    } catch (err) {
      console.log(err);
      console.log("Invalid Credentials. Please try again later!");
    }
  };

  const authenticateUser = async (email, password)=>{
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
  }

  return (
    <>
      <div className="h-dvh w-full flex items-center justify-center overflow-hidden">
        <div className=" w-1/3 p-10">
          <div className="text-center mb-5">
            <div className="text-4xl w-full font-bold flex justify-center">
              <span className="font-bold">Welcome</span>
              <span className="h-full flex items-center">
                <img
                  className="m-1 h-8 md:m-2 md:h-10 md:w-30"
                  src="/wave.png"
                  alt="Logo"
                />
              </span>
            </div>
            <div className="text-4xl font-bold">To </div>
            <div className="text-4xl font-bold">
              Expense <span className="text-blue-500">Trackr</span>{" "}
            </div>
          </div>
          <div className="text-xl">Sign Up</div>
          <div className="mt-5 justify-center flex flex-col ">
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex w-full">
                <input
                  autoComplete="off"
                  // value="Sumit Singh"
                  className="email border-solid border-2 outline-none border-gray-300 focus:border-gray-500 w-full h-12 md:h-15 p-4"
                  placeholder="Enter your Full name"
                  {...register("name")}
                />
              </div>
              <div className="h-4 text-red-500">
                  {nameError && <span>{nameError}</span>}
                </div>
              <div className="mt-4">
                <input
                  autoComplete="off"
                  // value="sinsumit2003@gmail.com"
                  type="email"
                  className="email border-solid border-2 outline-none border-gray-300 focus:border-gray-500 w-full h-12 md:h-15 p-4"
                  placeholder="Enter your Email"
                  {...register("email")}
                />
              </div>
              <div className="h-4 text-red-500">
                {emailError &&  <span>{emailError}</span>}
              </div>
              <div className="mt-4">
                <input
                  autoComplete="off"
                  type="password"
                  // value = "sumit@123"
                  className="mail border-solid border-2 outline-none border-gray-300 focus:border-gray-500 w-full h-12 md:h-15 p-4 "
                  placeholder="Enter your password"
                  {...register("password")}
                />
              </div>
              <div className="h-4 text-red-500">
               {passwordError && <span>{passwordError}</span>}
              </div>
              <div className="mt-4">
                <input
                  autoComplete="off"
                  type="password"
                  // value="sumit@123"
                  className="mail border-solid border-2 outline-none border-gray-300 focus:border-gray-500 w-full h-12 md:h-15 p-4 "
                  placeholder="Confirm password"
                  {...register("confirm_password")}
                />
              </div>
              <div className="h-4 text-red-500">
               {confPasswordError && <span>{confPasswordError}</span>}
              </div>
              <div className="w-full mt-2">
                <button
                  className="w-full bg-blue-500 text-white h-12 py-3 hover:bg-blue-700 active:scale-95"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="text-blue-500 hover:text-blue-700 text-center mt-5 underline decoration-2 ">
            <Link to={"/login"}>Already have an Account? Log In</Link>
          </div>
          <hr className="border-gray-200 border w-1/2 mx-auto mt-2" />
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
    </>
  );
}
