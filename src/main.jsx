import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./store/index.js";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <GoogleOAuthProvider clientId="953587412822-vfed40voqnthqt2illrc3jjgfso46n1u.apps.googleusercontent.com">
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </StrictMode>
  </BrowserRouter>,
);
