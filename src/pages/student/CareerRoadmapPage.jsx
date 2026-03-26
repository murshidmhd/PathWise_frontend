import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../services/api";

const COLORS = [
  {
    dot: "#6366F1",
    bg: "#EEF2FF",
    border: "#C7D2FE",
    text: "#4338CA",
    lightBg: "#F5F3FF",
  },
  {
    dot: "#0D9488",
    bg: "#F0FDFA",
    border: "#99F6E4",
    text: "#0F766E",
    lightBg: "#F0FDFA",
  },
  {
    dot: "#F59E0B",
    bg: "#FFFBEB",
    border: "#FDE68A",
    text: "#B45309",
    lightBg: "#FFFBEB",
  },
  {
    dot: "#F43F5E",
    bg: "#FFF1F2",
    border: "#FECDD3",
    text: "#BE123C",
    lightBg: "#FFF1F2",
  },
  {
    dot: "#10B981",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    text: "#047857",
    lightBg: "#ECFDF5",
  },
];

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
  );
}

function MilestoneCard({ milestone, index, isLast, status, onToggle }) {
  const [open, setOpen] = useState(false);
  let c = COLORS[index % COLORS.length];

  if (status === "locked") {
    c = {
      dot: "#94A3B8",
      bg: "#F8FAFC",
      border: "#E2E8F0",
      text: "#64748B",
      lightBg: "#F8FAFC",
    };
  }

  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex gap-0 md:gap-8 ${status === "locked" ? "opacity-60 grayscale-[0.5]" : ""}`}>
      {/* ── Timeline spine ── */}
      <div className="hidden md:flex flex-col items-center">
        {/* Dot */}
        <div
          className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-4 border-white shadow-md"
          style={{ background: c.dot }}
        >
          <span className="text-xs font-black text-white">
            {milestone.order_number}
          </span>
        </div>
        {/* Line */}
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-1"
            style={{ background: c.border, minHeight: 40 }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <div
        className={`mb-8 flex-1 rounded-2xl border transition-all duration-300 ${
          status === "current" ? "scale-[1.02] shadow-lg" : "shadow-sm hover:shadow-md"
        }`}
        style={{ 
          background: c.bg, 
          borderColor: c.border,
          ...(status === "current" ? { boxShadow: `0 0 0 3px white, 0 0 0 5px ${c.dot}40` } : {})
        }}
      >
        {/* Card header */}
        <div
          className="flex items-center justify-between border-b p-5"
          style={{ borderColor: c.border }}
        >
          <div className="flex items-center gap-3">
            {/* Mobile step badge */}
            <div
              className="flex md:hidden size-7 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
              style={{ background: c.dot }}
            >
              {milestone.order_number}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p
                  className="text-[10px] font-black uppercase tracking-widest"
                  style={{ color: c.text }}
                >
                  Step {milestone.order_number}
                  {milestone.duration && (
                    <span className="ml-2 font-semibold normal-case tracking-normal text-slate-400">
                      · {milestone.duration}
                    </span>
                  )}
                </p>
                {status === "current" && (
                  <span className="animate-pulse rounded-full bg-indigo-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-700">
                    In Progress
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {milestone.title}
              </h3>
            </div>
          </div>

          {milestone.age_range && (
            <span
              className="hidden sm:block shrink-0 rounded-full border px-3 py-1 text-xs font-semibold text-slate-500"
              style={{ borderColor: c.border, background: "white" }}
            >
              🎯 {milestone.age_range}
            </span>
          )}
        </div>

        {/* Card body */}
        <div className="p-5">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {milestone.description}
          </p>

          {status === "locked" ? (
            <div className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-400 cursor-not-allowed">
              <Icon name="lock" className="text-base" />
              Locked
            </div>
          ) : (
            <button
              onClick={() => onToggle(milestone.id)}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition-all ${
                status === "completed"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                  : "border-slate-800 bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md"
              }`}
            >
              <Icon
                name={
                  status === "completed"
                    ? "check_circle"
                    : "radio_button_unchecked"
                }
                className="text-base"
              />
              {status === "completed" ? "Completed" : "Mark as Complete"}
            </button>
          )}

          {/* Skills */}
          {milestone.skills_to_learn?.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                Skills to Learn
              </p>
              <div className="flex flex-wrap gap-2">
                {milestone.skills_to_learn.map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-lg border px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: "white",
                      borderColor: c.border,
                      color: c.text,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 text-xs font-bold transition-opacity hover:opacity-70"
            style={{ color: c.text }}
          >
            <Icon
              name={open ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              className="text-base"
            />
            {open ? "Hide details" : "Show details"}
          </button>

          {/* Expanded */}
          {open && (
            <div
              className="mt-4 grid grid-cols-1 gap-4 rounded-xl border p-4 sm:grid-cols-2"
              style={{ background: "white", borderColor: c.border }}
            >
              {milestone.age_range && (
                <div className="sm:hidden">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Age Range
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    {milestone.age_range}
                  </p>
                </div>
              )}

              {milestone.exams_to_take?.length > 0 && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                    📝 Exams
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {milestone.exams_to_take.map((exam, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700"
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {milestone.resources?.length > 0 && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                    📚 Resources
                  </p>
                  <div className="space-y-1.5">
                    {milestone.resources.map((r, i) => (
                      <a
                        key={i}
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold hover:underline"
                        style={{ color: c.text }}
                      >
                        <Icon name="open_in_new" className="text-xs" />
                        {r.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const token = useSelector((s) => s.auth.token);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    if (!token) return;
    api
      .get("/assessments/latest/")
      .then((res) => setAssessmentId(res.data.id))
      .catch(() => setError("No completed assessment found."));
  }, [token]);

  useEffect(() => {
    if (!assessmentId || !token) return;

    const fetchRoadmap = async () => {
      try {
        let res;
        try {
          res = await api.get(`/roadmap/${assessmentId}/`);
          setMilestones(res.data.milestones || []);
        } catch (err) {
          if (err.response?.status === 404) {
            res = await api.post(`/roadmap/${assessmentId}/generate/`);
            setMilestones(res.data.milestones || []); // ← add this
          } else {
            throw err;
          }
        }
        setRoadmap(res.data);
      } catch (err) {
        setError("Failed to load roadmap.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [assessmentId, token]);

  const toggleComplete = async (milestoneId) => {
    try {
      const res = await api.patch(
        `/roadmap/milestone/${milestoneId}/complete/`,
      );
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === milestoneId
            ? {
                ...m,
                is_completed: res.data.is_completed,
                completed_at: res.data.completed_at,
              }
            : m,
        ),
      );
    } catch (err) {
      console.error("Failed to update milestone", err);
    }
  };
  const completedCount = milestones.filter((m) => m.is_completed).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="mx-auto mb-4 size-10 animate-spin rounded-full border-3 border-indigo-500 border-t-transparent" />
          <p className="text-sm text-slate-500">
            Generating your career roadmap...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <p className="text-sm text-rose-500">{error}</p>
          <Link
            to="/student/dashboard"
            className="mt-4 block text-sm font-bold text-[#0B818D] hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-10">
          <Link
            to="/student/dashboard"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#0B818D] hover:underline"
          >
            <Icon name="arrow_back" className="text-base" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-1 text-[11px] font-black uppercase tracking-widest text-indigo-500">
                AI Generated Roadmap
              </p>
              <h1 className="text-3xl font-extrabold text-slate-900">
                {roadmap?.title || "Your Career Journey"}
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                {milestones.length} milestones to reach your goal
              </p>
            </div>

            <div className="shrink-0 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white">
              {roadmap?.career_title}
            </div>
          </div>

          {/* Progress bar */}

          <div className="mt-6 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-slate-500">
                Journey Progress
              </p>
              <p className="text-xs font-bold text-slate-900">
                {completedCount} of {milestones.length} completed
              </p>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                style={{
                  width: milestones.length
                    ? `${(completedCount / milestones.length) * 100}%`
                    : "0%",
                }}
              />
            </div>

            <p className="mt-2 text-[11px] text-slate-400">
              Complete each milestone to advance your career roadmap
            </p>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div>
          {milestones
            .sort((a, b) => a.order_number - b.order_number)
            .map((milestone, index, array) => {
              let status = "locked";
              if (milestone.is_completed) {
                status = "completed";
              } else if (index === array.findIndex((m) => !m.is_completed)) {
                status = "current";
              }

              return (
                <MilestoneCard
                  key={milestone.id}
                  milestone={milestone}
                  index={index}
                  isLast={index === milestones.length - 1}
                  status={status}
                  onToggle={toggleComplete}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
