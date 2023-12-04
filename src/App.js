import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './component/Home/Home';
import { Layout } from './component/Layout/Layout';
import { Notfound } from './component/NotFound/Notfound';
import { Signup } from './component/Signup/Signup';
import { Login } from './component/Login/Login';
import { ItemDetails } from './component/ItemDetails/ItemDetails';
import { Movies } from './component/Movies/Movies';
import { TvShow } from './component/TvShow/TvShow';
import { People } from './component/People/People';
import  Protected  from './component/Protected/Protected';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';



function App() {

  //to save token of user login use jwt call it in login
  const [userData, setUserData]=useState({})
  function saveUserData(){  //send it to login & layout then navbar
    let encodedToken = localStorage.getItem('UserToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken)
     console.log(userData)
  }

   // to stop refresh 
   useEffect(()=>{
    if (localStorage.getItem('UserToken') !== null) {
      saveUserData()
    }
  },[])

  let routes = createBrowserRouter([
    {path: '/', element: <Layout setUserData={setUserData} userData = {userData}/>, children: [
      {path: 'home', element: <Protected> <Home/>  </Protected>},
      {path: 'movies', element: <Protected> <Movies/>  </Protected>},
      {path: 'tvshow', element: <Protected> <TvShow/>  </Protected>},
      {path: 'people', element: <Protected> <People/>  </Protected>},
      {path: 'signup', element: <Protected> <Signup/>  </Protected>},
      {path: 'login', element: <Login saveUserData= {saveUserData}  userData = {userData}/>},
      {index: true, element: <Signup/>},
      {path: 'itemdetails/:id/:media_type', element: <ItemDetails/>},
      {path: '*', element: <Notfound/>},
    ]}
  ])

  return (
   
    <RouterProvider router = {routes}/>
     

  );
}

export default App;
