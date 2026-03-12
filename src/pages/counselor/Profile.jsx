import { useEffect, useState } from "react";
import api from "../../services/api";
import EditProfileModal from "./EditProfileModal";

function Icon({ name, className = "", filled = false }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}

export default function CounselorProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [me, setMe] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/counselors/profile/");
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
      const { certificate_url, ...dataToSend } = formData;

      const res = await api.patch("/counselors/profile/", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMe(res.data);
      setIsModalOpen(false);
    } catch {
      console.error("Failed to save counselor profile");
    }
  };

  const fullName =
    me?.full_name ||
    [me?.first_name, me?.last_name].filter(Boolean).join(" ") ||
    "Dr. Priya Iyer";
  const dob = me?.dob || me?.date_of_birth || "November 03, 1992";
  const gender = me?.gender || "Female";
  const phone = me?.phone || me?.phone_number || "+91 91234 56789";
  const city = me?.city || "Mumbai";
  const state = me?.state || "Maharashtra";
  const qualification = me?.qualification || "M.A. Psychology";
  const specialization = me?.specialization || "Career Counseling";
  const experience =
    me?.years_experience || me?.experience_years || "8 Years Experience";

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#0F172A] dark:text-slate-100">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col items-center gap-8 rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm md:flex-row dark:border-slate-700/50 dark:bg-slate-800">
            <div className="relative">
              <div className="h-32 w-32 rounded-full border-4 border-[#0B818D]/20 p-1">
                <div
                  className="h-full w-full overflow-hidden rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIYOUm2gZr9EMAaXdWVFbhhaPrWWzC0BHgnzXuoM24S3dfe22aURHOY7XWDAMEQHtpqXv--GckRWrNoNaUeSfHa5S0acWPiUssS1sfiU-MimaMKem6f2yQR63k3CM67NxBGMUYQa8VVwf1iIyrn2KMPvn2BKhujYbVNbsRuciAFr3Qo7xgrLGAxup3YdF9bRdubA1zZTBL9S6nTJrlAtvSPL52rVpxXnvw5cQ6nDIwCsACA5NAPdKP5u2G36Xv4Z8emLAvlLDw-Q')",
                  }}
                />
              </div>
              <button
                type="button"
                className="absolute right-1 bottom-1 rounded-full border-2 border-white bg-[#0B818D] p-2 text-white shadow-lg dark:border-slate-800"
              >
                <Icon name="photo_camera" className="text-sm" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-1 font-heading text-3xl font-bold text-slate-900 dark:text-white">
                {fullName}
              </h2>
              <p className="mb-4 flex items-center justify-center gap-2 font-medium text-slate-500 md:justify-start dark:text-slate-400">
                <Icon name="workspace_premium" className="text-base" />
                Senior Counselor
              </p>
              <div className="max-w-md">
                <div className="mb-2 flex items-end justify-between">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Profile Completion
                  </span>
                  <span className="text-sm font-bold text-[#0B818D]">85%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div className="h-full w-[85%] rounded-full bg-[#0B818D]" />
                </div>
              </div>
            </div>

            <div className="flex min-w-[180px] flex-col gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0B818D] px-6 py-2.5 font-bold text-white transition-opacity hover:opacity-90"
              >
                <Icon name="edit" className="text-lg" />
                Edit Profile
              </button>
            </div>
          </div>

          <EditProfileModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            formData={formData}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            onSave={handleSave}
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
                <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6 dark:border-slate-700">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <Icon name="person_outline" className="text-[#0B818D]" />
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-x-12 gap-y-6 p-8 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Full Name
                    </p>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {fullName}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Date of Birth
                    </p>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {dob}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Gender
                    </p>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {gender}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Phone Number
                    </p>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {phone}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      City
                    </p>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {city}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      State
                    </p>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {state}
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
                <div className="border-b border-slate-100 px-8 py-6 dark:border-slate-700">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    <Icon name="school" className="text-[#0B818D]" />
                    Professional Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-x-12 gap-y-6 p-8 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Qualification
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#0B818D]/10 px-3 py-1 text-[#0B818D]">
                      <Icon name="auto_awesome" className="text-sm" />
                      <span className="text-sm font-bold">{qualification}</span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Specialization
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#0B818D]/10 px-3 py-1 text-[#0B818D]">
                      <Icon name="psychology" className="text-sm" />
                      <span className="text-sm font-bold">
                        {specialization}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Experience
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#0B818D]/10 px-3 py-1 text-[#0B818D]">
                      <Icon name="work_history" className="text-sm" />
                      <span className="text-sm font-bold">{experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
                <div className="border-b border-slate-100 px-6 py-4 dark:border-slate-700">
                  <h3 className="text-base font-bold">Milestones</h3>
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-700/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                        <Icon name="verified" />
                      </div>
                      <span className="text-sm font-bold">Onboarded</span>
                    </div>
                    <Icon
                      name="check_circle"
                      filled
                      className="text-green-500"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-700/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                        <Icon name="groups" />
                      </div>
                      <span className="text-sm font-bold">
                        Students Assigned
                      </span>
                    </div>
                    <Icon
                      name="check_circle"
                      filled
                      className="text-green-500"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-700/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/50 text-slate-400 dark:bg-slate-600">
                        <Icon name="event_available" />
                      </div>
                      <span className="text-sm font-bold text-slate-500">
                        Weekly Plan Ready
                      </span>
                    </div>
                    <Icon
                      name="radio_button_unchecked"
                      className="text-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-3xl bg-[#0B818D] p-8 text-white">
                <div className="relative z-10">
                  <h3 className="mb-2 text-xl font-bold">Need a Boost?</h3>
                  <p className="mb-6 text-sm text-white/80">
                    Complete your profile to unlock improved matching with
                    students.
                  </p>
                  <button
                    type="button"
                    className="w-full rounded-xl bg-white px-6 py-3 font-bold text-[#0B818D] transition-colors hover:bg-slate-50"
                  >
                    Finish Now
                  </button>
                </div>
                <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-white/10 transition-transform group-hover:scale-125" />
                <div className="absolute top-4 right-4 text-white/20">
                  <Icon name="lightbulb" className="text-6xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
