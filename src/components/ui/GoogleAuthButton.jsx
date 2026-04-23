import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handleLoginSuccess } from "../../services/utils/auth";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { GoogleLogin } from "@react-oauth/google";

export default function GoogleAuthButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const role = new URLSearchParams(window.location.search).get("role");

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post(
        "https://pathwise.duckdns.org/api/auth/google/",
        { token: credentialResponse.credential },
        { withCredentials: true },
      );
      const { access, is_new_user, temp_token } = response.data;

      if (is_new_user) {
        localStorage.setItem("temp_token", temp_token);
        const roleFromUrl = new URLSearchParams(window.location.search).get(
          "role",
        );
        if (roleFromUrl) {
          localStorage.setItem("pending_role", roleFromUrl);
          navigate("/auth/complete-registration"); // skip role selection
        } else {
          navigate("/auth/role-selection-google"); // show role selection
        }
      } else {
        handleLoginSuccess(dispatch, access, response.data.role);
        navigate(`/${response.data.role}/dashboard`);
      }

      //   const { access, is_new_user } = response.data;

      toast.success("Logged in with Google");
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => console.log("Google Login Failed")}
    />
  );
}
