import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  FileText,
  Sparkles,
} from "lucide-react";
import api from "../../services/api";

function getUiState(assessment) {
  if (!assessment) {
    return {
      title: "Ready to discover your best-fit career path?",
      description:
        "Start your assessment to unlock personalized career matches, strengths, and your next roadmap steps.",
      buttonLabel: "Start Assessment",
      action: "start",
      badge: "Not Started",
      badgeClass: "bg-white/15 text-teal-50 ring-1 ring-white/15",
      icon: FileText,
      iconWrapClass: "bg-white/12 text-white",
      accentClass: "from-[#0B818D] via-[#0A6C76] to-[#111C2D]",
    };
  }

  if (assessment.status === "completed") {
    return {
      title: "Your assessment is complete",
      description:
        "Your report is ready. Review your results, strengths, and recommended careers in one place.",
      buttonLabel: "View Report",
      action: "report",
      badge: "Completed",
      badgeClass: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
      icon: CheckCircle2,
      iconWrapClass: "bg-emerald-100 text-emerald-700",
      accentClass: "from-emerald-500 via-teal-500 to-[#111C2D]",
    };
  }

  return {
    title: "You already made progress",
    description:
      "Pick up where you left off and finish your assessment to generate your personalized report.",
    buttonLabel: "Continue Assessment",
    action: "continue",
    badge: "In Progress",
    badgeClass: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
    icon: Clock3,
    iconWrapClass: "bg-amber-100 text-amber-700",
    accentClass: "from-amber-400 via-[#0B818D] to-[#111C2D]",
  };
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-page-bg px-4 py-8 font-body">
      <div className="mx-auto max-w-6xl animate-pulse space-y-6">
        <div className="h-9 w-56 rounded-2xl bg-surface-low" />
        <div className="h-[320px] rounded-[32px] bg-surface-low" />
        <div className="grid gap-6 lg:grid-cols-[1.55fr_0.95fr]">
          <div className="h-56 rounded-[28px] bg-surface-low" />
          <div className="h-56 rounded-[28px] bg-surface-low" />
        </div>
      </div>
    </div>
  );
}

function DetailCard({ label, value, tone = "default" }) {
  const toneClasses =
    tone === "status"
      ? "bg-teal-50 text-[#0B818D]"
      : "bg-slate-50 text-slate-700";

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400 uppercase">
        {label}
      </p>
      <div
        className={`mt-3 inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold ${toneClasses}`}
      >
        {value}
      </div>
    </div>
  );
}

