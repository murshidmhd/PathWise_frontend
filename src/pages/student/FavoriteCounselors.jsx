import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

function Icon({ name, className = "" }) {
    return (
        <span className={`material-symbols-outlined ${className}`}>{name}</span>
    );
}

export default function FavoriteCounselors() {
    const [counselors, setCounselors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const [favRes, requestsRes] = await Promise.all([
                api.get("/counselors/favorites/"),
                api.get("/counselors/request/")
            ]);
            setCounselors(favRes.data);
            setRequests(requestsRes.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load favorite counselors.");
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (counselorId) => {
        try {
            await api.post(`/counselors/${counselorId}/favorite/`);
            toast.success("Removed from favorites");
            // Refresh the list
            setCounselors(prev => prev.filter(c => c.id !== counselorId));
        } catch (err) {
            toast.error("Failed to update favorite.");
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
                    <div className="flex items-center gap-3">
                        <h1 className="text-[24px] font-bold text-slate-900">Favorite Mentors</h1>
                        <Icon name="favorite" className="text-pink-500 filled" />
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                        Quickly access the experts you've favorited for future guidance.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {counselors.map((counselor) => {
                        const request = getRequestStatus(counselor.id);
                        const isApproved = request?.status === "approved";

                        return (
                            <div key={counselor.id} className="relative flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                                {/* Favorite Toggle Button */}
                                <button 
                                    onClick={() => toggleFavorite(counselor.id)}
                                    className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-pink-50 text-pink-500 transition-transform hover:scale-110 active:scale-95"
                                >
                                    <Icon name="favorite" className="text-xl filled" />
                                </button>

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
                                        <h3 className="truncate font-heading text-lg font-bold text-slate-900 pr-8">{counselor.full_name}</h3>
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
                                            onClick={() => navigate("/student/counselors")}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white shadow-md hover:bg-slate-800"
                                        >
                                            View Details
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {counselors.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 flex size-20 items-center justify-center rounded-3xl bg-pink-50 text-pink-200">
                            <Icon name="favorite" className="text-4xl" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No favorites yet</h3>
                        <p className="mt-1 text-sm text-slate-500 max-w-xs">
                            Start exploring mentors and click the heart icon to save them here.
                        </p>
                        <button
                            onClick={() => navigate("/student/counselors")}
                            className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                        >
                            Explore Mentors
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
