
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Home from '../Home/Home'
import About from '../About/About'
import Movies from '../Movies/Movies'
import Tv from '../Tv/Tv'
import Register from '../Register/Register'
import Login from '../Login/Login'
import People from '../People/People'
import Profile from '../Profile/Profile';
import Notfound from '../Notfound/Notfound'
import jwtDecode from 'jwt-decode'
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Details from '../Details/Details';



function App() {


  const [userData, setUserData] = useState(null);
let saveUserData=()=>{
   let encodedToken = localStorage.getItem('token');
   let decodedToken = jwtDecode(encodedToken);
  //  console.log(decodedToken);
   setUserData(decodedToken);
}
let logout=()=>{
  localStorage.removeItem('token');
  setUserData(null);
return <Navigate to='login'/>
}
useEffect(() => {
  if(localStorage.getItem('token')){
saveUserData();
  }
}, [])



  let routers = createHashRouter([
    {path:'/', element:<Layout userData={userData} logout={logout}/> , errorElement:<Notfound/> , children:[
        {index:true, element:<ProtectedRoute userData={userData} ><Home/></ProtectedRoute>},
        {path:'about', element:<ProtectedRoute userData={userData} ><About/></ProtectedRoute>},
        {path:'movies', element:<ProtectedRoute userData={userData} ><Movies/></ProtectedRoute>},
        {path:'tvShows', element:<ProtectedRoute userData={userData} ><Tv/></ProtectedRoute>},
        {path:'details/:id/:mediaType', element:<ProtectedRoute userData={userData} ><Details/></ProtectedRoute>},
        {path:'register', element:<Register/>},
        {path:'profile', element:<Profile userData={userData} />},
        {path:'login', element:<Login saveUserData={saveUserData}/>},
        {path:'people', element:<ProtectedRoute userData={userData} ><People/></ProtectedRoute>},
    ]}
  ])
  

  return (
    <>
     <RouterProvider router={routers} />;
    </>
  )
}

export default App;
