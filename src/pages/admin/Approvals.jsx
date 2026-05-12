import { useEffect, useState } from "react";
import { AdminPageFrame, Icon, SectionHeading, StatusPill } from "./shared";
import api from "../../services/api";
import toast from "react-hot-toast";

const statusVariant = {
  pending: "amber",
  approved: "emerald",
  rejected: "rose",
};

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/approvals/");
      setApprovals(res.data.results || res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load approvals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.post(`/admin/approvals/${id}/approve/`);
      toast.success("Approved successfully");
      setApprovals((prev) => prev.filter((item) => item.id !== id));
      if (selectedApproval?.id === id) setSelectedApproval(null);
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason");
    if (!reason) return;

    try {
      await api.post(`/admin/approvals/${id}/reject/`, { reason });
      toast.success("Rejected successfully");
      setApprovals((prev) => prev.filter((item) => item.id !== id));
      if (selectedApproval?.id === id) setSelectedApproval(null);
    } catch (err) {
      toast.error("Rejection failed");
    }
  };

  return (
    <AdminPageFrame
      badge="Admin Approvals"
      title="Review onboarding and access requests."
      description="Keep counselor verification, institution onboarding, and role access flowing through a single queue with clear urgency markers."
    >
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* List Section */}
        <section className={`flex-1 rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm transition-all ${selectedApproval ? 'lg:w-2/3' : 'w-full'}`}>
          <SectionHeading
            eyebrow="Approval Center"
            title="Items waiting for a decision"
            description="Highest-impact requests are surfaced first so admins can keep activation timelines tight."
            action={
              <button
                type="button"
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Export queue
              </button>
            }
          />

          <div className="mt-8 space-y-4">
            {loading && (
              <div className="flex justify-center p-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}

            {!loading && approvals.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                <Icon name="check_circle" className="text-4xl text-emerald-400" />
                <p className="mt-4 text-sm font-medium">All clear! No pending requests.</p>
              </div>
            )}

            {approvals.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedApproval(item)}
                className={`group cursor-pointer rounded-3xl border transition-all p-5 hover:border-amber-200 hover:bg-amber-50/30 ${selectedApproval?.id === item.id ? 'border-amber-300 bg-amber-50 ring-1 ring-amber-100' : 'border-slate-100 bg-slate-50/50'}`}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex gap-4">
                    <div className={`flex size-14 items-center justify-center rounded-2xl transition-colors ${selectedApproval?.id === item.id ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white'}`}>
                      <Icon name="verified_user" className="text-2xl" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-bold text-slate-900 text-lg">
                          {item.full_name}
                        </p>
                        <StatusPill variant={statusVariant[item.approval_status] || "amber"}>
                          {item.approval_status}
                        </StatusPill>
                      </div>
                      <p className="mt-1 text-sm font-medium text-slate-500">Counselor Application</p>
                      <div className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <Icon name="calendar_today" className="text-[14px]" />
                        Submitted {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedApproval(item)}
                      className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
                    >
                      <Icon name="visibility" className="text-lg" />
                      View
                    </button>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-105"
                      title="Approve"
                    >
                      <Icon name="check" className="text-lg font-bold" />
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white shadow-lg shadow-rose-500/20 transition hover:brightness-105"
                      title="Reject"
                    >
                      <Icon name="close" className="text-lg font-bold" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Certificate Preview Side Panel */}
        {selectedApproval && (
          <aside className="w-full shrink-0 animate-in fade-in slide-in-from-right-4 duration-300 lg:w-1/3">
            <div className="sticky top-6 rounded-[32px] border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-200/60">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-sora text-xl font-bold text-slate-900 text-center flex-1">Certificate Proof</h3>
                <button
                  onClick={() => setSelectedApproval(null)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <Icon name="close" className="text-xl font-bold" />
                </button>
              </div>

              <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                {selectedApproval.document ? (
                  <div className="relative group">
                    <img
                      src={selectedApproval.document}
                      alt="Certificate"
                      className="h-auto w-full object-contain max-h-[500px]"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/400x300?text=View+Document+in+New+Tab";
                      }}
                    />
                    <a
                      href={selectedApproval.document}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition group-hover:opacity-100"
                    >
                      <div className="rounded-2xl bg-white p-4 shadow-xl flex flex-col items-center gap-2">
                        <Icon name="open_in_new" className="text-2xl text-slate-900" />
                        <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Open Full Doc</span>
                      </div>
                    </a>
                  </div>
                ) : (
                  <div className="flex h-64 flex-col items-center justify-center text-slate-400">
                    <Icon name="image_not_supported" className="text-5xl" />
                    <p className="mt-4 font-bold">No attachment provided</p>
                    <p className="mt-1 text-xs">This counselor may need to re-upload.</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <Icon name="person" className="text-xl text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Counselor</p>
                      <p className="text-base font-bold text-slate-900">{selectedApproval.full_name}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Icon name="mail" className="text-sm" />
                      {selectedApproval.email}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleApprove(selectedApproval.id)}
                    className="flex-1 rounded-2xl bg-emerald-500 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-105 active:scale-[0.98]"
                  >
                    Approve Request
                  </button>
                  <button
                    onClick={() => handleReject(selectedApproval.id)}
                    className="flex-1 rounded-2xl bg-rose-500 py-4 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition hover:brightness-105 active:scale-[0.98]"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </AdminPageFrame>
  );
}
