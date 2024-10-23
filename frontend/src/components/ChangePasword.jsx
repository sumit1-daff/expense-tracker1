import React, { useState } from "react";
import Modal from "./Modal";

export default function ChangePassword() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPassword, setCurrentpassword] = useState('');
  const [newPassword, setNewpassword] = useState('');
  const [confirmPassword, setConfirmpassword] = useState('');
  const formData = {
    curentPassword : currentPassword,
    newPassword : newPassword,
    confirmPassword : confirmPassword
  }
  const handleChangePassword = async ()=>{
    try{
      const response = fetch('https://localhost:3000/auth/change-password',{
        method : "POST",
        credentials : true,
        headers : {
          "Content-type" : "application/json",
        },
        body : JSON.stringify(formData)
      });
      if(response.ok){
        alert("Password Changed Successfully");
      }
    }catch(error){
      console.log("Error occurred" , error);
    }
  }

  return (
    <div>
      <button
        className="bg-blue-500 text-white w-40 h-12 rounded-lg"
        onClick={() => setModalOpen(true)}
      >
        Change Password
      </button>
      <div className="text-center">
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block text-start text-sm font-medium text-gray-700">
              Enter your current password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentpassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter current pasword"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-start text-sm font-medium text-gray-700">
              Enter New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewpassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="New Password"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-start text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </Modal>
      </div>
    </div>
  );
}
