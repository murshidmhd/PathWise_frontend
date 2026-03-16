import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
export const CounselorSidebar = () => {
  function Icon({ name, className = "" }) {
    return (
      <span className={`material-symbols-outlined ${className}`}>{name}</span>
    );
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/landing");
  };
  const sidebarLinks = [
    { icon: "dashboard", label: "Dashboard", to: "/counselor/dashboard" },
    { icon: "person", label: "Profile", to: "/counselor/profile" },
    { icon: "group", label: "Students", to: "/counselor/students" },
    {
      icon: "calendar_month",
      label: "Session Calendar",
      to: "/counselor/calendar",
    },
    { icon: "note_alt", label: "Session Notes", to: "/counselor/notes" },
    { icon: "chat", label: "Messages", to: "/counselor/messages" },
    { icon: "settings", label: "Settings", to: "/counselor/settings" },
  ];

  return (
    <aside className="fixed z-20 hidden h-full w-64 flex-col bg-[#1E293B] text-[#94A3B8] lg:flex">
      <div className="mb-2 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#0B818D] p-1.5">
            <Icon name="local_fire_department" className="text-white" />
          </div>
          <h2 className="font-heading text-xl font-bold tracking-tight text-white">
            PathWise
          </h2>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {sidebarLinks.map((item) => (
          <Link
            key={item.label}
            to={item.to || "#"}
            className={`flex w-full items-center gap-3 px-6 py-3 text-left transition-all ${
              item.active
                ? "border-l-[3px] border-[#0B818D] bg-slate-800/50 text-white"
                : "hover:bg-slate-800/30 hover:text-white"
            }`}
          >
            <Icon name={item.icon} className="text-[22px]" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-6 py-3 text-slate-400 hover:text-white w-full"
      >
        <Icon name="logout" className="text-[22px]" />
        <span className="text-sm font-medium">Logout</span>
      </button>

      <div className="mt-auto p-4">
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="size-10 overflow-hidden rounded-full border border-[#0B818D]/30 bg-slate-700">
              <img
                alt="Ms. Priya Iyer"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIYOUm2gZr9EMAaXdWVFbhhaPrWWzC0BHgnzXuoM24S3dfe22aURHOY7XWDAMEQHtpqXv--GckRWrNoNaUeSfHa5S0acWPiUssS1sfiU-MimaMKem6f2yQR63k3CM67NxBGMUYQa8VVwf1iIyrn2KMPvn2BKhujYbVNbsRuciAFr3Qo7xgrLGAxup3YdF9bRdubA1zZTBL9S6nTJrlAtvSPL52rVpxXnvw5cQ6nDIwCsACA5NAPdKP5u2G36Xv4Z8emLAvlLDw-Q"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Ms. Priya Iyer</p>
              <p className="text-[10px] font-bold tracking-wider text-[#0B818D] uppercase">
                Your Counselor
              </p>
            </div>
          </div>
          <p className="mb-3 text-[11px] leading-relaxed text-slate-400">
            Online and ready to help you with your roadmap.
          </p>
          <button
            type="button"
            className="w-full rounded-lg border border-[#0B818D]/20 bg-[#0B818D] py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0A7681]"
          >
            Book Session
          </button>
        </div>
      </div>
    </aside>
  );
};
