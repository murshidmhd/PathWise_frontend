import { AlertTriangle, Sparkles, X } from "lucide-react";

export default function ConfirmSpendModal({
  isOpen,
  title,
  description,
  costLabel = "1 SkillPoint",
  confirmLabel = "Confirm",
  loading = false,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <AlertTriangle className="size-6" />
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex size-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X className="size-5" />
          </button>
        </div>

        <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          {description}
        </p>

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-amber-700">
          <Sparkles className="size-4 shrink-0" />
          <p className="text-sm font-bold">Cost: {costLabel}</p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
