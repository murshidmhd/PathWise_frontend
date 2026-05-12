import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../sidebar/AdminSidebar";

const AdminLayout = () => {
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
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Mobile Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b transition-all duration-300 lg:hidden ${
          isScrolled
            ? "border-white/10 bg-[#0F172A] px-5 shadow-lg"
            : "border-transparent bg-transparent px-6"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/20">
            <span className="material-symbols-outlined text-[18px]">
              shield_person
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-heading text-base font-bold leading-none tracking-tight ${
                isScrolled ? "text-white" : "text-slate-900"
              }`}
            >
              PathWise
            </span>
            <span
              className={`mt-1 text-[9px] font-bold tracking-[0.18em] uppercase ${
                isScrolled ? "text-amber-400/80" : "text-amber-600"
              }`}
            >
              Admin Space
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className={`flex size-10 items-center justify-center rounded-xl transition-all ${
            isScrolled
              ? "bg-white/5 text-slate-300"
              : "bg-slate-900/5 text-slate-600"
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>
      </header>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 pt-16 lg:ml-[292px] lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
