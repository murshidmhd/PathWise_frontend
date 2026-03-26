import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
  );
}

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/landing");
  };
  const sidebarLinks = [
    {
      icon: "dashboard",
      label: "Dashboard",
      to: "/student/dashboard",
    },
    {
      icon: "assignment",
      label: "Assessments",
      to: "/student/assessments",
    },
    { icon: "work", label: "Careers", to: "/student/careers" },
    { icon: "roadmap", label: "Roadmap", to: "/student/roadmap" },
    { icon: "person", label: "Profile", to: "/student/profile" },
  ];

  return (
    <aside className="fixed z-20 hidden h-full w-[280px] flex-col bg-sidebar text-slate-400 lg:flex shadow-float">
      <div className="border-b border-white/5 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-gradient-to-br from-primary to-primary-container p-2 shadow-glass">
            <Icon name="local_fire_department" className="text-white" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold tracking-tight text-white">
              PathWise
            </h2>
            <p className="font-body text-[10px] font-bold tracking-[0.22em] text-slate-400 uppercase">
              Student Space
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {sidebarLinks.map((item) => {
          const isActive =
            item.to !== "#" &&
            (location.pathname === item.to ||
              location.pathname.startsWith(`${item.to}/`));

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all ${
                isActive
                  ? "bg-primary-container text-white shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon name={item.icon} className="text-[22px]" />
              <span className="font-body text-sm font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mx-4 mb-6 flex w-auto items-center gap-4 rounded-xl border border-white/10 px-4 py-3.5 text-slate-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
      >
        <Icon name="logout" className="text-[22px]" />
        <span className="font-body text-sm font-semibold">Logout</span>
      </button>
    </aside>
  );
};
