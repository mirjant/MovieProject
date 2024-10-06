import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import HomePage from "./HomePage";
import MovieDetailsDisplay from "./Movies/MovieDetailsDislay";
import MyForm from "./form/RezervationForm";
import Login from "./form/LogIn";
import SignUp from "./form/SignUp";
import YourRezervation from "./form/YourRezervation";
import AdminLogin from "./form/AdminLogin";
import Navbar1 from "./Navbar1";
import { checkIfTokenIsValid } from "./helper";
import Footer from "./Footer";

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check token validity on component mount
    const token = localStorage.getItem("token");
    if (token && checkIfTokenIsValid()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar1 isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsDisplay />} />
          <Route
            path="/MyForm"
            element={isLoggedIn ? <MyForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/SignUpForm" element={<SignUp />} />
          <Route path="/your-rezervation" element={<YourRezervation />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>

        <Footer></Footer>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
