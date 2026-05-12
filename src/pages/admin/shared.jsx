export function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
  );
}

export function StatusPill({ children, variant = "slate" }) {
  const variants = {
    amber: "bg-amber-100 text-amber-700",
    sky: "bg-sky-100 text-sky-700",
    emerald: "bg-emerald-100 text-emerald-700",
    rose: "bg-rose-100 text-rose-700",
    slate: "bg-slate-100 text-slate-600",
    teal: "bg-teal-100 text-teal-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-500">{eyebrow}</p>
        <h2 className="mt-1 font-sora text-2xl font-bold text-slate-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function AdminPageFrame({ badge, title, description, children }) {
  return (
    <div className="bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] p-4 text-slate-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[32px] border border-white/70 bg-slate-950 px-6 py-7 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-amber-300 uppercase">
              {badge}
            </div>
            <h1 className="mt-4 font-sora text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              {description}
            </p>
          </div>
        </section>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
