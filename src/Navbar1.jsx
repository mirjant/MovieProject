import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SearchMovies from "./SearchBox";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import FavoritesModal from "./ModalFavorites";

function Navbar1() {
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleSignUp = () => {
    navigate("/SignUpForm");
  };

  return (
    <>
      <section className="navbar">
        <div className="logo">
          <Link className="link" to={"/"}>
            <h2 className="navbar-logo">Cinema +</h2>
          </Link>
        </div>
        <div>
          <SearchMovies></SearchMovies>
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
            <>
              <Link className="link" to={"/login"}>
                <h5 style={{ textDecoration: "none", color: "white" }}>
                  Login
                </h5>
              </Link>
            </>
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
          <Link className="link" to={"/"}>
            {" "}
            <h5>Home</h5>
          </Link>

          <FavoritesModal></FavoritesModal>
        </div>
      </section>
    </>
  );
}

export default Navbar1;
