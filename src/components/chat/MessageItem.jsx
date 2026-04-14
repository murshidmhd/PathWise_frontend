import React from "react";

const MessageItem = ({ message, isOwn }) => {
  const { text, time, senderInitials, senderColor } = message;

  return (
    <div
      className={`flex items-end gap-3 ${
        isOwn ? "ml-auto flex-row-reverse" : "mr-auto"
      } max-w-[88%]`}
    >
      <div
        className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-2xl border border-white/80 text-[10px] font-bold shadow-sm ${
          senderColor || "bg-slate-100 text-slate-600"
        }`}
      >
        {senderInitials}
      </div>

      <div className={isOwn ? "text-right" : "text-left"}>
        <div
          className={`inline-block rounded-3xl px-4 py-3 shadow-sm ${
            isOwn
              ? "rounded-br-md bg-gradient-to-br from-[#0B818D] to-[#006670] text-white shadow-[#0B818D]/25"
              : "rounded-bl-md border border-slate-200/70 bg-white text-slate-700"
          }`}
        >
          <p className="text-sm leading-7">{text}</p>
        </div>
        <span
          className={`mt-1 block text-[10px] font-medium ${
            isOwn ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {time}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
