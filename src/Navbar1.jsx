// Navbar1.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchMovies from "./SearchBox";
import FavoritesModal from "./ModalFavorites";
import "./App.css";

function Navbar1({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  }

  const handleSignUp = () => {
    navigate("/SignUpForm");
  };

  return (
    <section className="navbar">
      <div className="logo">
        <Link className="link" to="/">
          <h2 className="navbar-logo">Cinema +</h2>
        </Link>
      </div>
      <div>
        <SearchMovies />
      </div>

      <div className="links">
        {isLoggedIn ? (
          <button
            style={{
              textDecoration: "none",
              background: "transparent",
              border: "none",
              color: "white",
            }}
            className="links"
            onClick={handleLogout}
          >
            <h5>Log out</h5>
          </button>
        ) : (
          <Link className="link" to="/login">
            <h5 style={{ textDecoration: "none", color: "white" }}>Login</h5>
          </Link>
        )}

        <button
          className="links"
          style={{
            textDecoration: "none",
            background: "transparent",
            border: "none",
            color: "white",
          }}
          onClick={handleSignUp}
        >
          <h5>SignUp</h5>
        </button>

        <Link className="link" to="/">
          <h5>Home</h5>
        </Link>

        {isLoggedIn && (
          <Link
            style={{ paddingRight: "30px", textDecoration: "none" }}
            to="/your-rezervation"
          >
            <h5>My Reservations</h5>
          </Link>
        )}

        <FavoritesModal />
      </div>
    </section>
  );
}

export default Navbar1;
