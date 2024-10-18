import { redirect } from "react-router-dom"
import { isAuthenticated } from "./isAuthenticated"
export default async function authLoader(){
    const authenticated =await isAuthenticated();
    if(authenticated){
    return redirect('/dashboard');
    }
    else{
        console.log("Failed to login!!");
        setTimeout(() => {
            alert("You need to login first!!");
        },1000);
      return redirect('/login');
    }
}