import React, { useState } from "react";
import Modal from "./Modal";

export default function ChangePassword() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPassword, setCurrentpassword] = useState("sumit1234");
  const [newPassword, setNewpassword] = useState("sumit@1234");
  const [confirmPassword, setConfirmpassword] = useState("sumit@1234");
  const [errorMessage, setErrorMessage] = useState({
    currentPasswordError: null,
    newPasswordError: null,
    confirmPasswordError: null,
  });
  const formData = {
    currentPassword: currentPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };
  const handleChangePassword = async () => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/auth/change-password",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("Password Changed Successfully");
        setCurrentpassword('');
        setNewpassword('');
        setConfirmpassword('');
        setErrorMessage('');
      } else if (result.message === "Invalid password") {
        setErrorMessage((prevState) => ({
          ...prevState,
          currentPasswordError: result.message,
        }));
      }else{
        setErrorMessage((prevState)=>({
          ...prevState,
          currentPasswordError : result.currentPasswordError,
          newPasswordError : result.newPasswordError,
          confirmPasswordError : result.confirmPasswordError
        }));
      }
    } catch (error) {
      console.log("Error occurred", error);
    }
  };

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
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentpassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter current pasword"
                required
              />
              <div className="h-8 text-sm text-red-500 text-left p-1">
                {errorMessage.currentPasswordError && (
                  <span>{errorMessage.currentPasswordError}</span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewpassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="New Password"
                required
              />
               <div className="h-8 text-sm text-red-500 text-left p-1">
                {errorMessage.newPasswordError && (
                  <span>{errorMessage.newPasswordError}</span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <input
              title="Password must be 8 character long and combination of alphabet, number and special character"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm Password"
                required
              />
               <div className="h-8 text-sm text-red-500 text-left p-1">
                {errorMessage.confirmPasswordError && (
                  <span>{errorMessage.confirmPasswordError}</span>
                )}
              </div>
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
