import { Link } from "react-router-dom";

export default function PathWiseLanding() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-page-bg font-body text-text-primary">
      <div className="pointer-events-none absolute -top-28 -left-28 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="pointer-events-none absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"></div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10">
        <header className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl text-secondary">
              explore
            </span>
            <span className="font-heading text-2xl font-extrabold">PathWise</span>
          </div>
          <Link
            to="/auth/login"
            className="rounded-lg border border-border bg-white/80 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
          >
            Login
          </Link>
        </header>

        <main className="grid flex-1 items-center gap-12 lg:grid-cols-2">
          <section>
            <p className="mb-4 inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary">
              AI Career Guidance
            </p>
            <h1 className="mb-6 font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Discover the right career path with confidence.
            </h1>
            <p className="mb-8 max-w-xl text-text-secondary">
              PathWise helps students understand strengths, compare options, and
              build a clear roadmap for exams, colleges, and skills.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/auth/role"
                className="rounded-lg border border-border bg-white/80 px-6 py-3 font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Get Started
              </Link>
              <Link
                to="/auth/login"
                className="rounded-lg border border-border bg-white/80 px-6 py-3 font-semibold backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Already have an account
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-white/90 p-8 shadow-lg backdrop-blur">
            <h2 className="mb-6 font-heading text-xl font-bold">Why PathWise</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-3 rounded-xl bg-page-bg p-3">
                <span className="material-symbols-outlined text-secondary">
                  check_circle
                </span>
                <p className="text-text-secondary">
                  Personalized recommendations based on your profile.
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-page-bg p-3">
                <span className="material-symbols-outlined text-secondary">
                  check_circle
                </span>
                <p className="text-text-secondary">
                  Step-by-step roadmap for exams, colleges, and future skills.
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-page-bg p-3">
                <span className="material-symbols-outlined text-secondary">
                  check_circle
                </span>
                <p className="text-text-secondary">
                  Mentor support to help you make better career decisions.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
