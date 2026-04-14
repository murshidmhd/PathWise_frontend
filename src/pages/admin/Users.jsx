import { useEffect, useMemo, useState } from "react";
import { AdminPageFrame, SectionHeading, StatusPill } from "./shared";
import {
  User,
  Users,
  School,
  ArrowUpRight,
  Search,
  Filter,
} from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

// No-longer needed hardcoded userGroups in static constant
// We'll move it inside the component to use real data.

const recentUsers = [
  {
    name: "Aarav Pillai",
    role: "Student",
    joined: "09:20 AM",
    state: "Active",
  },
  {
    name: "Dr. Priyanka Das",
    role: "Counselor",
    joined: "10:45 AM",
    state: "Pending",
  },
  {
    name: "Green Valley School",
    role: "Institution",
    joined: "12:15 PM",
    state: "Invited",
  },
];


// Mapping your brand colors to StatusPill variants
const statusVariant = {
  Active: "teal", // Using your Primary
  Healthy: "teal",
  Pending: "amber", // Using your Tertiary
  Watchlist: "amber",
  Invited: "slate", // Using your Neutral
  Growing: "teal",
};

function getAssignedCounselorId(student, fallback = "") {
  const counselorData = 
    student.assigned_counselor_detail || 
    student.assigned_counselor || 
    student.counselor;

  // If it's an object with an ID, return the ID as a string
  if (counselorData && typeof counselorData === "object" && counselorData.id) {
    return String(counselorData.id);
  }

  // If it's just the ID (number or string), return it as a string
  if (counselorData) {
    return String(counselorData);
  }

  return fallback;
}

