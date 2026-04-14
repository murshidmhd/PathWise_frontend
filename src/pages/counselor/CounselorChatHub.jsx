import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatContainer from "../../components/chat/ChatContainer";
import { chatApi as api } from "../../services/api";
import axios from "axios";

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
        const response = await axios.get("http://localhost:8000/api/counselors/students/", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }
        });
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
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-slate-50 p-4 lg:p-6">
      <div className="mx-auto flex h-full min-h-0 max-w-7xl overflow-hidden rounded-3xl border border-white/20 shadow-2xl bg-white text-slate-800">
        {/* Sidebar */}
        <div className="w-80 border-r border-slate-100 flex flex-col min-w-[320px]">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">My Students</h2>
            <p className="text-xs text-slate-500 mt-1">{students.length} Assigned Students</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`w-full flex items-center p-3 rounded-2xl transition-all ${selectedStudent?.id === student.id
                    ? "bg-indigo-50 border-indigo-100 ring-1 ring-indigo-200"
                    : "hover:bg-slate-50 border-transparent"
                  } border`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 mr-3">
                  {student.full_name[0]}
                </div>
                <div className="text-left overflow-hidden">
                  <div className="font-semibold truncate">{student.full_name}</div>
                  <div className="text-xs text-slate-500 truncate">{student.stream || "No stream"}</div>
                </div>
              </button>
            ))}
            {students.length === 0 && (
              <div className="text-center py-10 text-slate-400 italic">No students assigned yet.</div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
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
            <div className="flex-1 flex items-center justify-center">
              <div className="text-slate-400">Select a student to start chatting</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounselorChatHub;
