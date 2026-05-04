export default function StudentFeedbackState({
  icon: Icon,
  title,
  description,
  action,
  tone = "neutral",
  compact = false,
}) {
  const toneClass =
    tone === "error"
      ? "bg-rose-50 text-rose-600"
      : tone === "warning"
        ? "bg-amber-50 text-amber-600"
        : "bg-slate-50 text-slate-500";

  return (
    <div
      className={`rounded-[28px] border border-dashed border-slate-300 bg-white px-6 text-center shadow-sm ${
        compact ? "py-8" : "py-10"
      }`}
    >
      {Icon ? (
        <div className={`mx-auto flex size-14 items-center justify-center rounded-2xl ${toneClass}`}>
          <Icon className="size-6" />
        </div>
      ) : null}
      <h2 className="mt-5 text-xl font-black tracking-tight text-slate-950">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
