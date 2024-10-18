
import Login from './screens/Login'
import { createBrowserRouter, RouterProvider , Link} from 'react-router-dom'
import Signup from './screens/Signup';
import DashBoard from "./screens/DashBoard";
import authLoader from './utils/authLoader';
import Home from './screens/Home';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
       <Home />
      ),
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path : "/dashboard",
      element : <DashBoard/>,
      loader : authLoader
    }
  ]);
  
  return (
   <>
   <RouterProvider router={router}/>
   </>
  )
}

export default App
