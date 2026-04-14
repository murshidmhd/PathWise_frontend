import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  Lock,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import api from "../../services/api";

const COLORS = [
  {
    dot: "#4F46E5",
    cardBg: "#EEF2FF",
    border: "#C7D2FE",
    text: "#4338CA",
    soft: "#E0E7FF",
  },
  {
    dot: "#0B818D",
    cardBg: "#ECFEFF",
    border: "#99F6E4",
    text: "#0F766E",
    soft: "#CCFBF1",
  },
  {
    dot: "#F59E0B",
    cardBg: "#FFFBEB",
    border: "#FDE68A",
    text: "#B45309",
    soft: "#FEF3C7",
  },
  {
    dot: "#EF4444",
    cardBg: "#FFF1F2",
    border: "#FDA4AF",
    text: "#BE123C",
    soft: "#FFE4E6",
  },
  {
    dot: "#10B981",
    cardBg: "#ECFDF5",
    border: "#A7F3D0",
    text: "#047857",
    soft: "#D1FAE5",
  },
];

const LOCKED_STYLE = {
  dot: "#94A3B8",
  cardBg: "#F8FAFC",
  border: "#E2E8F0",
  text: "#64748B",
  soft: "#F1F5F9",
};

function MilestoneCard({ milestone, index, isLast, status, onToggle }) {
  const [open, setOpen] = useState(false);
  const style = status === "locked" ? LOCKED_STYLE : COLORS[index % COLORS.length];

  const statusBadge =
    status === "completed"
      ? {
          label: "Completed",
          className: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
          icon: CheckCircle2,
        }
      : status === "current"
        ? {
            label: "In Progress",
            className: "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200",
            icon: Clock3,
          }
        : {
            label: "Locked",
            className: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
            icon: Lock,
          };

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
          <div
            className="mt-2 w-0.5 flex-1 rounded-full"
            style={{ minHeight: 48, background: style.border }}
          />
        )}
      </div>

      <article
        className={`mb-6 flex-1 overflow-hidden rounded-[26px] border shadow-sm transition-all ${
          status === "current" ? "shadow-lg" : "hover:-translate-y-0.5 hover:shadow-md"
        } ${status === "locked" ? "opacity-80" : ""}`}
        style={{ background: style.cardBg, borderColor: style.border }}
      >
        <header
          className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          style={{ borderColor: style.border }}
        >
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white md:hidden"
              style={{ background: style.dot }}
            >
              {milestone.order_number}
            </div>

            <div>
              <p
                className="text-[10px] font-black tracking-[0.2em] uppercase"
                style={{ color: style.text }}
              >
                Step {milestone.order_number}
                {milestone.duration ? `  ·  ${milestone.duration}` : ""}
              </p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">
                {milestone.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {milestone.age_range ? (
              <span className="rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600">
                {milestone.age_range}
              </span>
            ) : null}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase ${statusBadge.className}`}
            >
              <StatusIcon className="size-3.5" />
              {statusBadge.label}
            </span>
          </div>
        </header>

        <div className="p-5 sm:p-6">
          <p className="text-sm leading-7 text-slate-600">{milestone.description}</p>

          {milestone.skills_to_learn?.length > 0 && (
            <div className="mt-5">
              <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                Skills To Learn
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {milestone.skills_to_learn.map((skill, skillIndex) => (
                  <span
                    key={`${skill}-${skillIndex}`}
                    className="rounded-xl border bg-white px-3 py-1.5 text-xs font-semibold"
                    style={{ borderColor: style.border, color: style.text }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            {status === "locked" ? (
              <button
                type="button"
                disabled
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500 sm:w-auto"
              >
                <Lock className="size-4" />
                Locked
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onToggle(milestone.id)}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition sm:w-auto ${
                  status === "completed"
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {status === "completed" ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  <Target className="size-4" />
                )}
                {status === "completed" ? "Completed" : "Mark As Complete"}
              </button>
            )}

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex items-center justify-center gap-1 rounded-2xl border border-transparent px-3 py-2 text-sm font-semibold transition hover:border-white/70 hover:bg-white/50 sm:justify-start"
              style={{ color: style.text }}
            >
              <ChevronDown
                className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
              {open ? "Hide Details" : "Show Details"}
            </button>
          </div>

          {open && (
            <div
              className="mt-4 grid gap-4 rounded-2xl border bg-white p-4 sm:grid-cols-2"
              style={{ borderColor: style.border }}
            >
              {milestone.exams_to_take?.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                    Exams
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {milestone.exams_to_take.map((exam, examIndex) => (
                      <span
                        key={`${exam}-${examIndex}`}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {milestone.resources?.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
                    Resources
                  </p>
                  <div className="space-y-2">
                    {milestone.resources.map((resource, resourceIndex) => (
                      <a
                        key={`${resource.title}-${resourceIndex}`}
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                        style={{ color: style.text }}
                      >
                        <ExternalLink className="size-3.5" />
                        {resource.title}
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
}

function InfoCard({ icon: Icon, title, value, description, accent }) {
  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className={`flex size-11 items-center justify-center rounded-2xl ${accent}`}>
        <Icon className="size-5" />
      </div>
      <p className="mt-4 text-xs font-black tracking-[0.18em] text-slate-400 uppercase">
        {title}
      </p>
      <p className="mt-2 text-2xl font-black tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const token = useSelector((state) => state.auth.token);

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
            setMilestones(res.data.milestones || []);
          } else {
            throw err;
          }
        }
        setRoadmap(res.data);
      } catch {
        setError("Failed to load roadmap.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [assessmentId, token]);

  const toggleComplete = async (milestoneId) => {
    try {
      const res = await api.patch(`/roadmap/milestone/${milestoneId}/complete/`);
      setMilestones((prev) =>
        prev.map((milestone) =>
          milestone.id === milestoneId
            ? {
                ...milestone,
                is_completed: res.data.is_completed,
                completed_at: res.data.completed_at,
              }
            : milestone,
        ),
      );
    } catch (err) {
      console.error("Failed to update milestone", err);
    }
  };

  const orderedMilestones = useMemo(
    () => [...milestones].sort((a, b) => a.order_number - b.order_number),
    [milestones],
  );

  const completedCount = milestones.filter((milestone) => milestone.is_completed).length;
  const totalCount = milestones.length;
  const progressPercentage = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-page-bg px-4 py-8">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-11 w-72 rounded-2xl bg-surface-low" />
          <div className="h-64 rounded-[34px] bg-surface-low" />
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.95fr]">
            <div className="h-[420px] rounded-[30px] bg-surface-low" />
            <div className="h-[420px] rounded-[30px] bg-surface-low" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page-bg px-4">
        <div className="w-full max-w-xl rounded-[28px] border border-rose-200 bg-rose-50 p-8 text-center shadow-sm">
          <p className="text-sm font-semibold text-rose-700">{error}</p>
          <Link
            to="/student/dashboard"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft className="size-4" />
            Back To Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-[34px] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <Link
            to="/student/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B818D] transition hover:text-[#07606a]"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:items-end">
            <div>
              <p className="text-[11px] font-black tracking-[0.2em] text-indigo-600 uppercase">
                AI Generated Roadmap
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                {roadmap?.title || "Your Career Journey"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                Follow each milestone in order to move from guidance to action
                with a clear, practical path toward your target role.
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 text-white shadow-sm">
              <p className="text-[11px] font-black tracking-[0.18em] text-teal-200 uppercase">
                Target Career
              </p>
              <h2 className="mt-2 text-xl font-bold">
                {roadmap?.career_title || "Career goal"}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                {totalCount} milestones planned for this journey
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-slate-200/70 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-600">Journey Progress</p>
              <p className="text-sm font-bold text-slate-900">
                {completedCount} / {totalCount} completed
              </p>
            </div>

            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0B818D] to-indigo-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <p className="mt-2 text-xs font-medium text-slate-500">
              {progressPercentage}% complete
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.55fr_0.95fr]">
          <section className="rounded-[30px] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-teal-50 text-[#0B818D]">
                <Sparkles className="size-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Milestone Timeline</h2>
                <p className="text-sm text-slate-500">
                  Complete each step to unlock the next one.
                </p>
              </div>
            </div>

            {orderedMilestones.map((milestone, index, array) => {
              let status = "locked";
              if (milestone.is_completed) {
                status = "completed";
              } else if (index === array.findIndex((item) => !item.is_completed)) {
                status = "current";
              }

              return (
                <MilestoneCard
                  key={milestone.id}
                  milestone={milestone}
                  index={index}
                  isLast={index === array.length - 1}
                  status={status}
                  onToggle={toggleComplete}
                />
              );
            })}
          </section>

          <aside className="space-y-4">
            <InfoCard
              icon={Trophy}
              title="Roadmap Completion"
              value={`${progressPercentage}%`}
              description="Your milestone completion rate for the current target career."
              accent="bg-amber-50 text-amber-600"
            />
            <InfoCard
              icon={Target}
              title="Current Focus"
              value={
                orderedMilestones.find((milestone) => !milestone.is_completed)
                  ?.title || "All milestones complete"
              }
              description="This is the next milestone that deserves your attention."
              accent="bg-indigo-50 text-indigo-600"
            />
            <InfoCard
              icon={BookOpen}
              title="Learning Path"
              value={`${totalCount} Steps`}
              description="Each step includes skills, exams, and resources where available."
              accent="bg-emerald-50 text-emerald-600"
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
