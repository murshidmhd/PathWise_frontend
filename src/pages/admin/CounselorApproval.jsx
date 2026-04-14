import { useEffect, useState } from "react";
import { AdminPageFrame, SectionHeading, StatusPill, Icon } from "./shared";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function CounselorApprovals() {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);

  // 🔹 Fetch pending counselors
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/approvals/");
      // The API returns a list from ListAPIView
      setCounselors(res.data.results || res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch pending approvals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Approve
  const handleApprove = async (id) => {
    try {
      await api.post(`/admin/approvals/${id}/approve/`);
      toast.success("Counselor approved successfully");
      setCounselors((prev) => prev.filter((c) => c.id !== id));
      if (selectedCounselor?.id === id) setSelectedCounselor(null);
    } catch (err) {
      toast.error(err.response?.data?.error || "Approval failed");
    }
  };

  // 🔹 Reject
  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    try {
      await api.post(`/admin/approvals/${id}/reject/`, { reason });
      toast.success("Counselor rejected");
      setCounselors((prev) => prev.filter((c) => c.id !== id));
      if (selectedCounselor?.id === id) setSelectedCounselor(null);
    } catch (err) {
      toast.error(err.response?.data?.error || "Rejection failed");
    }
  };

  return (
    <AdminPageFrame
      badge="Verification"
      title="Counselor Approval Queue"
      description="Review submitted documents and approve or reject counselor onboarding."
    >
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main List Section */}
        <section className={`flex-1 rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-sm transition-all ${selectedCounselor ? 'lg:w-2/3' : 'w-full'}`}>
          <SectionHeading
            eyebrow="Pending Requests"
            title="Counselors waiting for approval"
            description="Verify credentials before granting platform access."
          />

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-100 bg-white">
            <div className="grid grid-cols-[1.5fr_1fr_0.8fr_1fr] border-b border-slate-100 bg-slate-50/50 px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
              <span>Counselor</span>
              <span>Applied On</span>
              <span>Status</span>
              <span className="text-right">Action</span>
            </div>

            <div className="divide-y divide-slate-50">
              {loading && (
                <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <p className="mt-4 text-sm font-medium">Loading requests...</p>
                </div>
              )}

              {!loading && counselors.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                  <Icon name="check_circle" className="text-4xl text-emerald-400" />
                  <p className="mt-4 text-sm font-medium">All caught up! No pending approvals.</p>
                </div>
              )}

              {counselors.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedCounselor(item)}
                  className={`grid cursor-pointer grid-cols-[1.5fr_1fr_0.8fr_1fr] items-center gap-3 px-6 py-5 transition-all hover:bg-slate-50/80 ${selectedCounselor?.id === item.id ? 'bg-amber-50/50 ring-1 ring-inset ring-amber-100' : ''}`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{item.full_name}</span>
                    <span className="mt-1 text-xs text-slate-500">{item.email}</span>
                  </div>

                  <span className="text-xs font-medium text-slate-600">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>

                  <div>
                    <StatusPill variant="amber">Pending</StatusPill>
                  </div>

                  <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition hover:bg-emerald-500 hover:text-white"
                      title="Approve"
                    >
                      <Icon name="check" className="text-lg" />
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition hover:bg-rose-500 hover:text-white"
                      title="Reject"
                    >
                      <Icon name="close" className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificate Preview Side Panel */}
        {selectedCounselor && (
          <aside className="w-full shrink-0 animate-in fade-in slide-in-from-right-4 duration-300 lg:w-1/3">
            <div className="sticky top-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-sora text-lg font-bold text-slate-900">Certificate Preview</h3>
                <button
                  onClick={() => setSelectedCounselor(null)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <Icon name="close" className="text-xl" />
                </button>
              </div>

              <div className="mb-6 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                {selectedCounselor.document ? (
                  <div className="relative group">
                    <img
                      src={selectedCounselor.document}
                      alt="Certificate"
                      className="h-auto w-full object-contain max-h-[400px]"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/400x300?text=Document+Format+Not+Supported";
                      }}
                    />
                    <a
                      href={selectedCounselor.document}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition group-hover:opacity-100"
                    >
                      <span className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-lg">
                        View Full Size
                      </span>
                    </a>
                  </div>
                ) : (
                  <div className="flex h-48 flex-col items-center justify-center text-slate-400">
                    <Icon name="image_not_supported" className="text-4xl" />
                    <p className="mt-2 text-xs">No attachment found</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-amber-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Counselor Details</p>
                  <p className="mt-2 text-sm font-bold text-slate-900">{selectedCounselor.full_name}</p>
                  <p className="text-xs text-slate-600">{selectedCounselor.email}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(selectedCounselor.id)}
                    className="flex-1 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-105"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedCounselor.id)}
                    className="flex-1 rounded-xl bg-rose-500 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition hover:brightness-105"
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