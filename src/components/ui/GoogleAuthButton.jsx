import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GoogleAuthButton() {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/google/",
        { token: credentialResponse.credential },
        { withCredentials: true },
      );

      //   const { access, is_new_user } = response.data;
      const { access } = response.data;

      localStorage.setItem("access_token", access);

      navigate("/dashboard");
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
