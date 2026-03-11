import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const OTP_LENGTH = 6;

export default function VerifyOTP() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/verify-otp/", {
        email,
        otp: otpCode,
      });
      toast.success("Email verified successfully");
      if (role === "counselor") {
        navigate("/auth/approval", { replace: true });
      } else {
        navigate("/auth/login", { replace: true });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP, please try again");
    } finally {
      setLoading(false);
    }
  };

  const OtpInputs = (
    <div className="mb-8 flex justify-between gap-2 sm:gap-3">
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
          className="h-14 w-11 rounded-xl border-2 border-slate-200 bg-white text-center text-xl font-bold outline-none transition-all focus:border-warning sm:h-16 sm:w-14 sm:text-2xl"
        />
      ))}
    </div>
  );

  const OtpContent = (
    <div className="w-full max-w-md text-center">
      <div className="mb-8 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-warning/20 bg-warning/10">
          <span className="material-symbols-outlined text-4xl text-warning">
            mail
          </span>
        </div>
      </div>

      <h2 className="mb-3 font-sora text-3xl font-extrabold text-slate-900">
        Verify your email
      </h2>
      <p className="mb-2 text-slate-500">
        We sent a 6-digit code to{" "}
        <span className="font-bold text-slate-900">{email}</span>
      </p>
      <p className="mb-10 text-sm italic text-slate-400">
        Check your spam folder too
      </p>

      {OtpInputs}

      <div className="mb-10">
        <p className="text-sm text-slate-500">
          Didn&apos;t receive code?{" "}
          {canResend ? (
            <button
              className="font-bold text-warning hover:underline"
              type="button"
            >
              Resend OTP
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
        className="w-full rounded-xl bg-gradient-to-r from-warning to-danger py-4 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        type="button"
      >
        {loading ? "Verifying..." : "Verify & Continue"}
      </button>

      <p className="mt-8 text-xs text-slate-400">
        By continuing, you agree to PathWise&apos;s Terms of Service and Privacy
        Policy.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-page-bg font-body text-text-primary">
      <div className="hidden min-h-screen lg:flex">
        <div className="flex w-1/2 items-center justify-center border-r border-slate-200 bg-white p-12">
          <div className="w-full max-w-md">
            <div className="mb-12 flex items-center gap-3">
              <div className="rounded-lg bg-secondary/15 p-2">
                <span className="material-symbols-outlined text-3xl text-secondary">
                  school
                </span>
              </div>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight">
                PathWise
              </h2>
            </div>
            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight">
              Complete your journey to excellence.
            </h1>
            <p className="mb-8 text-lg text-text-secondary">
              Join thousands of students with personalized learning paths and
              expert guidance.
            </p>
            <div className="mb-12 space-y-4">
              <div className="flex items-center gap-4 text-slate-700">
                <span className="material-symbols-outlined text-secondary">
                  check_circle
                </span>
                <span>Expert-led sessions</span>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <span className="material-symbols-outlined text-secondary">
                  check_circle
                </span>
                <span>Personalized roadmap</span>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <span className="material-symbols-outlined text-secondary">
                  check_circle
                </span>
                <span>24/7 support</span>
              </div>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 to-transparent"></div>
              <img
                alt="Students studying together"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx-BrPliGfJfsKRLQ686xtq3wRhTUvf3vAsoVg-rBFR-Eexo-YzqwpLnPcNbQSbmuyKAYeyERpoUW8D0BRWIz_5iFlNtawaJIhmVGEbt7c9-pTwN2LAPVId8rqY5vDpzWI5sBvsWPEBxyQw4AZ27-g9XDMsVKkcEJMWqqssyERONOmOkAxw8xiweUiT_1lsZIHOsskQsF7FMMz4BwW0kJxBV2_nvKAf2qtL8j8ktR6dJuJUEgu1mh_0QZBLp40Diev0GvzDggxUQ"
              />
            </div>
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-center bg-white p-12">
          {OtpContent}
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center px-6 py-10 lg:hidden">
        {OtpContent}
      </div>
    </div>
  );
}
