import React from "react";
import {createBrowserRouter, redirect} from "react-router-dom";
import Login from "../pages/Login";
import Genre from "../pages/Genre";
import Navigation from "../pages/Navigation";
import Movie from "../pages/Movie";
import EditGenreForm from "../pages/EditGenreForm"
import RegisterAdmin from "../pages/Register";
import EditMovieForm from "../pages/EditMovieForm"

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Navigation></Navigation>,
    loader: () => {
      if (!localStorage.access_token){
        console.log("loader")
        return redirect('/')
      }
      return null
    },
    children: [
      {
        path: "genres",
        element: <Genre></Genre>
      },
      {
        path: "movies",
        element: <Movie></Movie>
      },
      {
        path: "register",
        element: <RegisterAdmin></RegisterAdmin>
      },
      {
        path: "genres/edit/:name/:id",
        element: <EditGenreForm></EditGenreForm>
      },
      {
        path: "movies/:id/edit",
        element: <EditMovieForm></EditMovieForm>
      }
    ]
  },
  {
    path: "/",
    element: <Login></Login>,
    loader: () => {
      if (localStorage.access_token){
        console.log("he")
        // return redirect('/admin/movies')
      }
      return null
    },
  }
  
  
]);


export default router 