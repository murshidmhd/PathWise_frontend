import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatContainer from "../../components/chat/ChatContainer";
import { chatApi as api } from "../../services/api";
import axios from "axios";
import { messaging, getToken, onMessage } from "../../firebase";

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

const CounselorChatHub = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messages, setMessages] = useState([]);

  const currentUserId = useSelector(
    (state) => state.auth.user?.user_id || state.auth.user?.id || 2,
  );

  const roomId = selectedStudent ? `room_S${selectedStudent.user_id}_C${currentUserId}` : null;
  const user = useSelector((state) => state.auth.user);
  const currentUserName = user?.full_name || user?.username || "Counselor";
  const currentUserInitials = currentUserName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://pathwise.duckdns.org/api/counselors/students/", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }
        });

        console.log("this is the response data in counselor hub", response.data)
        setStudents(response.data);
        if (response.data.length > 0) {
          setSelectedStudent(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
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
          vapidKey: "BJsL5ch2QeVsC2PWX4ecvLlAkjDg2-qUjqIdgRSKQFAKB9SLxXKh408tplbasQxFj2Bh0Qxyx0yTcSFMxDhuQRk",
        });

        if (token) {
          await axios.post("https://pathwise.duckdns.org/register-fcm/", {
            user_id: currentUserId,
            token,
          });
        }
      } catch (error) {
        console.error("FCM setup failed for counselor:", error);
      }
    };

    setupFCM();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Counselor received foreground message:", payload);
      // Optional: you could trigger a local fetch here if needed
    });

    return () => unsubscribe();
  }, [currentUserId]);

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
        console.error("Error fetching counselor chat messages:", error);
      }
    };

    fetchMessages();
  }, [roomId, currentUserId]);

  const contact = selectedStudent ? {
    name: selectedStudent.full_name,
    role: selectedStudent.stream || "Student",
    initials: selectedStudent.full_name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(),
    bgColor: "bg-indigo-100 text-indigo-700",
  } : null;

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-[#F8FAFC] p-4 lg:p-8">
      <div className="mx-auto flex h-full max-w-7xl overflow-hidden rounded-[40px] border border-white bg-white/70 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
        {/* Sidebar */}
        <aside className="w-80 flex flex-col min-w-[340px] border-r border-slate-100 bg-white/50">
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">Messages</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex size-2 animate-pulse rounded-full bg-emerald-500" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {students.length} Active Connections
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {students.map((student) => {
              const isActive = selectedStudent?.id === student.id;
              return (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`group relative w-full flex items-center p-4 rounded-[28px] transition-all duration-300 ${isActive
                    ? "bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100"
                    : "hover:bg-white hover:shadow-lg hover:shadow-slate-200/30"
                    }`}
                >
                  {isActive && (
                    <div className="absolute left-2 h-8 w-1 rounded-full bg-[#0B818D]" />
                  )}
                  <div className={`flex size-12 items-center justify-center rounded-2xl text-sm font-black shadow-lg shadow-slate-200 transition-transform group-hover:scale-105 ${isActive ? "bg-gradient-to-br from-[#0B818D] to-[#085a63] text-white" : "bg-slate-100 text-slate-600"
                    }`}>
                    {student.full_name[0].toUpperCase()}
                  </div>
                  <div className="ml-4 text-left overflow-hidden">
                    <div className={`font-bold truncate ${isActive ? "text-slate-950" : "text-slate-700"}`}>
                      {student.full_name}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 truncate">
                      {student.stream || "General Track"}
                    </div>
                  </div>
                </button>
              );
            })}

            {students.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="size-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300">
                  <span className="material-symbols-outlined text-3xl">inbox</span>
                </div>
                <p className="mt-4 text-sm font-bold text-slate-400">No student connections yet</p>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-row min-w-0 bg-white">
          <main className="flex-1 flex flex-col min-w-0 border-r border-slate-100">
            {selectedStudent ? (
              <ChatContainer
                messages={messages}
                contact={contact}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                currentUserInitials={currentUserInitials}
                roomId={roomId} 
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[radial-gradient(circle_at_center,white,transparent)]">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-[#0B818D]/10 text-transparent">.</div>
                  <div className="relative flex size-24 items-center justify-center rounded-[40px] bg-slate-50 text-[#0B818D] shadow-xl shadow-slate-100">
                    <span className="material-symbols-outlined text-4xl">forum</span>
                  </div>
                </div>
                <h3 className="mt-8 text-2xl font-black text-slate-950">Select a Conversation</h3>
                <p className="mt-2 max-w-xs text-sm font-medium leading-relaxed text-slate-500">
                  Choose a student from the sidebar to start counseling via real-time messaging.
                </p>
              </div>
            )}
          </main>

          {/* Right Sidebar: AI Insights & Calendar */}
          {selectedStudent && (
            <aside className="w-[320px] hidden xl:flex flex-col bg-slate-50 overflow-y-auto">
              <div className="p-6 border-b border-slate-200/60 bg-white">
                <div className="flex items-center gap-2 text-[#0B818D] mb-2">
                  <Icon name="auto_awesome" className="text-xl animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest">AI Student Brief</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">{selectedStudent.full_name}</h3>
                <p className="text-xs font-bold text-slate-500 mt-1">{selectedStudent.stream || "General Track"}</p>
              </div>

              <div className="p-6 space-y-6 flex-1 custom-scrollbar">
                {/* AI Summary Card */}
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200/60">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Analysis</h4>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    Student shows high aptitude in <span className="font-bold text-slate-800">Logical Reasoning</span>. 
                    Currently struggling with mapping clear career goals. Recommend discussing actionable roadmap steps.
                  </p>
                </div>

                {/* Skill Gaps */}
                <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm border border-indigo-100/50">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Identified Gaps</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 rounded-lg bg-indigo-100 text-indigo-600 items-center justify-center">
                        <Icon name="psychology" className="text-sm" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-800">Decision Making</p>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-indigo-100 overflow-hidden">
                          <div className="h-full bg-indigo-500 w-[45%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Session Booking */}
                <div className="rounded-3xl bg-[#111C2D] p-6 text-white shadow-xl mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="calendar_month" className="text-teal-400" />
                    <h4 className="text-sm font-bold tracking-tight">Schedule Video Session</h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    Set up a 1v1 video meeting. The student will be notified and points will be deducted.
                  </p>
                  <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-black py-3 px-4 transition-colors">
                    <Icon name="videocam" className="text-lg" />
                    Book for 10 SP
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounselorChatHub;
