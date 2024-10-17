
import Login from './components/Login'
import { createBrowserRouter, RouterProvider , Link} from 'react-router-dom'
import Signup from './components/Signup';
import DashBoard from "./components/DashBoard";
import Home from './components/Home';
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
