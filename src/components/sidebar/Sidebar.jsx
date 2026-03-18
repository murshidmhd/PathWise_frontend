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
    { icon: "explore", label: "Career Paths", to: "#" },
    { icon: "school", label: "Mentors", to: "#" },
    { icon: "menu_book", label: "Resources", to: "#" },
    { icon: "settings", label: "Settings", to: "#" },
  ];

  return (
    <aside className="fixed z-20 hidden h-full w-64 flex-col bg-[#0F172A] text-slate-400 lg:flex">
      <div className="border-b border-slate-800/80 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-[#6366F1] to-[#0D9488] p-2 shadow-lg shadow-[#6366F1]/20">
            <Icon name="local_fire_department" className="text-white" />
          </div>
          <div>
            <h2 className="font-sora text-xl font-bold tracking-tight text-white">
              PathWise
            </h2>
            <p className="text-[10px] tracking-[0.22em] text-slate-500 uppercase">
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
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm shadow-slate-950/10"
                  : "hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              <Icon name={item.icon} className="text-[22px]" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mx-4 flex w-auto items-center gap-3 rounded-2xl border border-slate-800 px-4 py-3 text-slate-400 transition hover:border-slate-600 hover:bg-slate-800/60 hover:text-white"
      >
        <Icon name="logout" className="text-[22px]" />
        <span className="text-sm font-medium">Logout</span>
      </button>

      <div className="mt-auto p-4">
        <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="size-10 overflow-hidden rounded-full border border-[#0D9488]/30 bg-slate-700">
              <img
                alt="Ms. Priya Iyer"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIYOUm2gZr9EMAaXdWVFbhhaPrWWzC0BHgnzXuoM24S3dfe22aURHOY7XWDAMEQHtpqXv--GckRWrNoNaUeSfHa5S0acWPiUssS1sfiU-MimaMKem6f2yQR63k3CM67NxBGMUYQa8VVwf1iIyrn2KMPvn2BKhujYbVNbsRuciAFr3Qo7xgrLGAxup3YdF9bRdubA1zZTBL9S6nTJrlAtvSPL52rVpxXnvw5cQ6nDIwCsACA5NAPdKP5u2G36Xv4Z8emLAvlLDw-Q"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Ms. Priya Nair</p>
              <p className="text-[10px] font-bold tracking-wider text-[#0D9488] uppercase">
                Your Counselor
              </p>
            </div>
          </div>
          <p className="mb-3 text-[11px] leading-relaxed text-slate-400">
            Online and ready to help you with your roadmap.
          </p>
          <button
            type="button"
            className="w-full rounded-xl border border-[#0D9488]/20 bg-[#0D9488] py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0b7d73]"
          >
            Contact Now
          </button>
        </div>
      </div>
    </aside>
  );
};
