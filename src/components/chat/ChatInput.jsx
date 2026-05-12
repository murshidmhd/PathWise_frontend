import React, { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText("");
    }
  };

  return (
    <div className="border-t border-slate-200/80 bg-white/95 p-4 backdrop-blur-sm sm:p-5">
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-3 py-2.5 shadow-sm transition-all focus-within:border-[#0B818D]/30 focus-within:bg-white"
      >
        <button
          type="button"
          className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0B818D]"
        >
          <span className="material-symbols-outlined">attach_file</span>
        </button>

        <textarea
          rows="1"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              handleSubmit(event);
            }
          }}
          placeholder="Write a message..."
          className="max-h-32 flex-1 resize-none border-none bg-transparent py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />

        <button
          type="button"
          className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0B818D]"
        >
          <span className="material-symbols-outlined">sentiment_satisfied</span>
        </button>

        <button
          type="submit"
          className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B818D] to-[#006670] text-white shadow-lg shadow-[#0B818D]/25 transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!text.trim()}
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
