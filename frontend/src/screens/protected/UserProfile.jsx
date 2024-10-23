import React, { useEffect, useState } from "react";
import SideDrawer from '../../components/SideDrawer'
import { useNavigate } from "react-router-dom";
import ChangePassword from "../../components/ChangePasword";
export default function UserProfile() {
  const [user, setUser] = useState({
    name: "sdfddsfdsvumit",
    email: "sngsumit2003@gmail.com",
  });
  const navigate = useNavigate();
  const fetchUser = async () => {
    console.log("fetch user func");
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

  const handleEdit = () =>{
      navigate('/update-account');
  } 

  const handleChangePassword = () =>{
    navigate('/change-password');

  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
      <div className="flex bg-gray-100 h-screen">
        <div
          style={{
            width: "250px",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <SideDrawer />
        </div>
        <div className="w-2/3 ml-96 flex flex-col items-center my-10 ">
          <h1 className="text-5xl font-bold mb-10 ">Account Details</h1>
          <div className="w-2/3 bg-white rounded-lg shadow-lg">
            <div className="w-full h-1/3 flex justify-center my-3">
              <img src="user.png" alt="user" width={"150px"} height={"50px"} />
            </div>
            <div className="mx-5  ml-20 text-2xl">
              <div className="my-5 flex">
                <h3 className="w-40">Name : </h3>
                <p className=" mx-10 ">{user.name}</p>
              </div>
              <div className=" my-5 flex">
                <h3 className="w-30">Email : </h3>
                <p className=" mx-10 w-1/2 ">{user.email}</p>
              </div>
              <div className="my-5 flex">
                <h3 className="w-40">Created At : </h3>
                <p className=" mx-10 w-1/2 ">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="my-5 flex">
                <h3 className="w-40">Updated At : </h3>
                <p className=" mx-10 w-1/2 ">
                  {new Date(user.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="right-0 justify-end  flex gap-5 mx-10 my-10">
              <ChangePassword/>
              <button onClick={handleEdit} className="bg-blue-500 rounded-md  text-white w-40 h-12 hover:bg-blue-800 active:scale-95">Edit</button>
            </div>
          </div>
        </div>
      </div>
  );
}
