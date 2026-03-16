import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../services/api";
import { handleLoginSuccess } from "../../utils/auth";

export default function CompleteRegistration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [counselorData, setCounselorData] = useState({
    qualification: "",
    specialization: "",
    certificate: null,
  });

  const role = localStorage.getItem("pending_role");
  const tempToken = localStorage.getItem("temp_token");

  useEffect(() => {
    if (role === "student" || role === "parent") {
      const complete = async () => {
        const res = await api.post("auth/complete-google-registration/", {
          temp_token: tempToken,
          role: role,
        });
        handleLoginSuccess(dispatch, res.data.access, role);
        navigate(`/${role}/dashboard`);
      };
      complete();
    }
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("temp_token", tempToken);
    formData.append("role", "counselor");
    formData.append("qualification", counselorData.qualification);
    formData.append("specialization", counselorData.specialization);
    formData.append("certificate", counselorData.certificate);

    const res = await api.post("auth/complete-google-registration/", formData);
    handleLoginSuccess(dispatch, res.data.access, "counselor");
    navigate("/counselor/dashboard");
  };

  if (role === "counselor") {
    // show counselor extra fields form
    return (
      <>
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
            className="w-full py-3 bg-[#6366F1] text-white font-bold rounded-xl"
          >
            Submit
          </button>
        </div>
      </>
    );
  }

  // for student/parent show loading while API call happens
  return <div>Setting up your account...</div>;
}
