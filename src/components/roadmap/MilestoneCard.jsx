import { useState } from "react";
import { CheckCircle2, ChevronDown, Clock3, ExternalLink, Lock, Target } from "lucide-react";

const COLORS = [
    { dot: "#4F46E5", cardBg: "#EEF2FF", border: "#C7D2FE", text: "#4338CA", soft: "#E0E7FF" },
    { dot: "#0B818D", cardBg: "#ECFEFF", border: "#99F6E4", text: "#0F766E", soft: "#CCFBF1" },
    { dot: "#F59E0B", cardBg: "#FFFBEB", border: "#FDE68A", text: "#B45309", soft: "#FEF3C7" },
    { dot: "#EF4444", cardBg: "#FFF1F2", border: "#FDA4AF", text: "#BE123C", soft: "#FFE4E6" },
    { dot: "#10B981", cardBg: "#ECFDF5", border: "#A7F3D0", text: "#047857", soft: "#D1FAE5" },
];

const LOCKED_STYLE = {
    dot: "#94A3B8",
    cardBg: "#F8FAFC",
    border: "#E2E8F0",
    text: "#64748B",
    soft: "#F1F5F9",
};

const MilestoneCard = ({ milestone, index, isLast, status, onToggle }) => {
    const [open, setOpen] = useState(false);
    const style = status === "locked" ? LOCKED_STYLE : COLORS[index % COLORS.length];

    const statusBadge =
        status === "completed"
            ? { label: "Completed", className: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200", icon: CheckCircle2 }
            : status === "current"
                ? { label: "In Progress", className: "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200", icon: Clock3 }
                : { label: "Locked", className: "bg-slate-100 text-slate-600 ring-1 ring-slate-200", icon: Lock };

    const StatusIcon = statusBadge.icon;

    return (
        <div className="relative flex gap-0 md:gap-6">
            <div className="hidden md:flex md:flex-col md:items-center">
                <div
                    className="relative z-10 flex size-11 items-center justify-center rounded-full border-4 border-white font-black text-white shadow-md"
                    style={{ background: style.dot }}
                >
                    {milestone.order_number}
                </div>
                {!isLast && (
                    <div className="mt-2 w-0.5 flex-1 rounded-full" style={{ minHeight: 48, background: style.border }} />
                )}
            </div>

            <article
                className={`mb-6 flex-1 overflow-hidden rounded-[26px] border shadow-sm transition-all ${status === "current" ? "shadow-lg" : "hover:-translate-y-0.5 hover:shadow-md"
                    } ${status === "locked" ? "opacity-80" : ""}`}
                style={{ background: style.cardBg, borderColor: style.border }}
            >
                <header className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6" style={{ borderColor: style.border }}>
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white md:hidden" style={{ background: style.dot }}>
                            {milestone.order_number}
                        </div>
                        <div>
                            <p className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: style.text }}>
                                Step {milestone.order_number}{milestone.duration ? `  ·  ${milestone.duration}` : ""}
                            </p>
                            <h3 className="mt-1 text-lg font-bold text-slate-900">{milestone.title}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {milestone.age_range && <span className="rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600">{milestone.age_range}</span>}
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase ${statusBadge.className}`}>
                            <StatusIcon className="size-3.5" />{statusBadge.label}
                        </span>
                    </div>
                </header>

                <div className="p-5 sm:p-6">
                    <p className="text-sm leading-7 text-slate-600">{milestone.description}</p>
                    {milestone.skills_to_learn?.length > 0 && (
                        <div className="mt-5">
                            <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">Skills To Learn</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {milestone.skills_to_learn.map((skill, i) => (
                                    <span key={i} className="rounded-xl border bg-white px-3 py-1.5 text-xs font-semibold" style={{ borderColor: style.border, color: style.text }}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                        {status === "locked" ? (
                            <button disabled className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500 sm:w-auto"><Lock className="size-4" />Locked</button>
                        ) : (
                            <button onClick={() => onToggle(milestone.id)} className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition sm:w-auto ${status === "completed" ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
                                {status === "completed" ? <CheckCircle2 className="size-4" /> : <Target className="size-4" />}
                                {status === "completed" ? "Completed" : "Mark As Complete"}
                            </button>
                        )}
                        <button onClick={() => setOpen(!open)} className="inline-flex items-center justify-center gap-1 rounded-2xl border border-transparent px-3 py-2 text-sm font-semibold transition hover:border-white/70 hover:bg-white/50 sm:justify-start" style={{ color: style.text }}>
                            <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
                            {open ? "Hide Details" : "Show Details"}
                        </button>
                    </div>
                    {open && (
                        <div className="mt-4 grid gap-4 rounded-2xl border bg-white p-4 sm:grid-cols-2" style={{ borderColor: style.border }}>
                            {milestone.exams_to_take?.length > 0 && (
                                <div>
                                    <p className="mb-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">Exams</p>
                                    <div className="flex flex-wrap gap-2">
                                        {milestone.exams_to_take.map((exam, i) => <span key={i} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{exam}</span>)}
                                    </div>
                                </div>
                            )}
                            {milestone.resources?.length > 0 && (
                                <div>
                                    <p className="mb-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">Resources</p>
                                    <div className="space-y-2">
                                        {milestone.resources.map((res, i) => (
                                            <a key={i} href={res.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: style.text }}>
                                                <ExternalLink className="size-3.5" />{res.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};

export default MilestoneCard;
