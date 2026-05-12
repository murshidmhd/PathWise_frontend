import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: "person_add",
    title: "Create Your Profile",
    text: "Sign up as a student. Tell us your current grade, interests, and career goals in minutes.",
    color: "from-teal-500/20 to-teal-500/5",
    border: "border-teal-500/20",
    accent: "text-teal-300",
  },
  {
    number: "02",
    icon: "quiz",
    title: "Take a Skill Assessment",
    text: "Our AI-driven assessments evaluate your strengths, weaknesses, and interests to build your personalized profile.",
    color: "from-indigo-500/20 to-indigo-500/5",
    border: "border-indigo-500/20",
    accent: "text-indigo-300",
  },
  {
    number: "03",
    icon: "map",
    title: "Get Your Roadmap",
    text: "Receive a clear, step-by-step career roadmap with course recommendations, skill gaps, and next actions.",
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/20",
    accent: "text-amber-300",
  },
  {
    number: "04",
    icon: "support_agent",
    title: "Chat With Your Counselor",
    text: "Connect 1-on-1 with a dedicated career counselor who guides you at every step of your journey.",
    color: "from-purple-500/20 to-purple-500/5",
    border: "border-purple-500/20",
    accent: "text-purple-300",
  },
];

const features = [
  {
    icon: "psychology",
    title: "AI Skill Analysis",
    text: "Instant analysis of your current skills vs. what top careers require — with a personalized gap report.",
    color: "bg-teal-500/15 text-teal-300",
  },
  {
    icon: "route",
    title: "Career Roadmap",
    text: "Visual, step-by-step roadmaps for 50+ career tracks. Know exactly what to do next.",
    color: "bg-indigo-500/15 text-indigo-300",
  },
  {
    icon: "chat",
    title: "Real-Time Counselor Chat",
    text: "Message your assigned counselor anytime. Get answers, feedback, and motivation instantly.",
    color: "bg-amber-500/15 text-amber-300",
  },
  {
    icon: "workspace_premium",
    title: "SkillPoints Ecosystem",
    text: "Earn SkillPoints by completing assessments and goals. Spend them to unlock sessions and premium resources.",
    color: "bg-purple-500/15 text-purple-300",
  },
  {
    icon: "notifications_active",
    title: "Smart Notifications",
    text: "Get real-time push alerts for new messages, session bookings, and important milestones.",
    color: "bg-rose-500/15 text-rose-300",
  },
  {
    icon: "bar_chart",
    title: "Progress Tracking",
    text: "Monitor your skill growth, assessment scores, and roadmap completion all in one dashboard.",
    color: "bg-cyan-500/15 text-cyan-300",
  },
];

const testimonials = [
  {
    name: "Arjun M.",
    role: "Engineering Student",
    quote: "I had no idea what to do after 12th. PathWise gave me a clear roadmap for Computer Science and connected me with an amazing counselor within a day.",
    initials: "AM",
    color: "from-teal-500 to-indigo-600",
  },
  {
    name: "Fatima K.",
    role: "Pre-Med Student",
    quote: "The skill gap analyzer was eye-opening. I found out I was missing key areas for NEET and got a study plan in minutes.",
    initials: "FK",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Rohit S.",
    role: "Commerce Student",
    quote: "My counselor helped me discover that CA wasn't the only path. Now I'm pursuing data analytics and loving it!",
    initials: "RS",
    color: "from-amber-500 to-red-500",
  },
];

const stats = [
  { value: "500+", label: "Students Guided" },
  { value: "50+", label: "Career Tracks" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "1-on-1", label: "Counselor Access" },
];

