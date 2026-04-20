import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
// import { normalizeStudentTracking } from "../../utils/studentTracking";
import { normalizeStudentTracking } from "../../services/utils/studentTracking";
import CounselorRatingModal from "./CounselorRatingModal";
import { handlePayment } from "../../services/utils/payment";
import PricingModal from "../../components/payment/PricingModal";

const CAREER_ICONS = [
  "web",
  "database",
  "account_balance",
  "science",
  "brush",
  "school",
];
const BADGE_CLASSES = [
  {
    iconWrapClass: "bg-teal-50 text-[#0B818D]",
    badgeClass: "bg-emerald-100 text-emerald-700",
  },
  {
    iconWrapClass: "bg-slate-50 text-slate-600",
    badgeClass: "bg-teal-100 text-[#0B818D]",
  },
  {
    iconWrapClass: "bg-indigo-50 text-indigo-600",
    badgeClass: "bg-indigo-100 text-indigo-700",
  },
  {
    iconWrapClass: "bg-amber-50 text-amber-600",
    badgeClass: "bg-amber-100 text-amber-700",
  },
  {
    iconWrapClass: "bg-rose-50 text-rose-600",
    badgeClass: "bg-rose-100 text-rose-700",
  },
  {
    iconWrapClass: "bg-slate-100 text-slate-600",
    badgeClass: "bg-slate-100 text-slate-700",
  },
];

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
  );
}

