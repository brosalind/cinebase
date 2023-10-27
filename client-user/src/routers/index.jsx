import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Layout from "../pages/Layout"
import Home from "../pages/Home"
import Movies from "../pages/Movies"
import MovieDetail from "../pages/MovieDetail"
import SearchResults from "../pages/SearchResult";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "",
        element: <Home></Home>
      },
      {
        path: "movies",
        element: <Movies></Movies>
      },
      {
        path: "movies/:id",
        element: <MovieDetail></MovieDetail>
      },
      {
        path: "search",
        element: <SearchResults></SearchResults>
      }
    ]

  
  },
  
]);


export default router 