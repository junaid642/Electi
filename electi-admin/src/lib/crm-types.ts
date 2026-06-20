export type LeadStage =
  | "Incoming Lead"
  | "Initial Contact"
  | "Qualified"
  | "Discovery Meeting"
  | "Demo Scheduled"
  | "Proposal Preparation"
  | "Proposal Sent"
  | "Client Review"
  | "Negotiation"
  | "Waiting for Approval"
  | "Legal / Procurement"
  | "Won"
  | "Lost"
  | "Follow-Up Later"
  | "Strategic Opportunity"
  | "Partnership Potential";

export type Priority = "High" | "Medium" | "Low";
export type CommType = "note" | "call" | "email" | "whatsapp" | "meeting";

export interface Communication {
  id: string;
  type: CommType;
  content: string;
  author: string;
  direction: "in" | "out";
  timestamp: string;
}

export interface CrmTask {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  priority: Priority;
  done: boolean;
}

export interface CrmActivity {
  id: string;
  type: string;
  text: string;
  author: string;
  timestamp: string;
}

export interface CrmLead {
  id: string;
  company: string;
  contact: string;
  designation: string;
  phone: string;
  whatsapp?: string;
  email: string;
  website?: string;
  linkedin?: string;
  address?: string;
  city: string;
  country: string;
  vat?: string;
  cr?: string;
  industry: string;
  source: string;
  stage: LeadStage;
  priority: Priority;
  assigned: string;
  score: number;
  value: number;
  urgency?: "Critical" | "High" | "Medium" | "Low";
  temperature?: "Hot" | "Warm" | "Cold";
  competitor?: string;
  branches?: number;
  expectedCloseDate?: string;
  lastContact: string;
  nextFollowUp: string;
  notes: string;
  services?: string[];
  vip?: boolean;
  decisionMakerIdentified?: boolean;
  expansionPotential?: boolean;
  communications: Communication[];
  tasks: CrmTask[];
  activities: CrmActivity[];
  createdAt: string;
}

export const STAGES: LeadStage[] = [
  "Incoming Lead", "Initial Contact", "Qualified", "Discovery Meeting",
  "Demo Scheduled", "Proposal Preparation", "Proposal Sent", "Client Review",
  "Negotiation", "Waiting for Approval", "Legal / Procurement",
  "Won", "Lost", "Follow-Up Later", "Strategic Opportunity", "Partnership Potential",
];

export const STAGE_COLOR: Record<string, string> = {
  "Incoming Lead":         "bg-blue-500/15 text-blue-300 border-blue-500/20",
  "Initial Contact":       "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  "Qualified":             "bg-purple-500/15 text-purple-300 border-purple-500/20",
  "Discovery Meeting":     "bg-amber-500/15 text-amber-300 border-amber-500/20",
  "Demo Scheduled":        "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
  "Proposal Preparation":  "bg-slate-500/15 text-slate-300 border-slate-500/20",
  "Proposal Sent":         "bg-orange-500/15 text-orange-300 border-orange-500/20",
  "Client Review":         "bg-sky-500/15 text-sky-300 border-sky-500/20",
  "Negotiation":           "bg-amber-600/15 text-amber-200 border-amber-600/20",
  "Waiting for Approval":  "bg-violet-500/15 text-violet-300 border-violet-500/20",
  "Legal / Procurement":   "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",
  "Won":                   "bg-green-500/15 text-green-300 border-green-500/20",
  "Lost":                  "bg-red-500/15 text-red-300 border-red-500/20",
  "Follow-Up Later":       "bg-teal-500/15 text-teal-300 border-teal-500/20",
  "Strategic Opportunity": "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/20",
  "Partnership Potential": "bg-pink-500/15 text-pink-300 border-pink-500/20",
};

export const INDUSTRIES = [
  "Healthcare", "Hospitality", "Construction", "Retail", "Corporate",
  "Real Estate", "Education", "Government", "Finance & Banking",
  "Telecom", "Media & Entertainment", "Manufacturing", "Energy & Utilities",
  "Logistics & Supply Chain", "Tourism & Travel", "Food & Beverage",
  "Automotive", "Pharma & Biotech", "Insurance", "Legal Services",
  "Oil & Gas", "Events & Exhibition", "E-commerce", "Technology / SaaS",
  "Startups", "Non-profit / NGO",
];

export const AI_SERVICES = [
  "AI Personal Assistant", "AI Billing Agent", "AI Legal Agent",
  "AI Sales Agent", "AI Customer Support Agent", "AI Voice Agent",
  "AI HR Agent", "AI Receptionist", "AI WhatsApp Agent",
  "AI Knowledge Base", "AI Workflow Automation", "AI Lead Qualification",
  "AI Property Agent", "AI Healthcare Agent", "AI Hospitality Agent",
  "AI Education Agent", "AI Retail Agent", "Custom AI Development",
  "Enterprise AI Platform", "AI Strategy Consulting", "AI Data Analysis",
  "Multilingual AI (Arabic + English)",
];

export const SOURCES = [
  "Website Inquiry", "Google Search", "Google Ads", "SEO",
  "Meta Ads", "LinkedIn", "WhatsApp", "Referral", "Existing Client",
  "Partner", "Exhibition / Event", "Cold Outreach", "Email Campaign",
  "Direct Contact", "Saudi Connection / Wasta", "Repeat Client",
  "Social Media", "PR / Media", "Walk-In",
];

export const COUNTRIES = [
  "KSA", "UAE", "Qatar", "Kuwait", "Bahrain", "Oman",
  "Turkey", "Egypt", "Jordan", "UK", "USA", "Other",
];

export const SALESPEOPLE = [
  "Mohammed A.", "Abdulrhman S.", "Junaid K.", "Sarah M.", "Ahmad T.", "Fatima N.",
];