function QuickInfoCard({ icon: Icon, title, description, iconClass }) {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className={`flex size-11 items-center justify-center rounded-2xl ${iconClass}`}>
        <Icon className="size-5" />
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

export default function StudentAssessments() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await api.get("/assessments/latest/");
        setAssessment(res.data);
      } catch (err) {
        if (err.response?.status !== 404) {
          setError("Unable to load assessment details right now.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, []);

  const handleAssessmentAction = async () => {
    try {
      setSubmitting(true);
      setError("");

      if (!assessment) {
        const res = await api.post("/assessments/start/");
        navigate(`/student/assessment_question/${res.data.id}`);
        return;
      }

      if (assessment.status === "started") {
        navigate(`/student/assessment_question/${assessment.id}`);
        return;
      }

      if (assessment.status === "completed") {
        navigate(`/student/assessment_report/${assessment.id}`);
      }
    } catch {
      setError("Unable to continue the assessment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const uiState = getUiState(assessment);
  const progressValue = assessment?.status === "completed" ? 100 : assessment ? 55 : 0;
  const statusDescription = useMemo(() => {
    if (!assessment) return "Your assessment hasn’t been started yet.";
    if (assessment.status === "completed") {
      return "Everything is done and your report can be opened anytime.";
    }
    return "You have an active session waiting for you to continue.";
  }, [assessment]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  const HeroIcon = uiState.icon;

  return (
    <div className="min-h-screen bg-page-bg px-4 py-8 font-body text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center rounded-full bg-teal-50 px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-[#0B818D] uppercase">
            Student Assessment
          </span>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Assessment Hub
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Keep your assessment journey in one place, from starting the test
                to reviewing your career-fit report.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-sm">
              <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                Current state
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                {statusDescription}
              </p>
            </div>
          </div>
        </header>

        <section
          className={`relative overflow-hidden rounded-[32px] bg-gradient-to-br ${uiState.accentClass} p-6 text-white shadow-float sm:p-8 lg:p-10`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.16),transparent_24%)]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-end">
            <div className="max-w-2xl">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase ${uiState.badgeClass}`}
              >
                {uiState.badge}
              </span>
              <div className="mt-5 flex items-start gap-4">
                <div
                  className={`flex size-14 shrink-0 items-center justify-center rounded-2xl backdrop-blur-sm ${uiState.iconWrapClass}`}
                >
                  <HeroIcon className="size-7" />
                </div>
                <div>
                  <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
                    {uiState.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-100/90 sm:text-base">
                    {uiState.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleAssessmentAction}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:translate-y-[-1px] hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Please wait..." : uiState.buttonLabel}
                  {!submitting && <ArrowRight className="size-4" />}
                </button>

                {assessment?.status === "completed" && (
                  <button
                    type="button"
                    onClick={() => navigate("/student/careers")}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                  >
                    Explore Careers
                  </button>
                )}
              </div>

              {error && (
                <p className="mt-5 rounded-2xl border border-red-200/50 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}
            </div>

            <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 shadow-sm backdrop-blur-md">
              <p className="text-[11px] font-bold tracking-[0.18em] text-slate-100/70 uppercase">
                Assessment snapshot
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-100/80">
                    <span>Completion</span>
                    <span className="font-semibold text-white">{progressValue}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-white transition-all"
                      style={{ width: `${progressValue}%` }}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl bg-white/8 p-4">
                    <p className="text-[11px] font-bold tracking-[0.18em] text-slate-100/65 uppercase">
                      Status
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {assessment?.status || "not started"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/8 p-4">
                    <p className="text-[11px] font-bold tracking-[0.18em] text-slate-100/65 uppercase">
                      Assessment ID
                    </p>
                    <p className="mt-2 truncate text-sm font-semibold text-white">
                      {assessment?.id || "Will be created when you begin"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.55fr_0.95fr]">
          <section className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-[#0B818D]">
                <BarChart3 className="size-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Assessment details</h2>
                <p className="mt-1 text-sm text-slate-500">
                  A clearer view of where you are in the process.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <DetailCard
                label="Assessment status"
                value={assessment?.status || "Not started"}
                tone="status"
              />
              <DetailCard
                label="Assessment ID"
                value={assessment?.id || "Pending"}
              />
            </div>

            <div className="mt-6 rounded-[24px] bg-slate-50 p-5">
              <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                What happens next
              </p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p>
                  Start the assessment to answer the full question set and help
                  PathWise understand your strengths and interests.
                </p>
                <p>
                  Once completed, you can open your report and use it to guide
                  career exploration and roadmap planning.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <QuickInfoCard
              icon={Sparkles}
              title="Personalized outcomes"
              description="Your report helps surface suitable career directions, strengths, and learning focus areas."
              iconClass="bg-indigo-50 text-indigo-600"
            />
            <QuickInfoCard
              icon={FileText}
              title="Simple next step"
              description="You can begin, continue, or review your report from this same page without searching around."
              iconClass="bg-teal-50 text-[#0B818D]"
            />
            <QuickInfoCard
              icon={CheckCircle2}
              title="Built for consistency"
              description="This view now follows the same card shapes, spacing, and color balance used across your student area."
              iconClass="bg-emerald-50 text-emerald-600"
            />
          </section>
        </div>
      </div>
    </div>
  );
}
