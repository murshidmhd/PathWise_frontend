import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { chatApi as api } from "../../services/api";
import ChatContainer from "../../components/chat/ChatContainer";
import { messaging, getToken, onMessage } from "../../firebase";

const StudentChatHub = () => {
  const [messages, setMessages] = useState([]);
  const [contact] = useState({
    name: "Dr. Sarah Wilson",
    role: "Senior Career Counselor",
    initials: "SW",
    bgColor: "bg-indigo-100 text-indigo-700",
  });

  const user = useSelector((state) => state.auth.user);
  const currentUserId = useSelector(
    (state) => state.auth.user?.user_id || state.auth.user?.id || 1,
  );

  const assignedCounselorId = user?.counselor_details?.user_id;
  const roomId = assignedCounselorId ? `room_S${currentUserId}_C${assignedCounselorId}` : null;
  const currentUserName = user?.full_name || user?.username || "Student";
  const currentUserInitials = currentUserName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!roomId) return;
      try {
        const response = await api.get(`/rooms/${roomId}/messages/`);

        const transformed = response.data.map((msg) => {
          const senderId = msg.sender_id ?? msg.sender_detail?.id ?? msg.sender;
          const senderName =
            msg.sender_name || msg.sender_detail?.full_name || "Unknown User";
          const rawTime = msg.timestamp || msg.created_at;
          const text = msg.text || msg.message || "";

          return {
            senderId,
            text,
            time: rawTime
              ? new Date(rawTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
              : "--:--",
            senderInitials: senderName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase(),
            senderColor:
              Number(senderId) === Number(currentUserId)
                ? "bg-indigo-600 text-white"
                : "bg-slate-200 text-slate-700",
          };
        });

        setMessages(transformed);
      } catch (error) {
        console.error("Error fetching student chat messages:", error);
      }
    };

    const setupFCM = async () => {
      try {
        if (typeof window === "undefined" || !window.Notification) {
          return;
        }

        const permission = await window.Notification.requestPermission();
        if (permission !== "granted") {
          return;
        }

        const token = await getToken(messaging, {
          vapidKey:
            "BJsL5ch2QeVsC2PWX4ecvLlAkjDg2-qUjqIdgRSKQFAKB9SLxXKh408tplbasQxFj2Bh0Qxyx0yTcSFMxDhuQRk",
        });

        if (token) {
          await axios.post("http://localhost:8001/register-fcm/", {
            user_id: currentUserId,
            token,
          });
        }
      } catch (error) {
        console.error("FCM setup failed:", error);
      }
    };

    setupFCM();
    fetchMessages();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("New foreground message:", payload);
      fetchMessages();
    });

    return () => unsubscribe();
  }, [roomId, currentUserId]);

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-slate-50 p-4 lg:p-6">
      <div className="mx-auto flex h-full min-h-0 max-w-7xl overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
        {!roomId ? (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center p-8 bg-indigo-50 rounded-2xl border border-indigo-100 max-w-md">
              <div className="text-4xl mb-4 text-indigo-500">⏳</div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Almost Ready!</h2>
              <p className="text-slate-600">
                The Admin is assigning your specialized counselor. You'll be able to chat as soon as as you're paired up.
              </p>
            </div>
          </div>
        ) : (
          <ChatContainer
            messages={messages}
            contact={contact}
            currentUserId={currentUserId}
            currentUserName={currentUserName}
            currentUserInitials={currentUserInitials}
            roomId={roomId}
          />
        )}
      </div>
    </div>
  );
};

export default StudentChatHub;
