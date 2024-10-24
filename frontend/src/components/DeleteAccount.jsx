import React, { useState } from "react";
import Modal from "./Modal";

export default function ForgotPassword() {
  const [isModalOpen, setModalOpen] = useState(false);
    const [isConfirm, setConfirm] = useState(false);
    const [password, setPassword] = useState('');
    const handleDelete = async ()=>{
        try{
            console.log(password);
            const response = await fetch('http://localhost:3000/auth/delete-account',{
                fetch : "POST",
                credentials : "include",
                body : JSON.stringify(password),
                headers : {
                    "Content-type" : "application/json"
                }
            });
            if(response.ok){
                
            }
        }catch(error){
            console.log("error occured",error);
        }
    }

  return (
    <div>
      <button
        className="w-full bg-red-500 text-white py-2 px-4 my-2 rounded-md hover:bg-red-600"
        onClick={() => {setModalOpen(true)}}
      >
        Delete Account
      </button>
      <div className="text-center">
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
        {!isConfirm && <div className="text-left h-20">
            <p>Are you sure you want to delete your account?</p>
            <div className="mt-8 justify-end flex gap-2">
                <button onClick={()=>{setConfirm(false); setModalOpen(false)}} className="bg-transparent w-20 h-10 border-2 p-2 border-gray-300 active:scale-95 rounded-lg">Cancel</button>
                <button onClick={()=> setConfirm(true)} className="bg-red-500 w-20 h-10 border-none p-2 text-white hover:bg-red-700 rounded-lg active:scale-95">Confirm</button>
            </div>
        </div> }
        {isConfirm && 
        <div className="text-left h-40">
            <p>Enter your password to delete your account</p>
            <form onSubmit={handleDelete}>
                <input className="border border-gray-300 my-5 h-12 w-full p-2 rounded-lg" type="password" placeholder="Enter your password" onChange={(e)=> setPassword(e.target.value)} />
            <div className="mt-4 justify-end flex gap-2">
            <button onClick={()=>{setConfirm(false); setModalOpen(false)}} className="bg-transparent w-20 h-10 border-2 p-2 border-gray-300 active:scale-95 rounded-lg">Cancel</button>
            <button type="submit" className="bg-red-500 w-20 h-10 border-none p-2 text-white hover:bg-red-700 rounded-lg active:scale-95">Confirm</button>
            </div>
            </form>
        </div> }
      </Modal>
      </div>
    </div>
  );
}
