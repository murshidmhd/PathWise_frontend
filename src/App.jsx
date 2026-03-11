import "./App.css";
import AppRoutes from "./routers";
import ProtectedRoute from "./components/ProtectedRoute";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ProtectedRoute>
      <Toaster position="top-right" />
      <AppRoutes />
    </ProtectedRoute>
  );
}

export default App;
