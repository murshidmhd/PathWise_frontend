const statCards = [
  {
    label: "Total Active Users",
    value: "12,480",
    delta: "+8.2%",
    trend: "vs last month",
    icon: "group",
    tone: "from-sky-500/20 to-cyan-400/20 text-sky-700",
  },
  {
    label: "Pending Counselor Reviews",
    value: "18",
    delta: "-4 today",
    trend: "approval queue",
    icon: "verified_user",
    tone: "from-amber-400/25 to-orange-400/25 text-orange-700",
  },
  {
    label: "Sessions Booked",
    value: "346",
    delta: "+14%",
    trend: "this week",
    icon: "calendar_month",
    tone: "from-emerald-400/20 to-teal-400/20 text-emerald-700",
  },
  {
    label: "Platform Uptime",
    value: "99.94%",
    delta: "Healthy",
    trend: "last 30 days",
    icon: "monitor_heart",
    tone: "from-violet-400/20 to-indigo-400/20 text-indigo-700",
  },
];

const approvalQueue = [
  {
    name: "Dr. Meera Nair",
    role: "Counselor",
    specialty: "Career Psychology",
    submitted: "12 Mar 2026",
    status: "Priority",
  },
  {
    name: "Rahul Menon",
    role: "Student Lead",
    specialty: "District onboarding request",
    submitted: "14 Mar 2026",
    status: "Review",
  },
  {
    name: "Ananya Joseph",
    role: "Counselor",
    specialty: "STEM Admissions",
    submitted: "15 Mar 2026",
    status: "New",
  },
];

const recentEvents = [
  {
    title: "Payment settlement exported",
    time: "09:10 AM",
    detail: "Finance batch for 184 transactions completed without errors.",
  },
  {
    title: "Counselor profile approved",
    time: "10:25 AM",
    detail: "Priyanka Das is now available in the mentor marketplace.",
  },
  {
    title: "Spike in student signups",
    time: "11:40 AM",
    detail: "Kozhikode district registrations are 27% above daily baseline.",
  },
  {
    title: "Support ticket escalated",
    time: "12:05 PM",
    detail: "Login issue affecting Google sign-in on Safari is under review.",
  },
];

const districtPerformance = [
  { name: "Thiruvananthapuram", schools: 42, students: 1840, fill: "78%" },
  { name: "Ernakulam", schools: 37, students: 1612, fill: "68%" },
  { name: "Kozhikode", schools: 31, students: 1496, fill: "63%" },
  { name: "Thrissur", schools: 24, students: 1124, fill: "49%" },
];

const healthChecks = [
  { label: "API latency", value: "182 ms", state: "Stable" },
  { label: "Email delivery", value: "98.7%", state: "Healthy" },
  { label: "Storage usage", value: "74%", state: "Watch" },
  { label: "Open support tickets", value: "11", state: "Normal" },
];

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
  );
}

function StatusPill({ children, variant = "slate" }) {
  const variants = {
    amber: "bg-amber-100 text-amber-700",
    sky: "bg-sky-100 text-sky-700",
    emerald: "bg-emerald-100 text-emerald-700",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] p-4 text-slate-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[32px] border border-white/70 bg-slate-950 px-6 py-7 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:px-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-amber-300 uppercase">
                Admin Dashboard
              </div>
              <h1 className="mt-4 font-sora text-3xl font-bold tracking-tight sm:text-4xl">
                See the whole platform in one place.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Monitor onboarding, platform health, counselor approvals, and
                district growth without jumping between tools.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  New signups today
                </p>
                <p className="mt-2 text-2xl font-bold">284</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Approval SLA
                </p>
                <p className="mt-2 text-2xl font-bold">3.8 hrs</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Active districts
                </p>
                <p className="mt-2 text-2xl font-bold">14</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => (
            <article
              key={item.label}
              className="rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                    {item.value}
                  </p>
                </div>
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone}`}
                >
                  <Icon name={item.icon} className="text-[22px]" />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-semibold text-emerald-600">
                  {item.delta}
                </span>
                <span className="text-xs text-slate-400">{item.trend}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Approval Queue
                </p>
                <h2 className="mt-1 font-sora text-2xl font-bold text-slate-900">
                  Reviews needing action
                </h2>
              </div>
              <button
                type="button"
                className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Review all
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {approvalQueue.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                      <Icon name="badge" className="text-[22px]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.role} • {item.specialty}
                      </p>
                      <p className="mt-2 text-xs font-medium tracking-[0.18em] text-slate-400 uppercase">
                        Submitted {item.submitted}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusPill
                      variant={
                        item.status === "Priority"
                          ? "amber"
                          : item.status === "New"
                            ? "sky"
                            : "slate"
                      }
                    >
                      {item.status}
                    </StatusPill>
                    <button
                      type="button"
                      className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white"
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Platform Health
            </p>
            <h2 className="mt-1 font-sora text-2xl font-bold text-slate-900">
              Operational snapshot
            </h2>

            <div className="mt-6 space-y-3">
              {healthChecks.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {item.value}
                      </p>
                    </div>
                    <StatusPill
                      variant={item.state === "Healthy" ? "emerald" : "slate"}
                    >
                      {item.state}
                    </StatusPill>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[28px] bg-slate-950 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Incident monitor
              </p>
              <p className="mt-2 text-lg font-semibold">
                No active severity-1 incidents
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                One medium-priority authentication bug is being triaged by the
                engineering team.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Recent Activity
            </p>
            <h2 className="mt-1 font-sora text-2xl font-bold text-slate-900">
              Live admin feed
            </h2>

            <div className="mt-6 space-y-4">
              {recentEvents.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="mt-1 size-3 rounded-full bg-amber-400" />
                    <div className="mt-2 h-full w-px bg-slate-200 last:hidden" />
                  </div>
                  <div className="pb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <span className="text-xs font-medium text-slate-400">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  District Performance
                </p>
                <h2 className="mt-1 font-sora text-2xl font-bold text-slate-900">
                  Adoption by region
                </h2>
              </div>
              <StatusPill variant="sky">Updated 16 Mar 2026</StatusPill>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <div className="grid grid-cols-[1.3fr_0.7fr_0.7fr_1fr] bg-slate-50 px-5 py-3 text-xs font-bold tracking-[0.14em] text-slate-400 uppercase">
                <span>District</span>
                <span>Schools</span>
                <span>Students</span>
                <span>Utilization</span>
              </div>

              <div className="divide-y divide-slate-200">
                {districtPerformance.map((item) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-[1.3fr_0.7fr_0.7fr_1fr] items-center gap-3 px-5 py-4 text-sm"
                  >
                    <span className="font-semibold text-slate-900">
                      {item.name}
                    </span>
                    <span className="text-slate-600">{item.schools}</span>
                    <span className="text-slate-600">{item.students}</span>
                    <div>
                      <div className="h-2.5 rounded-full bg-slate-100">
                        <div
                          className="h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                          style={{ width: item.fill }}
                        />
                      </div>
                      <p className="mt-2 text-xs font-semibold text-slate-500">
                        {item.fill}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
