import React, { useCallback, useEffect, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ChatSidebar from "./ChatSidebar";
import { useWebSocket } from "../../hooks/useWebSocket";
import { chatApi as api } from "../../services/api";

const ChatContainer = ({
  messages: initialMessages,
  contact,
  currentUserId,
  roomId,
  currentUserName,
  hideSidebar = false,
  quickReplies = [],
}) => {
  const [localMessages, setLocalMessages] = useState(initialMessages || []);

  useEffect(() => {
    setLocalMessages(initialMessages || []);
  }, [initialMessages]);

  const onMessage = useCallback(
    (data) => {
      setLocalMessages((prev) => [
        ...prev,
        {
          senderId: data.sender_id,
          text: data.message,
          time: new Date(data.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          senderInitials: data.sender_initials || "??",
          senderColor:
            Number(data.sender_id) === Number(currentUserId)
              ? "bg-indigo-600 text-white"
              : "bg-slate-200 text-slate-700",
        },
      ]);
    },
    [currentUserId],
  );

  const { status } = useWebSocket(
    roomId ? `chat/${roomId}` : null,
    onMessage,
  );

  const handleSendMessage = (text) => {
    api
      .post(`/rooms/${roomId}/messages/`, {
        message: text,
        sender_id: currentUserId,
        sender_name: currentUserName || "User",
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const connectionTone =
    status === "connected"
      ? "bg-emerald-500"
      : status === "connecting"
        ? "bg-amber-400"
        : "bg-rose-500";

  const connectionLabel =
    status === "connected"
      ? "Live"
      : status === "connecting"
        ? "Connecting"
        : "Offline";

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,129,141,0.08),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.08),transparent_30%)]" />

        <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 py-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-11 items-center justify-center rounded-2xl border border-white/80 text-sm font-bold shadow-sm ${contact.bgColor}`}
            >
              {contact.initials}
            </div>
            <div>
              <h3 className="text-sm leading-none font-bold text-slate-900">
                {contact.name}
              </h3>
              <p className="mt-1 text-[11px] font-bold tracking-[0.14em] text-[#0B818D] uppercase">
                {contact.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600 sm:inline-flex">
              <span className={`size-2 rounded-full ${connectionTone}`} />
              {connectionLabel}
            </span>

          </div>
        </div>

        <MessageList messages={localMessages} currentUserId={currentUserId} />
        
        <div className="shrink-0 bg-white/80 backdrop-blur-sm border-t border-slate-100">
          {quickReplies.length > 0 && (
            <div className="flex gap-2 overflow-x-auto p-4 pb-2 custom-scrollbar">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(reply)}
                  className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold text-slate-600 transition-all hover:border-[#0B818D] hover:bg-[#0B818D]/5 hover:text-[#0B818D]"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      {!hideSidebar && <ChatSidebar contact={contact} />}
    </div>
  );
};

export default ChatContainer;
