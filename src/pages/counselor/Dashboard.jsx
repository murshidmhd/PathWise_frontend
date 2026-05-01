import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Icon({ name, className = "" }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}

function StatCard({ title, value, note, tone = "teal", icon = "analytics" }) {
  const tones = {
    teal: "from-[#0B818D] via-[#096b75] to-[#085a63] text-white shadow-[#0B818D]/20",
    indigo: "from-indigo-600 via-indigo-700 to-indigo-800 text-white shadow-indigo-600/20",
    slate: "from-slate-900 via-slate-800 to-slate-900 text-white shadow-slate-900/20",
    white: "from-white to-slate-50 text-slate-900 shadow-slate-200/50",
  };

  const wrapClass =
    tone === "white"
      ? "border border-slate-200/60 shadow-xl shadow-slate-200/30"
      : `border border-white/10 shadow-2xl`;

  const iconWrapClass =
    tone === "white"
      ? "bg-slate-100/80 text-[#0B818D]"
      : "bg-white/20 text-white backdrop-blur-sm";

  return (
    <article
      className={`group relative overflow-hidden rounded-[32px] bg-gradient-to-br p-6 transition-all duration-300 hover:-translate-y-1 ${tones[tone]} ${wrapClass}`}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-150" />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-[0.25em] ${tone === "white" ? "text-slate-400" : "text-white/60"}`}>
            {title}
          </p>
          <p className="mt-4 text-4xl font-black tracking-tight">{value}</p>
        </div>
        <div className={`flex size-12 items-center justify-center rounded-2xl ${iconWrapClass}`}>
          <Icon name={icon} className="text-[24px]" />
        </div>
      </div>
      <p className={`mt-4 text-[13px] font-medium leading-relaxed ${tone === "white" ? "text-slate-500" : "text-white/80"}`}>
        {note}
      </p>
    </article>
  );
}

