import { useEffect, useState } from "react";
import {
  BadgeCheck,
  GraduationCap,
  MapPin,
  Pencil,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";
import api from "../../services/api";
import EditProfileModal from "./EditProfileModal";

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#6366F1] shadow-sm">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="font-['DM_Sans'] text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
            {label}
          </p>
          <p className="mt-1 font-['DM_Sans'] text-sm font-medium text-slate-700">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StudentProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [me, setMe] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/students/profile/");
        setMe(res.data || {});
        setFormData(res.data);
      } catch {
        setMe({});
      }
    };

    load();
  }, []);

  const handleSave = async () => {
    try {
      const res = await api.patch("/students/profile/", formData);
      setMe(res.data);
      setIsModalOpen(false);
    } catch {
      console.error("Failed to save profile");
    }
  };

  const fullName =
    me?.full_name ||
    [me?.first_name, me?.last_name].filter(Boolean).join(" ") ||
    "Alex Johnson";
  const dob = me?.dob || me?.date_of_birth || "May 15, 2006";
  const gender = me?.gender || "Male";
  const phone = me?.phone || me?.phone_number || "+91 98765 43210";
  const city = me?.city || "Mumbai";
  const state = me?.state || "Maharashtra";
  const grade = me?.grade || me?.class_name || "Class 12";
  const stream = me?.stream || "Science";

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-['DM_Sans'] text-sm font-semibold tracking-[0.2em] text-[#6366F1] uppercase">
              Student Profile
            </p>
            <h1 className="mt-2 font-sora text-4xl font-bold tracking-tight text-slate-950">
              Your profile
            </h1>
            <p className="mt-2 max-w-2xl font-['DM_Sans'] text-base leading-7 text-slate-500">
              Keep your academic and personal information updated to sharpen
              PathWise recommendations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#6366F1] px-5 py-3 font-['DM_Sans'] text-sm font-semibold text-white shadow-[0_18px_30px_rgba(99,102,241,0.22)] transition hover:bg-[#5558e8]"
          >
            <Pencil className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </header>

        <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="h-24 w-24 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#6366F1] to-[#0D9488] p-[2px] shadow-lg">
                <div
                  className="h-full w-full rounded-[26px] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkhebJndRKDMzD_TKK2fTTgRM0M0YhKleAr2BHirVGtRg388qDmE3rqRhnJ8CtEsznUlqAc_FxFkB8UQYDpgWUwB1kqZfwtA_XBC2D6O8lc0kvjJI0HXH0fdGcHD-Aa5OmEJ1NYPQ_b6DN7UjItIKaCc_y2h3upuMOnpn8Cn_3uOvT1czfyFxCbSzsEq9J43F58MudAd5EksByuwiIWCMLYKD2FMmcIsylfsRkYxea51GaEtgibCESOa5vxNl55L2Mt4Dc25Kigw')",
                  }}
                />
              </div>
              <div>
                <h2 className="font-sora text-3xl font-bold text-slate-950">
                  {fullName}
                </h2>
                <p className="mt-2 font-['DM_Sans'] text-sm font-medium text-slate-500">
                  {grade} • {stream} Stream
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-bold tracking-[0.18em] text-[#6366F1] uppercase">
                  <Sparkles className="h-4 w-4" />
                  85% Profile Complete
                </div>
              </div>
            </div>

            <div className="min-w-[220px] rounded-[24px] bg-[linear-gradient(135deg,#312E81_0%,#4338CA_100%)] p-5 text-white">
              <p className="font-['DM_Sans'] text-xs font-semibold tracking-[0.18em] text-indigo-100 uppercase">
                Profile progress
              </p>
              <p className="mt-3 font-sora text-3xl font-bold">85%</p>
              <div className="mt-4 h-3 rounded-full bg-white/10">
                <div className="h-3 w-[85%] rounded-full bg-white" />
              </div>
            </div>
          </div>
        </section>

        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          onSave={handleSave}
        />

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            <div>
              <p className="font-['DM_Sans'] text-sm font-semibold text-slate-500">
                Personal Information
              </p>
              <h2 className="mt-1 font-sora text-2xl font-bold text-slate-950">
                Core details
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoCard icon={UserRound} label="Full Name" value={fullName} />
              <InfoCard icon={BadgeCheck} label="Gender" value={gender} />
              <InfoCard icon={Phone} label="Phone Number" value={phone} />
              <InfoCard icon={MapPin} label="Location" value={`${city}, ${state}`} />
              <InfoCard icon={BadgeCheck} label="Date of Birth" value={dob} />
              <InfoCard
                icon={GraduationCap}
                label="Current Stream"
                value={stream}
              />
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
            <div>
              <p className="font-['DM_Sans'] text-sm font-semibold text-slate-500">
                Student Snapshot
              </p>
              <h2 className="mt-1 font-sora text-2xl font-bold text-slate-950">
                Academic overview
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="font-['DM_Sans'] text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
                  Education Level
                </p>
                <p className="mt-2 font-sora text-2xl font-bold text-slate-950">
                  {grade}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="font-['DM_Sans'] text-xs font-bold tracking-[0.18em] text-slate-400 uppercase">
                  Current Stream
                </p>
                <p className="mt-2 font-sora text-2xl font-bold text-slate-950">
                  {stream}
                </p>
              </div>

              <div className="rounded-[24px] bg-[linear-gradient(135deg,#0F766E_0%,#0D9488_100%)] p-5 text-white">
                <p className="font-['DM_Sans'] text-xs font-bold tracking-[0.18em] uppercase text-teal-100">
                  Recommendation
                </p>
                <p className="mt-2 font-sora text-xl font-bold">
                  Complete all 5 core assessments to sharpen your career match.
                </p>
                <p className="mt-3 font-['DM_Sans'] text-sm leading-6 text-teal-50">
                  Your profile becomes more accurate as PathWise learns from
                  your assessment and academic data.
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
