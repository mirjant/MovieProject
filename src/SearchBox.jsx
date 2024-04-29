import React, { useState } from "react";
import { useQuery } from "react-query";
import { searchMovies } from "./DataApi";
import MovieCard from "./Movies/MovieCard";
import { Link } from "react-router-dom";

import "./Movies/MovieDetailsDisplay.css";

const SearchMovies = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery(["movies", searchQuery], () => searchMovies(searchQuery), {
    enabled: !!searchQuery,
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleItemClick = () => {
    setSearchQuery("");
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        style={{
          width: "270px",
          height: "30px",
          border: "none",
          borderRadius: "30px",
        }}
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search movies..."
      />
      {isError && <div>Error fetching data</div>}
      {isLoading ? (
        <div className="search-loading">Loading...</div>
      ) : (
        <div className="search-results">
          <div className="row ">
            {movies &&
              movies.map((movie) => (
                <div key={movie.id} className="col-md-7 mb-2">
                  <Link
                    className="link"
                    to={`/movie/${movie.id}`}
                    onClick={handleItemClick}
                  >
                    <div className="searchCard">
                      <div className="img">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="movie-poster"
                        />
                      </div>

                      <div className="movie-details">
                        <p className="movie-title">{movie.title}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
