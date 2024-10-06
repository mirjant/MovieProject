import { jwtDecode } from "jwt-decode";

export function decodeToken() {
  try {
    const token = localStorage.getItem("idtoken");
    if (token) {
      return jwtDecode(token); // Return decoded token object
    }
    return null; // No token found
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null; // Return null on failure to decode
  }
}

export function checkIfTokenIsValid() {
  const decodedToken = decodeToken(); // Decode token once

  if (!decodedToken) return false; // Return false if token is null or decoding failed

  const { iat, exp } = decodedToken;

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  if (exp && currentTime > exp) {
    return false; // Token is expired based on 'exp' field
  }

  // Optional: Check if the token is older than a day (24 hours)
  const tokenAgeInSeconds = currentTime - iat;
  const maxTokenAgeInSeconds = 24 * 60 * 60;

  if (tokenAgeInSeconds > maxTokenAgeInSeconds) {
    return false; // Token is older than 24 hours
  }

  return true; // Token is valid
}
