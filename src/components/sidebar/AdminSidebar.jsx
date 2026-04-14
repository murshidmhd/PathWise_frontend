import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>{name}</span>
  );
}

const sidebarLinks = [
  {
    icon: "space_dashboard",
    label: "Overview",
    caption: "Platform command center",
    to: "/admin/dashboard",
  },
  {
    icon: "verified_user",
    label: "Approvals",
    caption: "Review pending requests",
    to: "/admin/approvals",
  },
  {
    icon: "group",
    label: "Users",
    caption: "Manage students and counselors",
    to: "/admin/users",
  },
  {
    icon: "analytics",
    label: "Reports",
    caption: "Track adoption and health",
    to: "/admin/reports",
  },
  {
    icon: "settings",
    label: "Settings",
    caption: "Configure platform controls",
    to: "/admin/settings",
  },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const handleLogout = useLogout();
  const user = useSelector((state) => state.auth.user);

  const fullName = user?.full_name || "Admin";
  const userInitial = fullName.charAt(0).toUpperCase() || "A";

  const renderLinks = (mobile = false) =>
    sidebarLinks.map((item) => {
      const isActive =
        location.pathname === item.to ||
        (item.to !== "/admin/dashboard" &&
          location.pathname.startsWith(`${item.to}/`));

      return (
        <Link
          key={item.label}
          to={item.to}
          className={`group relative flex items-center gap-4 overflow-hidden rounded-[20px] px-4 py-3 transition-all ${mobile
              ? isActive
                ? "bg-amber-100 text-amber-900 shadow"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
              : isActive
                ? "bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-white/5 text-white shadow-[0_16px_40px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
        >
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-all ${isActive
                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                : "bg-white/6 text-slate-300 group-hover:bg-white/10 group-hover:text-white"
              }`}
          >
            <Icon name={item.icon} className="text-[20px]" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">{item.label}</p>
            {!mobile ? (
              <p
                className={`mt-0.5 truncate text-[11px] ${isActive ? "text-amber-200/70" : "text-slate-500"
                  }`}
              >
                {item.caption}
              </p>
            ) : null}
          </div>

          {isActive && !mobile ? (
            <span className="h-9 w-1.5 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
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
              <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 text-white shadow-[0_14px_32px_rgba(217,119,6,0.35)]">
                <Icon name="shield_person" className="text-[22px]" />
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-white">PathWise</p>
                <p className="text-[10px] font-bold tracking-[0.24em] text-amber-500 uppercase">
                  Admin Space
                </p>
              </div>
            </div>

            <button
              type="button"
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
        {/* Amber Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,119,6,0.08),transparent_25%)]" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-amber-500/10 to-transparent" />

        <div className="relative flex h-full flex-col">
          <div className="border-b border-white/5 px-6 pt-6 pb-5">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 text-white shadow-[0_14px_32px_rgba(217,119,6,0.35)]">
                <Icon name="shield_person" className="text-[24px]" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold tracking-tight text-white">
                  PathWise
                </h2>
                <p className="text-[10px] font-bold tracking-[0.28em] text-amber-500 uppercase">
                  Admin Space
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[26px] border border-white/5 bg-white/5 p-4 shadow-[0_18px_50px_rgba(2,6,23,0.15)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-amber-500/10 text-sm font-bold text-amber-500">
                  {userInitial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{fullName}</p>
                  <p className="mt-1 text-xs text-slate-500">Platform Administrator</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="relative flex-1 px-4 py-5">
            <div className="space-y-2">{renderLinks(false)}</div>
          </nav>

          <div className="relative border-t border-white/5 p-4">
            <div className="rounded-[24px] border border-white/5 bg-gradient-to-br from-white/5 to-white/0 p-4 shadow-[0_16px_36px_rgba(2,6,23,0.1)]">
              <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Icon name="monitoring" className="text-[20px]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">System status</p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Core admin services are healthy and syncing in real-time.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-[18px] border border-white/5 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-amber-500/20 hover:bg-amber-500/10 hover:text-white"
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
