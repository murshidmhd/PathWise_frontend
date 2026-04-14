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
        ) : null}
      </div>
    </aside>
  );
};

export default ChatSidebar;
