import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BookOpen, Sparkles, Target, Trophy, History, AlertTriangle, RefreshCw, ClipboardList } from "lucide-react";
import api from "../../services/api";

// New Shared Components
import MilestoneCard from "../../components/roadmap/MilestoneCard";
import InfoCard from "../../components/roadmap/InfoCard";
import RoadmapHeader from "../../components/roadmap/RoadmapHeader";
import { handlePayment } from "../../services/utils/payment";
import PricingModal from "../../components/payment/PricingModal";

export default function CareerRoadmapPage() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [roadmapHistory, setRoadmapHistory] = useState([]);

  // Custom Roadmap State
  const [customTitle, setCustomTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  const fetchWallet = () => {
    api.get("/payments/wallet/").then((res) => {
      setWalletBalance(res.data.balance_credits || 0);
    }).catch(() => null);
  };

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!token) return;
    api
      .get("/roadmap/history/")
      .then((res) => setRoadmapHistory(res.data))
      .catch((err) => console.error("Failed to load history", err));
  }, [token, roadmap]); // Refresh history when a new roadmap is generated

  const loadRoadmap = async (id, overrideAssessmentId = null) => {
    setLoading(true);
    try {


      console.log("this is overrideAssessmentId", overrideAssessmentId);
      console.log("this is assessmentId", assessmentId);
      console.log("this is id", id);
      const endpoint = id ? `/roadmap/detail/${id}/` : `/roadmap/${overrideAssessmentId || assessmentId}/`;
      const res = await api.get(endpoint);
      setRoadmap(res.data);
      setMilestones(res.data.milestones || []);
      setAssessmentId(res.data.assessment || overrideAssessmentId);
    } catch (err) {
      const acid = overrideAssessmentId || assessmentId;
      if (err.response?.status === 404 && acid) {
        // Only auto-generate if we have an assessmentId and it's missing
        try {
          const genRes = await api.post(`/roadmap/${acid}/generate/`);
          setRoadmap(genRes.data);
          setMilestones(genRes.data.milestones || []);
          setAssessmentId(acid);
        } catch (genErr) {
          console.error("Failed to auto-generate roadmap", genErr);
          setError("Failed to generate your personalized roadmap. Please try again later.");
        }
      } else {
        setError("Failed to load roadmap.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    const init = async () => {
      try {
        const latestRes = await api.get("/assessments/latest/");
        const acid = latestRes.data.id;
        setAssessmentId(acid);
        loadRoadmap(null, acid);
      } catch (err) {
        setError("Please complete an assessment first.");
        setLoading(false);
      }
    };

    init();
    fetchWallet();
  }, [token]);

  const onPurchaseSuccess = () => {
    fetchWallet();
  };

  const handleSelectPlan = (amount, credits) => {
    if (amount === 0) {
      alert("Free plan selected. Enjoy your roadmap!");
      setIsPricingModalOpen(false);
      return;
    }
    handlePayment({
      amount,
      description: `${credits} Career Credit${credits > 1 ? 's' : ''}`,
      user,
      onSuccess: () => {
        onPurchaseSuccess();
        setIsPricingModalOpen(false);
      }
    });
  };

  const toggleComplete = async (milestoneId) => {
    try {
      const res = await api.patch(`/roadmap/milestone/${milestoneId}/complete/`);
      setMilestones((prev) =>
        prev.map((milestone) =>
          milestone.id === milestoneId
            ? {
              ...milestone,
              is_completed: res.data.is_completed,
              completed_at: res.data.completed_at,
            }
            : milestone,
        ),
      );
    } catch (err) {
      console.error("Failed to update milestone", err);
    }
  };

  const handleCustomGenerate = async () => {
    if (!customTitle.trim()) return;
    setIsGenerating(true);
    try {
      const res = await api.post(`/roadmap/${assessmentId}/custom/`, {
        career_title: customTitle
      });
      setRoadmap(res.data);
      setMilestones(res.data.milestones || []);
      setCustomTitle("");
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || "AI couldn't generate that path. Try a more common career title!";
      setError(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const orderedMilestones = useMemo(
    () => [...milestones].sort((a, b) => a.order_number - b.order_number),
    [milestones],
  );

  const completedCount = milestones.filter((milestone) => milestone.is_completed).length;
  const totalCount = milestones.length;
  const progressPercentage = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-page-bg px-4 py-8">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-11 w-72 rounded-2xl bg-surface-low" />
          <div className="h-64 rounded-[34px] bg-surface-low" />
          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.95fr]"><div className="h-[420px] rounded-[30px] bg-surface-low" /><div className="h-[420px] rounded-[30px] bg-surface-low" /></div>
        </div>
      </div>
    );
  }

  if (error) {
    const isAssessmentError = error.toLowerCase().includes("assessment");
    return (
      <div className="min-h-screen bg-page-bg px-4 py-8 flex items-start justify-center">
        <div className="mx-auto mt-16 max-w-lg w-full">
          <div className="rounded-[30px] border border-slate-200/80 bg-white p-8 shadow-sm text-center space-y-5">
            {/* Icon */}
            <div className={`mx-auto flex size-16 items-center justify-center rounded-2xl ${
              isAssessmentError
                ? "bg-amber-50 text-amber-500"
                : "bg-rose-50 text-rose-500"
            }`}>
              {isAssessmentError
                ? <ClipboardList className="size-7" />
                : <AlertTriangle className="size-7" />
              }
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-slate-900">
              {isAssessmentError ? "Assessment Required" : "Something Went Wrong"}
            </h2>

            {/* Message */}
            <p className="text-sm leading-relaxed text-slate-500 max-w-sm mx-auto">
              {isAssessmentError
                ? "Complete a skill assessment first so our AI can build a personalized career roadmap just for you."
                : error
              }
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {isAssessmentError ? (
                <a
                  href="/student/skill-analyze"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#0B818D] to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-200/40 transition hover:shadow-xl hover:scale-[1.02] active:scale-95"
                >
                  <ClipboardList className="size-4" />
                  Take Assessment
                </a>
              ) : (
                <button
                  onClick={() => { setError(null); setLoading(true); window.location.reload(); }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#0B818D] to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-200/40 transition hover:shadow-xl hover:scale-[1.02] active:scale-95"
                >
                  <RefreshCw className="size-4" />
                  Try Again
                </button>
              )}
              <a
                href="/student/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">

        <RoadmapHeader
          roadmap={roadmap}
          completedCount={completedCount}
          totalCount={totalCount}
          progressPercentage={progressPercentage}
          customTitle={customTitle}
          setCustomTitle={setCustomTitle}
          handleCustomGenerate={handleCustomGenerate}
          isGenerating={isGenerating}
          walletBalance={walletBalance}
          handlePayment={() => setIsPricingModalOpen(true)}
        />

        <PricingModal
          isOpen={isPricingModalOpen}
          onClose={() => setIsPricingModalOpen(false)}
          onSelectPlan={handleSelectPlan}
          user={user}
        />

        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.8fr_0.95fr]">
          {/* History Sidebar */}
          <aside className="space-y-4">
            <section className="rounded-[30px] border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <History className="size-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-900">Path History</h3>
              </div>
              <div className="space-y-2">
                {roadmapHistory.length ? (
                  roadmapHistory.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => loadRoadmap(r.id)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all ${roadmap?.id === r.id
                        ? "border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500"
                        : "border-slate-100 hover:border-slate-300 bg-slate-50/50"
                        }`}
                    >
                      <p className="text-xs font-bold text-slate-800 truncate">{r.career_title}</p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {new Date(r.created_at).toLocaleDateString()}
                      </p>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-4">No history yet.</p>
                )}
              </div>
            </section>
          </aside>
          <section className="rounded-[30px] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-teal-50 text-[#0B818D]">
                <Sparkles className="size-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Milestone Timeline</h2>
                <p className="text-sm text-slate-500">Complete each step to unlock the next one.</p>
              </div>
            </div>

            {orderedMilestones.map((milestone, index, array) => {
              let status = "locked";
              if (milestone.is_completed) status = "completed";
              else if (index === array.findIndex((item) => !item.is_completed)) status = "current";

              return (
                <MilestoneCard
                  key={milestone.id}
                  milestone={milestone}
                  index={index}
                  isLast={index === array.length - 1}
                  status={status}
                  onToggle={toggleComplete}
                />
              );
            })}
          </section>

          <aside className="space-y-4">
            <InfoCard icon={Trophy} title="Roadmap Completion" value={`${progressPercentage}%`} description="Your milestone completion rate." accent="bg-amber-50 text-amber-600" />
            <InfoCard icon={Target} title="Current Focus" value={orderedMilestones.find((m) => !m.is_completed)?.title || "All complete"} description="Next milestone to attend." accent="bg-indigo-50 text-indigo-600" />
            <InfoCard icon={BookOpen} title="Learning Path" value={`${totalCount} Steps`} description="Steps include skills & exams." accent="bg-emerald-50 text-emerald-600" />
          </aside>
        </div>
      </div>
    </div>
  );
}
