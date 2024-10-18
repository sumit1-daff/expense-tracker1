
import Login from './screens/Login'
import { createBrowserRouter, RouterProvider , Link} from 'react-router-dom'
import Signup from './screens/Signup';
import DashBoard from "./screens/DashBoard";
import Home from './screens/Home';
import ProtectedRoute from './components/ProtectedRoutes';
import SignUp1 from './screens/SignUp1';
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
      element : <ProtectedRoute element={DashBoard} />,
    },
    {
      path : '/signup1',
      element : <SignUp1/>
    }
  ]);
  
  return (
   <>
   <RouterProvider router={router}/>
   </>
  )
}

export default App
