import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const OTP_LENGTH = 6;

export default function ResetPassword() {
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [form, setForm] = useState({
        password: "",
        confirm_password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRefs = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            navigate("/auth/forgot-password", { replace: true });
        }
    }, [email, navigate]);

    const handleOtpChange = (index, value) => {
        const cleanValue = value.replace(/\D/g, "");
        if (!cleanValue && value) return;

        const newOtp = [...otp];
        newOtp[index] = cleanValue.slice(-1);
        setOtp(newOtp);

        if (cleanValue && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join("");

        if (!/^\d{6}$/.test(otpCode)) {
            toast.error("Please enter the complete 6-digit OTP");
            return;
        }

        if (form.password !== form.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }

        if (form.password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setLoading(true);
        try {
            await api.post("/auth/reset-password/", {
                email,
                otp: otpCode,
                password: form.password,
                confirm_password: form.confirm_password,
            });
            toast.success("Password reset successful! Please log in.");
            navigate("/auth/login", { replace: true });
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Failed to reset password. Please try again."
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
                                lock_open
                            </span>
                        </div>
                        <h2 className="font-sora text-3xl font-bold text-slate-900">
                            Reset Password
                        </h2>
                        <p className="mt-2 text-slate-500">
                            Enter the OTP sent to <b>{email}</b> and your new password.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-slate-700 block text-center">
                                6-Digit OTP
                            </label>
                            <div className="flex justify-center gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        inputMode="numeric"
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="h-12 w-10 sm:h-14 sm:w-12 rounded-xl border border-slate-200 bg-slate-50 text-center text-lg font-bold text-slate-900 outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    New Password
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-400">
                                        lock
                                    </span>
                                    <input
                                        className="w-full rounded-xl border-none bg-[#F8FAFC] py-3 pr-12 pl-12 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/50"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        name="password"
                                        value={form.password}
                                        onChange={handleFormChange}
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

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-400">
                                        lock_check
                                    </span>
                                    <input
                                        className="w-full rounded-xl border-none bg-[#F8FAFC] py-3 pr-4 pl-12 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/50"
                                        placeholder="••••••••"
                                        type="password"
                                        required
                                        name="confirm_password"
                                        value={form.confirm_password}
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 py-3.5 font-bold text-white shadow-lg shadow-amber-500/20 transition-opacity hover:opacity-90 disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
