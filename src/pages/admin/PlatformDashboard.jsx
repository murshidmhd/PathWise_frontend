import { useEffect, useState } from "react";
import { AdminPageFrame, Icon } from "./shared";
import { Building2, Users, ShieldCheck, Activity, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const StatCard = ({ icon: IconComponent, label, value, trend, color }) => (
  <div className="rounded-[32px] bg-white p-6 shadow-float transition-all hover:translate-y-[-2px]">
    <div className="flex items-center justify-between">
      <div className={`flex size-12 items-center justify-center rounded-2xl bg-slate-50 text-${color}`}>
        <IconComponent className="size-6 text-[#0B818D]" />
      </div>
      {trend && (
        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
          {trend}
        </span>
      )}
    </div>
    <div className="mt-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <h3 className="mt-1 font-heading text-3xl font-bold text-slate-950">{value}</h3>
    </div>
  </div>
);

export default function PlatformDashboard() {
  const [data, setData] = useState({ colleges: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/tenants/organizations/");
        setData({ colleges: response.data });
      } catch (error) {
        console.error("Platform dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlatformData();
  }, []);

  if (loading) {
    return (
      <AdminPageFrame badge="System Intelligence" title="Syncing global data..." description="Aggregating metrics across all tenant ecosystems.">
        <div className="grid gap-6 md:grid-cols-3 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-40 rounded-[32px] bg-white" />)}
        </div>
      </AdminPageFrame>
    );
  }

  return (
    <AdminPageFrame
      badge="Platform Master Dashboard"
      title="Global Command Center"
      description="Manage your SaaS ecosystem, monitor tenant health, and scale your education network."
    >
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          icon={Building2} 
          label="Total Colleges" 
          value={data.colleges.length} 
          trend="+2 New" 
          color="primary"
        />
        <StatCard 
          icon={Users} 
          label="Global Reach" 
          value="1.2k+" 
          color="success"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Monthly Revenue" 
          value="₹45k" 
          color="warning"
        />
        <StatCard 
          icon={Activity} 
          label="System Status" 
          value="Healthy" 
          color="primary"
        />
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[40px] bg-white p-8 shadow-float">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-slate-950">Active Ecosystems</h2>
              <p className="mt-1 text-sm text-slate-500">Recently launched college tenants</p>
            </div>
            <Link to="/superadmin/colleges" className="flex items-center gap-2 text-sm font-bold text-[#0B818D] hover:opacity-80 transition-opacity">
              Manage All <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {data.colleges.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 transition-colors hover:bg-slate-100/50">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-[#0B818D] shadow-sm">
                    <Building2 className="size-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-950">{item.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.schema_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="px-4 py-1.5 rounded-xl bg-white text-[10px] font-bold text-[#0B818D] shadow-sm border border-slate-100">
                     {item.plan.toUpperCase()}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[40px] bg-[#0F172A] p-8 text-white shadow-float relative overflow-hidden">
             <div className="absolute top-[-20px] right-[-20px] size-40 bg-[#0B818D]/20 rounded-full blur-3xl" />
             <div className="relative z-10">
               <h3 className="font-heading text-xl font-bold">Launch a College</h3>
               <p className="mt-4 text-sm leading-relaxed text-slate-400">Ready to expand? Create a new dedicated schema and domain for your next partner institution.</p>
               <Link to="/superadmin/colleges" className="mt-8 inline-flex items-center gap-2 text-xs font-bold px-6 py-3 bg-[#0B818D] rounded-xl hover:bg-[#096b75] transition-colors">
                 Go to Infrastructure
               </Link>
             </div>
          </div>
        </div>
      </section>
    </AdminPageFrame>
  );
}
