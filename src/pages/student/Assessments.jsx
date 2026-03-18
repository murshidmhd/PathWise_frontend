import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Compass,
  Lock,
  Sparkles,
} from "lucide-react";

const assessments = [
  {
    title: "RIASEC Personality Test",
    status: "In Progress",
    progress: 30,
    icon: Compass,
    accent: "text-[#6366F1] bg-[#EEF2FF]",
    buttonLabel: "Continue",
    buttonStyle: "filled",
  },
  {
    title: "Aptitude & IQ",
    status: "Completed",
    progress: 100,
    score: "82/100",
    icon: Brain,
    accent: "text-[#0D9488] bg-[#CCFBF1]",
    buttonLabel: "View Results",
    buttonStyle: "outlined",
  },
  {
    title: "Interest Profiler",
    status: "Not Started",
    progress: 0,
    icon: Sparkles,
    accent: "text-slate-500 bg-slate-100",
    buttonLabel: "Start",
    buttonStyle: "outlined",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Completed: "border border-emerald-200 bg-emerald-50 text-emerald-700",
    "In Progress": "border border-violet-200 bg-violet-50 text-violet-700",
    "Not Started": "border border-slate-200 bg-slate-100 text-slate-500",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function ActionButton({ label, styleType }) {
  const styles =
    styleType === "filled"
      ? "bg-[#6366F1] text-white shadow-[0_18px_30px_rgba(99,102,241,0.22)] hover:bg-[#5558e8]"
      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50";

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${styles}`}
    >
      <span>{label}</span>
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

export default function StudentAssessments() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="font-sora text-4xl font-bold tracking-tight text-slate-950">
            Assessments
          </h1>
          <p className="mt-2 max-w-2xl font-['DM_Sans'] text-base leading-7 text-slate-500">
            Complete all assessments to unlock your full career profile
          </p>
        </header>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold tracking-[0.18em] text-violet-700 uppercase">
                <CheckCircle2 className="h-4 w-4" />
                Progress
              </div>
              <h2 className="mt-4 font-sora text-2xl font-bold text-slate-950">
                2 of 5 Core Assessments Completed
              </h2>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between font-['DM_Sans'] text-sm font-medium text-slate-500">
                  <span>Overall completion</span>
                  <span>40%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 w-[40%] rounded-full bg-gradient-to-r from-[#6366F1] to-[#0D9488]" />
                </div>
              </div>
            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-violet-100 bg-white text-center shadow-sm">
              <div>
                <p className="font-sora text-xl font-bold text-slate-950">2/5</p>
                <p className="font-['DM_Sans'] text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
                  Done
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="grid gap-5 xl:grid-cols-3">
            {assessments.map((assessment) => {
              const Icon = assessment.icon;

              return (
                <article
                  key={assessment.title}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${assessment.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <StatusBadge status={assessment.status} />
                  </div>

                  <h3 className="mt-5 font-sora text-xl font-bold text-slate-950">
                    {assessment.title}
                  </h3>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between font-['DM_Sans'] text-sm font-medium text-slate-500">
                      <span>Progress</span>
                      <span>{assessment.progress}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100">
                      <div
                        className={`h-2.5 rounded-full ${
                          assessment.status === "Completed"
                            ? "bg-[#10B981]"
                            : assessment.status === "In Progress"
                              ? "bg-[#6366F1]"
                              : "bg-slate-200"
                        }`}
                        style={{ width: `${assessment.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 min-h-14">
                    {assessment.score ? (
                      <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                        <p className="font-['DM_Sans'] text-xs font-bold tracking-[0.18em] text-emerald-700 uppercase">
                          Score
                        </p>
                        <p className="mt-1 font-sora text-2xl font-bold text-emerald-700">
                          {assessment.score}
                        </p>
                      </div>
                    ) : (
                      <p className="font-['DM_Sans'] text-sm leading-6 text-slate-500">
                        {assessment.status === "In Progress"
                          ? "You have already started this assessment."
                          : "This assessment is waiting to be started."}
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <ActionButton
                      label={assessment.buttonLabel}
                      styleType={assessment.buttonStyle}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#312E81_0%,#4338CA_100%)] p-6 text-white shadow-[0_24px_60px_rgba(67,56,202,0.25)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.18em] uppercase">
                <Lock className="h-4 w-4" />
                Locked
              </div>
              <h2 className="mt-4 font-sora text-3xl font-bold tracking-tight">
                Unlock Your AI Career Report
              </h2>
              <p className="mt-3 max-w-xl font-['DM_Sans'] text-sm leading-7 text-indigo-100">
                Complete all 3 assessments to generate your report
              </p>
            </div>

            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-['DM_Sans'] text-sm font-semibold text-indigo-100 opacity-70"
            >
              Generate Report
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
