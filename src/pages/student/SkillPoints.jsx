import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Sparkles,
    Zap,
    Shield,
    History,
    Wallet as WalletIcon,
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
    ChevronRight,
    Trophy,
    Info,
    BrainCircuit,
    AlertTriangle
} from "lucide-react";
import api from "../../services/api";
import PricingModal from "../../components/payment/PricingModal";
import { handlePayment } from "../../services/utils/payment";
import { updateWallet } from "../../store/slices/authSlice";
import SectionTabs from "../../components/student/SectionTabs";
import StudentFeedbackState from "../../components/student/StudentFeedbackState";

const skillTabs = [
    { label: "Skill Analysis", to: "/student/skills/analyze", icon: BrainCircuit },
    { label: "SkillPoints", to: "/student/skills/points", icon: WalletIcon },
];

const TransactionItem = ({ tx }) => {
    const isCredit = tx.amount > 0;

    return (
        <div className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50/80 rounded-2xl group">
            <div className="flex items-center gap-4">
                <div className={`flex size-11 items-center justify-center rounded-2xl ${isCredit ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                    {isCredit ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-900">{tx.description}</h4>
                    <p className="mt-1 text-xs font-semibold text-slate-400">
                        {new Date(tx.created_at).toLocaleDateString(undefined, {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className={`text-sm font-black ${isCredit ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {isCredit ? '+' : ''}{tx.amount} SP
                </p>
                <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Balance: {tx.balance_after}
                </p>
            </div>
        </div>
    );
};

export default function SkillPointsPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [history, setHistory] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            setError("");
            setLoading(true);
            const res = await api.get("/payments/history/");
            setHistory(res.data.transactions || []);
            setBalance(res.data.balance || 0);

            // Sync with Redux Sidebar
            dispatch(updateWallet({
                balance: res.data.balance,
                is_welcome_gift_claimed: res.data.is_welcome_gift_claimed || true
            }));
        } catch (err) {
            console.error("Failed to fetch history:", err);
            setError("Unable to load your SkillPoints wallet right now.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelectPlan = (amount, credits) => {
        handlePayment({
            amount,
            points: credits,
            description: `${credits} SkillPoints`,
            user,
            onSuccess: () => {
                fetchData();
                setIsPricingModalOpen(false);
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-page-bg p-8 animate-pulse">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="h-10 w-64 bg-slate-200 rounded-2xl" />
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 h-96 bg-slate-200 rounded-[32px]" />
                        <div className="h-96 bg-slate-200 rounded-[32px]" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-page-bg font-body text-slate-900 px-4 py-8">
            <div className="mx-auto max-w-6xl space-y-8">
                <SectionTabs tabs={skillTabs} />

                {error ? (
                    <StudentFeedbackState
                        icon={AlertTriangle}
                        title="Wallet unavailable"
                        description={error}
                        tone="error"
                        action={
                            <button
                                type="button"
                                onClick={fetchData}
                                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                            >
                                Try Again
                            </button>
                        }
                    />
                ) : null}

                {/* Header */}
                {!error && <header className="flex flex-col gap-3">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-[11px] font-black tracking-[0.18em] text-teal-600 uppercase border border-teal-100">
                        <Sparkles size={12} fill="currentColor" /> SkillPoint Ecosystem
                    </span>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="font-heading text-4xl font-black tracking-tight text-slate-900">
                                My Digital Wallet
                            </h1>
                            <p className="mt-2 text-base font-medium text-slate-500">
                                Manage your SkillPoints for AI roadmaps and expert mentorship.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsPricingModalOpen(true)}
                            className="flex items-center gap-3 rounded-[24px] bg-teal-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-teal-200 transition-all hover:bg-teal-700 hover:scale-[1.02] active:scale-95"
                        >
                            <Plus size={20} strokeWidth={3} />
                            <span>Add SkillPoints</span>
                        </button>
                    </div>
                </header>}

                {!error && <div className="grid gap-8 lg:grid-cols-12">
                    {/* Left Column: Balance & History */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Balance Card */}
                        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0B818D] via-[#0A6C76] to-[#111C2D] p-8 text-white shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <WalletIcon size={120} />
                            </div>
                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                                <div>
                                    <p className="text-xs font-black tracking-[0.2em] text-teal-200 uppercase">Available Balance</p>
                                    <h2 className="mt-4 flex items-baseline gap-3">
                                        <span className="text-6xl font-black tabular-nums leading-none tracking-tight">{balance}</span>
                                        <span className="text-xl font-bold text-teal-300 uppercase tracking-widest">SkillPoints</span>
                                    </h2>
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 ring-1 ring-white/20">
                                            <Zap size={14} className="text-teal-400" />
                                            <span className="text-xs font-bold text-white leading-none">Standard Rate: 1 SP / Roadmap</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="shrink-0 flex flex-col gap-3">
                                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/20">
                                        <p className="text-[10px] font-black text-teal-200 uppercase tracking-widest">Premium Status</p>
                                        <p className="mt-1 text-sm font-bold text-white">Active Access</p>
                                    </div>
                                    <button
                                        onClick={() => setIsPricingModalOpen(true)}
                                        className="rounded-2xl bg-white p-4 text-teal-900 transition-colors hover:bg-teal-50"
                                    >
                                        <div className="flex items-center justify-between gap-6">
                                            <span className="text-sm font-black">Refill Now</span>
                                            <ChevronRight size={18} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Transaction History */}
                        <div className="rounded-[36px] border border-slate-200/60 bg-white shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between border-b border-slate-100 p-8">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                                        <History size={20} />
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Transaction History</h3>
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{history.length} Activities</span>
                            </div>

                            <div className="divide-y divide-slate-50">
                                {history.length > 0 ? (
                                    history.map((tx, i) => (
                                        <TransactionItem key={i} tx={tx} />
                                    ))
                                ) : (
                                    <div className="p-6">
                                        <StudentFeedbackState
                                            icon={History}
                                            title="No activities recorded yet"
                                            description="Your purchases and SkillPoint usage will appear here."
                                            compact
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Info & Rewards */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Welcome Bonus Card — Dynamic */}
                        <div className={`rounded-[36px] border p-8 shadow-sm transition-all ${
                            balance >= 8
                                ? 'border-amber-100 bg-gradient-to-br from-amber-50/50 to-white'
                                : 'border-slate-200/60 bg-gradient-to-br from-slate-50/50 to-white'
                        }`}>
                            <div className={`flex size-14 items-center justify-center rounded-2xl mb-6 shadow-sm ${
                                balance >= 8
                                    ? 'bg-amber-100 text-amber-600'
                                    : 'bg-slate-100 text-slate-400'
                            }`}>
                                <Trophy size={28} />
                            </div>

                            {balance >= 8 ? (
                                <>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                        🎉 Welcome Gift Unlocked!
                                    </h3>
                                    <p className="mt-3 text-sm font-medium text-slate-500 leading-relaxed">
                                        Congratulations! You&apos;ve received <span className="text-amber-600 font-bold">8 free SkillPoints</span> for joining PathWise.
                                    </p>
                                    <p className="mt-2 text-sm font-medium text-slate-500 leading-relaxed">
                                        Use them to generate your first AI Career Roadmap — it&apos;s on us!
                                    </p>
                                    <div className="mt-6 flex items-center justify-between rounded-2xl bg-white p-4 ring-1 ring-amber-100 shadow-sm shadow-amber-50">
                                        <p className="text-xs font-bold text-slate-600">Reward Status</p>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black border border-emerald-100">
                                            <CheckCircle2 className="size-3" /> CLAIMED
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                        Welcome Gift
                                    </h3>
                                    <p className="mt-3 text-sm font-medium text-slate-500 leading-relaxed">
                                        Every new member gets <span className="text-amber-600 font-bold">8 free SkillPoints</span> to kickstart their career journey.
                                    </p>
                                    <div className="mt-5 flex items-center gap-3 rounded-2xl bg-amber-50/70 px-4 py-3 ring-1 ring-amber-100">
                                        <Sparkles size={16} className="text-amber-500 shrink-0" />
                                        <p className="text-xs font-semibold text-amber-700 leading-relaxed">
                                            Your welcome gift will be credited automatically on your first login.
                                        </p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between rounded-2xl bg-white p-4 ring-1 ring-slate-100 shadow-sm">
                                        <p className="text-xs font-bold text-slate-600">Reward Status</p>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black border border-amber-100">
                                            ⏳ PENDING
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Utility Guide */}
                        <div className="rounded-[36px] bg-[#0B1220] p-8 text-white shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-teal-400">
                                    <Info size={20} />
                                </div>
                                <h3 className="text-lg font-black tracking-tight underline-offset-4 decoration-teal-500">Utility Guide</h3>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white font-black text-xs">1</div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Career Roadmaps</p>
                                        <p className="mt-1 text-xs text-slate-400 leading-relaxed">Costs 1 SkillPoint to generate a comprehensive AI career path.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white font-black text-xs">2</div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Expert Mentorship</p>
                                        <p className="mt-1 text-xs text-slate-400 leading-relaxed">Costs 10 SkillPoints for a private 1v1 session with industry mentors.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white font-black text-xs">3</div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Full Transparency</p>
                                        <p className="mt-1 text-xs text-slate-400 leading-relaxed">Every point used is tracked in your digital ledger for full auditability.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm">
                                <Shield size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-black text-slate-900 leading-none tracking-tight uppercase">Bank-Grade Security</p>
                                <p className="mt-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Verified Transactions</p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

            <PricingModal
                isOpen={isPricingModalOpen}
                onClose={() => setIsPricingModalOpen(false)}
                onSelectPlan={handleSelectPlan}
                user={user}
            />
        </div>
    );
}

function CheckCircle2({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    );
}
