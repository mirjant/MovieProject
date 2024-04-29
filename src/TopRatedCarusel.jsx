import React from "react";
import { useQuery } from "react-query";
import { fetchTopRatedMovies } from "./DataApi";
import MovieCard from "./Movies/MovieCard";
import { Carousel } from "antd";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "./App.css";

const TopRatedMovies = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery("topRatedMovies", fetchTopRatedMovies);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching top rated movies.</div>;

  const options = {
    items: 5, // Number of items to display
    loop: true, // Infinite loop
    margin: 1, // Margin between items
    nav: false, // Navigation arrows
    autoplay: true,
    responsive: {
      0: { items: 1 }, // Number of items to display for different screen sizes
      600: { items: 3 },
      1000: { items: 5 },
    },
  };
  return (
    <>
    <h1 className="caorusel-title">Top Ratet</h1>
      <section className="caorusel">
        
        <OwlCarousel {...options}>
          {movies.map((movie) => (
            <div key={movie.id} style={{ display: "flex" }}>
              <MovieCard key={movie.id} movie={movie} />
            </div>
          ))}
        </OwlCarousel>
      </section>
    </>
  );
};

export default TopRatedMovies;
