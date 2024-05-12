import React, { useState } from "react";
import axios from "axios";
import Navbar1 from "../Navbar1";
import { Alert } from "antd";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ`,
        {
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          returnSecureToken: true,
        }
      );
      console.log("Signup successful:", response.data);
      await axios.post("http://localhost:3000/signup", response.data);
      navigate("/MyForm");
      <Alert message="Success Text" type="success" />;
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.response.data.error.message);
    }

    setLoading(false);
  };

  return (
    <div className="logIn">
      <Navbar1></Navbar1>
      <form className="logInForm" onSubmit={handleSubmit}>
        <div>
          <h2>Sign Up</h2>

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

        <div>
          <input
            className="logInInput"
            type="password"
            id="confirmPassword" // Unique id for confirmPassword
            name="confirmPassword" // Unique name for confirmPassword
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div>Error: {error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
