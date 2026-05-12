import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import api, { setAccessToken } from "../../services/api";

export default function CounselorApprovalPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (nextPath = "/auth/login") => {
    try {
      await api.post("/auth/logout/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAccessToken("");
      dispatch(logout());
      navigate(nextPath, { replace: true });
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page-bg px-6 text-slate-900">
      <div className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-[#6366F1]/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-[#0D9488]/12 blur-3xl" />

      <div className="w-full max-w-xl rounded-[30px] border border-slate-200 bg-white p-8 text-center shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
          <span className="material-symbols-outlined text-3xl text-amber-500">
            hourglass_top
          </span>
        </div>

        <p className="font-['DM_Sans'] text-sm font-semibold tracking-[0.2em] text-[#6366F1] uppercase">
          Counselor Review
        </p>
        <h1 className="mt-3 font-sora text-3xl font-bold text-slate-950">
          Approval Pending
        </h1>
        <p className="mt-3 font-['DM_Sans'] text-base leading-7 text-slate-500">
          Your counselor account is under review. You will get access once the
          approval process is completed.
        </p>

        <p className="mt-4 font-['DM_Sans'] text-sm leading-6 text-slate-500">
          If you want to continue as a student instead, sign out from this
          counselor account and create a student account.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {/* <button
            type="button"
            onClick={() => handleLogout("/auth/register?role=student")}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Register as Student
          </button> */}
          <button
            type="button"
            onClick={() => handleLogout("/auth/login")}
            className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>

        <div className="mt-4">
          <Link
            to="/auth/landing"
            onClick={(e) => {
              e.preventDefault();
              handleLogout("/auth/landing");
            }}
            className="font-['DM_Sans'] text-sm font-medium text-[#6366F1] transition hover:text-[#4F46E5]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
