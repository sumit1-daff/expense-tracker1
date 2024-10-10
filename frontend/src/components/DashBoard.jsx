import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';
export default function DashBoard(props) {
    const {username} = useParams();
  return (
  <>
    <Navbar />
    <div>DashBoard</div>
    <p>Welcome to the home page {username ? username : "User"}</p>
  </>
  )
}
