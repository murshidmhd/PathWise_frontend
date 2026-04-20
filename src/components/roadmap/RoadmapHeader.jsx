import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RoadmapHeader = ({
    roadmap,
    completedCount,
    totalCount,
    progressPercentage,
    customTitle,
    setCustomTitle,
    handleCustomGenerate,
    isGenerating,
    walletBalance,
    handlePayment
}) => {
    return (
        <header className="rounded-[34px] border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
                <Link
                    to="/student/dashboard"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B818D] transition hover:text-[#07606a]"
                >
                    <ArrowLeft className="size-4" />
                    Back to Dashboard
                </Link>

                {/* Wallet Balance */}
                <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 px-4 py-2 shadow-sm">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Career Credits</span>
                        <span className="text-base font-black text-indigo-700 leading-none">{walletBalance} Available</span>
                    </div>
                    <button
                        onClick={handlePayment}
                        className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95"
                        title="Purchase 1 Career Credit"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                    </button>
                </div>
            </div>

            <div className="mt-5 grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:items-end">
                <div>
                    <p className="text-[11px] font-black tracking-[0.2em] text-indigo-600 uppercase">
                        {isGenerating ? "AI is generating..." : "AI Generated Roadmap"}
                    </p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                        {roadmap?.title || "Your Career Journey"}
                    </h1>

                    {/* Custom Generation Input */}
                    <div className="mt-6 flex max-w-md gap-2">
                        <input
                            type="text"
                            placeholder="Try 'Data Scientist' or 'Pilot'..."
                            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={customTitle}
                            onChange={(e) => setCustomTitle(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleCustomGenerate()}
                            disabled={isGenerating}
                        />
                        <button
                            onClick={handleCustomGenerate}
                            disabled={isGenerating || !customTitle.trim()}
                            className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
                        >
                            {isGenerating ? "Working..." : "Go"}
                        </button>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                        Follow each milestone in order to move from guidance to action
                        with a clear, practical path toward your target role.
                    </p>
                </div>

                <div className="rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 text-white shadow-sm">
                    <p className="text-[11px] font-black tracking-[0.18em] text-teal-200 uppercase">
                        Target Career
                    </p>
                    <h2 className="mt-2 text-xl font-bold">
                        {roadmap?.career_title || "Career goal"}
                    </h2>
                    <p className="mt-2 text-sm text-slate-300">
                        {totalCount} milestones planned for this journey
                    </p>
                </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-200/70 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-600">Journey Progress</p>
                    <p className="text-sm font-bold text-slate-900">
                        {completedCount} / {totalCount} completed
                    </p>
                </div>

                <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white shadow-inner">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-[#0B818D] to-indigo-500 transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                <p className="mt-2 text-xs font-medium text-slate-500">
                    {progressPercentage}% complete
                </p>
            </div>
        </header>
    );
};

export default RoadmapHeader;
