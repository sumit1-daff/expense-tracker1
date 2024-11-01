import React, { useState } from "react";
import Modal from "./Modal";

export default function ForgotPassword() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("sngsumit2003@gmail.com");
  const [emailError, setEmailError] = useState('');
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3000/auth/forgot-password',{
        method : "POST",
        body : JSON.stringify({email}),
        headers : {
          "Content-type" : "application/json"
        },
        credentials : 'include',
      });
      const result = await response.json();
      console.log(result);
      if(result.error){
        setEmailError(result.error);
      }
      if(response.ok){
        console.log("mail sent to your registered email id");
        setModalOpen(false);
      }
    }catch(err){
      console.error("Error occurred ",err);
    }
  };

  return (
    <div>
      <button
        className="text-blue-500 underline hover:text-blue-800"
        onClick={() => setModalOpen(true)}
      >
        Forgot Password?
      </button>
      <div className="text-center">
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-start text-md font-medium text-gray-700">
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email"
              required
            />
          <div className="h-4 text-md text-red-500 text-left p-1">
            {emailError}
          </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>
      </Modal>
      </div>
    </div>
  );
}
