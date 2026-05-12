import React, { useEffect, useRef } from "react";

const VideoCallModal = ({ isOpen, onClose, roomId, userName, onSessionEnd }) => {
  const iframeRef = useRef(null);

  if (!isOpen) return null;

  const handleLeave = () => {
    onClose();
    if (onSessionEnd) onSessionEnd();
  };

  // Generate a clean, unique room name
  // Use a different public Jitsi server (meet.ffmuc.net) which does NOT
  // enforce the members-only / moderator lobby that meet.jit.si does.
  const jitsiRoomName = `PathWise${roomId.replace(/_/g, "")}`;
  const displayName = encodeURIComponent(userName || "PathWise User");

  const jitsiUrl =
    `https://meet.ffmuc.net/${jitsiRoomName}` +
    `#config.prejoinPageEnabled=false` +
    `&config.requireDisplayName=false` +
    `&config.lobby.enabled=false` +
    `&config.startWithAudioMuted=false` +
    `&config.disableModeratorIndicator=true` +
    `&config.enableWelcomePage=false` +
    `&config.toolbarButtons=["microphone","camera","hangup","chat","tileview","fullscreen","settings"]` +
    `&userInfo.displayName=${displayName}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 lg:p-10 animate-in fade-in duration-300">
      <div className="relative w-full h-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-[#0B818D]/10 flex items-center justify-center text-[#0B818D]">
              <span className="material-symbols-outlined">videocam</span>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Live Mentorship Session</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#0B818D]">PathWise Secure Connection</p>
            </div>
          </div>

          <button
            onClick={handleLeave}
            className="group flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-50 text-rose-600 font-bold text-sm transition-all hover:bg-rose-100 active:scale-95"
          >
            <span>Leave Session</span>
            <span className="material-symbols-outlined text-lg">call_end</span>
          </button>
        </div>

        {/* Jitsi iframe — uses meet.ffmuc.net (no moderator/lobby enforcement) */}
        <div className="flex-1 bg-slate-900 overflow-hidden">
          <iframe
            ref={iframeRef}
            src={jitsiUrl}
            allow="camera; microphone; fullscreen; display-capture; autoplay; compute-pressure"
            style={{ width: "100%", height: "100%", border: "none" }}
            title="PathWise Live Session"
          />
        </div>

        {/* Footer */}
        <div className="px-8 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2 shrink-0">
          <span className="material-symbols-outlined text-slate-400 text-sm">info</span>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Encrypted connection · Enable camera & microphone when prompted
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;
