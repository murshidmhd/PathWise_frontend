import React from "react";
import { useNavigate } from "react-router-dom";

const PathWiseLanding = () => {
  const navigate = useNavigate();
  return (
    <div className="text-white selection:bg-amber-500/30 font-sans bg-[#0A0F1E] min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[68px] glass-nav">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 glow-logo">
            <span className="material-symbols-outlined text-amber-500 text-3xl">
              explore
            </span>
            <span className="text-xl font-extrabold tracking-tight font-sora text-white">
              PathWise
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="#"
            >
              Features
            </a>
            <a
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="#"
            >
              How It Works
            </a>
            <a
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="#"
            >
              Career Library
            </a>
            <a
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="#"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                navigate("/auth/role");
              }}
              className="px-6 py-2.5 amber-gradient-btn text-white text-sm font-bold rounded-full transition-all flex items-center gap-2 hover:opacity-90"
            >
              Get Started Free{" "}
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-[140px] pb-24 overflow-hidden dark-gradient-bg dot-grid">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-slate-300 text-xs font-bold uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
              AI-Powered Career Guidance
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] font-sora">
              Discover the Career That's{" "}
              <span className="text-amber-500">Right for You</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              PathWise uses industry-leading AI models to map your strengths to
              high-growth careers. Trusted by thousands of students across
              India.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 amber-gradient-btn text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                Take Free Assessment
              </button>
              <button className="px-8 py-4 glass-card text-white font-bold rounded-xl border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>{" "}
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-card overflow-hidden glass-card border-[12px] border-white/5">
              <img
                alt="Dashboard Preview"
                className="w-full h-auto opacity-90"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMhIOBuDutY7lyvn40TSboF3QLrqAzAYrkNkl_e48GZSXpsUnEcFmsTo42dAvCyS2GSlvnObUdeW0SHdZDFw1FlQNXzRL4gtu94R2DLqU-s3K-qwS99bwZTtM7CWBReaHT9SRgQhgj68b7jwXNYHyp9LAgnxJvKqSzPSlLluDhw2hbcOQaZQLPL_Lm2suLZRE9WS9eCbfW3SyGaHIYe0q89IFS3N2ZOeuZS5-o945r8gfO3PyodVZM2Xd9hgUBp0Swjav-0oENng"
              />
              <div className="absolute top-8 -left-8 glass-card p-3 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-teal-500/20">
                  94%
                </div>
                <div className="text-xs font-bold text-white">
                  Match for Data Science
                </div>
              </div>
              <div className="absolute bottom-8 -right-4 amber-gradient-btn p-3 rounded-2xl flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-sm">star</span>
                <div className="text-xs font-bold">4.9/5 Student Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <div className="bg-slate-900/50 py-12 border-y border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-10">
            Trusted by students from top institutions
          </p>
          <div className="flex flex-wrap justify-between items-center gap-8 opacity-50 grayscale brightness-200">
            <img
              alt="Logo 1"
              className="h-8"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKd-9Wa4aU83E9LtMs_vJoEHtjSKkLwGwYwyBkGlHcHs49CReaOLD466ALEj-Hj-WbK36fPb3xItfwtg6FHlQ2bWkvnfLQnafh8upm1kmrV2JX-DAXzbLw1jdn6qDtoGtDEy-WfuklsB70FrR2c6t-sH0Yy96xY5nfKjCaYVGGMP8ee3cjj8zBpAptitI6cu498GD8e6PoxmlkLdP-gWdxe3dlEgwUt_9pXBMZcQDm43eDI5zC3YxdyUgb0bOV3xhJk7tOu3Zw1A"
            />
            <img
              alt="Logo 2"
              className="h-8"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRk2HIbZrFu-4gt18Lt07fazKGB1k8daTU56Oqc4X3y0kL6zJFNuh_7uXPaDjdWxhxUhuTkWMltc-oQOq-04IPvwzuKhaP815yu5GqfiO7vhW0unAoPwPowMWM4fcNe2F9Lhg35YRq5ESjHcs4Uhy2i5GzD4iP5NVa4oTloUHEoQaNcaK8QThEW8MmsaCQddGJZBHv6WJO7J36PgRv-5nbnHTD9sPoCAT-QyLYwPJO39gAkFY5ZBhdNtf_XUkGFhXhGEV5uw727w"
            />
            <img
              alt="Logo 3"
              className="h-8"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDRzjz78rhmw0cdwfoTRAWOotYl2wWoOmvJ5vJiTyd4u0O4ZivVNSncAJ0XC_2esMmB83ceueGAGs7zIZh8W2nwmPu87mII-NtDcvLAEVuJNfxOo_cklysDv4FkTF67SG4noCkd3Gnu6jHtJIyyJuozYbt1jB4YOeI7UJ_BdsDmVQ5IiSDVS6GqmhEn0WLLuLUButXZpGK_dnP9qgQbHpAkm90CsEHQDrui9YEfoTF8lcqcIBxwxoEI3Oi7Thgt3KlaH1XwlrJ8A"
            />
            <img
              alt="Logo 4"
              className="h-8"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs7isMe0zP0yhyRBpia-DJQO_AJSq2GXyem_F5NaYjjciFZ_G_226u9LmMNMlKitmAzC7IkAYbsZjr-WJ8Hzleq-ms2XFSQnYhgWyvw3qqi9NJXbY1AxOt8ebJU-zEJ5FW42qVF7iO8-TBTp5mn3Cx77WkCPBfCPeBIorCLRES4qv8Wl0Ana2Fy7JfgYR5Yx1Q2VCqCOBsvSyue4xaL_v_i6FNE3e5L7KvHHJ9wxv4F8NumSscPT3FGtx_SANkeQ0Rwz6-in-a2w"
            />
            <img
              alt="Logo 5"
              className="h-8"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAtxrEojIFZzEJ8sQ_gqDb9gueWOtV5Hp0oFFRpjgwFax3DFmMiao1PBilk3jFJDN7mPfD_fuZz-zcROk3eau0_0fxFiM9TveItxU3M3W4UeTc6RDMoUpZ-LDsVjjN10_oAgYU57zYDIXLLGzkl8BDtgy7hq5Qc4nohrZgxkfeYFPBLeMGX_sBq-6inOYkeK7pKfGQbvkQ5o0WIWkIBk_TprX2-HcipHzuldcZYha-LTI1C9hclQolhWo7ataAwL7Mi0rRtN8HMg"
            />
          </div>
        </div>
      </div>

      {/* Journey Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold text-white mb-4 font-sora">
              Your Journey to Success
            </h2>
            <p className="text-slate-400">
              A scientific, data-driven approach to finding your dream career.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="relative group dashed-line">
              <div className="p-8 rounded-card glass-card glass-card-hover h-full relative z-10 transition-all">
                <div className="w-12 h-12 rounded-full amber-gradient-btn text-white font-bold flex items-center justify-center mb-6">
                  01
                </div>
                <span className="material-symbols-outlined text-4xl text-teal-400 glow-teal mb-4">
                  psychology
                </span>
                <h3 className="text-xl font-bold text-white mb-3 font-sora">
                  AI Assessment
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Multi-dimensional psychometric analysis measuring aptitude,
                  personality, and interest.
                </p>
              </div>
            </div>
            <div className="relative group dashed-line">
              <div className="p-8 rounded-card glass-card glass-card-hover h-full relative z-10 transition-all">
                <div className="w-12 h-12 rounded-full amber-gradient-btn text-white font-bold flex items-center justify-center mb-6">
                  02
                </div>
                <span className="material-symbols-outlined text-4xl text-teal-400 glow-teal mb-4">
                  analytics
                </span>
                <h3 className="text-xl font-bold text-white mb-3 font-sora">
                  Deep Analysis
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our engine cross-references your profile with over 500+ Indian
                  career path metrics.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="p-8 rounded-card glass-card glass-card-hover h-full relative z-10 transition-all">
                <div className="w-12 h-12 rounded-full amber-gradient-btn text-white font-bold flex items-center justify-center mb-6">
                  03
                </div>
                <span className="material-symbols-outlined text-4xl text-teal-400 glow-teal mb-4">
                  route
                </span>
                <h3 className="text-xl font-bold text-white mb-3 font-sora">
                  Personalized Roadmap
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Get a step-by-step guide on entrance exams, top colleges, and
                  necessary skillsets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-24 bg-slate-900/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1.5 glass-card rounded-2xl">
              <button className="px-8 py-3 rounded-xl amber-gradient-btn text-white font-bold transition-all shadow-md">
                For Students
              </button>
              <button className="px-8 py-3 rounded-xl text-slate-400 font-bold hover:text-white transition-all">
                For Parents
              </button>
              <button className="px-8 py-3 rounded-xl text-slate-400 font-bold hover:text-white transition-all">
                For Counselors
              </button>
            </div>
          </div>
          <div className="glass-card rounded-[32px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className="rounded-[16px] overflow-hidden aspect-video shadow-2xl border border-white/10 inner-glow-img relative">
                <img
                  alt="Modern Indian students collaborating in a high-tech campus environment"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbH_mx-XC4CFJWg79WOlEG6GJUQXextO7Hs8K7gWknESvUIrkYgcJ8j6YgeRjzDhIXz6rWfoBcSfMgXPDIqykZlteCbJ6jPGQJtS3KQWqJAymcY5h0llSmg1O7LRdYiOPiTrt_kwsrnFUHX0cx7VEbacZMBjN7ADRYvJPSuAcxEYlFvithpS_w2zycLpQlDyr2o0gVwt3Sb1Vc9zNcDjLDxWQgILDChpfzd3_Fg7KGcBQNY50hJb39Ma0_qjvwgr9Xc6rhhtf0GQ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/40 to-transparent pointer-events-none"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-8">
              <h2 className="text-4xl font-extrabold text-white font-sora leading-tight">
                Empowering Students to <br />
                Lead Their Own Path
              </h2>
              <p className="text-lg text-slate-400">
                Discover your hidden potential and match with careers that align
                with your natural abilities, not just your grades.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-300 font-medium">
                  <span className="material-symbols-outlined text-teal-400 glow-teal font-bold">
                    check_circle
                  </span>
                  In-depth career fitment scores for 150+ roles
                </li>
                <li className="flex items-center gap-3 text-slate-300 font-medium">
                  <span className="material-symbols-outlined text-teal-400 glow-teal font-bold">
                    check_circle
                  </span>
                  Entrance exam calendars and automated alerts
                </li>
                <li className="flex items-center gap-3 text-slate-300 font-medium">
                  <span className="material-symbols-outlined text-teal-400 glow-teal font-bold">
                    check_circle
                  </span>
                  Curated lists of top Indian and global universities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4 font-sora">
              Everything You Need to Scale
            </h2>
            <div className="h-1.5 w-24 amber-gradient-btn mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-card glass-card glass-card-hover transition-all group">
              <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-6 group-hover:bg-teal-500/20 transition-colors">
                <span className="material-symbols-outlined text-3xl glow-teal">
                  psychology
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-sora">
                Psychometric Assessment
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Scientifically validated tests measuring personality, aptitude,
                and interest patterns.
              </p>
            </div>
            <div className="p-8 rounded-card glass-card glass-card-hover transition-all group">
              <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-6 group-hover:bg-teal-500/20 transition-colors">
                <span className="material-symbols-outlined text-3xl glow-teal">
                  travel_explore
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-sora">
                Career Explorer
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Browse 500+ Indian &amp; global careers with real-time salary
                and growth trends.
              </p>
            </div>
            <div className="p-8 rounded-card glass-card glass-card-hover transition-all group">
              <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-6 group-hover:bg-teal-500/20 transition-colors">
                <span className="material-symbols-outlined text-3xl glow-teal">
                  calculate
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-sora">
                ROI Calculator
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Calculate returns for different degrees and colleges based on
                placement data.
              </p>
            </div>
            <div className="p-8 rounded-card glass-card glass-card-hover transition-all group">
              <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-6 group-hover:bg-teal-500/20 transition-colors">
                <span className="material-symbols-outlined text-3xl glow-teal">
                  school
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-sora">
                College Finder
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Discover top colleges in India and abroad that match your
                academic profile.
              </p>
            </div>
            <div className="p-8 rounded-card glass-card glass-card-hover transition-all group">
              <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-6 group-hover:bg-teal-500/20 transition-colors">
                <span className="material-symbols-outlined text-3xl glow-teal">
                  history_edu
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-sora">
                Scholarship Finder
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Stay updated on central, state, and private scholarships
                tailored to you.
              </p>
            </div>
            <div className="p-8 rounded-card glass-card glass-card-hover transition-all group">
              <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-6 group-hover:bg-teal-500/20 transition-colors">
                <span className="material-symbols-outlined text-3xl glow-teal">
                  support_agent
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-sora">
                Expert Counselling
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                1-on-1 sessions with certified experts to validate your
                AI-driven findings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-[#0A0F1E] py-24 overflow-hidden dot-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-purple-500/5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div className="space-y-4">
              <div className="text-5xl lg:text-6xl font-black text-amber-500 font-sora drop-shadow-sm">
                50K+
              </div>
              <div className="h-0.5 w-12 bg-amber-500/30 mx-auto"></div>
              <div className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">
                Students Guided
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl lg:text-6xl font-black text-amber-500 font-sora drop-shadow-sm">
                98%
              </div>
              <div className="h-0.5 w-12 bg-amber-500/30 mx-auto"></div>
              <div className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">
                Satisfaction Rate
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl lg:text-6xl font-black text-amber-500 font-sora drop-shadow-sm">
                500+
              </div>
              <div className="h-0.5 w-12 bg-amber-500/30 mx-auto"></div>
              <div className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">
                Career Paths
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl lg:text-6xl font-black text-amber-500 font-sora drop-shadow-sm">
                150+
              </div>
              <div className="h-0.5 w-12 bg-amber-500/30 mx-auto"></div>
              <div className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">
                Partner Schools
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white font-sora">
              Student Success Stories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="p-10 rounded-card glass-card relative h-full">
              <div className="text-6xl text-white/5 absolute top-4 left-4 font-serif -z-0">
                “
              </div>
              <div className="relative z-10">
                <div className="flex gap-1 text-amber-500 mb-6">
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                </div>
                <p className="text-slate-400 mb-8 italic">
                  "I was confused between Engineering and Design. The AI
                  assessment showed my high spatial reasoning and led me to UX
                  Design. Now at NID!"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    alt="Rahul"
                    className="w-14 h-14 rounded-full border-2 border-white/10 shadow-md"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuANEbC769pL0SfojBSOVbbsUm3PWLp2IY07EZ600cRHuhhnpVrQgZteixZOD3SlMVqdjySB1Qrv8eSn4IqHobhzvaJKiFDeeF8_4TYxHuQNVB7gLjy9LeQWbdU1p62vsZDdU0UeI0eFlrb7ZpfQWKsdbevMGm8ZidkWz1DLvgSi30HbLyJRjYSq9yfJrgYsEDKXEdFegJPqePvjV5lq_ulOdroswTeCznLzoR8UprGRJFQuqB-1kz51AnzRIC2KxKqU6piDLE9Nwg"
                  />
                  <div>
                    <div className="font-bold text-white font-sora">
                      Rahul S.
                    </div>
                    <div className="text-xs text-slate-500">
                      UX Design, NID Bangalore
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-10 rounded-card glass-card border-amber-500/30 transform md:scale-110 z-20 relative h-full bg-white/5">
              <div className="text-6xl text-amber-500/10 absolute top-4 left-4 font-serif -z-0">
                “
              </div>
              <div className="relative z-10">
                <div className="flex gap-1 text-amber-500 mb-6">
                  <span className="material-symbols-outlined fill-1 text-xl">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-1 text-xl">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-1 text-xl">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-1 text-xl">
                    star
                  </span>
                  <span className="material-symbols-outlined fill-1 text-xl">
                    star
                  </span>
                </div>
                <p className="text-slate-200 font-medium mb-8 italic text-lg">
                  "The ROI calculator was a game-changer. It helped us decide
                  which college offers the best future for our son's goals."
                </p>
                <div className="flex items-center gap-4">
                  <img
                    alt="Sunita"
                    className="w-16 h-16 rounded-full border-2 border-amber-500/50 shadow-lg"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuARk150R7_TzYPfjC8SMM5F4lCrgiMEP3hdsgbZa4moYkwkmZ9hLGFtwoweD3OGFcFSO-tlWB6FPA6Hjc7iq65ut9wCFVd9pbKXCPw3-AOqKp4D4f3vSA8oICbqnmdYK4VsHEfw45E8RFHSPItC0H9aqLzvzJ5Hu5aagNLid5LutoNwjK1iQ8JkZ2rUrjoCUbzNfUVMZshpRl3erdzECCOik1g4Xr6gzVJVJ8LGh8z9oZHOqnXdcbXM_-JMIR7bQPXyNuG0kYtnvQ"
                  />
                  <div>
                    <div className="font-bold text-white font-sora">
                      Sunita M.
                    </div>
                    <div className="text-xs text-slate-500">Parent, Mumbai</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-10 rounded-card glass-card relative h-full">
              <div className="text-6xl text-white/5 absolute top-4 left-4 font-serif -z-0">
                “
              </div>
              <div className="relative z-10">
                <div className="flex gap-1 text-amber-500 mb-6">
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                  <span className="material-symbols-outlined fill-1">star</span>
                </div>
                <p className="text-slate-400 mb-8 italic">
                  "As a counselor, I use PathWise as a baseline. The
                  psychometric accuracy is better than any other Indian platform
                  I've used."
                </p>
                <div className="flex items-center gap-4">
                  <img
                    alt="Arvind"
                    className="w-14 h-14 rounded-full border-2 border-white/10 shadow-md"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIyHFswONPbFWAS6d0-sFsqi6kqibiFwfTwEj5gnv_duqiw2PzmSijFT3zN_aTSFMaICl1M1y3cxnpjAZf0_F0-GZx8xyQDXZsjUFT_tlHpxug9korhkxLcZHB-DpRcPiPxNAJxo1XW_rPN5Ns0r57jmwhHUdJOhxkePW_NF6ok6qX8Es--x9Ta01GyIfyUl_2aZGWxI18zjXu7rl0rpNMUldnL_XIzpkkUHnixQQZPKKx-fgQFbLiJb-42HAjQeIS_HCrj6kaTQ"
                  />
                  <div>
                    <div className="font-bold text-white font-sora">
                      Arvind K.
                    </div>
                    <div className="text-xs text-slate-500">
                      Independent Counselor
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#0A0F1E] relative overflow-hidden dot-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-10">
          <h2 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight font-sora">
            Your Future Starts With <br />{" "}
            <span className="wavy-underline">One Click</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Take the first step towards a career you'll love. Join 50,000+
            students already on their path.
          </p>
          <div className="pt-6">
            <button className="px-12 py-6 amber-gradient-btn text-white font-extrabold rounded-2xl text-xl transition-all hover:scale-105 active:scale-95">
              Start Your Free Assessment
            </button>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            No credit card required • 20 min assessment
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] text-slate-400 pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-white glow-logo">
                <span className="material-symbols-outlined text-amber-500 text-4xl">
                  explore
                </span>
                <span className="text-3xl font-extrabold tracking-tight font-sora">
                  PathWise
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
                India's premier AI-driven career guidance ecosystem, empowering
                students to build future-ready careers through data and science.
              </p>
              <div className="flex gap-6">
                <a
                  className="text-slate-600 hover:text-amber-500 transition-all"
                  href="#"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  className="text-slate-600 hover:text-amber-500 transition-all"
                  href="#"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.669-.072-4.948-.197-4.354-2.62-6.782-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 font-sora">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    Career Assessment
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    College Finder
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    ROI Calculator
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    Career Library
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 font-sora">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    Counselor Network
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    Press Kit
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 font-sora">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-amber-500 transition-colors"
                    href="#"
                  >
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-600">
              © 2024 PathWise Solutions India Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-600">
              Made with <span className="text-amber-500">heart</span> for Indian
              Students
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 amber-gradient-btn text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[999]">
        <span className="material-symbols-outlined text-3xl">chat_bubble</span>
      </button>
    </div>
  );
};

export default PathWiseLanding;
