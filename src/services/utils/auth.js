import api, { setAccessToken } from "../api";
import { setUser } from "../../store/slices/authSlice";

export async function handleLoginSuccess(dispatch, token, role) {
  setAccessToken(token);

  let user = null;

  try {
    if (role === "student") {
      const profileRes = await api.get("/students/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      user = profileRes.data;
    } else if (role === "counselor") {
      const profileRes = await api.get("/counselors/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      user = profileRes.data;
    }
  } catch (error) {
    console.error("Failed to fetch profile after login", error);
  }

  dispatch(setUser({ token, role, user }));
}

/**
 * Validates whether a given string is a properly formatted email address.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
export function validateEmail(email) {
  // Regular expression to check for typical email pattern: string@string.string
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
}
