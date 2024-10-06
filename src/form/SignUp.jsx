import { useState } from "react";
import axios from "axios";
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
  const [success, setSuccess] = useState(false); 
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

      navigate("/MyForm");

      
      alert("Sign-up successful!");
    } catch (error) {
      console.error("Error signing up:", error);
      setError(
        error.response?.data?.error?.message || "An unknown error occurred."
      );
    }

    setLoading(false);
  };

  return (
    <div className="logIn">
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
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {error && <Alert message={error} type="error" showIcon />}
        {success && (
          <Alert message="Signup successful!" type="success" showIcon />
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
