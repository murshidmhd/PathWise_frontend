import { Route, Routes } from "react-router-dom";
import PathWiseLanding from "../pages/auth/Landing";
import RoleSelection from "../pages/auth/RoleSelection";
import Register from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";
import Login from "../pages/auth/Login";
export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="landing" element={<PathWiseLanding />} />
      <Route path="role" element={<RoleSelection />} />
      <Route path="register" element={<Register />} />
      <Route path="verify-otp" element={<VerifyOtp />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}
