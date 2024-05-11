import React, { useState } from "react";
import axios from "axios";

function SignUp() {
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
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTSIpXohgcKPlmZ07Ad-LO1Sj-GvFszUQ`,
        {
          email: formData.email,
          password: formData.password,
          returnSecureToken: true,
        }
      );
      console.log("Signup successful:", response.data);
     

      
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.response.data.error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
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
