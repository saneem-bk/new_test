import React from 'react';
import App from './App.jsx';
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserSignupPage } from './pages/user/UserSignupPage.jsx';
import { UserSigninPage } from './pages/user/UserSigninPage.jsx';
import { AdminSignupPage } from "./pages/admin/AdminSignupPage.jsx";
import { AdminSigninPage } from "./pages/admin/AdminSigninPage.jsx";
import { HomeLayout } from "./layouts/HomeLayout.jsx";
import { UserLayout } from "./layouts/UserLayout.jsx";
import ReactDOM from "react-dom/client";



const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/user/signup",
        element: <UserSignupPage/>
      },
      {
        path: "/user/signin",
        element: <UserSigninPage />
      },
      {
        path: "/admin/signup",
        element: <AdminSignupPage/>
      },
      {
        path: "/admin/signin",
        element: <AdminSigninPage />
      }
    ]
  },
  {
    element: (
      
         <UserLayout />
     
    ),
    children: [
      {
        path: "/user/home"
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
