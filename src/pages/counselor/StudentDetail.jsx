import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";

function formatLabel(value, fallback = "Not provided") {
  if (!value) return fallback;
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-800">{value}</p>
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
      <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
        Loading student profile...
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 sm:px-6 lg:px-8">
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
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/counselor/students"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B818D] transition hover:text-[#096b75]"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to students
        </Link>

        <header className="mt-4 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-[#0B818D] uppercase">
                Student Profile
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                {student.full_name || "Student"}
              </h1>
              <p className="mt-2 text-base text-slate-500">
                {student.email || "No email available"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                Profile completion
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {student.profile_completed ?? 0}%
              </p>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Personal information
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                Student details
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <DetailCard label="Full Name" value={student.full_name || "Not provided"} />
              <DetailCard label="Email" value={student.email || "Not provided"} />
              <DetailCard
                label="Date of Birth"
                value={student.date_of_birth || "Not provided"}
              />
              <DetailCard
                label="Gender"
                value={formatLabel(student.gender)}
              />
              <DetailCard label="Phone" value={student.phone || "Not provided"} />
              <DetailCard
                label="Location"
                value={[student.city, student.state].filter(Boolean).join(", ") || "Not provided"}
              />
              <DetailCard
                label="Education Level"
                value={formatLabel(student.education_level)}
              />
              <DetailCard
                label="Stream"
                value={formatLabel(student.stream)}
              />
            </div>
          </article>

          <article className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold text-slate-500">Progress</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                Student status
              </h2>

              <div className="mt-6 space-y-4">
                <DetailCard
                  label="Onboarding"
                  value={student.is_onboarded ? "Completed" : "Pending"}
                />
                <DetailCard
                  label="Assessment"
                  value={student.assessment_taken ? "Completed" : "Pending"}
                />
                <DetailCard
                  label="Roadmap"
                  value={student.roadmap_created ? "Created" : "Not created"}
                />
                <DetailCard
                  label="Joined"
                  value={student.created_at || "Not available"}
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold text-slate-500">Next phase</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                Ready for counselor tools
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                This page now uses the real assigned-student backend. Next we can
                add assessment reports, roadmap progress, notes, saved careers,
                chat, and session management inside this student profile.
              </p>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
