/**
 * Static definitions for the guided qualification flow:
 * solution → industry → project size → features.
 *
 * The engine consumes these to build `options` widgets and to interpret the
 * visitor's selections. Feature sets are tailored per solution type.
 */

import type { Option, SolutionId, SizeId } from "./types";

export const SOLUTIONS: (Option & { value: SolutionId })[] = [
  { value: "web", label: "Web App", hint: "Custom web application or SaaS" },
  { value: "mobile", label: "Mobile App", hint: "iOS, Android, Flutter, React Native" },
  { value: "ai", label: "AI Solution", hint: "Agents, chatbots, automation" },
  { value: "system", label: "Business System", hint: "Logistics, CRM, ERP, inventory" },
  { value: "automation", label: "Automation", hint: "Remove repetitive busywork" },
  { value: "design", label: "UI/UX Design", hint: "Research, product & interface design" },
  { value: "unsure", label: "Not sure yet", hint: "Help me figure it out" },
];

export const INDUSTRIES: Option[] = [
  { value: "Logistics", label: "Logistics" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
  { value: "Education", label: "Education" },
  { value: "Retail", label: "Retail" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Government", label: "Government" },
  { value: "Other", label: "Other / general" },
];

export const SIZES: (Option & { value: SizeId })[] = [
  { value: "startup", label: "Startup MVP", hint: "Validate an idea, ship fast" },
  { value: "small", label: "Small Business", hint: "Focused, production product" },
  { value: "medium", label: "Medium Company", hint: "Scaling, multiple teams" },
  { value: "enterprise", label: "Enterprise", hint: "Complex, high-scale, integrations" },
];

/** Feature options offered at step 4, keyed by chosen solution. */
export const FEATURES: Record<SolutionId, Option[]> = {
  web: [
    { value: "Auth & accounts", label: "Auth & accounts" },
    { value: "Admin dashboard", label: "Admin dashboard" },
    { value: "Payments & billing", label: "Payments & billing" },
    { value: "Real-time updates", label: "Real-time updates" },
    { value: "Integrations", label: "Third-party integrations" },
    { value: "Analytics", label: "Analytics" },
    { value: "Multi-tenant / SaaS", label: "Multi-tenant / SaaS" },
    { value: "Content management", label: "Content management" },
  ],
  mobile: [
    { value: "iOS", label: "iOS" },
    { value: "Android", label: "Android" },
    { value: "Push notifications", label: "Push notifications" },
    { value: "Offline mode", label: "Offline mode" },
    { value: "In-app payments", label: "In-app payments" },
    { value: "Maps & location", label: "Maps & location" },
    { value: "Chat & messaging", label: "Chat & messaging" },
    { value: "Camera & media", label: "Camera & media" },
  ],
  ai: [
    { value: "AI chatbot", label: "AI chatbot" },
    { value: "AI agent", label: "AI agent" },
    { value: "Knowledge base (RAG)", label: "Knowledge base (RAG)" },
    { value: "Workflow automation", label: "Workflow automation" },
    { value: "Voice AI", label: "Voice AI" },
    { value: "Analytics & BI", label: "Analytics & BI" },
    { value: "Tool & CRM integration", label: "Tool & CRM integration" },
    { value: "Human-in-the-loop", label: "Human-in-the-loop" },
  ],
  system: [
    { value: "GPS / fleet tracking", label: "GPS / fleet tracking" },
    { value: "Driver management", label: "Driver management" },
    { value: "Warehouse", label: "Warehouse" },
    { value: "Inventory", label: "Inventory" },
    { value: "Route planning", label: "Route planning" },
    { value: "Delivery tracking", label: "Delivery tracking" },
    { value: "Customer portal", label: "Customer portal" },
    { value: "Analytics dashboard", label: "Analytics dashboard" },
    { value: "CRM", label: "CRM" },
    { value: "ERP", label: "ERP" },
    { value: "HR management", label: "HR management" },
    { value: "POS", label: "POS" },
  ],
  automation: [
    { value: "Data entry automation", label: "Data entry automation" },
    { value: "Document processing", label: "Document processing" },
    { value: "Email & notifications", label: "Email & notifications" },
    { value: "Approval workflows", label: "Approval workflows" },
    { value: "System integration", label: "System integration" },
    { value: "Scheduled jobs", label: "Scheduled jobs" },
    { value: "Reporting", label: "Reporting" },
    { value: "Alerts & monitoring", label: "Alerts & monitoring" },
  ],
  design: [
    { value: "UX research", label: "UX research" },
    { value: "Product design", label: "Product design" },
    { value: "Mobile UI", label: "Mobile UI" },
    { value: "Dashboard design", label: "Dashboard design" },
    { value: "Design system", label: "Design system" },
    { value: "Prototyping", label: "Prototyping" },
    { value: "Branding", label: "Branding" },
    { value: "Usability testing", label: "Usability testing" },
  ],
  unsure: [],
};

export const SOLUTION_LABEL: Record<SolutionId, string> = {
  web: "web application",
  mobile: "mobile app",
  ai: "AI solution",
  system: "business system",
  automation: "automation",
  design: "UI/UX design",
  unsure: "solution",
};

export const SIZE_LABEL: Record<SizeId, string> = {
  startup: "Startup MVP",
  small: "Small Business",
  medium: "Medium Company",
  enterprise: "Enterprise",
};
