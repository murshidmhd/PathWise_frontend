import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

function Icon({ name, className = "" }) {
    return (
        <span className={`material-symbols-outlined ${className}`}>{name}</span>
    );
}

export default function StudentCounselors() {
    const [counselors, setCounselors] = useState([]);
    const [totalCounselors, setTotalCounselors] = useState(0);
    const [requests, setRequests] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        specializations: [],
        locations: [],
    });
    const [loading, setLoading] = useState(true);
    const [filtering, setFiltering] = useState(false);
    const [requestingId, setRequestingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [specializationFilter, setSpecializationFilter] = useState("all");
    const [locationFilter, setLocationFilter] = useState("all");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [experienceFilter, setExperienceFilter] = useState("all");
    const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);
    const navigate = useNavigate();

    const filterParams = useMemo(() => {
        const params = {};

        if (searchTerm.trim()) params.search = searchTerm.trim();
        if (specializationFilter !== "all") params.specialization = specializationFilter;
        if (locationFilter !== "all") params.location = locationFilter;
        if (ratingFilter !== "all") params.min_rating = ratingFilter;
        if (experienceFilter !== "all") params.min_experience = experienceFilter;

        return params;
    }, [experienceFilter, locationFilter, ratingFilter, searchTerm, specializationFilter]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!hasLoadedInitialData) return;
            fetchCounselors(filterParams);
        }, 350);

        return () => clearTimeout(timeoutId);
    }, [filterParams, hasLoadedInitialData]);

    const normalizeOptions = (data) => ({
        specializations: data?.specializations || data?.specialization || [],
        locations: data?.locations || data?.location || [],
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [counselorsRes, requestsRes, filterOptionsRes] = await Promise.all([
                api.get("/counselors/available/", { params: filterParams }),
                api.get("/counselors/request/"),
                api.get("/counselors/filter-options/")
            ]);
            const initialCounselors = counselorsRes.data?.results || counselorsRes.data;
            setCounselors(initialCounselors);
            setTotalCounselors(counselorsRes.data?.count ?? initialCounselors.length);
            setRequests(requestsRes.data);
            setFilterOptions(normalizeOptions(filterOptionsRes.data));
        } catch (err) {
            console.error(err);
            toast.error("Failed to load counselors.");
        } finally {
            setLoading(false);
            setHasLoadedInitialData(true);
        }
    };

    const fetchCounselors = async (params = {}) => {
        setFiltering(true);
        try {
            const res = await api.get("/counselors/available/", { params });
            setCounselors(res.data?.results || res.data);
            if (res.data?.count !== undefined && Object.keys(params).length === 0) {
                setTotalCounselors(res.data.count);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to filter counselors.");
        } finally {
            setFiltering(false);
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
            const [requestsRes, counselorsRes] = await Promise.all([
                api.get("/counselors/request/"),
                api.get("/counselors/available/", { params: filterParams }),
            ]);
            setRequests(requestsRes.data);
            setCounselors(counselorsRes.data?.results || counselorsRes.data);
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

    const hasActiveFilters =
        searchTerm ||
        specializationFilter !== "all" ||
        locationFilter !== "all" ||
        ratingFilter !== "all" ||
        experienceFilter !== "all";

    const clearFilters = () => {
        setSearchTerm("");
        setSpecializationFilter("all");
        setLocationFilter("all");
        setRatingFilter("all");
        setExperienceFilter("all");
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

                <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                    <div className="grid gap-3 lg:grid-cols-[1.4fr_repeat(4,minmax(0,0.8fr))_auto]">
                        <label className="relative block">
                            <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name, skill, city..."
                                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-[#0B818D] focus:bg-white focus:ring-4 focus:ring-teal-50"
                            />
                        </label>

                        <select
                            value={specializationFilter}
                            onChange={(e) => setSpecializationFilter(e.target.value)}
                            className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#0B818D] focus:ring-4 focus:ring-teal-50"
                        >
                            <option value="all">All Specializations</option>
                            {filterOptions.specializations.map((specialization) => (
                                <option key={specialization} value={specialization}>
                                    {specialization}
                                </option>
                            ))}
                        </select>

                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#0B818D] focus:ring-4 focus:ring-teal-50"
                        >
                            <option value="all">All Locations</option>
                            {filterOptions.locations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>

                        <select
                            value={ratingFilter}
                            onChange={(e) => setRatingFilter(e.target.value)}
                            className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#0B818D] focus:ring-4 focus:ring-teal-50"
                        >
                            <option value="all">Any Rating</option>
                            <option value="4">4+ Stars</option>
                            <option value="3">3+ Stars</option>
                        </select>

                        <select
                            value={experienceFilter}
                            onChange={(e) => setExperienceFilter(e.target.value)}
                            className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#0B818D] focus:ring-4 focus:ring-teal-50"
                        >
                            <option value="all">Any Experience</option>
                            <option value="1">1+ Years</option>
                            <option value="3">3+ Years</option>
                            <option value="5">5+ Years</option>
                        </select>

                        <button
                            type="button"
                            onClick={clearFilters}
                            disabled={!hasActiveFilters}
                            className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
                        >
                            Clear
                        </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 text-xs font-bold text-slate-500">
                        <span>
                            {filtering ? "Updating mentors..." : `Showing ${counselors.length} mentors`}
                        </span>
                        {hasActiveFilters && (
                            <span className="rounded-full bg-teal-50 px-3 py-1 text-[#0B818D]">
                                Filters active
                            </span>
                        )}
                    </div>
                </section>

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
                            <Icon name={totalCounselors ? "manage_search" : "person_off"} className="text-4xl" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">
                            {totalCounselors ? "No mentors match your filters" : "No Counselors Available"}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 max-w-xs">
                            {totalCounselors
                                ? "Try changing your search or clearing filters to see more mentors."
                                : "Check back soon! Our team is onboarding new mentors to help you with your journey."}
                        </p>
                        {totalCounselors ? (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                            >
                                Clear Filters
                            </button>
                        ) : null}
                    </div>
                )}
            </main>
        </div>
    );
}
