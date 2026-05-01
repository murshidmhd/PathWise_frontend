import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

function Icon({ name, className = "" }) {
    return (
        <span className={`material-symbols-outlined ${className}`}>{name}</span>
    );
}

export default function StudentCounselors() {
    const [counselors, setCounselors] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [requestingId, setRequestingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [counselorsRes, requestsRes] = await Promise.all([
                api.get("/counselors/available/"),
                api.get("/counselors/request/")
            ]);
            setCounselors(counselorsRes.data);
            setRequests(requestsRes.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load counselors.");
        } finally {
            setLoading(false);
        }
    };

    const handleRequest = async (counselorId, message = "") => {
        // Check if there's already a pending request
        const pendingRequest = requests.find(r => r.status === "pending");
        if (pendingRequest) {
            toast.error("You already have a pending counselor request.");
            return;
        }

        setRequestingId(counselorId);
        try {
            await api.post("/counselors/request/", {
                counselor: counselorId,
                message: message || "I would like to request you as my mentor."
            });
            toast.success("Request submitted successfully!");
            fetchData(); // Refresh to see pending status
        } catch (err) {
            const msg = err.response?.data?.detail || "Failed to submit request.";
            toast.error(msg);
        } finally {
            setRequestingId(null);
        }
    };

    const getRequestStatus = (counselorId) => {
        return requests.find(r => r.counselor === counselorId);
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="size-8 animate-spin rounded-full border-4 border-[#0B818D] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-page-bg font-body text-slate-900 antialiased">
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-[24px] font-bold text-slate-900">Find a Mentor</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Browse our list of expert counselors and request a mentor who fits your career goals.
                    </p>
                </header>

                {requests.some(r => r.status === "pending") && (
                    <div className="mb-8 rounded-xl border border-amber-100 bg-amber-50 p-4">
                        <div className="flex items-center gap-3 text-amber-800">
                            <Icon name="info" className="text-xl" />
                            <p className="text-sm font-medium">
                                You have a pending request for <strong>{requests.find(r => r.status === "pending")?.counselor_name}</strong>. Admins will review it soon.
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {counselors.map((counselor) => {
                        const request = getRequestStatus(counselor.id);
                        const isPending = request?.status === "pending";
                        const isApproved = request?.status === "approved";

                        return (
                            <div key={counselor.id} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                                <div className="flex items-start gap-4">
                                    <div className="size-16 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                                        {counselor.profile_photo ? (
                                            <img src={counselor.profile_photo} alt={counselor.full_name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-teal-100 text-lg font-bold text-teal-700 uppercase">
                                                {counselor.full_name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate font-heading text-lg font-bold text-slate-900">{counselor.full_name}</h3>
                                        <p className="mt-0.5 truncate text-sm text-[#0B818D] font-medium">{counselor.specialization || "General Counselor"}</p>
                                        <div className="mt-1.5 flex items-center gap-1">
                                            <Icon name="star" className="text-sm text-amber-500 filled" />
                                            <span className="text-xs font-bold text-slate-700">{counselor.rating || "NEW"}</span>
                                            <span className="mx-1 text-slate-300">•</span>
                                            <span className="text-xs text-slate-500">{counselor.experience_years}y Experience</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex-1">
                                    <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">
                                        {counselor.bio || `Expert in ${counselor.specialization || "career guidance"}. Dedicated to helping students find their ideal path.`}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-bold text-[#0B818D]">
                                            {counselor.qualification || "Certified Mentor"}
                                        </span>
                                        <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
                                            {counselor.city}, {counselor.state}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-50">
                                    {isApproved ? (
                                        <button
                                            onClick={() => navigate("/student/chat")}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B818D] py-3 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <Icon name="chat" className="text-lg" />
                                            Message Mentor
                                        </button>
                                    ) : (
                                        <button
                                            disabled={isPending || requestingId !== null}
                                            onClick={() => handleRequest(counselor.id)}
                                            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${isPending
                                                    ? "bg-amber-100 text-amber-700 cursor-default"
                                                    : "bg-slate-900 text-white shadow-md hover:bg-slate-800 active:scale-[0.98]"
                                                }`}
                                        >
                                            {requestingId === counselor.id ? (
                                                <div className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            ) : isPending ? (
                                                <>
                                                    <Icon name="hourglass_empty" className="text-lg" />
                                                    Request Pending
                                                </>
                                            ) : (
                                                <>
                                                    <Icon name="person_add" className="text-lg" />
                                                    Request Mentor
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {counselors.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 flex size-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                            <Icon name="person_off" className="text-4xl" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No Counselors Available</h3>
                        <p className="mt-1 text-sm text-slate-500 max-w-xs">
                            Check back soon! Our team is onboarding new mentors to help you with your journey.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
