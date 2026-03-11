import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import api, { setAccessToken } from "../services/api";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handeleLogout = async () => {
    try {
      await api.post("/auth/logout/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAccessToken("");
      dispatch(logout());
      navigate("/auth/login", { replace: true });
    }
  };

  return handeleLogout;
};

export default useLogout;
