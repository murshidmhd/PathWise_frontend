import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminPageFrame, Icon, StatusPill } from "./shared";
import { Users, UserCheck, ShieldCheck, Activity, ArrowRight, Clock, AlertCircle } from "lucide-react";
import api from "../../services/api";

const StatCard = ({ icon: IconComponent, label, value, trend, color }) => (
  <div className="rounded-[32px] bg-card-bg p-6 shadow-float transition-all hover:translate-y-[-2px]">
    <div className="flex items-center justify-between">
      <div className={`flex size-12 items-center justify-center rounded-2xl bg-surface-low text-${color}`}>
        <IconComponent className="size-6" />
      </div>
      {trend && (
        <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-lg">
          {trend}
        </span>
      )}
    </div>
    <div className="mt-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">{label}</p>
      <h3 className="mt-1 font-heading text-3xl font-bold text-text-primary">{value}</h3>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [data, setData] = useState({ users: { students: [], counselors: [] }, approvals: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersRes, approvalsRes] = await Promise.all([
          api.get("/admin/users/"),
          api.get("/admin/approvals/")
        ]);
        setData({ users: usersRes.data, approvals: approvalsRes.data });
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const pendingCount = data.approvals.filter(a => a.approval_status === "pending").length;

  if (loading) {
    return (
      <AdminPageFrame badge="System Status" title="Loading intelligence..." description="Aggregating platform metrics and active queues.">
        <div className="grid gap-6 md:grid-cols-3 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-40 rounded-[32px] bg-surface-low" />)}
        </div>
      </AdminPageFrame>
    );
  }

  return (
    <AdminPageFrame
      badge="Platform Overview"
      title="High-level command center"
      description="Monitor student growth, counselor onboarding, and critical system approvals in real-time."
    >
      {/* 1. Statistics Summary */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          icon={Users} 
          label="Total Students" 
          value={data.users.students?.length || 0} 
          trend="+12%" 
          color="primary"
        />
        <StatCard 
          icon={UserCheck} 
          label="Active Counselors" 
          value={data.users.counselors?.length || 0} 
          color="success"
        />
        <StatCard 
          icon={ShieldCheck} 
          label="Pending Approvals" 
          value={pendingCount} 
          color="warning"
        />
        <StatCard 
          icon={Activity} 
          label="Platform Health" 
          value="Optimal" 
          color="primary"
        />
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* 2. Priority Approval Queue */}
        <div className="rounded-[40px] bg-card-bg p-8 shadow-float">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-text-primary">Action Required</h2>
              <p className="mt-1 text-sm text-text-secondary">Onboarding requests needing your attention</p>
            </div>
            <Link to="/admin/approvals" className="flex items-center gap-2 text-sm font-bold text-primary hover:opacity-80 transition-opacity">
              View all queue <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {data.approvals.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-5 rounded-3xl bg-surface-low transition-colors hover:bg-surface-highest">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                    <Icon name="verified_user" />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">{item.full_name || "New Applicant"}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{item.type || "Role Request"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
                     <Clock className="size-3" /> {new Date(item.created_at).toLocaleDateString()}
                   </div>
                   <Link to="/admin/approvals" className="px-5 py-2 rounded-xl bg-white text-xs font-bold text-text-primary shadow-sm hover:bg-primary hover:text-white transition-all">
                     Review
                   </Link>
                </div>
              </div>
            ))}
            {data.approvals.length === 0 && (
              <div className="py-12 text-center">
                <ShieldCheck className="mx-auto size-12 text-surface-highest mb-4" />
                <p className="text-text-secondary font-medium">All clear! No pending approvals at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* 3. Real-time System Notes */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[40px] bg-secondary p-8 text-white shadow-float relative overflow-hidden">
             <div className="absolute top-[-20px] right-[-20px] size-40 bg-white/5 rounded-full blur-3xl" />
             <div className="relative z-10">
               <div className="flex items-center gap-3 text-success">
                 <div className="size-2 rounded-full bg-success animate-pulse" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Operational</span>
               </div>
               <h3 className="mt-4 font-heading text-xl font-bold">Platform Status</h3>
               <p className="mt-4 text-sm leading-relaxed text-slate-300"> All core services are performing within normal parameters. CDN cache hit ratios are at 94% worldwide.</p>
               <button className="mt-8 flex items-center gap-2 text-xs font-bold px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                 Full Health Report
               </button>
             </div>
          </div>

          <div className="rounded-[40px] bg-card-bg p-8 shadow-float">
            <h3 className="font-heading text-lg font-bold text-text-primary mb-6">Recent Platform Events</h3>
            <div className="space-y-6">
               <div className="flex gap-4">
                 <div className="size-2 rounded-full bg-primary mt-2 shrink-0" />
                 <div>
                    <p className="text-sm font-bold text-text-primary">Counselor Network Expansion</p>
                    <p className="text-xs text-text-secondary mt-1">3 new mentors specialized in STEM verified today.</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <div className="size-2 rounded-full bg-warning mt-2 shrink-0" />
                 <div>
                    <p className="text-sm font-bold text-text-primary">SLA Warning</p>
                    <p className="text-xs text-text-secondary mt-1">2 approvals in the queue are nearing the 48-hour deadline.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </AdminPageFrame>
  );
}

