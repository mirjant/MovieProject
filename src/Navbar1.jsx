import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SearchMovies from "./SearchBox";
import { Link, useNavigate } from "react-router-dom";

import FavoritesModal from "./ModalFavorites";

function Navbar1() {
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const navigate = useNavigate();
  const handleLogIn = () => {
    navigate("/LogIn");
  };

  const handleSignUp = () => {
    navigate("/SignUp");
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
         
          <button className="links" onClick={handleLogout}>
            Logout
          </button>
          <button className="links" onClick={handleSignUp}>
            SignUp
          </button>
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
