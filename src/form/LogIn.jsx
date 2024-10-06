import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
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
      // Using a helper function to handle login request
      const token = await loginUser(formData.email, formData.password);
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", formData.email); // Store user email as well
      setIsLoggedIn(true);
      navigate("/MyForm");
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  // Helper function to handle the login process
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      return response.data.idToken;
    } catch (error) {
      console.error("Error logging in:", error);
      
      if (error.response?.data?.error?.message) {
        throw new Error(error.response.data.error.message);
      } else {
        throw new Error("Network error, please try again.");
      }
    }
  };

  return (
    <section className="logIn">
      <form className="logInForm" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <input
            className="logInInput"
            type="email"
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
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div>Error: {error}</div>}

        <p>
          Don't have an account? <Link to="/SignUpForm">Sign Up</Link>
        </p>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default Login;
