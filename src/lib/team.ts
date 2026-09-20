import {
  Sparkles,
  Users,
  GraduationCap,
  Target,
  Globe,
  Scale,
  type LucideIcon,
} from "lucide-react";

export const companyStats: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}[] = [
  { value: 48, suffix: "", label: "Team Members" },
  { value: 180, suffix: "+", label: "Projects Delivered" },
  { value: 95, suffix: "%", label: "Client Retention" },
  { value: 12, suffix: "", label: "Countries Served" },
  { value: 4.9, suffix: "/5", label: "Client Rating", decimals: 1 },
  { value: 10, suffix: "", label: "Years in Business" },
];

export const culture: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Sparkles, title: "Innovation", desc: "We embrace emerging technologies to build future-ready solutions." },
  { icon: Users, title: "Collaboration", desc: "Great ideas come from teamwork across disciplines." },
  { icon: GraduationCap, title: "Continuous Learning", desc: "Every team member receives an annual learning budget and certification support." },
  { icon: Target, title: "Ownership", desc: "Everyone takes responsibility for delivering meaningful results." },
  { icon: Globe, title: "Diversity", desc: "We believe different perspectives create stronger products." },
  { icon: Scale, title: "Work-Life Balance", desc: "Flexible schedules and remote-first collaboration." },
];

export const employeeTestimonials = [
  {
    quote:
      "Working here has given me opportunities to solve challenging engineering problems while learning from an incredible team.",
    name: "Sophia Nguyen",
    role: "Backend Engineer",
    initials: "SN",
  },
  {
    quote:
      "Design decisions are always backed by research, and every designer has a voice in shaping the product.",
    name: "Olivia Martinez",
    role: "Senior UX/UI Designer",
    initials: "OM",
  },
  {
    quote:
      "Automation and continuous improvement are part of our daily culture. Every week brings new technical challenges.",
    name: "Daniel Wong",
    role: "DevOps Engineer",
    initials: "DW",
  },
];

export const openings = [
  "Senior Frontend Engineer",
  "Backend Developer",
  "UX/UI Designer",
  "QA Automation Engineer",
  "AI Engineer",
  "Project Manager",
];

export const benefits = [
  "Competitive Salary",
  "Hybrid & Remote Work",
  "Annual Performance Bonus",
  "Health Insurance",
  "Learning Budget",
  "Modern Equipment",
  "Team Retreats",
  "Flexible Working Hours",
];
