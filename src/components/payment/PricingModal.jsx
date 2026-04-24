import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Zap, Shield, X, Star } from 'lucide-react';

const PricingPlan = ({ title, price, credits, features, isPopular, onSelect, buttonText, icon: PlanIcon }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`relative flex flex-col rounded-[32px] border p-6 transition-all ${isPopular
            ? 'border-teal-500 bg-white shadow-xl shadow-teal-100 ring-4 ring-teal-50 font-medium'
            : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg'
            }`}
    >
        {isPopular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-teal-600 px-4 py-1 text-[11px] font-black tracking-widest text-white uppercase shadow-lg border border-teal-400">
                Most Popular
            </div>
        )}

        <div className="mb-6">
            <div className={`mb-4 flex size-12 items-center justify-center rounded-2xl ${isPopular ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                <PlanIcon size={24} />
            </div>
            <h3 className="text-sm font-black tracking-tight text-slate-500 uppercase">{title}</h3>
            <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">₹{price}</span>
            </div>
            <p className="mt-2 text-sm font-bold text-teal-600 flex items-center gap-1.5">
                <Sparkles size={14} className="text-teal-500" /> {credits} SkillPoints
            </p>
        </div>

        <div className="mb-8 space-y-3.5">
            {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${isPopular ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-semibold text-slate-600 leading-tight">{feature}</span>
                </div>
            ))}
        </div>

        <button
            onClick={onSelect}
            className={`mt-auto w-full rounded-2xl py-3.5 text-sm font-black transition-all active:scale-95 ${isPopular
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-200 hover:bg-teal-700'
                : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
        >
            {buttonText}
        </button>
    </motion.div>
);

const PricingModal = ({ isOpen, onClose, onSelectPlan, user }) => {
    if (!isOpen) return null;

    const plans = [
        {
            title: "Starter",
            price: 350,
            credits: "10",
            icon: Zap,
            features: [
                "10 SkillPoints",
                "1 High-end Mentor Session",
                "OR 10 AI Roadmaps",
                "Priority Support",
                "Lifetime History"
            ],
            buttonText: "Get Started",
            onSelect: () => onSelectPlan(350, 10)
        },
        {
            title: "Professional",
            price: 999,
            credits: "35",
            icon: Star,
            isPopular: true,
            features: [
                "35 SkillPoints (5 FREE)",
                "3+ Mentor Sessions",
                "Unlimited Roadmap Edits",
                "Elite AI Insights",
                "Career Profile Audit"
            ],
            buttonText: "Upgrade to Pro",
            onSelect: () => onSelectPlan(999, 35)
        },
        {
            title: "Elite",
            price: 2499,
            credits: "100",
            icon: Shield,
            features: [
                "100 SkillPoints (20 FREE)",
                "10+ Mentor Sessions",
                "Direct Chat with Mentors",
                "Early Access to Jobs",
                "Verified Pro Badge"
            ],
            buttonText: "Get Elite Access",
            onSelect: () => onSelectPlan(2499, 100)
        }
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-[#0B1220]/80 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-5xl rounded-[48px] border border-white/10 bg-white p-6 shadow-2xl sm:p-10"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition-all hover:bg-slate-200 hover:rotate-90"
                    >
                        <X size={24} />
                    </button>

                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-[11px] font-black tracking-widest text-teal-600 uppercase border border-teal-100">
                            <Sparkles size={12} fill="currentColor" /> Elevate your career journey
                        </div>
                        <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                            Unlock Your Path with <span className="text-teal-600">SkillPoints</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-slate-500">
                            Access premium AI roadmaps and high-end professional mentorship sessions with our branded SkillPoint ecosystem.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {plans.map((plan, i) => (
                            <PricingPlan key={i} {...plan} />
                        ))}
                    </div>

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-10 rounded-[32px] border border-slate-100 bg-slate-50/80 p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
                                <Shield className="text-teal-600" size={24} />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-black text-slate-900 leading-none">Safe & Secure</p>
                                <p className="mt-2 text-xs font-bold text-slate-500">Payments via Razorpay SSL</p>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-slate-200 hidden md:block" />
                        <div className="flex items-center gap-4">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
                                <Zap className="text-teal-500" size={24} />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-black text-slate-900 leading-none">Instant Utility</p>
                                <p className="mt-2 text-xs font-bold text-slate-500">SkillPoints credited instantly</p>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-slate-200 hidden md:block" />
                        <div className="flex items-center gap-4">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
                                <Star className="text-amber-500" size={24} />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-black text-slate-900 leading-none">Premium Status</p>
                                <p className="mt-2 text-xs font-bold text-slate-500">Unlocks all AI features</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PricingModal;
