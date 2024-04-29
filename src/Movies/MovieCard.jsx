import "./MovieDetailsDisplay.css";
import { Link } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites"))?.some(
      (fav) => fav.id === movie.id
    ) || false
  );

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(true); 
  };

  const removeFromFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((fav) => fav.id !== movie.id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(false); 
  };

  return (
    <div className="card">
      <Link className="link" to={`/movie/${movie.id}`}>
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          
        />
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
        </div>
      </Link>
      <div className="card-footer">
        <button className="footer-button">Buy Ticked</button>
        {isFavorite ? (
          <HeartFilled onClick={removeFromFavorites} style={{ color: "red" }} />
        ) : (
          <HeartOutlined onClick={addToFavorites} />
        )}
      </div>
    </div>
  );
};

export default MovieCard;
