import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    switch (role) {
      case "student":
        navigate("/auth/register?role=student");
        break;
      case "mentor":
        navigate("/auth/register?role=counselor");
        break;
      case "parent":
        navigate("/auth/register?role=parent");
        break;
    }
  };

  return (
    <div className="bg-mesh min-h-screen relative overflow-x-hidden">
      {/* Grid Pattern */}
      <div className="fixed inset-0 grid-pattern pointer-events-none opacity-40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Header */}
        <header className="mb-16 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30 shadow-[0_0_20px_rgba(13,148,136,0.3)]">
              <span
                className="material-symbols-outlined text-teal-400 text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                explore
              </span>
            </div>
            <span className="font-sora text-4xl font-semibold tracking-tight text-white">
              PathWise
            </span>
          </div>

          <div className="text-center">
            <h1 className="font-sora text-4xl text-white mb-3 tracking-tight">
              Choose your role to begin
            </h1>
            <p className="text-slate-400 text-lg font-normal max-w-md mx-auto">
              Elevate your future with premium career insights tailored to your
              journey.
            </p>
          </div>
        </header>

        {/* Cards Grid */}
        <main className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Student Card - EXACT COPY */}
            <div
              className="glass-card rounded-[24px] p-10 flex flex-col items-center text-center group cursor-pointer"
              onClick={() => handleRoleSelect("student")}
            >
              <div className="w-14 h-14 icon-badge rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-white text-3xl">
                  school
                </span>
              </div>
              <h2 className="font-sora text-2xl text-white mb-4">
                Join as a Student
              </h2>
              <p className="text-slate-400 mb-10 leading-relaxed text-sm">
                Discover your career path and build your personalized roadmap
                with AI insights.
              </p>
              <div className="mt-auto w-full">
                <button className="shimmer-button w-full text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all">
                  Get Started as Student
                </button>
              </div>
            </div>

            {/* Mentor Card - EXACT COPY */}
            <div
              className="glass-card rounded-[24px] p-10 flex flex-col items-center text-center group cursor-pointer"
              onClick={() => handleRoleSelect("mentor")}
            >
              <div className="w-14 h-14 icon-badge rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-white text-3xl">
                  workspace_premium
                </span>
              </div>
              <h2 className="font-sora text-2xl text-white mb-4">
                Become a Mentor
              </h2>
              <p className="text-slate-400 mb-10 leading-relaxed text-sm">
                Share your industry expertise and guide Kerala's future talent
                to excellence.
              </p>
              <div className="mt-auto w-full">
                <button className="shimmer-button w-full text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all">
                  Join as Mentor
                </button>
              </div>
            </div>

            {/* Parent Card - EXACT COPY */}
            <div
              className="glass-card rounded-[24px] p-10 flex flex-col items-center text-center group cursor-pointer"
              onClick={() => handleRoleSelect("parent")}
            >
              <div className="w-14 h-14 icon-badge rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-white text-3xl">
                  family_restroom
                </span>
              </div>
              <h2 className="font-sora text-2xl text-white mb-4">
                Join as a Parent
              </h2>
              <p className="text-slate-400 mb-10 leading-relaxed text-sm">
                Guide your child's career journey with expert reports and ROI
                insights.
              </p>
              <div className="mt-auto w-full">
                <button className="shimmer-button w-full text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all">
                  Get Started as Parent
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer - EXACT COPY */}
        <footer className="mt-16 text-center">
          <p className="text-slate-500 font-medium">
            Already have an account?{" "}
            <a
              className="text-white hover:text-teal-400 transition-colors underline decoration-teal-400/30 underline-offset-8"
              href="/auth/login"
            >
              Log in
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RoleSelection;
