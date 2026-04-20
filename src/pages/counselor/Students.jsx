import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

function formatLabel(value, fallback = "Not set") {
  if (!value) return fallback;
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function CounselorStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

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

  const filteredStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return students;
    }

    return students.filter((student) =>
      [student.full_name, student.email, student.city, student.state]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [query, students]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-[#0B818D] uppercase">
              Counselor Students
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
              Assigned students
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-500">
              Review the students assigned to you and open a detailed profile
              for guidance, progress tracking, and follow-up.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
              Total assigned
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-950">
              {students.length}
            </p>
          </div>
        </header>

        <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Student directory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Search by student name, email, city, or state.
              </p>
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students..."
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0B818D] focus:bg-white md:max-w-xs"
            />
          </div>

          {loading ? (
            <div className="py-12 text-sm text-slate-500">
              Loading assigned students...
            </div>
          ) : error ? (
            <div className="py-12 text-sm text-red-600">{error}</div>
          ) : filteredStudents.length === 0 ? (
            <div className="py-12 text-sm text-slate-500">
              {students.length === 0
                ? "No students have been assigned to you yet."
                : "No students match your search."}
            </div>
          ) : (
            <div className="mt-8 grid gap-6 xl:grid-cols-2">
              {filteredStudents.map((student) => (
                <article
                  key={student.id}
                  className="group relative flex flex-col gap-6 rounded-[32px] border border-slate-50 bg-slate-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B818D]/20 hover:bg-white hover:shadow-2xl hover:shadow-[#0B818D]/10"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex size-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#0B818D] to-[#085a63] text-lg font-black text-white shadow-lg shadow-[#0B818D]/20">
                        {(student.full_name || "S")[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-950">
                          {student.full_name || "Student"}
                        </h3>
                        <p className="text-sm font-medium text-slate-500">
                          {student.email || "No email available"}
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-[11px] font-black text-emerald-700">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      {student.profile_completed ?? 0}% PROGRESS
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[20px] border border-slate-100 bg-white/50 px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Academic Path
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-800">
                        {formatLabel(student.education_level)} • {formatLabel(student.stream)}
                      </p>
                    </div>
                    <div className="rounded-[20px] border border-slate-100 bg-white/50 px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Current Location
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-800">
                        {[student.city, student.state].filter(Boolean).join(", ") || "Not provided"}
                      </p>
                    </div>
                    <div className="rounded-[20px] border border-slate-100 bg-white/50 px-4 py-3 sm:col-span-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Counseling Status
                      </p>
                      <div className="mt-2 flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <Icon name={student.assessment_taken ? "check_circle" : "pending"} className={`text-sm ${student.assessment_taken ? "text-emerald-500" : "text-amber-500"}`} />
                          Assessment
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <Icon name={student.roadmap_created ? "check_circle" : "pending"} className={`text-sm ${student.roadmap_created ? "text-emerald-500" : "text-amber-500"}`} />
                          Roadmap
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/counselor/students/${student.id}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-[20px] bg-slate-950 py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-[#0B818D] hover:shadow-[#0B818D]/20 active:scale-95 sm:w-auto sm:px-8"
                    >
                      Analyze Profile
                      <Icon name="arrow_forward" className="text-[20px]" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
