export type LeadStage =
  | "Incoming Lead" | "Initial Contact" | "Qualified"
  | "Discovery Meeting" | "Demo Scheduled" | "Proposal Preparation"
  | "Proposal Sent" | "Client Review" | "Negotiation"
  | "Waiting for Approval" | "Legal / Procurement"
  | "Won" | "Lost" | "Follow-Up Later"
  | "Strategic Opportunity" | "Partnership Potential";

export type Priority = "High" | "Medium" | "Low";
export type Source = string;
export type CommType = "call" | "email" | "whatsapp" | "meeting" | "note";

export interface Activity {
  id: string;
  type: "note" | "call" | "email" | "meeting" | "stage_change" | "task" | "whatsapp";
  text: string;
  author: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  done: boolean;
  priority: Priority;
}

export interface Communication {
  id: string;
  type: CommType;
  content: string;
  author: string;
  timestamp: string;
  direction?: "in" | "out";
}

export interface Lead {
  id: string;
  company: string;
  contact: string;
  designation: string;
  phone: string;
  email: string;
  industry: string;
  city: string;
  country: string;
  value: number;
  stage: LeadStage;
  score: number;
  assigned: string;
  source: Source;
  priority: Priority;
  lastContact: string;
  nextFollowUp: string;
  notes: string;
  createdAt: string;
  activities: Activity[];
  tasks: Task[];
  communications: Communication[];
  whatsapp?: string;
  website?: string;
  linkedin?: string;
  address?: string;
  vat?: string;
  cr?: string;
  services?: string[];
  urgency?: "Critical" | "High" | "Medium" | "Low";
  temperature?: "Hot" | "Warm" | "Cold";
  vip?: boolean;
  competitor?: string;
  decisionMakerIdentified?: boolean;
  branches?: number;
  expansionPotential?: boolean;
  expectedCloseDate?: string;
}

export interface Notification {
  id: string;
  type: "lead" | "proposal" | "task" | "payment" | "meeting" | "system";
  title: string;
  body: string;
  read: boolean;
  timestamp: string;
  leadId?: string;
}

// ── Role Management ──────────────────────────────────────────────────────────
export type RoleLevel = 1 | 2 | 3 | 4 | 5;
export type AccessScope = "Global" | "Department" | "Assigned Only" | "City-wise";

export interface RolePermissions {
  crm:       { view: boolean; create: boolean; edit: boolean; delete: boolean; export: boolean; assign: boolean; };
  projects:  { view: boolean; create: boolean; edit: boolean; delete: boolean; upload: boolean; };
  team:      { view: boolean; add: boolean; edit: boolean; delete: boolean; roles: boolean; };
  marketing: { view: boolean; create: boolean; edit: boolean; delete: boolean; analytics: boolean; };
  executive: { strategy: boolean; forecasts: boolean; expansion: boolean; };
  settings:  { view: boolean; modify: boolean; api: boolean; };
}

export interface Role {
  id: string;
  name: string;
  department: string;
  description: string;
  level: RoleLevel;
  scope: AccessScope;
  permissions: RolePermissions;
  memberCount: number;
  color: string;
}

// ── Growth Strategy ──────────────────────────────────────────────────────────
export interface TargetIndustry {
  id: string;
  name: string;
  city: string;
  marketSize: string;
  opportunityScore: number;
  competition: "Low" | "Medium" | "High";
  projectedRevenue: string;
  importance: "Critical" | "High" | "Medium";
  manager: string;
  budget: string;
  roi: string;
  status: "Active" | "Planning" | "On Hold";
}

export interface MonthlyGoal {
  id: string;
  month: string;
  leadTarget: number;
  leadActual: number;
  proposalTarget: number;
  proposalActual: number;
  clientTarget: number;
  clientActual: number;
}

export interface StrategyCard {
  id: string;
  title: string;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  category: "Industry" | "Marketing" | "Tech" | "HR" | "Partnership" | "Government" | "Expansion";
  description: string;
  owner: string;
  status: "Planned" | "In Progress" | "Done";
}

export interface Campaign {
  id: string;
  name: string;
  platform: string;
  budget: string;
  audience: string;
  expectedLeads: number;
  conversionRate: string;
  roi: string;
  manager: string;
  status: "Active" | "Planned" | "Ended";
}

export interface ExpansionTarget {
  id: string;
  city: string;
  country: string;
  launchDate: string;
  investment: string;
  readiness: number;
  status: "Planning" | "Active" | "Research";
}

// ── Documents ────────────────────────────────────────────────────────────────
export type DocFolder = "Contracts" | "Proposals" | "Invoices" | "Photos" | "Reports" | "NDAs" | "Other";
export type DocType   = "PDF" | "DOCX" | "PPTX" | "XLSX" | "ZIP" | "JPG" | "PNG" | "MP4" | "Other";

export interface Document {
  id: string;
  name: string;
  type: DocType;
  size: string;
  folder: DocFolder;
  modified: string;
  owner: string;
  tags: string[];
  notes: string;
  createdAt: string;
}

// ── Proposals ────────────────────────────────────────────────────────────────
export type ProposalStatus = "Draft" | "Sent" | "Viewed" | "Negotiation" | "Accepted" | "Rejected";

export interface Proposal {
  id: string;
  client: string;
  service: string;
  status: ProposalStatus;
  sent: string | null;
  viewed: string | null;
  expires: string;
  rep: string;
  views: number;
  value: number;
  notes: string;
  createdAt: string;
}

// ── Virtual Tours ─────────────────────────────────────────────────────────────
export type TourStatus = "Live" | "Pending" | "Expired" | "Paused";
export type TourType   = "Residential" | "Commercial" | "Luxury Tower" | "Retail" | "Corporate" | "Education" | "Hospitality" | "Industrial" | "Government" | "Healthcare" | "Other";

export interface VirtualTour {
  id: string;
  name: string;
  client: string;
  location: string;
  type: TourType;
  status: TourStatus;
  views: number;
  sessions: number;
  lastView: string;
  created: string;
  expiry: string;
  qr: boolean;
  url: string;
  notes: string;
  createdAt: string;
}

// ── Projects ─────────────────────────────────────────────────────────────────
export type ProjectStage =
  | "Planning" | "Discovery" | "Client Approval" | "Resource Allocation"
  | "Production" | "Development" | "QA Testing" | "Internal Review"
  | "Client Review" | "Revision" | "Deployment"
  | "Support & Maintenance" | "Completed" | "Delayed" | "On Hold" | "Critical";

export type ProjectHealth = "Healthy" | "At Risk" | "Delayed" | "Critical" | "Completed";

export interface Project {
  id: string;
  name: string;
  client: string;
  type: string;
  industry: string;
  stage: ProjectStage;
  health: ProjectHealth;
  priority: Priority;
  progress: number;
  startDate: string;
  deadline: string;
  daysRemaining: number;
  team: string[];
  value: number;
  tags: string[];
  description: string;
  createdAt: string;
  activities: Activity[];
  tasks: Task[];
}
