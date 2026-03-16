import { useMemo } from "react";
import { Link } from "react-router-dom";

const topCareerMatches = [
  {
    icon: "web",
    title: "UX Designer",
    subtitle: "Creative, Analytical, Tech",
    badge: "94% Match",
    iconWrapClass: "bg-teal-50 text-[#0B818D]",
    badgeClass: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: "database",
    title: "Data Scientist",
    subtitle: "Logical, Math, Tech",
    badge: "88% Match",
    iconWrapClass: "bg-slate-50 text-slate-600",
    badgeClass: "bg-teal-100 text-[#0B818D]",
  },
  {
    icon: "account_balance",
    title: "Civil Services",
    subtitle: "Social, Management, Law",
    badge: "82% Match",
    iconWrapClass: "bg-slate-100 text-slate-600",
    badgeClass: "bg-slate-100 text-slate-700",
  },
];

const todoItems = [
  { done: true, text: "Update science project milestones" },
  { done: false, text: "Complete the RIASEC Interest Inventory" },
  { done: false, text: "Review Data Science roadmap with Priya" },
  { done: false, text: "Download VIT entrance exam guide" },
];

const upcomingActivities = [
  {
    month: "Mar",
    day: "12",
    title: "Counseling Session: Roadmap Review",
    subtitle: "04:30 PM - 05:00 PM",
    monthClass: "text-[#0B818D]",
    cardClass: "bg-teal-50 border-[#0B818D]",
    subtitleClass: "text-slate-500",
    icon: "schedule",
  },
  {
    month: "Mar",
    day: "15",
    title: "Deadline: NIFT Entrance Exam",
    subtitle: "Urgent: Application portal closes at midnight",
    monthClass: "text-red-500",
    cardClass: "bg-red-50 border-red-500",
    subtitleClass: "text-red-600 font-medium",
  },
  {
    month: "Mar",
    day: "18",
    title: "Webinar: Future of Data Science in India",
    subtitle: "Hosted by PathWise Mentors",
    monthClass: "text-slate-400",
    cardClass: "bg-slate-50 border-slate-400",
    subtitleClass: "text-slate-500",
  },
];

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
  );
}

