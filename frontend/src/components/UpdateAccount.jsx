import React, { useState } from "react";
import Modal from "./Modal";

export default function ChangePassword() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [name , setName] = useState("sumit");
  const [email, setEmail] = useState('sngsumit2003@gmail.com');
  const [errorMessage, setErrorMessage] = useState({
    nameError : null,
    emailError : null,
  });
  const data = {
    name : name,
    email : email
  }
  const handleEdit = async () => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/update-profile',{
        method : "POST",
        body : JSON.stringify(data),
        credentials : "include",
        headers : {
          "Content-type" : "application/json"
        }
      });
      const result = await response.json();
      if(response.ok){
        alert("Data updated successfully");
        setModalOpen(false);
      }else{
        setErrorMessage(result);
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
        Edit
      </button>
      <div className="text-center">
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">Edit Account Details</h2>
          <form onSubmit={handleEdit}>
            <div className="mb-4 text-left">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Full Name"
                required
              />
              <div className="h-8 text-sm text-red-500 text-left p-1">
                {errorMessage.nameError && (
                  <span>{errorMessage.nameError}</span>
                )}
              </div>
            </div>
            <div className="mb-4 text-left">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
               <div className="h-8 text-sm text-red-500 text-left p-1">
                {errorMessage.emailError && (
                  <span>{errorMessage.emailError}</span>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
