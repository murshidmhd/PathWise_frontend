import { GoogleLogin } from "@react-oauth/google";
import api, { setAccessToken } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function GoogleAuthButton() {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post(
        "http://127.0.0.1:8000/api/auth/google/",
        { token: credentialResponse.credential },
        { withCredentials: true },
      );

      //   const { access, is_new_user } = response.data;
      const { access } = response.data;

      setAccessToken(access);
      localStorage.setItem("role", "student");

      navigate("/student/dashboard");

      console.log("i am here navigae");
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
