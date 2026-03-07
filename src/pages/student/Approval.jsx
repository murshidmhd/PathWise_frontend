export default function ApprovalPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page-bg px-6 font-body text-text-primary">
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"></div>

      <div className="w-full max-w-xl rounded-2xl border border-border bg-white/90 p-8 text-center shadow-lg backdrop-blur">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-warning/15">
          <span className="material-symbols-outlined text-3xl text-warning">
            hourglass_top
          </span>
        </div>

        <h1 className="font-heading text-3xl font-bold">Approval Pending</h1>
        <p className="mt-3 text-text-secondary">
          Your account is under review. You will get access once approval is
          completed.
        </p>
      </div>
    </div>
  );
}
