import { useState } from "react";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLoginSuccess } from "../../utils/auth";
import toast from "react-hot-toast";

const roles = [
  {
    value: "student",
    label: "Student",
    icon: "school",
    desc: "I'm looking for career guidance",
  },
  {
    value: "parent",
    label: "Parent",
    icon: "family_restroom",
    desc: "I want to track my child's progress",
  },
  {
    value: "counselor",
    label: "Counselor",
    icon: "support_agent",
    desc: "I guide students in their career",
  },
];

function Icon({ name }) {
  return <span className="material-symbols-outlined">{name}</span>;
}

export default function RoleSelectionGoogle() {
  const [step, setStep] = useState(1); // 1 = role selection, 2 = counselor extra info
  const [selectedRole, setSelectedRole] = useState(null);
  const [counselorData, setCounselorData] = useState({
    qualification: "",
    specialization: "",
    certificate: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleContinue = async () => {
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    try {
      if (selectedRole === "counselor") {
        setStep(2);
      } else {
        const res = await api.post("auth/complete-google-registration/", {
          temp_token: localStorage.getItem("temp_token"),
          role: selectedRole,
        });
        handleLoginSuccess(dispatch, res.data.access, selectedRole);
        navigate(`/${selectedRole}/dashboard`);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Failed to complete role selection",
      );
      console.error("Failed to complete Google role selection:", error);
    }
  };

  const handleSubmit = async () => {
    if (!counselorData.qualification.trim()) {
      toast.error("Qualification is required");
      return;
    }

    if (!counselorData.specialization.trim()) {
      toast.error("Specialization is required");
      return;
    }

    if (!counselorData.certificate) {
      toast.error("Please upload your certificate");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("temp_token", localStorage.getItem("temp_token"));
      formData.append("role", "counselor");
      formData.append("qualification", counselorData.qualification);
      formData.append("specialization", counselorData.specialization);
      formData.append("certificate", counselorData.certificate);

      const res = await api.post("auth/complete-google-registration/", formData);
      handleLoginSuccess(dispatch, res.data.access, "counselor");
      navigate("/counselor/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Failed to complete counselor profile",
      );
      console.error("Failed to submit counselor Google registration:", error);
    }
  };
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-2">Who are you?</h1>
        <p className="text-slate-400 mb-8">Select your role to continue</p>

        <div className="space-y-3 mb-8">
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => setSelectedRole(role.value)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                selectedRole === role.value
                  ? "border-[#6366F1] bg-[#6366F1]/10 text-white"
                  : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500"
              }`}
            >
              <Icon name={role.icon} />
              <div className="text-left">
                <p className="font-semibold">{role.label}</p>
                <p className="text-xs text-slate-500">{role.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {step === 1 && (
          <button
            disabled={!selectedRole}
            onClick={handleContinue}
            className="w-full py-3 bg-[#6366F1] text-white font-bold rounded-xl disabled:opacity-40"
          >
            Continue
          </button>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white mb-2">
              Counselor Details
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Qualification
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setCounselorData({
                    ...counselorData,
                    [e.target.name]: e.target.value,
                  })
                }
                name="qualification"
                placeholder="e.g. M.A. Psychology"
                className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Specialization
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setCounselorData({
                    ...counselorData,
                    [e.target.name]: e.target.value,
                  })
                }
                name="specialization"
                placeholder="e.g. Career Counseling"
                className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Certificate
              </label>
              <input
                type="file"
                name="certificate"
                onChange={(e) =>
                  setCounselorData({
                    ...counselorData,
                    certificate: e.target.files[0],
                  })
                }
                className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-400 text-sm focus:outline-none focus:border-[#6366F1]"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-[#6366F1] text-white font-bold rounded-xl mt-2"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