function StudentPill({ complete, label }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${complete
        ? "bg-emerald-100 text-emerald-700"
        : "bg-amber-100 text-amber-700"
        }`}
    >
      <span
        className={`size-1.5 rounded-full ${complete ? "bg-emerald-500" : "bg-amber-500"
          }`}
      />
      {label}
    </span>
  );
}

export default function CounselorDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadStudents() {
      try {
        const res = await api.get("/counselor/students/");
        if (!isMounted) return;
        setStudents(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (!isMounted) return;
        setError(
          err.response?.data?.detail ||
          "Unable to load assigned students right now.",
        );
        setStudents([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadStudents();

    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = useMemo(() => {
    const total = students.length;
    const assessmentsDone = students.filter((s) => s.assessment_taken).length;
    const roadmapsReady = students.filter((s) => s.roadmap_created).length;
    const profileComplete = students.filter(
      (s) => Number(s.profile_completed || 0) >= 100,
    ).length;
    const needsAttention = students.filter(
      (s) => !s.assessment_taken || !s.roadmap_created,
    ).length;
    const avgProfile =
      total > 0
        ? Math.round(
          students.reduce(
            (acc, student) => acc + Number(student.profile_completed || 0),
            0,
          ) / total,
        )
        : 0;

    return {
      total,
      assessmentsDone,
      roadmapsReady,
      profileComplete,
      needsAttention,
      avgProfile,
    };
  }, [students]);

  const priorityStudents = useMemo(
    () =>
      students
        .filter((s) => !s.assessment_taken || !s.roadmap_created)
        .sort((a, b) => Number(a.profile_completed || 0) - Number(b.profile_completed || 0))
        .slice(0, 5),
    [students],
  );

  const recentlyReady = useMemo(
    () =>
      [...students]
        .sort((a, b) => Number(b.profile_completed || 0) - Number(a.profile_completed || 0))
        .slice(0, 6),
    [students],
  );

  return (
    <div className="min-h-screen bg-page-bg px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="relative overflow-hidden rounded-[40px] border border-white bg-white/70 p-8 shadow-2xl shadow-slate-200/50 backdrop-blur-xl sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,129,141,0.1),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.08),transparent_40%)]" />
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0B818D]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0B818D]">
                <span className="size-1.5 rounded-full bg-[#0B818D] animate-pulse" />
                Counselor Dashboard
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Guidance Cockpit
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-500">
                Track progress, spot blockers early, and drive students from
                assessment to roadmap completion with precision tools.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/counselor/students"
                className="group inline-flex items-center gap-2 rounded-[22px] bg-slate-950 px-7 py-4 text-sm font-bold text-white transition-all hover:bg-[#0B818D] hover:shadow-xl hover:shadow-[#0B818D]/20 active:scale-95"
              >
                Student directory
                <Icon name="arrow_forward" className="text-[20px] transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/counselor/chat"
                className="inline-flex items-center gap-2 rounded-[22px] border-2 border-slate-100 bg-white px-7 py-4 text-sm font-bold text-slate-700 transition-all hover:border-[#0B818D]/30 hover:bg-slate-50 hover:text-[#0B818D] active:scale-95"
              >
                Open chat
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Assigned Students"
            value={loading ? "..." : metrics.total}
            note="Total active mentees under your care."
            tone="teal"
            icon="groups"
          />
          <StatCard
            title="Assessment Done"
            value={loading ? "..." : metrics.assessmentsDone}
            note="Students ready for report-based counselling."
            tone="indigo"
            icon="task_alt"
          />
          <StatCard
            title="Roadmaps Ready"
            value={loading ? "..." : metrics.roadmapsReady}
            note="Learners with a defined career path."
            tone="slate"
            icon="route"
          />
          <StatCard
            title="Avg Profile"
            value={loading ? "..." : `${metrics.avgProfile}%`}
            note="Data quality across your student cohort."
            tone="white"
            icon="manage_accounts"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-rose-500">
                  Action Required
                </p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  Priority Queue
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600">
                <span className="size-2 rounded-full bg-rose-500" />
                {loading ? "Checking..." : `${metrics.needsAttention} flagged`}
              </div>
            </div>

            {loading ? (
              <p className="py-8 text-sm text-slate-500">Loading priorities...</p>
            ) : error ? (
              <p className="py-8 text-sm text-rose-600">{error}</p>
            ) : priorityStudents.length === 0 ? (
              <p className="py-8 text-sm text-slate-500">
                Great work. No urgent blockers right now.
              </p>
            ) : (
              <div className="mt-8 space-y-4">
                {priorityStudents.map((student) => (
                  <div
                    key={student.id}
                    className="group relative flex flex-col gap-5 rounded-[28px] border border-slate-100 bg-slate-50/50 p-6 transition-all hover:border-[#0B818D]/20 hover:bg-white hover:shadow-xl hover:shadow-[#0B818D]/5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-[#0B818D] text-sm font-bold text-white">
                          {(student.full_name || "S")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-lg font-bold text-slate-950">
                            {student.full_name || "Student"}
                          </p>
                          <p className="text-sm font-medium text-slate-500">
                            {student.email || "No email available"}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/counselor/students/${student.id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-black uppercase tracking-[0.14em] text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-slate-950 hover:text-white hover:ring-slate-950"
                      >
                        View Profile
                        <Icon name="open_in_new" className="text-[16px]" />
                      </Link>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
                      <StudentPill
                        complete={Boolean(student.assessment_taken)}
                        label={student.assessment_taken ? "Assessment done" : "Assessment pending"}
                      />
                      <StudentPill
                        complete={Boolean(student.roadmap_created)}
                        label={student.roadmap_created ? "Roadmap ready" : "Roadmap pending"}
                      />
                      <div className="ml-auto inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
                        <Icon name="monitoring" className="text-sm" />
                        {Number(student.profile_completed || 0)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="border-b border-slate-100 pb-8">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500">
                Growth Insights
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">
                Momentum Board
              </h2>
            </div>

            <div className="mt-8 space-y-6">
              <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Fully Complete Profiles
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-4xl font-black text-slate-950">
                    {loading ? "..." : metrics.profileComplete}
                  </p>
                  <span className="text-sm font-bold text-emerald-500">Active</span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Quality Score
                  </p>
                  <p className="text-sm font-black text-[#0B818D]">
                    {loading ? "..." : `${metrics.avgProfile}%`}
                  </p>
                </div>
                <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0B818D] to-indigo-500 transition-all duration-700"
                    style={{ width: `${loading ? 0 : metrics.avgProfile}%` }}
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-white bg-white p-6 shadow-xl shadow-slate-200/40">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Top Ready Students
                </p>
                {loading ? (
                  <p className="mt-4 text-sm font-medium text-slate-400">Analyzing cohort...</p>
                ) : recentlyReady.length === 0 ? (
                  <p className="mt-4 text-sm font-medium text-slate-400">No students yet.</p>
                ) : (
                  <div className="mt-5 space-y-3">
                    {recentlyReady.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between rounded-2xl border border-slate-50 bg-slate-50/80 px-4 py-3 transition-colors hover:bg-slate-100/80"
                      >
                        <p className="truncate text-sm font-bold text-slate-800">
                          {student.full_name || "Student"}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-8 rounded-full bg-slate-200 overflow-hidden">
                            <div className="h-full bg-[#0B818D]" style={{ width: `${student.profile_completed}%` }} />
                          </div>
                          <span className="text-[11px] font-black text-[#0B818D]">
                            {Number(student.profile_completed || 0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
