import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BadgeCheck,
  GraduationCap,
  MapPin,
  Mail,
  Pencil,
  Phone,
  Sparkles,
  UserRound,
  Users,
  Briefcase,
  Star,
} from "lucide-react";
import api from "../../services/api";
import { setUser } from "../../store/slices/authSlice";

import EditProfileModal from "./EditProfileModal";

import { normalizeStudentTracking } from "../../services/utils/studentTracking";

function InfoCard({ icon, label, value }) {
  const Icon = icon;
  return (
    <div className="rounded-2xl bg-surface-low p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card-bg text-primary shadow-sm">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="font-body text-[10px] font-bold tracking-[0.05em] text-text-secondary uppercase">
            {label}
          </p>
          <p className="mt-1 font-body text-sm font-medium text-text-primary">
            {value || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}

function formatLabel(value, fallback) {
  if (!value) return fallback;
  return String(value)
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function StudentProfile() {
  const dispatch = useDispatch();
  const { token, role, user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [me, setMe] = useState(user || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [tracking, setTracking] = useState(() =>
    normalizeStudentTracking({
      profile_completed: user?.profile_completed,
      assessment_taken: user?.assessment_taken,
      roadmap_created: user?.roadmap_created,
      is_onboarded: user?.is_onboarded,
    }),
  );

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, trackingRes] = await Promise.all([
          api.get("/students/profile/"),
          api.get("/students/tracking/").catch(() => null),
        ]);

        setMe(profileRes.data || {});
        setFormData(profileRes.data);
        dispatch(setUser({ token, role, user: profileRes.data || {} }));

        if (trackingRes?.data) {
          setTracking(normalizeStudentTracking(trackingRes.data));
        }
      } catch (err) {
        setMe((current) => current || {});
        setError("Failed to load profile data.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [dispatch, role, token]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const res = await api.patch("/students/profile/", formData);
      setMe(res.data);
      setFormData(res.data);
      dispatch(setUser({ token, role, user: res.data }));

      try {
        const trackingRes = await api.get("/students/tracking/");
        setTracking(normalizeStudentTracking(trackingRes.data));
      } catch {
        // keep previous tracking state
      }

      setIsModalOpen(false);
    } catch {
      console.error("Failed to save profile");
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Derived values from API response ──────────────────────────
  const fullName = me?.full_name || "Student";
  const email = me?.email || "Not provided";
  const dob = me?.date_of_birth || "Not provided";
  const gender = formatLabel(me?.gender, "Not provided");
  const phone = me?.phone || "Not provided";
  const city = me?.city || "Not set";
  const state = me?.state || "Not set";
  const educationLevel = formatLabel(me?.education_level, "Not set");
  const stream = formatLabel(me?.stream, "Not set");
  const profileCompleted =
    tracking.profileCompleted || Number(me?.profile_completed || 0);
  const profilePhoto = me?.profile_photo;
  const userInitial = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // ── Counselor ──────────────────────────────────────────────────
  const counselor = me?.counselor_details;
  const counselorName = counselor?.full_name || "Assigned Counselor"; // ← fixed: full_name not name
  const counselorInitial = counselorName.charAt(0).toUpperCase(); // ← fixed: was counselor?.name

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="mx-auto size-10 animate-spin rounded-full border-3 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg px-4 py-6 text-text-primary sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* ── Page header ── */}
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-body text-[10px] font-bold tracking-[0.05em] text-primary uppercase">
              Student Profile
            </p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold tracking-tight text-text-primary">
              Your profile
            </h1>
            <p className="mt-2 max-w-2xl font-body text-base leading-7 text-text-secondary">
              Keep your academic and personal information updated to sharpen
              PathWise recommendations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-container px-6 py-3 font-body text-sm font-bold text-white shadow-float transition hover:opacity-90"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </button>
        </header>

        {/* ── Profile hero card ── */}
        <section className="rounded-3xl bg-card-bg p-6 shadow-float sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative h-24 w-24 rounded-[22px] bg-gradient-to-br from-primary via-primary-container to-secondary p-[2px] shadow-float">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={fullName}
                    className="h-full w-full rounded-[20px] border border-white/50 object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-[20px] border border-white/50 bg-white text-2xl font-extrabold text-primary">
                    {userInitial}
                  </div>
                )}
                <span className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-bold text-text-primary">
                  {fullName}
                </h2>
                <p className="mt-1 font-body text-sm font-medium text-text-secondary">
                  {educationLevel} • {stream} Stream
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-surface-low px-3 py-1.5 text-[10px] font-bold tracking-widest text-primary uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  {profileCompleted}% Profile Complete
                </div>
              </div>
            </div>

            {/* Progress widget */}
            <div className="min-w-[220px] rounded-2xl bg-secondary p-5 text-white shadow-float">
              <p className="font-body text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                Profile progress
              </p>
              <p className="mt-3 font-heading text-3xl font-extrabold">
                {profileCompleted}%
              </p>
              <div className="mt-4 h-3 rounded-full bg-white/10">
                <div
                  className="h-3 rounded-full bg-primary-container transition-all duration-500"
                  style={{ width: `${profileCompleted}%` }}
                />
              </div>
              <p className="mt-2 font-body text-[11px] text-slate-400">
                {profileCompleted < 100
                  ? "Fill in missing details to reach 100%"
                  : "Profile complete 🎉"}
              </p>
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

        {/* ── Personal info + Academic overview ── */}
        <section className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          {/* Personal info */}
          <article className="rounded-3xl bg-card-bg p-6 shadow-float sm:p-8">
            <p className="font-body text-[10px] uppercase tracking-widest font-bold text-text-secondary">
              Personal Information
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-text-primary">
              Core details
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoCard icon={UserRound} label="Full Name" value={fullName} />
              <InfoCard icon={Mail} label="Email Address" value={email} />
              <InfoCard icon={BadgeCheck} label="Gender" value={gender} />
              <InfoCard icon={Phone} label="Phone Number" value={phone} />
              <InfoCard
                icon={MapPin}
                label="Location"
                value={`${city}, ${state}`}
              />
              <InfoCard icon={BadgeCheck} label="Date of Birth" value={dob} />
              <InfoCard
                icon={GraduationCap}
                label="Current Stream"
                value={stream}
              />
            </div>
          </article>

          {/* Academic overview */}
          <article className="rounded-3xl bg-card-bg p-6 shadow-float sm:p-8">
            <p className="font-body text-[10px] uppercase tracking-widest font-bold text-text-secondary">
              Student Snapshot
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-text-primary">
              Academic overview
            </h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-surface-low p-5">
                <p className="font-body text-[10px] font-bold tracking-widest text-text-secondary uppercase">
                  Education Level
                </p>
                <p className="mt-2 font-heading text-2xl font-bold text-text-primary">
                  {educationLevel}
                </p>
              </div>

              <div className="rounded-2xl bg-surface-low p-5">
                <p className="font-body text-[10px] font-bold tracking-widest text-text-secondary uppercase">
                  Current Stream
                </p>
                <p className="mt-2 font-heading text-2xl font-bold text-text-primary">
                  {stream}
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-container p-6 text-white shadow-float">
                <p className="font-body text-[10px] font-bold tracking-widest uppercase text-teal-100">
                  Recommendation
                </p>
                <p className="mt-2 font-heading text-xl font-bold">
                  Complete all assessments to sharpen your career match.
                </p>
                <p className="mt-3 font-body text-sm leading-6 text-teal-50 opacity-90">
                  Your profile becomes more accurate as PathWise learns from
                  your assessment and academic data.
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* ── Assigned Counselor ── */}
        <section className="mt-6 rounded-3xl bg-card-bg p-6 shadow-float sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-low text-primary shadow-sm">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                Assigned Counselor
              </p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-text-primary">
                {counselor
                  ? "Your counselor details"
                  : "No counselor assigned yet"}
              </h2>
            </div>
          </div>

          {counselor ? (
            <div className="mt-6 rounded-2xl bg-surface-low p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                {/* Avatar + name */}
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-container p-[2px] shadow-float">
                    {counselor.profile_photo ? (
                      <div
                        className="h-full w-full rounded-[18px] bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${counselor.profile_photo}')`,
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-[18px] bg-white text-2xl font-bold text-primary">
                        {counselorInitial}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-text-primary">
                      {counselorName}
                    </h3>
                    {counselor.specialization && (
                      <p className="mt-0.5 font-body text-sm text-text-secondary">
                        {counselor.specialization}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-tertiary text-tertiary" />
                      <span className="font-body text-xs font-bold text-text-primary">
                        {counselor.rating}
                      </span>
                      {counselor.is_available && (
                        <span className="ml-3 rounded-full bg-surface-highest px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-text-primary">
                          Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Counselor details grid */}
                <div className="grid gap-4 md:min-w-[320px] md:grid-cols-2">
                  {counselor.phone && (
                    <InfoCard
                      icon={Phone}
                      label="Phone"
                      value={counselor.phone}
                    />
                  )}
                  {counselor.qualification && (
                    <InfoCard
                      icon={GraduationCap}
                      label="Qualification"
                      value={counselor.qualification}
                    />
                  )}
                  {counselor.experience_years && (
                    <InfoCard
                      icon={Briefcase}
                      label="Experience"
                      value={`${counselor.experience_years} years`}
                    />
                  )}
                  {counselor.city && (
                    <InfoCard
                      icon={MapPin}
                      label="Location"
                      value={`${counselor.city}${counselor.state ? `, ${counselor.state}` : ""}`}
                    />
                  )}
                </div>
              </div>

              {/* Bio */}
              {counselor.bio && (
                <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
                  <p className="font-body text-[10px] font-bold tracking-widest text-text-secondary uppercase mb-2">
                    About
                  </p>
                  <p className="font-body text-sm leading-6 text-text-primary">
                    {counselor.bio}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-surface-low px-5 py-8 text-center text-sm leading-7 text-text-secondary">
              An admin has not assigned a counselor to your account yet. Once
              assigned, their details will appear here.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
