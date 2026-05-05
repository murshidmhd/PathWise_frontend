import { BadgeCheck, Sparkles } from "lucide-react";
import SectionTabs from "../../components/student/SectionTabs";

import { careerTabs } from "./careerTabs";

export default function CareerScenariosPage() {
  return (
    <div className="min-h-screen bg-page-bg px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionTabs tabs={careerTabs} />

        <section className="overflow-hidden rounded-[34px] border border-slate-200/80 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-indigo-600">
                <Sparkles className="size-3" />
                Coming Soon
              </span>

              <h1 className="mt-6 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Scenario-based career practice is on the way
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500">
                We are building a Google Vantage-style experience where students can
                step into realistic career situations, make decisions, and learn how
                different paths feel before choosing them.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Practice workplace and college scenarios",
                  "Get feedback on choices and next steps",
                  "Explore career paths through guided simulations",
                  "Build confidence before real interviews or mentor calls",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                  >
                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-[#0B818D]" />
                    <p className="text-sm font-semibold leading-6 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex min-h-[360px] items-center justify-center bg-slate-950 p-6 text-white sm:p-8 lg:p-10">
              <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-200">
                      Preview
                    </p>
                    <h2 className="mt-2 text-xl font-black">First Day as a Data Analyst</h2>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-400/20 text-teal-200">
                    <PlaySquare className="size-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm leading-7 text-slate-200">
                      Your manager gives you a messy sales dataset and asks for
                      three insights before lunch. What do you do first?
                    </p>
                  </div>
                  <div className="space-y-3">
                    {["Clean the data", "Make a chart first", "Ask clarifying questions"].map((choice) => (
                      <div
                        key={choice}
                        className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-100"
                      >
                        {choice}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
