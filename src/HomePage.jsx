import { createContext, useEffect, useState } from "react";

import Navbar1 from "./Navbar1";
import Maincard from "./Movies/Maincard";
import TopRatedMovies from "./TopRatedCarusel";

import TopImg from "./CinemaTopImg";
 export const ThemeContext = createContext();
export const ProductContext = createContext();

function HomePage() {
 

  return (
    <>
      
      <TopImg></TopImg>
      <TopRatedMovies></TopRatedMovies>
      <Maincard></Maincard>
      
    </>
  );
}
export default HomePage;
