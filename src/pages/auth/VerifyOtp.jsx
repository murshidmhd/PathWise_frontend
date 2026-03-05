import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Get email passed from Register page
  const email = location.state?.email;

  // Countdown timer
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only numbers allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move back on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/verify-otp/", {
        email,
        otp: otpCode,
      });

      // OTP verified — user registered! redirect to login
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP, please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/resend-otp/", { email });
      setTimer(45);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
    } catch (err) {
      setError("Failed to resend OTP");
    }
  };

  return (
    <div className="hidden lg:flex min-h-screen">
      {/* Left Panel */}
      <div className="w-1/2 bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-12 border-r border-slate-200 dark:border-slate-800">
        {/* your existing left panel content */}
      </div>

      {/* Right Panel - OTP */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="max-w-md w-full text-center">

          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20">
              <span className="material-symbols-outlined text-primary text-4xl">mail</span>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Verify your email</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-2">
            We sent a 6-digit code to{" "}
            <span className="font-bold text-slate-900 dark:text-slate-100">{email}</span>
          </p>
          <p className="text-slate-400 text-sm mb-10 italic">Check your spam folder too</p>

          {/* OTP Inputs */}
          <div className="flex justify-between gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-16 text-center text-2xl font-bold bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-primary focus:ring-0 transition-all outline-none"
              />
            ))}
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Resend */}
          <div className="mb-10">
            <p className="text-slate-500 text-sm">
              Didn't receive code?{" "}
              {canResend ? (
                <button onClick={handleResend} className="text-primary font-bold hover:underline">
                  Resend OTP
                </button>
              ) : (
                <>
                  <span className="text-slate-400">Resend OTP</span> in{" "}
                  <span className="text-slate-900 dark:text-white font-mono font-bold">
                    00:{String(timer).padStart(2, "0")}
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-accent-amber to-accent-red text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>

          <p className="mt-8 text-xs text-slate-400">
            By continuing, you agree to PathWise's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}