function formatLabel(value, fallback) {
  if (!value) return fallback;
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function StudentDashboard() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // ── User info ──────────────────────────────────────────────────
  const fullName = user?.full_name || "Student";
  const firstName = fullName.split(" ")[0] || "Student";
  const educationLevel = formatLabel(user?.education_level, "Education not set");
  const stream = formatLabel(user?.stream, "Stream not set");
  const profilePhoto = user?.profile_photo;
  const userInitial = fullName.charAt(0).toUpperCase() || "S";

  // ── Assessment + Report state ──────────────────────────────────
  const [assessment, setAssessment] = useState(null);
  const [report, setReport] = useState(null);
  const [tracking, setTracking] = useState(() =>
    normalizeStudentTracking({
      profile_completed: user?.profile_completed,
      assessment_taken: user?.assessment_taken,
      roadmap_created: user?.roadmap_created,
      is_onboarded: user?.is_onboarded,
    }),
  );

  const sectionStatus = useMemo(() => {
    if (!assessment) return "not_started";
    return assessment.status;
  }, [assessment]);

  useEffect(() => {
    api
      .get("/students/tracking/")
      .then((res) => setTracking(normalizeStudentTracking(res.data)))
      .catch(() => null);

    api
      .get("/assessments/latest/")
      .then((res) => {
        setAssessment(res.data);
        if (res.data.status === "completed") {
          return api.get(`/assessments/${res.data.id}/report/`);
        }
      })
      .then((res) => res && setReport(res.data))
      .catch((err) => console.error(err));
  }, []);

  const {
    profileCompleted,
    assessmentTaken,
    roadmapCreated,
    isOnboarded,
    roadmapProgress,
    roadmapProgressValue, // just in case
  } = tracking;

  const [counselor, setCounselor] = useState(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  const fetchWallet = () => {
    api.get("/payments/wallet/").then((res) => {
      setWalletBalance(res.data.balance_credits || 0);
    }).catch(() => null);
  };

  useEffect(() => {
    api.get("/students/profile/").then(res => {
      if (res.data.counselor_details) {
        setCounselor(res.data.counselor_details);
      }
      // If wallet is inside profile, set it here
      if (res.data.wallet) {
        setWalletBalance(res.data.wallet.balance_credits);
      } else {
        fetchWallet();
      }
    });
  }, []);

  const onPurchaseSuccess = () => {
    // Refresh balance after successful payment
    fetchWallet();
  };

  const handleSelectPlan = (amount, credits) => {
    if (amount === 0) {
      alert("Free plan selected. Enjoy your roadmap!");
      setIsPricingModalOpen(false);
      return;
    }
    handlePayment({
      amount,
      description: `${credits} Career Credit${credits > 1 ? 's' : ''}`,
      user,
      onSuccess: () => {
        onPurchaseSuccess();
        setIsPricingModalOpen(false);
      }
    });
  };

  // ── Next action ────────────────────────────────────────────────
  const nextAction = !assessmentTaken
    ? { label: "Complete your first assessment", path: "/student/assessments" }
    : !roadmapCreated
      ? { label: "Create your roadmap", path: "/student/roadmap" }
      : profileCompleted < 100
        ? { label: "Complete your profile", path: "/student/profile" }
        : { label: "Review your roadmap", path: "/student/roadmap" };

  // ── Career matches from report ─────────────────────────────────
  const careerMatches =
    report?.recommended_careers?.slice(0, 3).map((career, i) => ({
      icon: CAREER_ICONS[i] || "work",
      title: career,
      subtitle: report?.personality_type || "Based on your assessment",
      iconWrapClass: BADGE_CLASSES[i]?.iconWrapClass,
      badgeClass: BADGE_CLASSES[i]?.badgeClass,
    })) || [];

  // ── Todo items ─────────────────────────────────────────────────
  const todoItems = [
    {
      done: assessmentTaken,
      text: assessmentTaken ? "Assessment completed" : "Complete your first assessment",
      path: "/student/assessments",
    },
    {
      done: profileCompleted >= 100,
      text: profileCompleted >= 100 ? "Profile fully completed" : "Complete your student profile",
      path: "/student/profile",
    },
    {
      done: roadmapCreated,
      text: roadmapCreated ? "Career roadmap created" : "Generate your career roadmap",
      path: "/student/roadmap",
    },
    {
      done: isOnboarded,
      text: isOnboarded ? "Onboarding complete" : "Finish your onboarding steps",
      path: "/student/profile",
    },
  ];

  // ── Quick Actions ──────────────────────────────────────────────
  const quickActions = [
    {
      icon: "description",
      label: "View Report",
      path: assessment?.id ? `/student/assessment_report/${assessment.id}` : "/student/assessments",
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      icon: "map",
      label: "My Roadmap",
      path: "/student/roadmap",
      color: "text-[#0B818D] bg-teal-50",
    },
    {
      icon: "manage_accounts",
      label: "Edit Profile",
      path: "/student/profile",
      color: "text-amber-600 bg-amber-50",
    },
    { icon: "explore", label: "Browse Careers", path: "/student/careers", color: "text-rose-600 bg-rose-50" },

  ];



  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-body text-slate-900 antialiased">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">

        {/* ── Header ── */}
        <header className="mb-8 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div>
            <h1 className="text-[24px] leading-tight font-bold text-slate-900">
              Welcome back, {firstName} 👋
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Here&apos;s what&apos;s happening with your career roadmap today.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                <Icon name="search" className="text-xl" />
              </span>
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm shadow-sm outline-none focus:border-transparent focus:ring-2 focus:ring-[#0B818D] sm:w-64"
              />
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/student/notifications"
                className="relative flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Icon name="notifications" />
                <span className="absolute top-2.5 right-2.5 size-2 rounded-full border-2 border-white bg-red-500" />
              </Link>

              {/* Wallet / Credits display */}
              <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50/50 px-3 py-1.5 shadow-sm">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">Balance</span>
                  <span className="text-sm font-black text-indigo-700 leading-none">{walletBalance} Credits</span>
                </div>
                <button
                  onClick={() => setIsPricingModalOpen(true)}
                  className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95"
                  title="Purchase Career Credits"
                >
                  <Icon name="add" className="text-lg" />
                </button>
              </div>

              <PricingModal
                isOpen={isPricingModalOpen}
                onClose={() => setIsPricingModalOpen(false)}
                onSelectPlan={handleSelectPlan}
                user={user}
              />

              <Link to="/student/profile">
                <div className="ml-2 flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm leading-none font-bold text-slate-900">{fullName}</p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {educationLevel} • {stream}
                    </p>
                  </div>
                  <div className="size-10 overflow-hidden rounded-full border border-slate-200 bg-slate-200">
                    {profilePhoto ? (
                      <img alt={fullName} className="h-full w-full object-cover" src={profilePhoto} />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-sm font-bold text-indigo-700">
                        {userInitial}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* ── Stats row ── */}
        <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Aptitude Score */}
          <div className="rounded-[12px] border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
              Aptitude Score
            </p>
            <div className="flex items-end gap-2">
              <span className="font-heading text-3xl font-bold text-slate-900">
                {assessment?.aptitude_score ?? "—"}
              </span>
              <span className="mb-1 flex items-center text-xs font-bold text-emerald-500">
                <Icon name="trending_up" className="text-xs" />
                {assessment ? "points" : "Not taken"}
              </span>
            </div>
          </div>

          {/* Profile Completion — replaces the useless "Skills Assessed 1/1" card */}
          <div className="rounded-[12px] border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
              Profile Completion
            </p>
            <div className="flex items-end gap-2">
              <span className="font-heading text-3xl font-bold text-slate-900">
                {profileCompleted}%
              </span>
              <span className="mb-1 text-xs font-medium text-slate-400">
                {profileCompleted >= 100 ? "Complete" : "Incomplete"}
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#0B818D] transition-all duration-500"
                style={{ width: `${profileCompleted}%` }}
              />
            </div>
          </div>

          {/* Roadmap Progress */}
          <div className="rounded-[12px] border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
              Roadmap Progress
            </p>
            <div className="flex items-end gap-2">
              <span className="font-heading text-3xl font-bold text-slate-900">
                {roadmapCreated ? "Active" : "—"}
              </span>
              <span className="mb-1 text-xs font-medium text-slate-400">
                {roadmapCreated ? "In progress" : "Not created"}
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#0B818D] transition-all duration-500"
                style={{
                  width: `${roadmapCreated ? Math.max(roadmapProgress, 10) : 0}%`,
                }}
              />
            </div>
          </div>

          {/* Next Action */}
          <div className="rounded-[12px] border border-teal-100 bg-teal-50/50 p-6 shadow-sm">
            <p className="mb-1 text-[10px] font-bold tracking-wider text-[#0B818D] uppercase">
              Next Action Required
            </p>
            <p className="font-heading mb-2 font-bold text-slate-900">
              {nextAction.label}
            </p>
            <button
              type="button"
              onClick={() => navigate(nextAction.path)}
              className="flex items-center gap-1 text-xs font-bold text-[#0B818D] hover:underline"
            >



              Start Now <Icon name="arrow_forward" className="text-xs" />
            </button>
          </div>
        </section>

        {/* ── Quick Actions ── */}
        <section className="mb-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className="flex items-center gap-3 rounded-[12px] border border-slate-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className={`flex size-10 items-center justify-center rounded-lg ${action.color}`}>
                  <Icon name={action.icon} />
                </div>
                <span className="text-sm font-bold text-slate-800">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Assessment Progress — hidden once completed ── */}
        {sectionStatus !== "completed" && (
          <section className="mb-8">
            <div className="rounded-[12px] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Assessment Progress</h3>
                <Link
                  to="/student/assessments"
                  className="text-sm font-semibold text-[#0B818D] hover:underline"
                >
                  {sectionStatus === "started" ? "Continue Assessment" : "Start Assessment"}
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { label: "Aptitude & IQ", icon: "psychology", desc: "30 scored questions" },
                  { label: "RIASEC Personality", icon: "person_search", desc: "30 personality questions" },
                  { label: "Interest Profiler", icon: "interests", desc: "20 interest questions" },
                ].map((section) => (
                  <div
                    key={section.label}
                    className="flex items-center gap-4 rounded-xl border border-slate-100 p-4"
                  >
                    <div
                      className={`flex size-12 items-center justify-center rounded-lg ${sectionStatus === "started"
                        ? "bg-amber-50 text-amber-500"
                        : "bg-slate-100 text-slate-400"
                        }`}
                    >
                      <Icon name={section.icon} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{section.label}</p>
                      <p className="text-xs text-slate-400">{section.desc}</p>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${sectionStatus === "started"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-500"
                          }`}
                      >
                        {sectionStatus === "started" ? "In Progress" : "Not Started"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Career Matches + To-Do ── */}
        <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-10">
          {/* Top Career Matches */}
          <div className="overflow-hidden rounded-[12px] border border-slate-100 bg-white shadow-sm lg:col-span-6">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900">Top Career Matches</h3>
              <Link to="/student/careers">View All</Link>

            </div>
            <div className="divide-y divide-slate-50">
              {careerMatches.length > 0 ? (
                careerMatches.map((item, i) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex size-12 items-center justify-center rounded-lg ${item.iconWrapClass}`}
                      >
                        <Icon name={item.icon} />
                      </div>
                      <div>
                        <p className="font-heading font-bold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.subtitle}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.badgeClass}`}>
                      #{i + 1} Match
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-sm text-slate-400">
                  {assessmentTaken
                    ? "Loading your career matches..."
                    : "Complete your assessment to see career matches"}
                </div>
              )}
            </div>
          </div>

          {/* To-Do */}
          {/* <div className="flex flex-col rounded-[12px] border border-slate-100 bg-white shadow-sm lg:col-span-4">
            <div className="border-b border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900">Getting Started</h3>
            </div>
            <div className="space-y-5 p-6">
              {todoItems.map((item) => (
                <button
                  key={item.text}
                  type="button"
                  onClick={() => !item.done && navigate(item.path)}
                  className={`flex w-full items-start gap-3 text-left ${
                    item.done ? "opacity-60 cursor-default" : "cursor-pointer"
                  }`}
                >
                  <div className="mt-0.5">
                    <Icon
                      name={item.done ? "check_circle" : "radio_button_unchecked"}
                      className={item.done ? "text-xl text-emerald-500" : "text-xl text-slate-300"}
                    />
                  </div>
                  <p
                    className={`text-sm ${
                      item.done ? "text-slate-400 line-through" : "text-slate-700"
                    }`}
                  >
                    {item.text}
                  </p>
                </button>
              ))}

              <Link
                to="/student/roadmap"
                className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#0B818D] py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#096d78]"
              >
                View Career Paths
              </Link>
            </div>
          </div> */}
        </section>

        {/* ── RIASEC Personality Type ── */}
        {report?.personality_type && (
          <section className="mb-8">
            <div className="rounded-[12px] border border-indigo-100 bg-gradient-to-r from-indigo-50 to-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Icon name="person_search" className="text-3xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wider text-indigo-400 uppercase">
                      Your Personality Type
                    </p>
                    <h2 className="font-heading text-2xl font-bold text-slate-900">
                      {report.personality_type}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Based on your RIASEC personality assessment
                    </p>
                  </div>
                </div>
                <Link
                  to={`/student/assessment_report/${assessment?.id}`}
                  className="flex items-center gap-1 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-bold text-indigo-600 shadow-sm hover:bg-indigo-50"
                >
                  View Full Report <Icon name="arrow_forward" className="text-sm" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── Mentor Connect CTA ── */}
        <section className="mb-8">
          <div className="rounded-[12px] border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-xl bg-teal-50 text-[#0B818D]">
                  <Icon name="supervised_user_circle" className="text-3xl" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900">
                    Connect with a Mentor
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Get personalised guidance from industry professionals on your career path.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                {counselor && (
                  <button
                    onClick={() => setIsRatingModalOpen(true)}
                    className="rounded-lg border border-amber-500 px-5 py-2.5 text-sm font-bold text-amber-600 transition-colors hover:bg-amber-50"
                  >
                    Rate Counselor
                  </button>
                )}
                <button
                  type="button"
                  className="rounded-lg border border-[#0B818D] px-5 py-2.5 text-sm font-bold text-[#0B818D] transition-colors hover:bg-teal-50"
                  onClick={() => navigate("/student/counselors")}
                >
                  Find a Mentor
                </button>
              </div>
            </div>
          </div>
        </section>

        {counselor && (
          <CounselorRatingModal
            isOpen={isRatingModalOpen}
            onClose={() => setIsRatingModalOpen(false)}
            counselor={counselor}
            onRatingSuccess={() => {
              // Optionally refresh profile to see updated average if needed
            }}
          />
        )}

      </main>
    </div>
  );
}
