import { NavLink } from "react-router-dom";

export default function SectionTabs({ tabs }) {
  return (
    <nav className="flex w-full gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition ${
              isActive
                ? "bg-slate-950 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`
          }
        >
          {tab.icon ? <tab.icon className="size-4" /> : null}
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
