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
    caption: "Track your workflow",
    to: "/counselor/dashboard",
  },
  {
    icon: "group",
    label: "Students",
    caption: "View assigned learners",
    to: "/counselor/students",
  },
  {
    icon: "person",
    label: "Profile",
    caption: "Manage counselor details",
    to: "/counselor/profile",
  },
  {
    icon: "chat",
    label: "Chat",
    caption: "Message your students",
    to: "/counselor/chat",
  },
];

export const CounselorSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const fullName = user?.full_name || "Counselor";
  const qualification = user?.qualification || "Career Mentor";
  const userInitial = fullName.charAt(0).toUpperCase() || "C";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/landing");
  };

  const renderLinks = () =>
    sidebarLinks.map((item) => {
      const isActive =
        location.pathname === item.to ||
        location.pathname.startsWith(`${item.to}/`);

      return (
        <Link
          key={item.label}
          to={item.to}
          onClick={() => {
            if (window.innerWidth < 1024) onClose();
          }}
          className={`group relative flex items-center gap-4 overflow-hidden rounded-[22px] px-4 py-4 transition-all ${
            isActive
              ? "bg-gradient-to-r from-indigo-500/20 via-indigo-500/10 to-white/5 text-white shadow-[0_16px_40px_rgba(79,70,229,0.15)] ring-1 ring-indigo-500/20"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-2xl transition-all ${
              isActive
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                : "bg-white/6 text-slate-300 group-hover:bg-white/10 group-hover:text-white"
            }`}
          >
            <Icon name={item.icon} className="text-[21px]" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{item.label}</p>
            <p
              className={`mt-1 truncate text-[11px] ${
                isActive ? "text-indigo-200/70" : "text-slate-500"
              }`}
            >
              {item.caption}
            </p>
          </div>

          {isActive && (
            <span className="h-10 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(79,70,229,0.6)]" />
          )}
        </Link>
      );
    });

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[292px] flex-col overflow-hidden border-r border-white/5 bg-[#0F172A] text-slate-300 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Indigo Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.08),transparent_25%)]" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent" />

      <div className="relative flex h-full flex-col">
        <div className="border-b border-white/5 px-6 pt-6 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-700 text-white shadow-[0_14px_32px_rgba(79,70,229,0.35)]">
                <Icon name="psychology" className="text-[24px]" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold tracking-tight text-white">
                  PathWise
                </h2>
                <p className="text-[10px] font-bold tracking-[0.28em] text-indigo-400 uppercase">
                  Counselor Space
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

          <div className="mt-6 rounded-[28px] border border-white/5 bg-white/5 p-4 shadow-[0_18px_50px_rgba(2,6,23,0.15)] backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-indigo-500/10 text-sm font-bold text-indigo-400">
                {userInitial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {fullName}
                </p>
                <p className="mt-1 truncate text-xs text-slate-500">
                  {qualification}
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-2">{renderLinks()}</div>
        </nav>

        <div className="relative shrink-0 border-t border-white/5 p-4">
          <div className="rounded-[26px] border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-4 shadow-[0_16px_36px_rgba(2,6,23,0.1)]">
            <div className="flex items-start gap-4">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                <Icon name="tips_and_updates" className="text-[20px]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Guidance tip
                </p>
                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  Review pending assessments first to unlock better roadmap
                  planning.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-[20px] border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-indigo-500/20 hover:bg-indigo-500/10 hover:text-white"
          >
            <Icon name="logout" className="text-[20px]" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
