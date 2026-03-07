import { useEffect, useState } from "react";
import api from "../../services/api";

export default function StudentProfile() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/me/");
        setMe(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-page-bg p-6 font-body text-text-primary lg:p-8">
        <div className="mx-auto max-w-4xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-page-bg p-6 font-body text-text-primary lg:p-8">
        <div className="mx-auto max-w-4xl text-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg p-6 font-body text-text-primary lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="font-heading text-3xl font-bold">Student Profile</h1>
        <p className="text-text-secondary">
          This data is loaded from <code>/auth/me/</code>.
        </p>

        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-text-secondary">Full Name</p>
              <p className="mt-1 font-semibold">
                {me?.full_name ||
                  `${me?.first_name || ""} ${me?.last_name || ""}`.trim() ||
                  "-"}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Email</p>
              <p className="mt-1 font-semibold">{me?.email || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Role</p>
              <p className="mt-1 font-semibold">{me?.role || "Student"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
