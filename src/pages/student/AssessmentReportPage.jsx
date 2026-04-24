import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  CircleAlert,
  Compass,
  Download,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  Share2,
  History,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SkillWheel from "../../components/ui/SkillWheel";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { setReport as setReportRedux } from "../../store/slices/reportSlice";
const formatDate = (v) =>
  v
    ? new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(v))
    : "N/A";

const Badge = ({ label, color = "primary" }) => (
  <span
    className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-surface-low text-${color}`}
  >
    {label}
  </span>
);

const StatCard = ({ icon: Icon, label, value, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="rounded-2xl border border-white/10 bg-card-bg/50 p-5 shadow-float backdrop-blur-sm"
  >
    <div className="flex items-center gap-4">
      <div
        className={`flex size-10 items-center justify-center rounded-xl bg-${color}/10 text-${color}`}
      >
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
          {label}
        </p>
        <p className="mt-1 font-heading text-sm font-bold text-text-primary">
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

const SectionCard = ({ title, subtitle, icon: Icon, children, delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="rounded-3xl border border-white/5 bg-card-bg/40 p-6 shadow-float sm:p-8 backdrop-blur-md"
  >
    <div className="mb-6 flex items-start gap-4">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
        <Icon className="size-6" />
      </div>
      <div>
        <h2 className="font-heading text-xl font-bold text-text-primary">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 font-body text-sm text-text-secondary leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
    {children}
  </motion.section>
);

const EmptyState = ({ message }) => (
  <div className="rounded-2xl bg-surface-low px-5 py-8 text-center font-body text-sm text-text-secondary">
    {message}
  </div>
);

export default function AssessmentReportPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    let active = true;
    (async () => {
      if (!id) return (setError("ID missing"), setLoading(false));
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/assessments/${id}/report/`);

        if (active) {
          setReport(res.data);
          dispatch(setReportRedux(res.data));
          console.log(res.data);
        }
      } catch (err) {
        if (active)
          setError(
            err.response?.status === 404
              ? "Report not available yet."
              : "Unable to load report.",
          );
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => (active = false);
  }, [id, retryKey]);

  if (loading)
    return (
      <div className="min-h-screen bg-page-bg p-8 animate-pulse space-y-8">
        <div className="h-10 w-40 rounded-xl bg-surface-low" />
        <div className="h-64 rounded-3xl bg-surface-low" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-surface-low" />
          ))}
        </div>
      </div>
    );

  const careers = (report?.recommended_careers || []).filter(Boolean);
  const strengths = (report?.strengths || []).filter(Boolean);
  const weaknesses = (report?.weaknesses || []).filter(Boolean);
  const interests = (report?.interest_areas || []).filter(Boolean);
  const personality = report?.personality_type || "N/A";

  return (
    <div className="min-h-screen bg-page-bg px-4 py-8 font-body">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/student/assessments")}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-text-secondary shadow-sm hover:bg-surface-low transition-colors"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
          {report?.report_pdf_url && (
            <a
              href={report.report_pdf_url}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white shadow-float hover:opacity-90 transition-opacity"
            >
              <Download className="size-4" /> Download Report
            </a>
          )}
        </div>

        {error ? (
          <SectionCard
            title="Report Unreachable"
            subtitle={error}
            icon={CircleAlert}
          >
            <button
              onClick={() => setRetryKey((k) => k + 1)}
              className="mt-4 flex items-center gap-2 rounded-xl bg-secondary px-6 py-2.5 text-sm font-bold text-white shadow-float"
            >
              <RefreshCw className="size-4" /> Retry Now
            </button>
          </SectionCard>
        ) : (
          <>
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-[40px] bg-secondary p-8 text-white shadow-float md:p-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-transparent opacity-50" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-xl text-center lg:text-left">
                  <Badge label="Career Insights" color="teal-100" />
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 font-heading text-5xl font-extrabold tracking-tight md:text-7xl"
                  >
                    {personality !== "N/A"
                      ? personality
                      : "Analysis"}
                  </motion.h1>
                  <p className="mt-6 text-xl leading-relaxed text-slate-300 font-medium">
                    {report?.report_text ||
                      "Your career DNA is ready. Explore your strengths and recommended paths below."}
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                    <div className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-widest border border-white/5 shadow-sm">
                      <History className="size-4 opacity-70" /> {formatDate(report?.created_at)}
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-widest font-mono border border-white/5 shadow-sm opacity-60">
                      ID: {String(report?.id || "").slice(0, 8)}
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", damping: 12 }}
                  className="flex justify-center items-center drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                >
                  <SkillWheel size={380} profileImage={report?.user_image} />
                </motion.div>
              </div>
            </motion.section>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={Brain}
                label="Personality"
                value={personality}
                color="primary"
                delay={0.5}
              />
              <StatCard
                icon={Compass}
                label="Interests"
                value={`${interests.length} Areas`}
                color="teal-600"
                delay={0.6}
              />
              <StatCard
                icon={TrendingUp}
                label="Strengths"
                value={`${strengths.length} Identified`}
                color="success"
                delay={0.7}
              />
              <StatCard
                icon={Target}
                label="Careers"
                value={`${careers.length} Matches`}
                color="warning"
                delay={0.8}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SectionCard title="Key Strengths" icon={TrendingUp} delay={0.9}>
                <div className="flex flex-wrap gap-2">
                  {strengths.length ? (
                    strengths.map((s, i) => (
                      <Badge key={i} label={s} color="success" />
                    ))
                  ) : (
                    <EmptyState message="No data." />
                  )}
                </div>
              </SectionCard>

              <SectionCard title="Interest Alignment" icon={Compass} delay={1.0}>
                <div className="flex flex-wrap gap-2">
                  {interests.length ? (
                    interests.map((s, i) => (
                      <Badge key={i} label={s} color="primary" />
                    ))
                  ) : (
                    <EmptyState message="No data." />
                  )}
                </div>
              </SectionCard>

              <SectionCard
                title="Recommended Careers"
                icon={Sparkles}
                subtitle="The paths most aligned with your profile"
                delay={1.1}
              >
                <div className="space-y-3">
                  {careers.length ? (
                    careers.map((c, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2 + (i * 0.1) }}
                        className="flex items-center gap-4 rounded-2xl bg-surface-low/50 p-4 border border-white/5 hover:bg-surface-low transition-colors cursor-default"
                      >
                        <span className="font-heading text-lg font-bold text-primary opacity-40">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="font-body font-bold text-text-primary">
                          {c}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <EmptyState message="No careers found." />
                  )}
                </div>
              </SectionCard>

              {/* [FUTURE_FEATURE]: Comparison Module
              <SectionCard title="Peer Comparison" icon={Users} subtitle="How your profile stacks up against peers">
                <EmptyState message="Coming tomorrow: visual profile comparisons and demographic insights." />
              </SectionCard>
              */}

              {/* [FUTURE_FEATURE]: History Tracker
              <SectionCard title="Growth Over Time" icon={History} subtitle="Tracking your assessment evolution">
                <EmptyState message="Coming tomorrow: multi-report timeline and trajectory analysis." />
              </SectionCard>
              */}

              {/* [FUTURE_FEATURE]: Sharing Module
              <section className="col-span-full rounded-2xl bg-surface-low p-8 text-center border-2 border-dashed border-slate-200">
                <Share2 className="mx-auto size-12 text-slate-300" />
                <h3 className="mt-4 font-heading text-lg font-bold">Share Report with Counselor</h3>
                <p className="mt-2 text-sm text-text-secondary">Next day feature: One-click secure sharing with your mentor.</p>
              </section>
              */}
            </div>

            <section className="rounded-[40px] bg-primary-container p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-float">
              <div className="max-w-xl">
                <h2 className="font-heading text-2xl font-bold">
                  What's Next?
                </h2>
                <p className="mt-2 font-body text-teal-50 opacity-90">
                  Deep dive into specific careers or use your roadmap to start
                  building the skills recommended in this report.
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/student/roadmap"
                  className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-sm hover:bg-teal-50"
                >
                  Career Roadmap
                </Link>
                <Link
                  to="/student/careers"
                  className="rounded-xl bg-primary px-6 py-3 text-sm font-bold shadow-sm hover:opacity-90"
                >
                  Browse Careers
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
