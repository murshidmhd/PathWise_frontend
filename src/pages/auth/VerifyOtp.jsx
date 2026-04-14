import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handleLoginSuccess } from "../../services/utils/auth";

const OTP_LENGTH = 6;

export default function VerifyOTP() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = location.state?.email;
  const role = location.state?.role;

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, "");
    if (!cleanValue && value) return;

    const newOtp = [...otp];
    newOtp[index] = cleanValue.slice(-1);
    setOtp(newOtp);

    if (cleanValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const filled = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, idx) => {
      filled[idx] = char;
    });
    setOtp(filled);

    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  useEffect(() => {
    if (!email) {
      navigate("/auth/register", { replace: true });
    }
  }, [email, navigate]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/auth/register", { replace: true });
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (!email) {
      toast.error("Email is missing. Please register again.");
      return;
    }

    if (!role) {
      toast.error("Role is missing. Please start registration again.");
      return;
    }

    if (!/^\d{6}$/.test(otpCode)) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/verify-otp/", {
        email,
        otp: otpCode,
      });
      toast.success("Email verified successfully");

      if (role === "counselor") {
        handleLoginSuccess(dispatch, res.data.access, role);
        navigate("/auth/approval", { replace: true });
      } else if (role === "student") {
        handleLoginSuccess(dispatch, res.data.access, role);
        navigate("/student/dashboard");
      } else if (role === "admin") {
        handleLoginSuccess(dispatch, res.data.access, role);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid OTP, please try again",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is missing. Please register again.");
      return;
    }

    if (resending) {
      return;
    }

    setResending(true);

    try {
      const response = await api.post("/auth/resend-otp/", { email });
      setOtp(Array(OTP_LENGTH).fill(""));
      setTimer(45);
      setCanResend(false);
      inputRefs.current[0]?.focus();

      toast.success(
        response.data?.detail || response.data?.message || "OTP sent again",
      );
    } catch (err) {
      toast.error(
        err.response?.data?.detail ||
          err.response?.data?.email?.[0] ||
          "Failed to resend OTP",
      );
    } finally {
      setResending(false);
    }
  };

  const OtpInputs = (
    <div className="mb-8 flex justify-center gap-2 sm:gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={digit}
          inputMode="numeric"
          autoComplete="one-time-code"
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className="h-14 w-12 rounded-2xl border border-slate-200 bg-slate-50 text-center text-lg font-semibold text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 sm:h-16 sm:w-14 sm:text-xl"
        />
      ))}
    </div>
  );

  const OtpContent = (
    <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-200/60 sm:p-8">
      <div className="mb-6 flex justify-start">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          Back
        </button>
      </div>

      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
          <span className="material-symbols-outlined text-3xl text-amber-500">
            mail
          </span>
        </div>
      </div>

      <h2 className="font-sora mb-3 text-3xl font-extrabold text-slate-900">
        Verify your email
      </h2>
      <p className="mb-2 text-sm leading-7 text-slate-500 sm:text-base">
        We sent a 6-digit code to{" "}
        <span className="font-bold text-slate-900">{email}</span>
      </p>
      <p className="mb-8 text-sm text-slate-400">
        Check your spam folder too
      </p>

      {OtpInputs}

      <div className="mb-8 rounded-2xl bg-slate-50 px-4 py-3">
        <p className="text-sm text-slate-500">
          Didn&apos;t receive code?{" "}
          {canResend ? (
            <button
              className="font-bold text-amber-600 hover:underline"
              type="button"
              onClick={handleResendOtp}
              disabled={resending}
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          ) : (
            <>
              <span className="text-slate-400">Resend OTP</span> in{" "}
              <span className="font-mono font-bold text-slate-900">
                00:{String(timer).padStart(2, "0")}
              </span>
            </>
          )}
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 py-4 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-105 disabled:opacity-50"
        type="button"
      >
        {loading ? "Verifying..." : "Verify & Continue"}
      </button>

      <p className="mt-6 text-xs leading-6 text-slate-400">
        By continuing, you agree to PathWise&apos;s Terms of Service and Privacy
        Policy.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f7f5] px-6 py-10 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">
        <div className="grid w-full gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="hidden lg:block">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A0F1E] text-white">
                <span className="material-symbols-outlined text-2xl">route</span>
              </div>
              <h1 className="font-sora text-2xl font-extrabold tracking-tight text-[#0A0F1E]">
                PathWise
              </h1>
            </div>

            <h2 className="font-sora max-w-md text-4xl font-extrabold leading-tight text-[#0A0F1E]">
              Enter the code and finish your signup.
            </h2>
            <p className="mt-4 max-w-md text-base leading-8 text-slate-500">
              A simple verification step to confirm your email and continue to
              your dashboard.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-slate-700">
                <span className="material-symbols-outlined text-amber-500">
                  check_circle
                </span>
                Fast email verification
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <span className="material-symbols-outlined text-amber-500">
                  check_circle
                </span>
                Safe account activation
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <span className="material-symbols-outlined text-amber-500">
                  check_circle
                </span>
                Direct entry to your role dashboard
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">{OtpContent}</div>
        </div>
      </div>
    </div>
  );
}
