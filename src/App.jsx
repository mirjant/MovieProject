import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {  useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import HomePage, { ProductContext } from "./HomePage";
import MovieDetailsDisplay from "./Movies/MovieDetailsDislay";
import MyForm from "./form/RezervationForm";
import Login from "./form/LogIn";
import SignUp from "./form/SignUp";

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log(isAuthenticated);

  const favoritesModal = localStorage.getItem("favorites")
    ? localStorage.getItem("favorites")
    : "[]";
  const [favorites, setFavorites] = useState(JSON.parse(favoritesModal));

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProductContext.Provider value={{ favorites, setFavorites }}>
          <Router>
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetailsDisplay />} />
              <Route
                path="/MyForm"
                element={
                  isAuthenticated ? <MyForm /> : <Navigate to="/Login" />
                }
              />
              <Route
                path="/LogIn"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route path="/SignUpForm" element={<SignUp />}></Route>
            </Routes>
          </Router>
        </ProductContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