export default function AdminUsers() {
  const [userData, setUserData] = useState({ students: [], counselors: [] });
  const [activeTab, setActiveTab] = useState("counselors");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCounselors, setSelectedCounselors] = useState({});
  const [savingStudentId, setSavingStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setLoadError("");
        const res = await api.get("admin/users/");

        setUserData(res.data);

        setSelectedCounselors((current) => {
          const nextSelections = {};
          (res.data.students || []).forEach((student) => {
            nextSelections[student.id] = getAssignedCounselorId(
              student,
              current[student.id] || "",
            );
          });
          return nextSelections;
        });
      } catch (error) {
        setLoadError(error.response?.data?.detail || "Unable to load admin users.");
        toast.error(
          error.response?.data?.detail || "Unable to load admin users.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedUsers = useMemo(() => {
    const source =
      activeTab === "students" ? userData.students : userData.counselors;
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return source;
    }

    return source.filter((item) =>
      [
        item.full_name,
        item.email,
        item.role,
        item.approval_status,
        item.state,
        item.specialization,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [activeTab, searchQuery, userData.counselors, userData.students]);

  const handleAssignCounselor = async (studentId) => {
    setSavingStudentId(studentId);

    try {
      const counselorId = selectedCounselors[studentId];
      const payload = {
        assigned_counselor: counselorId === "" ? null : Number(counselorId),
      };

      try {
        await api.patch(`admin/students/${studentId}/assign-counselor/`, payload);
      } catch (error) {
        if (error.response?.status !== 404) {
          throw error;
        }

        await api.patch(`students/${studentId}/assign-counselor/`, payload);
      }

      const res = await api.get("admin/users/");
      setUserData(res.data);

      setSelectedCounselors((current) => {
        const nextSelections = {};
        (res.data.students || []).forEach((student) => {
          nextSelections[student.id] = getAssignedCounselorId(
            student,
            current[student.id] || "",
          );
        });
        return nextSelections;
      });

      toast.success(
        counselorId === "" ? "Counselor unassigned." : "Counselor assigned.",
      );
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          error.response?.data?.assigned_counselor?.[0] ||
          "Unable to save counselor assignment.",
      );
    } finally {
      setSavingStudentId(null);
    }
  };

  const userGroups = [
    {
      title: "Students",
      count: userData.students.length.toLocaleString(),
      trend: "active",
      status: "Healthy",
      icon: Users,
      color: "#006670", // primary
    },
    {
      title: "Counselors",
      count: userData.counselors.length.toLocaleString(),
      trend: "pending",
      status: "Growing",
      icon: User,
      color: "#0F172A", // slate
    },
    {
      title: "Institutions",
      count: (userData.institutions?.length || 0).toLocaleString(),
      trend: "0 pending",
      status: "Watchlist",
      icon: School,
      color: "#EAB308", // amber
    },
  ];

  return (
    <AdminPageFrame
      badge="User Management"
      title="Platform Audience Overview"
      description="Monitor growth and onboarding health across students, counselors, and institutional partners."
    >
      {/* 1. Stats Grid */}
      <section className="grid gap-6 md:grid-cols-3">
        {userGroups.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 transition-all hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div className="flex items-start justify-between">
                <div 
                  className="flex size-12 items-center justify-center rounded-2xl bg-surface-low text-primary transition-colors group-hover:bg-primary group-hover:text-white"
                >
                  <Icon className="size-6" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-text-tertiary">
                  {item.trend}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
                  {item.title}
                </p>
                <h3
                  className="mt-1 font-heading text-4xl font-bold tracking-tight text-text-primary"
                >
                  {item.count}
                </h3>
              </div>
            </article>
          );
        })}
      </section>


      {/* 2. List Section */}
      <section className="mt-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            eyebrow="Real-time Feed"
            title="Latest Registrations"
            description="Review the most recent entrants to the PathWise ecosystem."
          />
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Find a user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10"
              />
            </div>
            <button className="flex size-10 items-center justify-center rounded-2xl border border-slate-200 hover:bg-slate-50">
              <Filter className="size-4 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[24px] border border-slate-100">
          <div className="mb-6 flex gap-1 rounded-2xl bg-slate-100 p-1 w-fit">
            <button
              onClick={() => setActiveTab("students")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "students" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500"}`}
            >
              Students
            </button>
            <button
              onClick={() => setActiveTab("counselors")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === "counselors" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500"}`}
            >
              Counselors
            </button>
          </div>
          {loading ? (
            <div className="px-6 py-12 text-sm text-slate-500">
              Loading users...
            </div>
          ) : loadError ? (
            <div className="px-6 py-12 text-sm text-red-600">{loadError}</div>
          ) : displayedUsers.length === 0 ? (
            <div className="px-6 py-12 text-sm text-slate-500">
              {searchQuery
                ? "No users match your search."
                : `No ${activeTab} found.`}
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">
                    {activeTab === "students" ? "Assigned Counselor" : "Details"}
                  </th>
                  <th className="px-6 py-4 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedUsers.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-slate-50/30 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <span className="font-bold text-slate-900 hover:text-teal-600 cursor-pointer transition-colors">
                        {item.full_name}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                        {item.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500">
                      {activeTab === "students" ? (
                        <div className="flex items-center gap-2">
                          <select
                            value={selectedCounselors[item.id] ?? ""}
                            onChange={(e) =>
                              setSelectedCounselors((current) => ({
                                ...current,
                                [item.id]: e.target.value,
                              }))
                            }
                            className="min-w-44 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-teal-500"
                          >
                            <option value="">Unassigned</option>
                            {userData.counselors.map((counselor) => (
                              <option key={counselor.id} value={String(counselor.id)}>
                                {counselor.full_name}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => handleAssignCounselor(item.id)}
                            disabled={savingStudentId === item.id}
                            className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {savingStudentId === item.id ? "Saving..." : "Save"}
                          </button>
                        </div>
                      ) : (
                        item.specialization || item.email || "No details"
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      {activeTab === "students" ? (
                        <StatusPill
                          variant={
                            selectedCounselors[item.id] ? "teal" : "slate"
                          }
                        >
                          {selectedCounselors[item.id] ? "Assigned" : "Unassigned"}
                        </StatusPill>
                      ) : (
                        <StatusPill
                          variant={
                            statusVariant[item.state] ||
                            statusVariant[item.approval_status] ||
                            "slate"
                          }
                        >
                          {item.approval_status || item.state || "Unknown"}
                        </StatusPill>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </AdminPageFrame>
  );
}
