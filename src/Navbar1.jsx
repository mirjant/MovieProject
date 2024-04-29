import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SearchMovies from "./SearchBox";
import { Link } from "react-router-dom";
import { useState } from "react";
import FavoritesModal from "./ModalFavorites";

function Navbar1() {




  
  return (
    <>
      <section className="navbar">
        <div className="logo">
          <Link className="link" to={"/"}>
            <h2  className="navbar-logo">
              Cinema +
            </h2>
          </Link>
        </div>
        <div>
          <SearchMovies></SearchMovies>
        </div>

        <div className="links">
          <Link className="link" to={"/"}>
            {" "}
            <h5 style={{ textDecoration: "none", color: "white" }}>Home</h5>
          </Link>

          <FavoritesModal></FavoritesModal>
        </div>
      </section>
    </>
  );
}

export default Navbar1;
