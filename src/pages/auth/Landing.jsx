import { Link } from "react-router-dom";

export default function PathWiseLanding() {
  const highlights = [
    {
      icon: "psychology",
      title: "Career clarity",
      text: "Find direction with structured guidance instead of random choices.",
    },
    {
      icon: "route",
      title: "Action roadmap",
      text: "Break big goals into practical next steps for exams, skills, and college planning.",
    },
    {
      icon: "groups",
      title: "Mentor support",
      text: "Get advice from experienced mentors who can help students make better decisions.",
    },
  ];

  return (
    <div className="bg-mesh relative min-h-screen overflow-hidden text-white">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-30"></div>
      <div className="pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"></div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 lg:px-8">
        <header className="mb-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500/20 ring-1 ring-teal-400/25">
              <span className="material-symbols-outlined text-2xl text-teal-300">
                explore
              </span>
            </div>
            <span className="font-sora text-2xl font-bold tracking-tight">
              PathWise
            </span>
          </div>
          <Link
            to="/auth/login"
            className="rounded-full border border-white/15 bg-white/6 px-5 py-2.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-white/25 hover:bg-white/10"
          >
            Login
          </Link>
        </header>

        <main className="grid flex-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="max-w-2xl">
            <p className="mb-5 inline-flex items-center rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-teal-200">
              Career Guidance Platform
            </p>
            <h1 className="font-sora mb-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Build a clearer path for your future.
            </h1>
            <p className="mb-8 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              PathWise helps students and families move from confusion to a
              simple plan with guidance, structure, and the next steps that
              actually matter.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth/role-selection"
                className="shimmer-button rounded-full px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5"
              >
                Get Started
              </Link>
              <Link
                to="/auth/login"
                className="rounded-full border border-white/15 bg-white/6 px-6 py-3 font-semibold text-white/90 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
              >
                Already have an account
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-300">
                  check_circle
                </span>
                Student-friendly guidance
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-300">
                  check_circle
                </span>
                Mentor-led direction
              </div>
            </div>
          </section>

          <section className="glass-card rounded-[28px] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Why PathWise
                </p>
                <h2 className="font-sora mt-2 text-2xl font-bold text-white">
                  Simple support, not noise
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8">
                <span className="material-symbols-outlined text-amber-300">
                  trending_up
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/8 bg-white/5 p-4"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="icon-badge flex h-10 w-10 items-center justify-center rounded-xl">
                      <span className="material-symbols-outlined text-white">
                        {item.icon}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber-400/10 bg-amber-400/8 p-4">
              <p className="text-sm leading-6 text-slate-200">
                Start as a student or counselor and enter the platform with the
                role that matches your journey.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
