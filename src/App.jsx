import "./App.css";
import AppRoutes from "./routers";
import { Toaster } from "react-hot-toast";
import RagChatWidget from "./components/rag-chat/RagChatWidget";
import NotificationListener from "./components/notifications/NotificationListener";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 3500,
          style: {
            background: "#0f172a",
            color: "#e2e8f0",
            border: "1px solid #334155",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(2,6,23,0.3)",
            fontSize: "14px",
            fontWeight: 500,
            padding: "12px 14px",
          },
          success: {
            iconTheme: {
              primary: "#14b8a6",
              secondary: "#ecfeff",
            },
            style: {
              border: "1px solid #0f766e",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fee2e2",
            },
            style: {
              border: "1px solid #b91c1c",
            },
          },
        }}
      />
      <AppRoutes />
      <RagChatWidget />
      <NotificationListener />
    </>
  );
}

export default App;
