import { BrainCircuit, BriefcaseBusiness, Map, PlaySquare } from "lucide-react";

export const careerTabs = [
  { label: "Career Matches", to: "/student/careers", icon: BriefcaseBusiness, end: true },
  { label: "Skill Analysis", to: "/student/careers/skills", icon: BrainCircuit },
  { label: "Roadmap", to: "/student/careers/roadmap", icon: Map },
  { label: "Scenarios", to: "/student/careers/scenarios", icon: PlaySquare },
];
