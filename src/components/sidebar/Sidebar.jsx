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
    caption: "Explore matching roles",
    to: "/student/careers",
  },
  {
    icon: "route",
    label: "Roadmap",
    caption: "Plan your next steps",
    to: "/student/roadmap",
  },
  {
    icon: "person",
    label: "Profile",
    caption: "Manage your details",
    to: "/student/profile",
  },
  {
    icon: "chat",
    label: "Chat",
    caption: "Talk with support",
    to: "/student/chat",
  },
];

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const fullName = user?.full_name || "Student";
  const firstName = fullName.split(" ")[0] || "Student";
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
    <aside className="fixed z-20 hidden h-full w-[292px] overflow-hidden border-r border-white/10 bg-[#0B1220] text-slate-300 lg:flex lg:flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(11,129,141,0.26),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_28%)]" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="relative flex h-full flex-col">
        <div className="border-b border-white/8 px-6 pt-6 pb-5">
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

          <div className="mt-6 rounded-[28px] border border-white/10 bg-white/6 p-4 shadow-[0_18px_50px_rgba(2,6,23,0.22)] backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-800 text-sm font-bold text-white">
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
                <p className="truncate text-sm font-semibold text-white">
                  {fullName}
                </p>
                <p className="mt-1 truncate text-xs text-slate-400 capitalize">
                  {educationLevel}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-white/6 px-3 py-3">
              <p className="text-[11px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                Welcome back
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                {firstName}, keep moving toward your next career milestone.
              </p>
            </div>
          </div>
        </div>

        <nav className="relative flex-1 px-4 py-5">
          <div className="space-y-2">
            {sidebarLinks.map((item) => {
              const isActive =
                item.to !== "#" &&
                (location.pathname === item.to ||
                  location.pathname.startsWith(`${item.to}/`));

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`group relative flex items-center gap-4 overflow-hidden rounded-[22px] px-4 py-4 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#0B818D]/28 via-[#0B818D]/18 to-white/8 text-white shadow-[0_16px_40px_rgba(11,129,141,0.18)] ring-1 ring-white/10"
                      : "text-slate-400 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-2xl transition-all ${
                      isActive
                        ? "bg-white text-[#0B818D] shadow-sm"
                        : "bg-white/6 text-slate-300 group-hover:bg-white/10 group-hover:text-white"
                    }`}
                  >
                    <Icon name={item.icon} className="text-[21px]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p
                      className={`mt-1 truncate text-[11px] ${
                        isActive ? "text-teal-100/80" : "text-slate-500"
                      }`}
                    >
                      {item.caption}
                    </p>
                  </div>

                  {isActive && (
                    <span className="h-10 w-1.5 rounded-full bg-white/85" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="relative border-t border-white/8 p-4">
          <div className="rounded-[26px] border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-4 shadow-[0_16px_36px_rgba(2,6,23,0.2)]">
            <div className="flex items-start gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-teal-400/14 text-teal-300">
                <Icon name="tips_and_updates" className="text-[20px]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Premium guidance
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Use assessment insights, AI chat, and roadmap planning together
                  for a stronger journey.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-center gap-3 rounded-[20px] border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <Icon name="logout" className="text-[20px]" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
