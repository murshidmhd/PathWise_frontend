import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

function formatLabel(value, fallback = "Not provided") {
  if (!value) return fallback;
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function DetailCard({ label, value, icon }) {
  return (
    <div className="group rounded-[28px] border border-slate-100 bg-slate-50/50 p-6 transition-all hover:border-[#0B818D]/20 hover:bg-white hover:shadow-xl hover:shadow-[#0B818D]/5">
      <div className="flex items-center gap-3">
        {icon && <Icon name={icon} className="text-lg text-[#0B818D]/60" />}
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          {label}
        </p>
      </div>
      <p className="mt-3 text-sm font-bold text-slate-800 leading-relaxed">{value}</p>
    </div>
  );
}

export default function CounselorStudentDetail() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadStudent() {
      try {
        const res = await api.get(`/counselor/students/${studentId}/`);
        if (!isMounted) return;
        setStudent(res.data);
      } catch (err) {
        if (!isMounted) return;
        setError(
          err.response?.data?.detail ||
          "Unable to load this student profile right now.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadStudent();

    return () => {
      isMounted = false;
    };
  }, [studentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-page-bg px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
        Loading student profile...
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-page-bg px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-red-600">{error || "Student not found."}</p>
          <Link
            to="/counselor/students"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Back to students
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/counselor/students"
          className="group inline-flex items-center gap-2 text-sm font-bold text-[#0B818D] transition-all hover:text-[#096b75]"
        >
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
          Back to Student Directory
        </Link>

        <header className="mt-6 rounded-[40px] border border-white bg-white/70 p-8 shadow-2xl shadow-slate-200/50 backdrop-blur-xl sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,129,141,0.08),transparent_40%)]" />
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex size-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#0B818D] to-[#085a63] text-2xl font-black text-white shadow-xl shadow-[#0B818D]/20">
                {(student.full_name || "S")[0].toUpperCase()}
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0B818D]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#0B818D]">
                  Student ID: {studentId.slice(0, 8)}
                </div>
                <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  {student.full_name || "Student"}
                </h1>
                <p className="mt-2 text-lg font-medium text-slate-500">
                  {student.email || "No email available"}
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-100 bg-white/50 p-6 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Profile Integrity
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-4xl font-black text-slate-950">
                  {student.profile_completed ?? 0}%
                </p>
                <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full bg-[#0B818D]" style={{ width: `${student.profile_completed}%` }} />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/50 sm:p-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0B818D]">
                Data Repository
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">
                Core Profile
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <DetailCard label="Full Identity" value={student.full_name || "Not provided"} icon="person" />
              <DetailCard label="Digital Mail" value={student.email || "Not provided"} icon="mail" />
              <DetailCard
                label="Chronology"
                value={student.date_of_birth || "Not provided"}
                icon="calendar_today"
              />
              <DetailCard
                label="Gender Identity"
                value={formatLabel(student.gender)}
                icon="wc"
              />
              <DetailCard label="Direct Line" value={student.phone || "Not provided"} icon="call" />
              <DetailCard
                label="Region"
                value={[student.city, student.state].filter(Boolean).join(", ") || "Not provided"}
                icon="location_on"
              />
              <DetailCard
                label="Academic Degree"
                value={formatLabel(student.education_level)}
                icon="school"
              />
              <DetailCard
                label="Discipline"
                value={formatLabel(student.stream)}
                icon="architecture"
              />
            </div>
          </article>

          <aside className="space-y-8">
            <div className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/50 sm:p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500">
                Journey Tracker
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">
                Pipeline
              </h2>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between rounded-[24px] bg-slate-50/50 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Icon name="verified_user" className={`text-xl ${student.is_onboarded ? "text-emerald-500" : "text-slate-300"}`} />
                    <span className="text-sm font-bold text-slate-700">Onboarding</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${student.is_onboarded ? "text-emerald-500" : "text-slate-400"}`}>
                    {student.is_onboarded ? "Verified" : "Pending"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-[24px] bg-slate-50/50 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Icon name="analytics" className={`text-xl ${student.assessment_taken ? "text-[#0B818D]" : "text-slate-300"}`} />
                    <span className="text-sm font-bold text-slate-700">Assessment</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${student.assessment_taken ? "text-[#0B818D]" : "text-slate-400"}`}>
                    {student.assessment_taken ? "Analyzed" : "Open"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-[24px] bg-slate-50/50 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Icon name="alt_route" className={`text-xl ${student.roadmap_created ? "text-indigo-500" : "text-slate-300"}`} />
                    <span className="text-sm font-bold text-slate-700">Roadmap</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${student.roadmap_created ? "text-indigo-500" : "text-slate-400"}`}>
                    {student.roadmap_created ? "Deployed" : "Locked"}
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[40px] bg-slate-950 p-8 shadow-2xl text-white sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,129,141,0.2),transparent_50%)]" />
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0B818D]">
                  Next Phase
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Counseling Logic
                </h2>
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400">
                  Assessment reports and roadmap simulations will be available soon. You can currently track progress and baseline data.
                </p>
                <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-black text-slate-950 transition-all hover:bg-[#0B818D] hover:text-white active:scale-95">
                  Launch Session
                  <Icon name="rocket_launch" />
                </button>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
