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

export const CounselorSidebar = () => {
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

  const renderLinks = (mobile = false) =>
    sidebarLinks.map((item) => {
      const isActive =
        location.pathname === item.to ||
        location.pathname.startsWith(`${item.to}/`);

      return (
        <Link
          key={item.label}
          to={item.to}
          className={`group relative flex items-center gap-4 overflow-hidden rounded-[22px] px-4 py-4 transition-all ${mobile
              ? isActive
                ? "bg-indigo-100 text-indigo-900 shadow"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
              : isActive
                ? "bg-gradient-to-r from-indigo-500/20 via-indigo-500/10 to-white/5 text-white shadow-[0_16px_40px_rgba(79,70,229,0.15)] ring-1 ring-indigo-500/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
        >
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-2xl transition-all ${isActive
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                : "bg-white/6 text-slate-300 group-hover:bg-white/10 group-hover:text-white"
              }`}
          >
            <Icon name={item.icon} className="text-[21px]" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{item.label}</p>
            {!mobile ? (
              <p
                className={`mt-1 truncate text-[11px] ${isActive ? "text-indigo-200/70" : "text-slate-500"
                  }`}
              >
                {item.caption}
              </p>
            ) : null}
          </div>

          {isActive && !mobile ? (
            <span className="h-10 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(79,70,229,0.6)]" />
          ) : null}
        </Link>
      );
    });

  return (
    <>
      <aside className="fixed top-0 z-30 w-full border-b border-white/5 bg-[#0F172A] text-slate-200 lg:hidden">
        <div className="border-b border-white/5 px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-700 text-white shadow-[0_14px_32px_rgba(79,70,229,0.35)]">
                <Icon name="psychology" className="text-[22px]" />
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-white">PathWise</p>
                <p className="text-[10px] font-bold tracking-[0.24em] text-indigo-400 uppercase">
                  Counselor Space
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 py-3">{renderLinks(true)}</nav>
      </aside>

      <aside className="fixed z-20 hidden h-full w-[292px] overflow-hidden border-r border-white/5 bg-[#0F172A] text-slate-300 lg:flex lg:flex-col">
        {/* Indigo Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.08),transparent_25%)]" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent" />

        <div className="relative flex h-full flex-col">
          <div className="border-b border-white/5 px-6 pt-6 pb-5">
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

            <div className="mt-6 rounded-[28px] border border-white/5 bg-white/5 p-4 shadow-[0_18px_50px_rgba(2,6,23,0.15)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-indigo-500/10 text-sm font-bold text-indigo-400">
                  {userInitial}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{fullName}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">{qualification}</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="relative flex-1 px-4 py-5">
            <div className="space-y-2">{renderLinks(false)}</div>
          </nav>

          <div className="relative border-t border-white/5 p-4">
            <div className="rounded-[26px] border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-4 shadow-[0_16px_36px_rgba(2,6,23,0.1)]">
              <div className="flex items-start gap-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <Icon name="tips_and_updates" className="text-[20px]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Guidance tip</p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Review pending assessments first to unlock better roadmap planning.
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
    </>
  );
};
