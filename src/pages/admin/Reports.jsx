import { AdminPageFrame, SectionHeading, StatusPill } from "./shared";

const reports = [
  {
    title: "District Adoption",
    detail: "Weekly breakdown of new schools, student completion, and counselor coverage.",
    freshness: "Updated 2 hrs ago",
  },
  {
    title: "Assessment Completion",
    detail: "Tracks drop-off points between registration, profile completion, and skill testing.",
    freshness: "Updated 5 hrs ago",
  },
  {
    title: "Support Resolution",
    detail: "Measures average first response time, reopen rate, and pending issue backlog.",
    freshness: "Updated yesterday",
  },
];

const insights = [
  { label: "Weekly exports", value: "24", state: "Stable" },
  { label: "Automated report health", value: "99.2%", state: "Healthy" },
  { label: "Districts above target", value: "9/14", state: "Strong" },
];

const statusVariant = {
  Stable: "slate",
  Healthy: "emerald",
  Strong: "sky",
};

export default function AdminReports() {
  return (
    <AdminPageFrame
      badge="Admin Reports"
      title="Turn platform activity into decision-ready insight."
      description="Review live reporting surfaces for adoption, assessments, and support operations without leaving the admin console."
    >
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
          <SectionHeading
            eyebrow="Reports Library"
            title="Most used admin reports"
            description="These summaries help leadership spot onboarding bottlenecks and regional momentum quickly."
          />

          <div className="mt-6 space-y-4">
            {reports.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.detail}
                    </p>
                  </div>
                  <span className="text-xs font-medium tracking-[0.18em] text-slate-400 uppercase">
                    {item.freshness}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
          <SectionHeading
            eyebrow="Quick Snapshot"
            title="Reporting pipeline"
            description="A simple health view for the admin reporting surface."
          />

          <div className="mt-6 space-y-3">
            {insights.map((item) => (
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
                  <StatusPill variant={statusVariant[item.state]}>
                    {item.state}
                  </StatusPill>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminPageFrame>
  );
}
