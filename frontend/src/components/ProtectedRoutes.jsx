// import React, { useState, useEffect} from 'react'
// import {Route, useNavigate} from "react-router-dom";
// import { isAuthenticated } from '../utils/isAuthenticated';



// export default function ProtectedRoutes({component : Component, ...rest }) {
  
//         const [isAuth, setIsAuth] = useState(false);
//         const [loading, setloading] = useState(true);
//         const navigate = useNavigate();

//         useEffect(()=>{
//             const checkAuth = async ()=>{
//                 const authenticated = await isAuthenticated();
//                 setIsAuth(authenticated);
//                 setloading(false);
//                 if(!authenticated){
//                     navigate('/login');
//                 }
//             };
//             checkAuth();
//         },[navigate]);
        
//         if(loading) return <div>Loading............</div>
        
//     return (
//     <Route
//         {...rest}
//         element = {<Component/>}
//         />
//   )
// }
