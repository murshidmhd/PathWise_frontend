  import { useEffect, useState } from "react";
import { AdminPageFrame, Icon, StatusPill } from "./shared";
import { Building2, Plus, Globe, ShieldCheck, ArrowRight, X, Loader2 } from "lucide-react";
import api from "../../services/api";
import { toast } from "react-hot-toast";

const CreateCollegeModal = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    schema_name: "",
    domain_name: "",
    plan: "pro"
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/tenants/organizations/create/", formData);
      toast.success("College launched successfully!");
      onCreated();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create college");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-md p-4">
      <div className="w-full max-w-lg rounded-[40px] bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-slate-950">Launch New College</h2>
            <p className="text-sm text-slate-500 mt-1">Initialize a dedicated ecosystem for a new partner.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">College Name</label>
            <input 
              required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#0B818D] transition-all font-medium"
              placeholder="e.g. Oxford University"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Schema Identifier</label>
              <input 
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#0B818D] transition-all font-medium"
                placeholder="oxford"
                value={formData.schema_name}
                onChange={(e) => setFormData({...formData, schema_name: e.target.value.toLowerCase()})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Plan</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#0B818D] transition-all font-medium"
                value={formData.plan}
                onChange={(e) => setFormData({...formData, plan: e.target.value})}
              >
                <option value="free">Free Tier</option>
                <option value="pro">Pro Enterprise</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Domain Mapping</label>
            <input 
              required
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#0B818D] transition-all font-medium"
              placeholder="oxford.pathwise.live"
              value={formData.domain_name}
              onChange={(e) => setFormData({...formData, domain_name: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full py-5 rounded-[24px] bg-slate-950 text-white font-bold hover:bg-[#0B818D] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : <Plus className="size-5" />}
            Provision Infrastructure
          </button>
        </form>
      </div>
    </div>
  );
};

const CreateAdminModal = ({ isOpen, onClose, orgId, orgName }) => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      organization_id: orgId
    });
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        setFormData(prev => ({...prev, organization_id: orgId}));
    }, [orgId]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await api.post("/api/tenants/create-college-admin/", formData);
        toast.success(`Admin added to ${orgName}!`);
        onClose();
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to add admin");
      } finally {
        setLoading(false);
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-md p-4">
        <div className="w-full max-w-lg rounded-[40px] bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-slate-950">Add College Admin</h2>
              <p className="text-sm text-slate-500 mt-1">Appoint a manager for <span className="font-bold text-[#0B818D]">{orgName}</span>.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="size-5" />
            </button>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">First Name</label>
                    <input 
                        required
                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#0B818D] transition-all font-medium"
                        value={formData.first_name}
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Last Name</label>
                    <input 
                        required
                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#0B818D] transition-all font-medium"
                        value={formData.last_name}
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    />
                </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Email Address</label>
              <input 
                type="email"
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#0B818D] transition-all font-medium"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
  
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Password</label>
              <input 
                type="password"
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#0B818D] transition-all font-medium"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
  
            <button 
              disabled={loading}
              className="w-full py-5 rounded-[24px] bg-slate-950 text-white font-bold hover:bg-[#0B818D] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="size-5 animate-spin" /> : <ShieldCheck className="size-5" />}
              Grant Admin Privileges
            </button>
          </form>
        </div>
      </div>
    );
  };

export default function AdminColleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminModal, setAdminModal] = useState({ isOpen: false, orgId: null, orgName: "" });

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/tenants/organizations/");
      setColleges(response.data);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <AdminPageFrame
      badge="Network Management"
      title="College Ecosystems"
      description="Scale your platform by launching dedicated ecosystems for educational institutions worldwide."
    >
      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-4">
            <div className="px-6 py-3 rounded-2xl bg-white shadow-sm border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Ecosystems</span>
                <p className="text-2xl font-bold text-slate-950">{colleges.length}</p>
            </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 rounded-[22px] bg-[#0B818D] text-white font-bold shadow-lg shadow-[#0B818D]/20 hover:scale-105 transition-all active:scale-95"
        >
          <Plus className="size-5" />
          Launch New College
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
            [1,2,3].map(i => <div key={i} className="h-64 rounded-[40px] bg-white animate-pulse" />)
        ) : (
            colleges.map((college) => (
            <div key={college.id} className="group relative overflow-hidden rounded-[40px] bg-white p-8 shadow-float transition-all hover:translate-y-[-4px]">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <StatusPill variant={college.plan === 'pro' ? 'teal' : 'slate'}>{college.plan.toUpperCase()}</StatusPill>
                </div>
                
                <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-50 text-[#0B818D] group-hover:bg-[#0B818D] group-hover:text-white transition-all">
                    <Building2 className="size-7" />
                </div>

                <div className="mt-6">
                    <h3 className="font-heading text-2xl font-bold text-slate-950">{college.name}</h3>
                    <div className="mt-3 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Globe className="size-4" />
                            {college.domains?.[0]?.domain || "no-domain-set"}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Icon name="database" className="text-sm" />
                            <span className="font-mono text-xs">{college.schema_name}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                    <button 
                        onClick={() => setAdminModal({ isOpen: true, orgId: college.id, orgName: college.name })}
                        className="text-xs font-black uppercase tracking-widest text-[#0B818D] hover:opacity-70 transition-opacity"
                    >
                        Add Admin
                    </button>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        Created {new Date(college.created_at).toLocaleDateString()}
                    </div>
                </div>
            </div>
            ))
        )}
      </div>

      <CreateCollegeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreated={fetchColleges} 
      />

      <CreateAdminModal
        isOpen={adminModal.isOpen}
        onClose={() => setAdminModal({ ...adminModal, isOpen: false })}
        orgId={adminModal.orgId}
        orgName={adminModal.orgName}
      />
    </AdminPageFrame>
  );
}
