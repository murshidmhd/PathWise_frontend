import api, { setAccessToken } from "../api";
import { setUser } from "../../store/slices/authSlice";
import toast from "react-hot-toast";

export async function handleLoginSuccess(dispatch, token, role) {
  setAccessToken(token);

  let user = null;

  try {
    if (role === "student") {
      const profileRes = await api.get("/students/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      user = profileRes.data;

      // Show welcome gift toast for first-time login
      if (user?.wallet?.is_welcome_gift_claimed && user?.wallet?.balance === 8) {
        setTimeout(() => {
          toast.success("🎁 Welcome Gift! You received 8 free SkillPoints to get started.", {
            duration: 6000,
            icon: "🎉",
            style: {
              borderRadius: "16px",
              background: "#111C2D",
              color: "#fff",
              border: "1px solid rgba(11,129,141,0.4)",
              fontWeight: "600",
            },
          });
        }, 1500); // slight delay so dashboard loads first
      }
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
