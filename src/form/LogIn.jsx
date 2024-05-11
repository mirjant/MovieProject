import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Navbar1 from "../Navbar1";
import { checkIfTokenIsValid } from "../helper";
function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (checkIfTokenIsValid() === true) {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ`, // Replace YOUR_API_KEY with your actual API key
        {
          email: formData.email,
          password: formData.password,
          returnSecureToken: true,
        }
      );
      console.log("Login successful:", response.data);
      <Alert message="Success Text" type="success" />;
      setIsAuthenticated(true);
      localStorage.setItem("token", response.data.idToken);
      navigate("/MyForm");
      // Handle successful login, e.g., redirect to another page
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.response?.data?.error?.message || error.message);
    }

    setLoading(false);
  };

  return (
    <>
     
      <section className="logIn">
      <Navbar1></Navbar1>
      
       
        <form className="logInForm" onSubmit={handleSubmit}>
        <h2>Login</h2>
          <div>
            <input
              className="logInInput"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className="logInInput"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div>Error: {error}</div>}

          <p>
            Dont have an account? <Link to="/SignUpForm">Sign Up</Link>
          </p>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
