import React from "react";

const ChatSidebar = ({ contact }) => {
  if (!contact) return null;

  return (
    <aside className="hidden w-full overflow-y-auto border-l border-slate-200/80 bg-gradient-to-b from-slate-50 to-white xl:flex xl:w-[340px] xl:flex-col">
      <div className="border-b border-slate-200/80 p-6">
        <div className="rounded-[26px] border border-slate-200/70 bg-white p-5 text-center shadow-sm">
          <div
            className={`mx-auto mb-3 flex size-20 items-center justify-center rounded-[24px] text-2xl font-bold shadow-md ${contact.bgColor || "bg-teal-50 text-[#0B818D]"}`}
          >
            {contact.initials}
          </div>
          <h4 className="text-lg font-bold text-slate-900">{contact.name}</h4>
          <p className="mt-1 text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
            {contact.role}
          </p>
          {contact.description ? (
            <p className="mt-4 text-xs leading-6 text-slate-600">
              {contact.description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-6 p-6">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h5 className="text-xs font-bold tracking-[0.16em] text-slate-500 uppercase">
              Shared Files
            </h5>
            <button className="text-[11px] font-semibold text-[#0B818D] transition hover:opacity-75">
              View all
            </button>
          </div>

          <div className="space-y-3">
            {contact.sharedFiles?.length ? (
              contact.sharedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    className={`flex size-10 items-center justify-center rounded-xl ${file.iconBg}`}
                  >
                    <span className={`material-symbols-outlined ${file.iconColor}`}>
                      {file.icon}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-semibold text-slate-900">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {file.size} • {file.date}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-xl border border-dashed border-slate-200 bg-white px-3 py-4 text-center text-xs text-slate-500">
                No shared files yet.
              </p>
            )}
          </div>
        </section>

        {contact.nextSession ? (
          <section className="rounded-[24px] bg-slate-900 p-5 text-white shadow-xl">
            <p className="text-[10px] font-bold tracking-[0.16em] text-teal-300 uppercase">
              Next Session
            </p>
            <h5 className="mt-2 text-lg leading-none font-bold">
              {contact.nextSession.time}
            </h5>
            <p className="mt-1 text-[11px] text-slate-400">
              {contact.nextSession.platform}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-xl bg-[#0B818D] py-2 text-[11px] font-semibold text-white transition hover:bg-[#0A707A]">
                Join
              </button>
              <button className="rounded-xl bg-white/10 py-2 text-[11px] font-semibold text-white transition hover:bg-white/20">
                Reschedule
              </button>
            </div>
          </section>
        ) : (
          <section className="rounded-[24px] bg-gradient-to-br from-teal-50 to-white border border-teal-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-[#0B818D]">
              <span className="material-symbols-outlined text-lg">calendar_add_on</span>
              <h5 className="text-sm font-bold tracking-tight">Book a Session</h5>
            </div>
            <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
              Need 1-on-1 guidance? Book a 45-minute video call with {contact.name.split(' ')[0]}.
            </p>
            
            <div className="bg-white rounded-xl border border-slate-100 p-3 mb-4">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cost</span>
                 <span className="text-xs font-black text-amber-600">10 SP</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Slot</span>
                 <span className="text-xs font-bold text-slate-700">Tomorrow, 10:00 AM</span>
               </div>
            </div>

            <button 
              onClick={() => alert("🚀 We're working on the scheduling system! Soon you'll be able to book 1-on-1 mentorship sessions with SkillPoints.")}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B818D] hover:bg-[#096a75] py-2.5 text-[11px] font-black uppercase tracking-widest text-white transition-colors shadow-md shadow-teal-500/20"
            >
              View Calendar
            </button>
          </section>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
