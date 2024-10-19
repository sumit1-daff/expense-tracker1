import React, { useState } from "react";
import Modal from "../components/Modal";

export default function ForgotPassword() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Forgot password email:", email);
    setModalOpen(false);
  };

  return (
    <div>
      <button
        className="text-blue-500 underline"
        onClick={() => setModalOpen(true)}
      >
        Forgot Password?
      </button>
      <div className="text-center">
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-start text-sm font-medium text-gray-700">
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
