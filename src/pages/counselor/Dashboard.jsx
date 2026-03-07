import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../services/api";

export default function CounselorDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken("");
    localStorage.removeItem("role");
    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-page-bg p-6 font-body text-text-primary lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold">
            Counselor Dashboard
          </h1>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary hover:bg-white"
          >
            Logout
          </button>
        </div>
        <p className="mt-2 text-text-secondary">
          Manage student sessions and guide their career planning.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <p className="text-sm text-text-secondary">Assigned Students</p>
            <p className="mt-2 text-2xl font-bold">24</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <p className="text-sm text-text-secondary">Sessions Today</p>
            <p className="mt-2 text-2xl font-bold">5</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <p className="text-sm text-text-secondary">Pending Reviews</p>
            <p className="mt-2 text-2xl font-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
