import React from 'react';
import App from './App.jsx';
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserSignupPage } from './pages/user/UserSignupPage.jsx';
import { UserSigninPage } from './pages/user/UserSigninPage.jsx';
import { AdminSignupPage } from "./pages/admin/AdminSignupPage.jsx";
import { AdminSigninPage } from "./pages/admin/AdminSigninPage.jsx";
import { HomeLayout } from "./layouts/HomeLayout.jsx";
import { UserLayout } from "./layouts/UserLayout.jsx";
import ReactDOM from "react-dom/client";
import Dashboard from "./pages/admin/AdminDashboard.jsx";
import { AdminLayout } from './layouts/AdminLayout.jsx';
import UserHome from './pages/user/UserHome.jsx';
import MovieList from './pages/movies/MovieList.jsx';
import MoviePage from './pages/movies/MoviePage.jsx';
import Profile from "./pages/user/Profile.jsx";
import ShowMovies from "./pages/movies/ShowMovies.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import AddMovie from "./pages/movies/AddMovie.jsx";
import EditMovie from "./pages/movies/EditMovie.jsx";
import DeleteMovie from "./pages/movies/DeleteMovie.jsx";
import AdminMoviePage from './pages/movies/AdminShowMovie.jsx';
import EasyMethod from "./components/protected-routes/EasyMethod.jsx";
import UserRoutes from "./components/protected-routes/UserRoutes.jsx";
import { AdminLogout } from "./components/AdminLogout.jsx";
import { UserLogout } from './components/UserLogout.jsx';

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
      },
      {
        path: "/admin/logout",
        element: <AdminLogout />
      },
      {
        path: "/user/logout",
        element: <UserLogout />
      }
    ]
  },
  {
    element: (
      <UserRoutes>
         <UserLayout />
      </UserRoutes>
    ),
    children: [
      {
        path: "/user/home",
        element: <UserHome />
      },
      {
        path: "/user/movies/movie-list",
        element: <ShowMovies />
      },
      {
        path: "/user/movies/genre/:genre",
        element: <MovieList />
      },
      {
        path: "/user/movies/:id",
        element: <MoviePage />
      },
      {
        path: "/user/profile",
        element: <Profile />
      },
    ]
  },
  {
    element: (
      <EasyMethod>
         <AdminLayout />
      </EasyMethod>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />
      },
      {
        path: "/admin/add-movie",
        element: <AddMovie />
      },
      {
        path: "/admin/movies/:id",
        element: <AdminMoviePage />
      },
      {
        path: "/admin/movies/edit/:id",
        element: <EditMovie />
      },
      {
        path: "/admin/movies/delete/:id",
        element: <DeleteMovie />
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <ChakraProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ChakraProvider>
</Provider>
)
