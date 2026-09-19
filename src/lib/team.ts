import {
  Sparkles,
  Users,
  GraduationCap,
  Target,
  Globe,
  Scale,
  type LucideIcon,
} from "lucide-react";

export type Dept = "Leadership" | "Engineering" | "Design" | "Quality" | "Marketing";

export const departments: Dept[] = [
  "Leadership",
  "Engineering",
  "Design",
  "Quality",
  "Marketing",
];

/** Accent gradient per department (used on avatars + card glow). */
export const deptAccent: Record<Dept, string> = {
  Leadership: "from-electric to-indigo",
  Engineering: "from-indigo to-purple",
  Design: "from-cyan to-emerald",
  Quality: "from-purple to-cyan",
  Marketing: "from-emerald to-electric",
};

export type Member = {
  name: string;
  role: string;
  dept: Dept;
  bio: string;
  skills: string[];
  experience?: string;
  initials: string;
  /** Optional headshot; when absent the card shows initials on a studio-gray backdrop. */
  photo?: string;
  /** CSS object-position for the portrait crop (defaults to "center top"). */
  focus?: string;
};

export const team: Member[] = [
  // Leadership
  {
    name: "Chhor Sophanak",
    role: "Co-Founder",
    dept: "Leadership",
    bio: "15+ years leading technology companies across Southeast Asia. Passionate about digital transformation and building products that solve real business challenges.",
    skills: ["Business Strategy", "Product Innovation", "Leadership"],
    initials: "CS",
    photo: "/Image/Meet the team/Sophanak.jpg",
  },
  {
    name: "Emily Carter",
    role: "Chief Technology Officer",
    dept: "Leadership",
    bio: "Cloud architect and software engineering leader with expertise in AI, distributed systems, and scalable enterprise applications.",
    skills: ["Cloud Architecture", "AI", "DevOps", "Kubernetes"],
    initials: "EC",
  },
  {
    name: "Michael Tan",
    role: "Chief Operating Officer",
    dept: "Leadership",
    bio: "Ensures every project is delivered on time while improving internal processes and client satisfaction.",
    skills: ["Operations", "Agile", "Project Delivery"],
    initials: "MT",
  },
  // Engineering
  {
    name: "Alex Kim",
    role: "Senior Full Stack Developer",
    dept: "Engineering",
    bio: "Expert in React, Next.js, Node.js, and AWS. Loves building scalable SaaS platforms.",
    skills: ["React", "Next.js", "Node.js", "AWS", "Docker"],
    experience: "8 Years",
    initials: "AK",
  },
  {
    name: "Sophia Nguyen",
    role: "Backend Engineer",
    dept: "Engineering",
    bio: "Specializes in microservices, APIs, PostgreSQL, and cloud-native architecture.",
    skills: ["Go", "Java", "PostgreSQL", "Redis", "Docker"],
    experience: "6 Years",
    initials: "SN",
  },
  {
    name: "Daniel Wong",
    role: "DevOps Engineer",
    dept: "Engineering",
    bio: "Automates cloud deployments and maintains highly available infrastructure.",
    skills: ["Terraform", "AWS", "CI/CD", "Kubernetes"],
    initials: "DW",
  },
  // Design
  {
    name: "Olivia Martinez",
    role: "Senior UX/UI Designer",
    dept: "Design",
    bio: "Creates intuitive digital experiences focused on accessibility and usability.",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    experience: "7 Years",
    initials: "OM",
  },
  {
    name: "Sok Yipon",
    role: "Product Design",
    dept: "Design",
    bio: "Transforms complex workflows into elegant, intuitive user interfaces.",
    skills: ["Product Design", "Figma", "Illustrator", "Prototyping"],
    initials: "SY",
    photo: "/Image/Meet the team/SOK YIPON.jpg",
    focus: "50% 50%",
  },
  // Quality
  {
    name: "Sarah Lim",
    role: "QA Lead",
    dept: "Quality",
    bio: "Responsible for maintaining software quality through automated and manual testing.",
    skills: ["Automation Testing", "Cypress", "Playwright", "API Testing"],
    initials: "SL",
  },
  {
    name: "Kevin Ho",
    role: "QA Engineer",
    dept: "Quality",
    bio: "Ensures every release meets performance and usability standards.",
    skills: ["Regression Testing", "Performance Testing", "Bug Tracking"],
    initials: "KH",
  },
  // Marketing
  {
    name: "Rachel Tan",
    role: "Digital Marketing Manager",
    dept: "Marketing",
    bio: "Develops growth strategies through SEO, paid advertising, and content marketing.",
    skills: ["SEO", "Google Ads", "Analytics", "Content Strategy"],
    initials: "RT",
  },
  {
    name: "Ethan Park",
    role: "Brand Designer",
    dept: "Marketing",
    bio: "Creates visual identity, social campaigns, and marketing assets.",
    skills: ["Branding", "Illustration", "Motion Graphics"],
    initials: "EP",
  },
];

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

export const galleryShots: {
  label: string;
  gradient: string;
  image?: string; // optional real photo; falls back to the gradient placeholder
}[] = [
  {
    label: "Sprint Planning Meeting",
    gradient: "from-electric to-indigo",
    image: "/Image/Behind the work/Sprint Planning Meeting.JPG",
  },
  {
    label: "UI/UX Design Workshop",
    gradient: "from-cyan to-emerald",
    image: "/Image/Behind the work/UIUX Design Workshop.png",
  },
  {
    label: "Software Development Team",
    gradient: "from-indigo to-purple",
    image: "/Image/Behind the work/SoftwareDevelopment Team.JPG",
  },
  {
    label: "Code Review Session",
    gradient: "from-purple to-cyan",
    image: "/Image/Behind the work/Code Review Session.JPG",
  },
  {
    label: "Team Lunch",
    gradient: "from-emerald to-electric",
    image: "/Image/Behind the work/Team Lunch.JPG",
  },
  {
    label: "Company Hackathon",
    gradient: "from-electric to-purple",
    image: "/Image/Behind the work/Company Hackathon.JPG",
  },
  {
    label: "Client Presentation",
    gradient: "from-cyan to-indigo",
    image: "/Image/Behind the work/ClientPresentations.jpg",
  },
  {
    label: "Office Collaboration",
    gradient: "from-purple to-electric",
    image: "/Image/Behind the work/Office Collaboration.JPG",
  },
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
