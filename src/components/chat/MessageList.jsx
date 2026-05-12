import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, currentUserId }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="relative min-h-0 flex-1 overflow-y-auto bg-[#F8FAFF] px-4 py-6 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(11,129,141,0.06),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.06),transparent_36%)]" />

      <div className="relative z-10">
        <div className="mb-6 flex justify-center">
          <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-slate-400 uppercase shadow-sm">
            Today
          </span>
        </div>

        {messages.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md rounded-3xl border border-slate-200/70 bg-white/85 p-6 text-center shadow-sm backdrop-blur-sm">
            <p className="text-sm font-semibold text-slate-700">No messages yet</p>
            <p className="mt-1 text-xs leading-6 text-slate-500">
              Start the conversation by sending your first message below.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <MessageItem
                key={idx}
                message={msg}
                isOwn={msg.senderId === currentUserId}
              />
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
