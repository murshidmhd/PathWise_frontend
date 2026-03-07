import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <GoogleOAuthProvider clientId="953587412822-vfed40voqnthqt2illrc3jjgfso46n1u.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </StrictMode>
  </BrowserRouter>,
);
