import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function CounselorDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStudents() {
      try {
        const res = await api.get("/counselor/students/");
        if (!isMounted) return;
        setStudents(Array.isArray(res.data) ? res.data : []);
      } catch {
        if (!isMounted) return;
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 text-slate-900 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-[#0B818D] uppercase">
            Counselor Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Overview
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your assigned students and use this space as the base for
            counselor workflows.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Assigned Students</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {loading ? "..." : students.length}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Ready For Review</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {loading
                ? "..."
                : students.filter((student) => student.assessment_taken).length}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Roadmaps Created</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {loading
                ? "..."
                : students.filter((student) => student.roadmap_created).length}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">
            Start with assigned students
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            The assigned-students backend is connected. Open the student list to
            view profile data from the new counselor endpoints.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/counselor/students"
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View Assigned Students
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
            <Link
              to="/counselor/profile"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Open Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
