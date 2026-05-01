import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
  );
}

const sidebarLinks = [
  {
    icon: "dashboard",
    label: "Dashboard",
    caption: "Your home overview",
    to: "/student/dashboard",
  },
  {
    icon: "assignment",
    label: "Assessments",
    caption: "Track your progress",
    to: "/student/assessments",
  },
  {
    icon: "work",
    label: "Careers",
    caption: "Roles and roadmap",
    to: "/student/careers",
  },
  {
    icon: "psychology",
    label: "Skills",
    caption: "Analysis and wallet",
    to: "/student/skills/analyze",
  },
  {
    icon: "supervised_user_circle",
    label: "Counselors",
    caption: "Find your mentor",
    to: "/student/counselors",
  },
  {
    icon: "chat",
    label: "Chat",
    caption: "Talk with support",
    to: "/student/chat",
  },
  {
    icon: "notifications",
    label: "Notifications",
    caption: "Updates and alerts",
    to: "/student/notifications",
  },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const fullName = user?.full_name || "Student";
  const educationLevel = user?.education_level
    ? user.education_level.replaceAll("_", " ")
    : "Career learner";
  const userInitial = fullName.charAt(0).toUpperCase() || "S";
  const profilePhoto = user?.profile_photo;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/landing");
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[240px] flex-col overflow-hidden border-r border-white/10 bg-[#111C2D] text-slate-300 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(11,129,141,0.26),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_28%)]" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="relative flex h-full min-h-0 flex-col">
        <div className="shrink-0 border-b border-white/8 px-6 pt-6 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#11B6C5] via-[#0B818D] to-[#005C67] text-white shadow-[0_14px_32px_rgba(11,129,141,0.35)]">
                <Icon name="auto_awesome" className="text-[24px]" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold tracking-tight text-white">
                  PathWise
                </h2>
                <p className="text-[10px] font-bold tracking-[0.28em] text-teal-200/70 uppercase">
                  Student Space
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="flex size-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
            >
              <Icon name="close" className="text-[20px]" />
            </button>
          </div>

          <div className="mt-6 rounded-[28px] border border-white/10 bg-white/6 p-4 shadow-[0_18px_50px_rgba(2,6,23,0.22)] backdrop-blur-md">
            <Link 
              to="/student/profile" 
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
              className="flex items-center justify-between group transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-800 text-sm font-bold text-white group-hover:ring-2 group-hover:ring-teal-400/50 transition-all">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    userInitial
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white group-hover:text-teal-200 transition-colors">
                    {fullName}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-400 capitalize">
                    {educationLevel}
                  </p>
                </div>
              </div>
              <div className="flex size-8 items-center justify-center rounded-xl bg-white/5 text-slate-400 opacity-0 transition-all group-hover:opacity-100 group-hover:bg-teal-500/20 group-hover:text-teal-300">
                <Icon name="chevron_right" className="text-lg" />
              </div>
            </Link>

            <div className="mt-4 rounded-2xl bg-white/6 px-3 py-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                  SkillPoints
                </p>
                <div className="flex items-center gap-1 rounded-lg bg-teal-400/10 px-2 py-0.5 text-[11px] font-bold text-teal-400 ring-1 ring-inset ring-teal-400/20">
                  <span className="material-symbols-outlined text-[14px]">
                    stars
                  </span>
                  <span>PREMIUM</span>
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white leading-none">
                  {user?.wallet?.balance || 0}
                </span>
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>

        <nav className="relative min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-2">
            {sidebarLinks.map((item) => {
              const isActive =
                item.to !== "#" &&
                (location.pathname === item.to ||
                  location.pathname.startsWith(`${item.to}/`) ||
                  (item.to === "/student/careers" &&
                    location.pathname.startsWith("/student/careers/")) ||
                  (item.to === "/student/skills/analyze" &&
                    location.pathname.startsWith("/student/skills/")));

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#0B818D]/28 via-[#0B818D]/18 to-white/8 text-white shadow-[0_16px_40px_rgba(11,129,141,0.18)] ring-1 ring-white/10"
                      : "text-slate-400 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-all ${
                      isActive
                        ? "bg-white text-[#0B818D] shadow-sm"
                        : "bg-white/6 text-slate-300 group-hover:bg-white/10 group-hover:text-white"
                    }`}
                  >
                    <Icon name={item.icon} className="text-[18px]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium">{item.label}</p>
                  </div>

                  {isActive && (
                    <span className="h-8 w-1 rounded-full bg-white/85" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="relative shrink-0 border-t border-white/8 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <Icon name="logout" className="text-[18px]" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
