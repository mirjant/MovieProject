import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPopularMovies,
  fetchMovieDetailsById,
  fetchMovieVideoById,
} from "../DataApi";

import Navbar1 from "../Navbar1";
import Footer from "../Footer";
import "./MovieDetailsDisplay.css";

const MovieDetailsDisplay = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const page = 1;
        const movies = await fetchPopularMovies(page);
        const movie = movies.find((movie) => movie.id === parseInt(id));
        const fetchedVideos = await fetchMovieVideoById(id);

        const details = await fetchMovieDetailsById(id);
        setMovieDetails(details);
        setVideos(fetchedVideos);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();

    return () => {};
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movieDetails) return <div>No movie found.</div>;
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
    backgroundSize: "cover",

    width: "100%",
    height: "770px",
    display: "flex",
    color: "#ffffff",
  };

  const hours = Math.floor(movieDetails.runtime / 60);
  const minutes = movieDetails.runtime % 60;

  return (
    <>
      <Navbar1></Navbar1>
      <section style={backgroundStyle}>
        <div className="contanier">
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt=""
            />
          </div>

          <div className="content">
            <h2>
              {movieDetails.title} ({movieDetails.release_date.substring(0, 4)})
            </h2>
            <p>
              {movieDetails.release_date} <b>·</b>
              {movieDetails.genres.map((genre) => (
                <span key={genre.id}>{genre.name}, </span>
              ))}
              <b>·</b> {hours}h {minutes}min
            </p>
            <p className="overview-details">
              Overview <br /> {movieDetails.overview}
            </p>

            <p className="card-text">Rating: {movieDetails.vote_average}</p>
            <p style={{ gap: "10px" }}>
              Revenue: $
              {movieDetails.revenue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p>
              {" "}
              Director:{" "}
              {
                movieDetails.credits.crew.find(
                  (crewMember) => crewMember.job === "Director"
                ).name
              }
            </p>
            <div className="actors">
              <p>Actors:</p>
              <div className="actor-list">
                {movieDetails.credits.cast.map((actor) => (
                  <div key={actor.id} className="actor">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                    />
                    <p>{actor.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="iframe-container">
            {videos.length > 0 && (
              <div key={videos[0].id}>
                <iframe
                  className="iframe2"
                  src={`https://www.youtube.com/embed/${videos[0].key}`}
                  title={videos[0].name}
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default MovieDetailsDisplay;
