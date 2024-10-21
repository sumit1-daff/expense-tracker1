import React, { useEffect } from 'react'
import SideDrawer from '../components/SideDrawer'
export default function Transactions() {

  const fetchData = async () =>{
    console.log("fetching all the data from the database");
    try{
    const response = await fetch("http://localhost:3000/transactions/get-transactions");
    const result = await response.json();
    if(response.ok){
      console.log(result);
    }
    }catch(err){
      console.log("Error occurred");
      console.log(err);
    }    
  }

  useEffect(()=>{
    fetchData();
  },[]);
  return (
    <>
    <div className="flex">
    <SideDrawer/>
    <div>
        <p>result is</p>
    </div>
    </div>
  </>
  )
}
