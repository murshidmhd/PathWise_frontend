import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Please enter your email address");
            return;
        }

        setLoading(true);
        try {
            await api.post("/auth/forgot-password/", { email });
            toast.success("OTP sent to your email");
            navigate("/auth/reset-password", { state: { email } });
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to send OTP. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light min-h-screen overflow-x-hidden dark:bg-background-dark">
            <div className="flex min-h-screen w-full items-center justify-center p-6">
                <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
                            <span className="material-symbols-outlined text-3xl text-amber-500">
                                lock_reset
                            </span>
                        </div>
                        <h2 className="font-sora text-3xl font-bold text-slate-900">
                            Forgot Password?
                        </h2>
                        <p className="mt-2 text-slate-500">
                            No worries! Enter your email and we'll send you an OTP to reset your password.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 py-3.5 font-bold text-white shadow-lg shadow-amber-500/20 transition-opacity hover:opacity-90 disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                            {!loading && (
                                <span className="material-symbols-outlined text-lg">
                                    arrow_forward
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <Link
                            className="text-sm font-medium text-slate-500 hover:text-slate-900"
                            to="/auth/login"
                        >
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
