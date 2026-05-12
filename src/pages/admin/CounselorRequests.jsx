import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function Icon({ name, className = "" }) {
    return (
        <span className={`material-symbols-outlined ${className}`}>{name}</span>
    );
}

export default function AdminCounselorRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actioningId, setActioningId] = useState(null);
    const [filterStatus, setFilterStatus] = useState("pending");

    useEffect(() => {
        fetchRequests();
    }, [filterStatus]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/counselor-requests/?status=${filterStatus}`);
            setRequests(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load counselor requests.");
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (requestId, action) => {
        setActioningId(requestId);
        try {
            await api.post(`/admin/counselor-requests/${requestId}/action/`, { action });
            toast.success(`Request ${action === "approve" ? "approved" : "rejected"} successfully.`);
            fetchRequests();
        } catch (err) {
            toast.error("Action failed.");
        } finally {
            setActioningId(null);
        }
    };

    return (
        <div className="min-h-screen bg-page-bg p-4 sm:p-6 lg:p-8">
            <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Counselor Requests</h1>
                    <p className="mt-1 text-sm text-slate-500">Manage student requests for mentor assignments.</p>
                </div>

                <div className="flex rounded-xl border border-white/10 bg-white/5 p-1 shadow-sm">
                    {["pending", "approved", "rejected"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`rounded-lg px-4 py-2 text-sm font-bold capitalize transition-all ${filterStatus === status
                                    ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </header>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="size-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-50 bg-slate-50/50">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Student</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Counselor</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Message</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {requests.map((request) => (
                                    <tr key={request.id} className="transition-colors hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900">{request.student_name}</span>
                                                <span className="text-xs text-slate-500">{request.student_email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-slate-700">{request.counselor_name}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="max-w-xs truncate text-xs text-slate-500" title={request.message}>
                                                {request.message || "No message provided."}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-slate-500">
                                                {new Date(request.created_at).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {request.status === "pending" ? (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        disabled={actioningId !== null}
                                                        onClick={() => handleAction(request.id, "approve")}
                                                        className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
                                                    >
                                                        {actioningId === request.id ? (
                                                            <div className="size-3 animate-spin rounded-full border-2 border-emerald-700 border-t-transparent" />
                                                        ) : (
                                                            <>
                                                                <Icon name="check" className="text-base" /> Approve
                                                            </>
                                                        )}
                                                    </button>
                                                    <button
                                                        disabled={actioningId !== null}
                                                        onClick={() => handleAction(request.id, "reject")}
                                                        className="flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                                                    >
                                                        <Icon name="close" className="text-base" /> Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${request.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                                                    }`}>
                                                    {request.status}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {requests.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-12 text-center">
                            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
                                <Icon name="inbox" className="text-3xl" />
                            </div>
                            <p className="text-sm font-medium text-slate-500">No {filterStatus} requests found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
