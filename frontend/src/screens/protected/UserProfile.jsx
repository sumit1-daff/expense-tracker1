import React, { useEffect, useState } from "react";
import SideDrawer from '../../components/SideDrawer';
import UpdateAccount from '../../components/UpdateAccount';
import ChangePassword from "../../components/ChangePassword";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/user-details", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Error in fetching user details", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [<UpdateAccount />]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Drawer */}
      <div className="fixed top-0 left-0 bottom-0 w-64">
        <SideDrawer />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full ml-64 p-10 items-center">
        <h1 className="text-4xl font-semibold mb-8">Account Details</h1>

        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <img
              src="user.png"
              alt="user"
              className="rounded-full mb-4"
              width="120"
              height="120"
            />
            <h2 className="text-3xl font-medium">{user.name}</h2>
            <p className="text-lg text-gray-600">{user.email}</p>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-medium">Name</h3>
              <p className="text-lg text-gray-700">{user.name}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Email</h3>
              <p className="text-lg text-gray-700">{user.email}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Created At</h3>
              <p className="text-lg text-gray-700">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium">Updated At</h3>
              <p className="text-lg text-gray-700">
                {new Date(user.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-6">
            <ChangePassword />
            <UpdateAccount />
          </div>
        </div>
      </div>
    </div>
  );
}
