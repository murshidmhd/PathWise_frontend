import { AdminPageFrame, SectionHeading, StatusPill } from "./shared";

const settingGroups = [
  {
    title: "Authentication",
    description: "Google sign-in, OTP flows, and role-based access policies.",
    state: "Protected",
  },
  {
    title: "Notifications",
    description: "Email delivery rules, reminder cadence, and escalation alerts.",
    state: "Healthy",
  },
  {
    title: "Data Retention",
    description: "Storage lifecycle rules for reports, profiles, and assessments.",
    state: "Review due",
  },
];

const statusVariant = {
  Protected: "emerald",
  Healthy: "sky",
  "Review due": "amber",
};

export default function AdminSettings() {
  return (
    <AdminPageFrame
      badge="Platform Settings"
      title="Keep admin controls organized and visible."
      description="Surface the most important platform configuration areas so operational changes can be reviewed deliberately."
    >
      <section className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm">
        <SectionHeading
          eyebrow="Control Center"
          title="Configuration domains"
          description="These settings blocks are laid out to help admins audit platform controls before making changes."
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {settingGroups.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <StatusPill variant={statusVariant[item.state]}>
                  {item.state}
                </StatusPill>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
              <button
                type="button"
                className="mt-5 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white"
              >
                Open settings
              </button>
            </article>
          ))}
        </div>
      </section>
    </AdminPageFrame>
  );
}
