import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../sidebar/Sidebar";

const StudentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen bg-page-bg">
      {/* Refined Mobile Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b transition-all duration-500 lg:hidden ${
          isScrolled
            ? "border-white/8 bg-[#0F172A]/95 px-5 backdrop-blur-2xl shadow-[0_8px_30px_rgba(2,6,23,0.3)]"
            : "border-transparent bg-transparent px-6"
        }`}
      >
        {/* Subtle Theme Glow */}
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(11,129,141,0.2),transparent_40%)] transition-opacity duration-700 pointer-events-none ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#11B6C5] via-[#0B818D] to-[#005C67] text-white shadow-lg shadow-[#0B818D]/20 transition-transform duration-500">
            <span className="material-symbols-outlined text-[18px]">
              auto_awesome
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-heading text-base font-bold leading-none tracking-tight transition-colors duration-500 ${
                isScrolled ? "text-white" : "text-slate-900"
              }`}
            >
              PathWise
            </span>
            <span
              className={`mt-1 text-[9px] font-bold tracking-[0.18em] uppercase transition-colors duration-500 ${
                isScrolled ? "text-teal-400/80" : "text-[#0B818D]"
              }`}
            >
              Student Space
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className={`relative flex size-10 items-center justify-center rounded-xl transition-all duration-500 active:scale-90 ${
            isScrolled
              ? "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              : "bg-slate-900/5 text-slate-600 hover:bg-slate-900/10 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>
      </header>

      {/* Backdrop for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 pt-16 lg:ml-[240px] lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
