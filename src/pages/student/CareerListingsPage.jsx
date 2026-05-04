import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Map, BriefcaseBusiness, AlertTriangle, ClipboardList } from "lucide-react";
import api from "../../services/api";
import SectionTabs from "../../components/student/SectionTabs";
import StudentFeedbackState from "../../components/student/StudentFeedbackState";

const careerTabs = [
  { label: "Career Matches", to: "/student/careers", icon: BriefcaseBusiness, end: true },
  { label: "Roadmap", to: "/student/careers/roadmap", icon: Map },
];

export default function CareerListingsPage() {
  const [careers, setCareers] = useState([]);
  const [personalityType, setPersonalityType] = useState("");
  const [assessmentId, setAssessmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadCareers() {
      try {
        const assessmentRes = await api.get("/assessments/latest/");
        if (!isMounted) return;

        const latestAssessment = assessmentRes.data;
        setAssessmentId(latestAssessment?.id || null);

        if (!latestAssessment?.id || latestAssessment.status !== "completed") {
          setCareers([]);
          return;
        }

        const reportRes = await api.get(
          `/assessments/${latestAssessment.id}/report/`,
        );
        if (!isMounted) return;

        setCareers(
          Array.isArray(reportRes.data?.recommended_careers)
            ? reportRes.data.recommended_careers.filter(Boolean)
            : [],
        );
        setPersonalityType(reportRes.data?.personality_type || "");
      } catch (err) {
        if (!isMounted) return;
        setError(
          err.response?.data?.detail ||
            "Unable to load career recommendations right now.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCareers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-page-bg px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <SectionTabs tabs={careerTabs} />
        </div>

        <header className="mb-8 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-[#6366F1] uppercase">
                Career Listings
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                Recommended careers
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                Explore the roles suggested by your latest completed assessment,
                then open your roadmap to see the step-by-step path ahead.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {assessmentId ? (
                <Link
                  to={`/student/assessment_report/${assessmentId}`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  View Report
                </Link>
              ) : null}
              <Link
                to="/student/careers/roadmap"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open Roadmap
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-10 text-sm text-slate-500 shadow-sm">
            Loading career recommendations...
          </div>
        ) : error ? (
          <StudentFeedbackState
            icon={AlertTriangle}
            title="We could not load careers"
            description={error}
            tone="error"
            action={
              <Link
                to="/student/assessments"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Go to Assessments
              </Link>
            }
          />
        ) : careers.length === 0 ? (
          <StudentFeedbackState
            icon={ClipboardList}
            title="No recommended careers yet"
            description="Complete your assessment report first. Once recommendations are available, they will appear here."
            action={
              <Link
                to="/student/assessments"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Start Assessment
              </Link>
            }
          />
        ) : (
          <>
            {personalityType ? (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] px-4 py-2 text-sm font-semibold text-[#4338CA]">
                <Sparkles className="h-4 w-4" />
                Based on your {personalityType} profile
              </div>
            ) : null}

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {careers.map((career, index) => (
                <article
                  key={`${career}-${index}`}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4338CA]">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                      #{index + 1}
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-bold text-slate-950">
                    {career}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    This role is one of the top matches from your latest
                    assessment report.
                  </p>

                  <div className="mt-6 flex gap-3">
                    {index === 0 ? (
                      <Link
                        to="/student/careers/roadmap"
                        className="inline-flex items-center gap-2 rounded-2xl bg-[#0B818D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#096b75]"
                      >
                        <Map className="h-4 w-4" />
                        View Roadmap
                      </Link>
                    ) : (
                      <span className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-500">
                        Roadmap available later
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