export default function PathWiseLanding() {
  return (
    <div className="bg-mesh relative min-h-screen overflow-hidden text-white">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-0 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-8 lg:px-8">

        {/* ─── NAVBAR ─── */}
        <header className="mb-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500/20 ring-1 ring-teal-400/25">
              <span className="material-symbols-outlined text-2xl text-teal-300">explore</span>
            </div>
            <span className="font-sora text-2xl font-bold tracking-tight">PathWise</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/auth/login"
              className="rounded-full border border-white/15 bg-white/6 px-5 py-2.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-white/25 hover:bg-white/10"
            >
              Login
            </Link>
            <Link
              to="/auth/role-selection"
              className="shimmer-button rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5"
            >
              Get Started Free
            </Link>
          </div>
        </header>

        {/* ─── HERO ─── */}
        <section className="mb-24 flex flex-col items-center text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-teal-200">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            AI-Powered Career Guidance Platform
          </p>
          <h1 className="font-sora mb-6 max-w-4xl text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
            Build a clearer path{" "}
            <span className="bg-gradient-to-r from-teal-300 to-indigo-300 bg-clip-text text-transparent">
              for your future.
            </span>
          </h1>
          <p className="mb-10 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            PathWise combines AI skill analysis, personalized career roadmaps, and 1-on-1 counselor mentorship to turn student confusion into confident career decisions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/auth/role-selection"
              className="shimmer-button rounded-full px-8 py-3.5 font-bold text-white shadow-xl shadow-orange-500/20 transition hover:-translate-y-0.5"
            >
              Start Your Journey
            </Link>
            <Link
              to="/auth/login"
              className="rounded-full border border-white/15 bg-white/6 px-8 py-3.5 font-semibold text-white/90 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
            >
              I already have an account
            </Link>
          </div>
          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 text-center">
                <div className="font-sora text-3xl font-black text-white">{s.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-teal-300">How It Works</p>
            <h2 className="font-sora text-3xl font-extrabold sm:text-4xl">
              From confusion to clarity in 4 steps
            </h2>
            <p className="mt-4 text-base text-slate-400">
              PathWise is designed to be simple. No jargon, no overwhelm — just clear next steps.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`glass-card rounded-[24px] border bg-gradient-to-b p-6 ${step.color} ${step.border}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10`}>
                    <span className={`material-symbols-outlined text-2xl ${step.accent}`}>{step.icon}</span>
                  </div>
                  <span className={`font-sora text-4xl font-black opacity-20 ${step.accent}`}>{step.number}</span>
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-indigo-300">Platform Features</p>
            <h2 className="font-sora text-3xl font-extrabold sm:text-4xl">
              Everything a student needs, in one place
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass-card group rounded-[24px] border border-white/8 p-6 transition hover:-translate-y-1 hover:border-white/15"
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.color}`}>
                  <span className="material-symbols-outlined text-2xl">{f.icon}</span>
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Student Stories</p>
            <h2 className="font-sora text-3xl font-extrabold sm:text-4xl">
              Real students. Real results.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card rounded-[24px] border border-white/8 p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br font-bold text-white text-sm ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
                <div className="mb-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base text-amber-400">star</span>
                  ))}
                </div>
                <p className="text-sm leading-7 text-slate-300">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="mb-16">
          <div className="glass-card rounded-[32px] border border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-indigo-500/10 p-10 text-center sm:p-16">
            <span className="material-symbols-outlined mb-4 text-5xl text-teal-300">rocket_launch</span>
            <h2 className="font-sora mb-4 text-3xl font-extrabold sm:text-4xl">
              Ready to build your future?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-base text-slate-300">
              Join hundreds of students who are already on the right track. It's free to start and takes less than 2 minutes.
            </p>
            <Link
              to="/auth/role-selection"
              className="shimmer-button inline-flex items-center gap-2 rounded-full px-10 py-4 font-bold text-white shadow-xl shadow-orange-500/20 transition hover:-translate-y-0.5"
            >
              Get Started For Free
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-white/8 pt-8 text-center text-xs text-slate-500">
          <p>© 2025 PathWise. All rights reserved. Built for students, by people who care.</p>
        </footer>
      </div>
    </div>
  );
}
