import React, {useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import Store from './Redux/Store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>, 
    children:[
      {index: true, element: <MainPage/>},
      {path: "home", element: <MainPage/>}
    ]
  }  
])


const App = () => {
  
  return (
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App;

