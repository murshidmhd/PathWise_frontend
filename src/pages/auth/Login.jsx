import { Link, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../components/ui/GoogleAuthButton";
import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handleLoginSuccess } from "../../services/utils/auth";
import { isValidEmail, validatePassword } from "../../services/utils/validation";
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!isValidEmail(form.email)) {
      toast.error("Enter a valid email address");
      return;
    }

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    try {
      const response = await api.post("/auth/login/", form);

      const { access, role } = response.data;
      handleLoginSuccess(dispatch, access, role);

      if (role === "student") navigate("/student/dashboard");
      if (role === "counselor") navigate("/counselor/dashboard");
      if (role === "platform_admin") navigate("/admin/dashboard");
      toast.success("Logged in successfully");
    } catch (err) {
      const code = err.response?.data?.code;

      if (code === "PENDING_APPROVAL") {
        toast("Your account is pending approval");
        navigate("/auth/approval");
        return;
      }
      if (code === "REJECTED") {
        toast.error(
          `Your application was rejected: ${err.response?.data?.reason || ""}`,
        );
        return;
      }
      if (code === "APPROVED") {
        toast.success("Account approved. Redirecting to dashboard");
        navigate("/counselor/dashboard");
        return;
      }
      toast.error(
        err.response?.data?.message ||
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        "Login failed. Please try again",
      );
    }
  };

  return (
    <div className="bg-background-light min-h-screen overflow-x-hidden dark:bg-background-dark">
      <div className="flex min-h-screen w-full">
        <div className="relative hidden overflow-hidden bg-[#0A0F1E] p-12 lg:flex lg:w-[45%] lg:flex-col">
          <div className="absolute top-[-10%] right-[-10%] h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-[-5%] left-[-5%] h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />

          <div className="relative z-10 mb-12 flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2 text-[#0A0F1E]">
              <span className="material-symbols-outlined text-2xl font-bold">
                insights
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">
              PathWise
            </h2>
          </div>

          <h1 className="font-sora relative z-10 mb-12 text-4xl leading-tight font-extrabold text-white">
            Welcome Back to
            <br />
            PathWise
          </h1>

          <div className="relative z-10 mb-10 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="mb-6 text-lg font-bold text-white">
              Continue your journey
            </h3>

            <div className="space-y-5">
              {[
                {
                  icon: "check_circle",
                  label: "Track your assessments",
                  tone: "text-primary",
                  bg: "bg-primary/20",
                },
                {
                  icon: "map",
                  label: "View your roadmap progress",
                  tone: "text-amber-500",
                  bg: "bg-amber-500/20",
                },
                {
                  icon: "school",
                  label: "Explore colleges and mentors",
                  tone: "text-cyan-300",
                  bg: "bg-cyan-400/20",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className={`rounded-lg p-2 ${item.bg}`}>
                    <span
                      className={`material-symbols-outlined text-xl ${item.tone}`}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white/90">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col justify-center bg-white px-6 py-12 md:px-20 lg:w-[55%] lg:px-32">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="font-sora mb-2 text-3xl font-bold text-slate-900">
                Welcome back
              </h2>
              <p className="text-slate-500">
                Enter your credentials to access your dashboard
              </p>
            </div>

            <div className="mb-6 flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <GoogleAuthButton />
            </div>

            <div className="relative mb-6 flex items-center justify-center">
              <div className="w-full border-t border-slate-200" />
              <span className="absolute bg-white px-4 text-sm text-slate-400">
                or sign in with email
              </span>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-400">
                    mail
                  </span>
                  <input
                    className="w-full rounded-xl border-none bg-page-bg py-3 pr-4 pl-12 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/50"
                    placeholder="name@company.com"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={form.email}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <Link
                    className="text-xs font-bold text-amber-500 hover:underline"
                    to="/auth/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-400">
                    lock
                  </span>
                  <input
                    className="w-full rounded-xl border-none bg-page-bg py-3 pr-12 pl-12 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/50"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                    name="password"
                    value={form.password}
                  />
                  <button
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <button
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 py-3.5 font-bold text-white shadow-lg shadow-amber-500/20 transition-opacity hover:opacity-90"
                type="submit"
              >
                Sign In
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
            </form>

            <div className="mt-10 text-center">
              <Link className="group text-sm font-medium text-slate-900" to="/auth/role-selection">
                Don&apos;t have an account?
                <span className="ml-1 inline-flex items-center gap-1 font-bold text-amber-500 group-hover:underline">
                  Create one free
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
