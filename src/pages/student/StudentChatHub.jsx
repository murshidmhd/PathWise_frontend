import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { chatApi as api } from "../../services/api";
import ChatContainer from "../../components/chat/ChatContainer";
import { messaging, getToken, onMessage } from "../../firebase";

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

const StudentChatHub = () => {
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const counselorName = user?.counselor_details?.full_name || "Assigned Counselor";
  const counselorInitials = counselorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const contact = {
    name: counselorName,
    role: "PathWise Career Counselor",
    initials: counselorInitials,
    bgColor: "bg-indigo-100 text-indigo-700",
  };
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
          await axios.post("https://pathwise.duckdns.org/register-fcm/", {
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
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-page-bg p-4 lg:p-8">
      <div className="mx-auto flex h-full max-w-6xl overflow-hidden rounded-[40px] border border-white bg-white/70 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
        {!roomId ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[radial-gradient(circle_at_center,white,transparent)]">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-[#0B818D]/10 text-transparent">.</div>
              <div className="relative flex size-28 items-center justify-center rounded-[48px] bg-white text-[#0B818D] shadow-2xl shadow-slate-200/50">
                <span className="material-symbols-outlined text-5xl">person_search</span>
              </div>
              <div className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
                <span className="material-symbols-outlined text-xl animate-spin-slow">sync</span>
              </div>
            </div>

            <div className="mt-10 max-w-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0B818D]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B818D]">
                System Protocol: Pairing In Progress
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">Almost Ready!</h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-500">
                Our admin team is currently assigning your dedicated career architect. Real-time counseling will be unlocked shortly.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex flex-col items-center gap-1">
                <div className="text-xl font-black text-slate-950">100%</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure</div>
              </div>
              <div className="h-8 w-px bg-slate-100" />
              <div className="flex flex-col items-center gap-1">
                <div className="text-xl font-black text-slate-950">AI</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assisted</div>
              </div>
              <div className="h-8 w-px bg-slate-100" />
              <div className="flex flex-col items-center gap-1">
                <div className="text-xl font-black text-slate-950">24/7</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Support</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <ChatContainer
              messages={messages}
              contact={contact}
              currentUserId={currentUserId}
              currentUserName={currentUserName}
              currentUserInitials={currentUserInitials}
              roomId={roomId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentChatHub;
