export default function ParentDashboard() {
  return (
    <div className="min-h-screen bg-page-bg p-6 font-body text-text-primary lg:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-heading text-3xl font-bold">Parent Dashboard</h1>
        <p className="mt-2 text-text-secondary">
          Track your child&apos;s progress and upcoming activities.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <p className="text-sm text-text-secondary">Completed Milestones</p>
            <p className="mt-2 text-2xl font-bold">8</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <p className="text-sm text-text-secondary">Upcoming Sessions</p>
            <p className="mt-2 text-2xl font-bold">2</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <p className="text-sm text-text-secondary">Overall Progress</p>
            <p className="mt-2 text-2xl font-bold">64%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
