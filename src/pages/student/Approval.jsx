export default function ApprovalPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAFC] px-6 text-slate-900">
      <div className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-[#6366F1]/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-[#0D9488]/12 blur-3xl" />

      <div className="w-full max-w-xl rounded-[30px] border border-slate-200 bg-white p-8 text-center shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
          <span className="material-symbols-outlined text-3xl text-amber-500">
            hourglass_top
          </span>
        </div>

        <p className="font-['DM_Sans'] text-sm font-semibold tracking-[0.2em] text-[#6366F1] uppercase">
          PathWise Review
        </p>
        <h1 className="mt-3 font-sora text-3xl font-bold text-slate-950">
          Approval Pending
        </h1>
        <p className="mt-3 font-['DM_Sans'] text-base leading-7 text-slate-500">
          Your account is under review. You will get access once approval is
          completed.
        </p>
      </div>
    </div>
  );
}
