import { Link, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
  );
}

const sidebarLinks = [
  { icon: "space_dashboard", label: "Overview", to: "/admin/dashboard" },
  { icon: "verified_user", label: "Approvals", to: "/admin/dashboard" },
  { icon: "group", label: "Users", to: "/admin/dashboard" },
  { icon: "analytics", label: "Reports", to: "/admin/dashboard" },
  { icon: "settings", label: "Platform Settings", to: "/admin/dashboard" },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const handleLogout = useLogout();

  return (
    <aside className="fixed z-20 hidden h-full w-72 flex-col overflow-y-auto border-r border-slate-800 bg-[#0f172a] text-slate-400 lg:flex">
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 p-2 text-slate-950 shadow-lg shadow-orange-500/20">
            <Icon name="shield_person" className="text-[22px]" />
          </div>
          <div>
            <p className="font-sora text-lg font-bold text-white">PathWise</p>
            <p className="text-xs tracking-[0.24em] text-amber-300 uppercase">
              Admin Console
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-5">
        <div className="space-y-1">
          {sidebarLinks.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm"
                    : "hover:bg-slate-800/70 hover:text-white"
                }`}
              >
                <Icon name={item.icon} className="text-[20px]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
              <Icon name="monitoring" className="text-[20px]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">System status</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                All critical services are operational and syncing in real time.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
        >
          <Icon name="logout" className="text-[20px]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
