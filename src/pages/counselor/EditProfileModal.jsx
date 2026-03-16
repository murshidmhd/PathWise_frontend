export default function EditProfileModal({
  isOpen,
  onClose,
  formData,
  onChange,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#0F172A] border border-slate-700/50 rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <h2 className="text-lg font-bold text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name || ""}
                onChange={onChange}
                className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={onChange}
                className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth || ""}
                onChange={onChange}
                className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={onChange}
                className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city || ""}
                onChange={onChange}
                className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state || ""}
                onChange={onChange}
                className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Qualification
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification || ""}
                onChange={onChange}
                className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization || ""}
                onChange={onChange}
                className="mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#6366F1]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-slate-700/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 bg-[#6366F1] hover:bg-[#5558E3] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
