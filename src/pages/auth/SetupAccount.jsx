import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, Loader2, CheckCircle2, ArrowRight, Lock } from "lucide-react";
import api from "../../services/api";
import { toast } from "react-hot-toast";

export default function SetupAccount() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setLoading(true);
    try {
      await api.post("/api/tenants/setup-account/", { token, password });
      setCompleted(true);
      toast.success("Account setup successful!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-[40px] bg-white p-10 shadow-2xl text-center animate-in zoom-in-95 duration-300">
          <div className="size-20 bg-emerald-50 text-emerald-500 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-sm">
            <CheckCircle2 className="size-10" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-slate-950">Setup Complete!</h1>
          <p className="mt-4 text-slate-500 leading-relaxed">
            Your college administrator account is now active. You can use your email and new password to log in.
          </p>
          <button 
            onClick={() => navigate("/auth/login")}
            className="mt-10 w-full py-5 rounded-3xl bg-slate-950 text-white font-bold hover:bg-[#0B818D] transition-all flex items-center justify-center gap-3"
          >
            Go to Login
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-[#0B818D]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] size-[500px] bg-amber-500/5 rounded-full blur-[100px]" />

      <div className="w-full max-w-md rounded-[40px] bg-white p-10 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3 mb-10">
          <div className="size-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-lg">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-slate-950 leading-none">PathWise</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">Ecosystem Setup</p>
          </div>
        </div>

        <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-950">Finish your setup</h2>
            <p className="text-sm text-slate-500 mt-2">Create a secure password to activate your administrator dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">New Password</label>
            <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input 
                    type="password"
                    required
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#0B818D] transition-all font-medium"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Confirm Password</label>
            <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input 
                    type="password"
                    required
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#0B818D] transition-all font-medium"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full py-5 rounded-[24px] bg-slate-950 text-white font-bold hover:bg-[#0B818D] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : "Activate Account"}
          </button>
        </form>

        <p className="mt-10 text-center text-xs text-slate-400">
            By activating, you agree to PathWise Professional Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
