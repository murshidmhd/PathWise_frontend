import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Bot,
  LoaderCircle,
  MessageCircleMore,
  SendHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import api from "../../services/api";

const DEFAULT_SUGGESTIONS = [
  "Suggest careers based on my profile",
  "Explain my assessment report",
  "What skills should I build next?",
];

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "assistant",
  text: "Hi, I’m your PathWise assistant. Ask me about careers, your roadmap, or your assessment results.",
  time: new Date().toISOString(),
};

function formatTime(value) {
  return new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAssistantReply(data) {
  if (typeof data === "string") return data;
  if (!data || typeof data !== "object") return "";

  return (
    data.answer ||
    data.response ||
    data.message ||
    data.reply ||
    data.output ||
    ""
  );
}

function buildFallbackReply(prompt) {
  const normalizedPrompt = prompt.trim().toLowerCase();

  if (normalizedPrompt.includes("career")) {
    return "I can help compare career paths, highlight matching roles from your assessment, and suggest next learning steps once your RAG backend is connected.";
  }

  if (
    normalizedPrompt.includes("assessment") ||
    normalizedPrompt.includes("report")
  ) {
    return "I can explain assessment insights in simpler language and connect them to roadmap actions. Right now this is a UI-ready fallback response until your RAG endpoint is available.";
  }

  if (
    normalizedPrompt.includes("skill") ||
    normalizedPrompt.includes("roadmap")
  ) {
    return "I can turn roadmap goals into skill-building suggestions, project ideas, and learning priorities once your retrieval responses are live.";
  }

  return "Your RAG assistant UI is ready. Connect your backend endpoint and I’ll start answering with retrieved project or student-specific context.";
}

function MessageBubble({ message }) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-[22px] px-4 py-3 shadow-sm ${
          isAssistant
            ? "rounded-bl-md border border-slate-200 bg-white text-slate-700"
            : "rounded-br-md bg-gradient-to-br from-[#0B818D] to-[#006670] text-white"
        }`}
      >
        <p className="text-sm leading-6 whitespace-pre-wrap">{message.text}</p>
        <p
          className={`mt-2 text-[11px] font-medium ${
            isAssistant ? "text-slate-400" : "text-white/70"
          }`}
        >
          {formatTime(message.time)}
        </p>
      </div>
    </div>
  );
}

export default function RagChatWidget() {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const report = useSelector((state) => state.report);

  const userName = auth?.user?.full_name?.split(" ")[0] || "there";

  const [conversationHistory, setConversationHistory] = useState([]);
  const [summary, setSummary] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const shouldShow =
    auth?.isAuthenticated && !location.pathname.startsWith("/auth");

  const FASTAPI_URL = "http://localhost:8002";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const suggestions = useMemo(
    () =>
      DEFAULT_SUGGESTIONS.map((item, index) =>
        index === 0 ? `${item} for ${userName}` : item,
      ),
    [userName],
  );

  const handleSend = async (prefilledPrompt) => {
    const nextPrompt = (prefilledPrompt ?? input).trim();
    if (!nextPrompt || isSending) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: nextPrompt,
      time: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError("");
    setIsSending(true);

    try {
      const token = localStorage.getItem("access");

      const requestBody = {
        message: nextPrompt,
        conversation_history: conversationHistory,
        summary: summary,
        user_context: {
          primary_career: report.primaryCareer || "",
          recommended_careers: report.recommendedCareers || [],
          assessment_summary: report.assessmentSummary || "",
        },
      };
      console.log("token in rag compo" , token)


      const response = await api.post(`${FASTAPI_URL}/chat/`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      const data = response.data;
      console.log("should_summarize:", data.should_summarize);
      console.log("history length:", conversationHistory.length);

      // const data = await response.json();
      const replyText = data.reply || "Sorry, I could not get a response.";

      // update conversation history
      setConversationHistory((prev) => [
        ...prev,
        { role: "user", content: nextPrompt },
        { role: "assistant", content: replyText },
      ]);

      // handle summarization
      if (data.should_summarize) {
        const sumResponse = await api.post(
          `${FASTAPI_URL}/chat/summarize/`,
          { conversation_history: conversationHistory },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setSummary(sumResponse.data.summary);
        setConversationHistory((prev) => prev.slice(-4));
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: replyText,
          time: new Date().toISOString(),
        },
      ]);
    } catch {
      setError("Could not reach AI service. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  if (!shouldShow) return null;

  return (
    <>
      <div className="pointer-events-none fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        {isOpen && (
          <section className="pointer-events-auto w-[calc(100vw-2rem)] max-w-[380px] overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#111C2D] via-[#0B818D] to-[#006670] px-5 py-5 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_30%)]" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-white/12 backdrop-blur-sm">
                    <Bot className="size-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.18em] text-teal-100 uppercase">
                      RAG Assistant
                    </p>
                    <h3 className="mt-1 text-lg font-bold">PathWise AI Chat</h3>
                    <p className="mt-1 text-sm text-slate-100/85">
                      Ask about careers, reports, skills, or roadmap next steps.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSend(suggestion)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-[#0B818D]/25 hover:text-[#0B818D]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[420px] space-y-4 overflow-y-auto bg-[#F8FAFC] px-4 py-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
                    <LoaderCircle className="size-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-slate-100 bg-white p-4">
              {error && (
                <p className="mb-3 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                  {error}
                </p>
              )}

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSend();
                }}
                className="flex items-end gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition focus-within:border-[#0B818D]/30 focus-within:bg-white"
              >
                <textarea
                  rows="1"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask your PathWise assistant..."
                  className="max-h-28 flex-1 resize-none border-none bg-transparent py-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  className="inline-flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B818D] to-[#006670] text-white shadow-lg shadow-[#0B818D]/25 transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <SendHorizontal className="size-4" />
                </button>
              </form>
            </div>
          </section>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="pointer-events-auto group relative inline-flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#111C2D] via-[#0B818D] to-[#006670] text-white shadow-[0_18px_45px_rgba(11,129,141,0.35)] transition hover:scale-[1.04]"
          aria-label="Open PathWise AI assistant"
        >
          <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition group-hover:opacity-100" />
          {isOpen ? (
            <X className="relative size-6" />
          ) : (
            <MessageCircleMore className="relative size-6" />
          )}
          <span className="absolute -top-1 -left-1 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-1 text-[10px] font-bold text-slate-900 shadow-sm">
            <Sparkles className="size-3" />
            AI
          </span>
        </button>
      </div>
    </>
  );
}
