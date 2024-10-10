
import './App.css'
import Login from './components/Login'
import { createBrowserRouter, RouterProvider , Link} from 'react-router-dom'
import Signup from './components/Signup';
import DashBoard from "./components/DashBoard";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
        </div>
      ),
    },
    {
      path: "/auth/login",
      element: <Login/>
    },
    {
      path: "/auth/signup",
      element: <Signup/>
    },
    {
      path : "/user/:username/dashboard",
      element : <DashBoard/>
    }
  ]);
  
  return (
   <>
   <RouterProvider router={router}/>
   </>
  )
}

export default App