export default function StudentDashboard() {
  const taskButtonStyle = useMemo(
    () => ({
      background: "linear-gradient(to right, #0B818D, #FFFFFF)",
      backgroundSize: "200% 100%",
    }),
    [],
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-body text-slate-900 antialiased">

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-8 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div>
            <h1 className="text-[24px] leading-tight font-bold text-slate-900">
              Welcome back, Arjun 👋
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
              <button
                type="button"
                className="relative flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Icon name="notifications" />
                <span className="absolute top-2.5 right-2.5 size-2 rounded-full border-2 border-white bg-red-500" />
              </button>

              <Link to="/student/profile">
                <div className="ml-2 flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm leading-none font-bold text-slate-900">
                      Arjun Sharma
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Class 12 • Science
                    </p>
                  </div>
                  <div className="size-10 overflow-hidden rounded-full border border-slate-200 bg-slate-200">
                    <img
                      alt="Arjun Sharma"
                      className="h-full w-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIYOUm2gZr9EMAaXdWVFbhhaPrWWzC0BHgnzXuoM24S3dfe22aURHOY7XWDAMEQHtpqXv--GckRWrNoNaUeSfHa5S0acWPiUssS1sfiU-MimaMKem6f2yQR63k3CM67NxBGMUYQa8VVwf1iIyrn2KMPvn2BKhujYbVNbsRuciAFr3Qo7xgrLGAxup3YdF9bRdubA1zZTBL9S6nTJrlAtvSPL52rVpxXnvw5cQ6nDIwCsACA5NAPdKP5u2G36Xv4Z8emLAvlLDw-Q"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[12px] border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
              Career Match Score
            </p>
            <div className="flex items-end gap-2">
              <span className="font-heading text-3xl font-bold text-slate-900">
                78%
              </span>
              <span className="mb-1 flex items-center text-xs font-bold text-emerald-500">
                <Icon name="trending_up" className="text-xs" /> +2%
              </span>
            </div>
          </div>

          <div className="rounded-[12px] border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
              Skills Assessed
            </p>
            <div className="flex items-end gap-2">
              <span className="font-heading text-3xl font-bold text-slate-900">
                12/20
              </span>
              <span className="mb-1 text-xs font-medium text-slate-400">
                Completed
              </span>
            </div>
          </div>

          <div className="rounded-[12px] border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
              Roadmap Progress
            </p>
            <div className="flex items-end gap-2">
              <span className="font-heading text-3xl font-bold text-slate-900">
                35%
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[35%] bg-[#0B818D]" />
            </div>
          </div>

          <div className="rounded-[12px] border border-teal-100 bg-teal-50/50 p-6 shadow-sm">
            <p className="mb-1 text-[10px] font-bold tracking-wider text-[#0B818D] uppercase">
              Next Action Required
            </p>
            <p className="font-heading mb-2 font-bold text-slate-900">
              Complete RIASEC Test
            </p>
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-bold text-[#0B818D] hover:underline"
            >
              Start Now <Icon name="arrow_forward" className="text-xs" />
            </button>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-10">
          <div className="overflow-hidden rounded-[12px] border border-slate-100 bg-white shadow-sm lg:col-span-6">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Top Career Matches
              </h3>
              <button
                type="button"
                className="text-sm font-semibold text-[#0B818D] hover:underline"
              >
                View All
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {topCareerMatches.map((item) => (
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
                      <p className="font-heading font-bold text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500">{item.subtitle}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${item.badgeClass}`}
                  >
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col rounded-[12px] border border-slate-100 bg-white shadow-sm lg:col-span-4">
            <div className="border-b border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Today&apos;s To-Do
              </h3>
            </div>
            <div className="space-y-5 p-6">
              {todoItems.map((item) => (
                <div
                  key={item.text}
                  className={`flex items-start gap-3 ${item.done ? "opacity-60" : ""}`}
                >
                  <div className="mt-0.5">
                    <Icon
                      name={
                        item.done ? "check_circle" : "radio_button_unchecked"
                      }
                      className={
                        item.done
                          ? "text-xl text-emerald-500"
                          : "text-xl text-slate-300"
                      }
                    />
                  </div>
                  <p
                    className={`text-sm ${item.done ? "text-slate-500 line-through" : "text-slate-700"}`}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
              <button
                type="button"
                style={taskButtonStyle}
                className="mt-4 w-full rounded-lg border border-[#0B818D]/10 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-right hover:text-[#0B818D]"
              >
                View All Tasks
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[12px] border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-slate-900">
              Skill Analysis
            </h3>
            <div className="relative flex aspect-square w-full items-center justify-center">
              <div className="h-full w-full p-8">
                <svg
                  className="h-full w-full overflow-visible"
                  viewBox="0 0 200 200"
                >
                  <polygon
                    fill="none"
                    points="100,20 180,100 100,180 20,100"
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                  <polygon
                    fill="none"
                    points="100,50 150,100 100,150 50,100"
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                  <polygon
                    fill="rgba(11, 129, 141, 0.1)"
                    points="100,35 170,100 100,165 40,100"
                    stroke="#0B818D"
                    strokeWidth="2"
                  />
                  <text
                    className="fill-slate-400 text-[10px] font-bold uppercase"
                    textAnchor="middle"
                    x="100"
                    y="10"
                  >
                    Logical
                  </text>
                  <text
                    className="fill-slate-400 text-[10px] font-bold uppercase"
                    textAnchor="start"
                    x="195"
                    y="105"
                  >
                    Creative
                  </text>
                  <text
                    className="fill-slate-400 text-[10px] font-bold uppercase"
                    textAnchor="middle"
                    x="100"
                    y="195"
                  >
                    Technical
                  </text>
                  <text
                    className="fill-slate-400 text-[10px] font-bold uppercase"
                    textAnchor="end"
                    x="5"
                    y="105"
                  >
                    Social
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-[12px] border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-slate-900">
              Upcoming Activity
            </h3>
            <div className="space-y-6">
              {upcomingActivities.map((item) => (
                <div key={`${item.day}-${item.title}`} className="flex gap-4">
                  <div className="flex min-w-[40px] flex-col items-center">
                    <span
                      className={`text-xs font-bold uppercase ${item.monthClass}`}
                    >
                      {item.month}
                    </span>
                    <span className="font-heading text-xl font-bold text-slate-900">
                      {item.day}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div
                      className={`rounded-lg border-l-4 p-3 ${item.cardClass}`}
                    >
                      <p className="font-heading text-sm font-bold text-slate-900">
                        {item.title}
                      </p>
                      <p
                        className={`mt-1 flex items-center gap-1 text-xs ${item.subtitleClass}`}
                      >
                        {item.icon && (
                          <Icon name={item.icon} className="text-[14px]" />
                        )}
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
