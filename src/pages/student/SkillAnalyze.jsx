import { useState } from "react";
import { Sparkles, BrainCircuit, Target, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SkillAnalyze() {
    const [skills] = useState([
        { name: "JavaScript", level: 85, category: "Frontend" },
        { name: "React", level: 75, category: "Frontend" },
        { name: "Python", level: 60, category: "Backend" },
        { name: "Data Structures", level: 50, category: "Computer Science" },
        { name: "UI/UX Design", level: 40, category: "Design" },
    ]);

    const [recommendations] = useState([
        { skill: "Node.js", reason: "Complements your React skills for full-stack development." },
        { skill: "System Design", reason: "Essential for senior roles and complex architectures." },
        { skill: "TypeScript", reason: "Highly requested in modern frontend ecosystems." }
    ]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-body text-slate-900 px-4 py-8">
            <div className="mx-auto max-w-6xl space-y-8">
                {/* Header */}
                <header className="flex flex-col gap-3">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-[11px] font-black tracking-[0.18em] text-indigo-600 uppercase border border-indigo-100">
                        <BrainCircuit size={12} /> Skill Intelligence
                    </span>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="font-heading text-4xl font-black tracking-tight text-slate-900">
                                Skill Analysis
                            </h1>
                            <p className="mt-2 text-base font-medium text-slate-500">
                                Discover your strengths, identify gaps, and unlock your true potential.
                            </p>
                        </div>
                        <button
                            className="flex items-center gap-3 rounded-[24px] bg-gradient-to-br from-indigo-600 to-indigo-700 px-6 py-4 text-sm font-black text-white shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            <Sparkles size={20} />
                            <span>Analyze New Skills</span>
                        </button>
                    </div>
                </header>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Left Column: Current Skills overview */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Summary Card */}
                        <div className="relative overflow-hidden rounded-[40px] bg-white p-8 border border-slate-200/60 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                        <Target size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Current Proficiency</h3>
                                        <p className="text-sm font-medium text-slate-500">Your mapped skill portfolio</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {skills.map((skill, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-slate-700">{skill.name}</span>
                                            <span className="text-xs font-black text-indigo-600">{skill.level}%</span>
                                        </div>
                                        <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                                            <div 
                                                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-1000"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Recommendations & Gaps */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Recommendations */}
                        <div className="rounded-[36px] bg-[#111C2D] p-8 text-white shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-emerald-400">
                                    <TrendingUp size={20} />
                                </div>
                                <h3 className="text-lg font-black tracking-tight">Growth Areas</h3>
                            </div>
                            
                            <div className="space-y-5">
                                {recommendations.map((rec, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-400">
                                            <Sparkles size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{rec.skill}</p>
                                            <p className="mt-1 text-xs text-slate-400 leading-relaxed">{rec.reason}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gap Warning */}
                        <div className="rounded-[36px] border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-6 shadow-sm">
                                <AlertCircle size={28} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Skill Gap Detected</h3>
                            <p className="mt-3 text-sm font-medium text-slate-500 leading-relaxed">
                                Your current roadmap requires <span className="font-bold text-slate-800">Cloud Computing</span> fundamentals to reach a 90% match rate.
                            </p>
                            <button className="mt-6 w-full rounded-2xl bg-white border border-amber-200 px-4 py-3 text-sm font-bold text-amber-700 transition-colors hover:bg-amber-50">
                                View Learning Path
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
