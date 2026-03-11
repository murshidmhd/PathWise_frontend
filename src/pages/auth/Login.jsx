import { Link, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../components/ui/GoogleAuthButton";
import { useState } from "react";
import api, { setAccessToken } from "../../services/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { isAuthenticated, role } = useSelector((state) => state.auth);
  console.log(isAuthenticated, role);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login/", form);

      //   console.log(response);

      // const { access, role } = response.data;
      const { access, role } = response.data;
      dispatch(setUser({ token: access, role: role }))  // 👈 add this

      // setAccessToken(access);
      // localStorage.setItem("role", role);

      if (role === "student") navigate("/student/dashboard");
      if (role === "parent") navigate("/parent/dashboard");
      if (role === "counselor") navigate("/counselor/dashboard");
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
        err.response?.data?.detail || "Login failed. Please try again",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-page-bg px-6 py-10 font-body">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card-bg p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-bold text-text-primary">
            Login
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Welcome back to PathWise
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-text-primary"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full rounded-lg border border-border px-4 py-3 outline-none transition focus:border-primary"
              placeholder="you@example.com"
              onChange={handleChange}
              name="email"
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium text-text-primary"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full rounded-lg border border-border px-4 py-3 outline-none transition focus:border-primary"
              placeholder="••••••••"
              onChange={handleChange}
              name="password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-semibold text-black transition hover:opacity-90"
          >
            Sign In
          </button>
        </form>

        <GoogleAuthButton />

        <p className="mt-6 text-center text-sm text-text-secondary">
          Don&apos;t have an account?{" "}
          <Link
            className="font-semibold text-primary hover:underline"
            to="/auth/landing"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
