import { Route, Routes } from "react-router-dom";
import PathWiseLanding from "../pages/auth/Landing";
import RoleSelection from "../pages/auth/RoleSelection";
import Register from "../pages/auth/Register";
export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="landing" element={<PathWiseLanding />} />
      <Route path="role" element={<RoleSelection />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}
