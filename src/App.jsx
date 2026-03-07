import "./App.css";
import AppRoutes from "./routers";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <AppRoutes />
    </ProtectedRoute>
  );
}

export default App;
