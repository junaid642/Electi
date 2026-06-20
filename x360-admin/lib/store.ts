"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Lead, LeadStage, Activity, Task, Communication, Notification, Proposal, ProposalStatus,
  Role, RolePermissions, TargetIndustry, MonthlyGoal, StrategyCard,
  Campaign, ExpansionTarget, Project, ProjectStage, Document, DocFolder, DocType,
  VirtualTour, TourStatus, TourType,
} from "./types";

const now = () => new Date().toISOString();
const uid = () => Math.random().toString(36).slice(2, 10);

const perms = (l: 1 | 2 | 3 | 4 | 5): RolePermissions => ({
  crm:       { view: true,     create: l <= 4, edit: l <= 4, delete: l <= 3, export: l <= 3, assign: l <= 3 },
  projects:  { view: true,     create: l <= 4, edit: l <= 4, delete: l <= 2, upload: l <= 3 },
  team:      { view: l <= 3,   add: l <= 2,    edit: l <= 2, delete: l <= 1, roles: l <= 1  },
  marketing: { view: l <= 3,   create: l <= 3, edit: l <= 2, delete: l <= 2, analytics: l <= 3 },
  executive: { strategy: l <= 2, forecasts: l <= 2, expansion: l <= 1 },
  settings:  { view: l <= 3,   modify: l <= 1, api: l <= 1 },
});

// ── Seed Leads ────────────────────────────────────────────────────────────────
const INITIAL_LEADS: Lead[] = [
  {
    id: "l1", company: "Saudi Aramco", contact: "Mohammed Al-Rashid", designation: "VP Operations",
    phone: "+966 50 123 4567", whatsapp: "+966 50 123 4567", email: "m.rashid@aramco.com",
    website: "aramco.com", linkedin: "linkedin.com/in/m-rashid",
    industry: "Oil & Gas", city: "Dhahran", country: "KSA",
    value: 2400000, stage: "Negotiation", score: 94,
    assigned: "Ahmad S.", source: "Referral", priority: "High",
    lastContact: "2025-06-08", nextFollowUp: "2025-06-12",
    notes: "Key enterprise client. Interested in full AI suite deployment across 3 divisions.",
    createdAt: "2025-04-01T09:00:00Z",
    vip: true, temperature: "Hot", urgency: "High", decisionMakerIdentified: true,
    branches: 8, expansionPotential: true, expectedCloseDate: "2025-07-01",
    services: ["AI Development", "CRM Development", "Business Intelligence Dashboards"],
    activities: [
      { id: "a1", type: "stage_change", text: "Moved to Negotiation", author: "Ahmad S.", timestamp: "2025-06-08T10:00:00Z" },
      { id: "a2", type: "meeting", text: "Quarterly review meeting held", author: "Ahmad S.", timestamp: "2025-06-05T14:00:00Z" },
    ],
    tasks: [{ id: "t1", title: "Send final contract draft", assignee: "Ahmad S.", dueDate: "2025-06-14", done: false, priority: "High" }],
    communications: [
      { id: "c1", type: "meeting", content: "Reviewed Q2 requirements and demo'd new AI modules", author: "Ahmad S.", timestamp: "2025-06-05T14:00:00Z", direction: "out" },
      { id: "c2", type: "email", content: "Sent proposal v3 with revised pricing", author: "Ahmad S.", timestamp: "2025-06-07T09:00:00Z", direction: "out" },
    ],
  },
  {
    id: "l2", company: "Al-Marai Group", contact: "Fatima Al-Marei", designation: "CEO",
    phone: "+966 50 234 5678", email: "f.marei@almarai.com", industry: "Hospitality",
    city: "Riyadh", country: "KSA", value: 1850000, stage: "Proposal Sent", score: 88,
    assigned: "Sarah M.", source: "LinkedIn", priority: "High",
    lastContact: "2025-06-07", nextFollowUp: "2025-06-13",
    notes: "CEO directly engaged. Proposal sent for Sales AI module integration.",
    createdAt: "2025-04-10T09:00:00Z",
    temperature: "Hot", urgency: "High", decisionMakerIdentified: true, vip: true,
    services: ["AI Development", "SaaS Platform Development"],
    activities: [{ id: "a3", type: "email", text: "Proposal sent via email", author: "Sarah M.", timestamp: "2025-06-07T11:00:00Z" }],
    tasks: [{ id: "t2", title: "Follow up on proposal", assignee: "Sarah M.", dueDate: "2025-06-13", done: false, priority: "High" }],
    communications: [{ id: "c3", type: "email", content: "Proposal document sent. Awaiting feedback.", author: "Sarah M.", timestamp: "2025-06-07T11:00:00Z", direction: "out" }],
  },
  {
    id: "l3", company: "NEOM Corp", contact: "Abdullah Al-Ghamdi", designation: "Head of Digital",
    phone: "+966 50 345 6789", email: "a.ghamdi@neom.com", industry: "Smart Cities",
    city: "NEOM", country: "KSA", value: 3200000, stage: "Qualified", score: 91,
    assigned: "Ahmad S.", source: "Exhibition/Event", priority: "High",
    lastContact: "2025-06-06", nextFollowUp: "2025-06-10",
    notes: "NEOM's largest digital transformation initiative. High budget approval authority.",
    createdAt: "2025-04-15T09:00:00Z",
    temperature: "Hot", urgency: "Critical", decisionMakerIdentified: true, vip: true,
    branches: 12, expansionPotential: true,
    services: ["360 Virtual Tours", "Digital Twins", "AR Experiences", "AI Development"],
    activities: [{ id: "a4", type: "call", text: "Discovery call completed — qualified for enterprise plan", author: "Ahmad S.", timestamp: "2025-06-06T10:00:00Z" }],
    tasks: [{ id: "t3", title: "Prepare custom demo environment", assignee: "Ahmad S.", dueDate: "2025-06-11", done: false, priority: "High" }],
    communications: [{ id: "c4", type: "call", content: "45-min discovery call. Confirmed budget of SAR 3M+.", author: "Ahmad S.", timestamp: "2025-06-06T10:00:00Z", direction: "out" }],
  },
  {
    id: "l4", company: "Aldar Properties", contact: "Khalid Al-Fahad", designation: "CTO",
    phone: "+971 50 456 7890", email: "k.fahad@aldar.ae", industry: "Luxury Real Estate",
    city: "Abu Dhabi", country: "UAE", value: 980000, stage: "Won", score: 97,
    assigned: "Khalid O.", source: "Referral", priority: "Medium",
    lastContact: "2025-06-05", nextFollowUp: "2025-07-01",
    notes: "Deal closed. Implementation phase starting July 2025.",
    createdAt: "2025-03-01T09:00:00Z",
    temperature: "Hot", vip: true, decisionMakerIdentified: true, branches: 3,
    services: ["360 Virtual Tours", "Real Estate Ecosystem"],
    activities: [{ id: "a5", type: "stage_change", text: "Deal closed — Won", author: "Khalid O.", timestamp: "2025-06-05T15:00:00Z" }],
    tasks: [{ id: "t4", title: "Schedule onboarding session", assignee: "Khalid O.", dueDate: "2025-07-01", done: false, priority: "Medium" }],
    communications: [{ id: "c5", type: "email", content: "Contract signed. Onboarding scheduled.", author: "Khalid O.", timestamp: "2025-06-05T15:00:00Z", direction: "out" }],
  },
  {
    id: "l5", company: "Olayan Group", contact: "Sara Al-Olayan", designation: "Managing Director",
    phone: "+966 50 567 8901", email: "s.olayan@olayan.com", industry: "Retail",
    city: "Riyadh", country: "KSA", value: 720000, stage: "Discovery Meeting", score: 76,
    assigned: "Fatima G.", source: "Website Inquiry", priority: "Medium",
    lastContact: "2025-06-04", nextFollowUp: "2025-06-11",
    notes: "Product demo scheduled for June 11. Key stakeholders attending.",
    createdAt: "2025-05-01T09:00:00Z",
    temperature: "Warm", urgency: "Medium", branches: 5,
    services: ["360 Virtual Tours", "Website Development"],
    activities: [{ id: "a6", type: "meeting", text: "Demo meeting booked for June 11", author: "Fatima G.", timestamp: "2025-06-04T09:00:00Z" }],
    tasks: [{ id: "t5", title: "Prepare retail-focused demo", assignee: "Fatima G.", dueDate: "2025-06-10", done: false, priority: "Medium" }],
    communications: [{ id: "c6", type: "whatsapp", content: "Confirmed meeting for June 11 at 10am", author: "Fatima G.", timestamp: "2025-06-04T09:00:00Z", direction: "out" }],
  },
  {
    id: "l6", company: "Al-Futtaim Group", contact: "Ahmed Al-Futtaim", designation: "Head of IT",
    phone: "+971 50 678 9012", email: "a.futtaim@alfuttaim.ae", industry: "Corporate Offices",
    city: "Dubai", country: "UAE", value: 540000, stage: "Initial Contact", score: 65,
    assigned: "Sarah M.", source: "Cold Calling", priority: "Low",
    lastContact: "2025-06-03", nextFollowUp: "2025-06-15",
    notes: "Initial contact made. Interested but budget approval needed.",
    createdAt: "2025-05-10T09:00:00Z",
    temperature: "Warm", urgency: "Low",
    services: ["CRM Development", "AI Chatbots"],
    activities: [{ id: "a7", type: "call", text: "Introduction call — 30 min. Positive response.", author: "Sarah M.", timestamp: "2025-06-03T11:00:00Z" }],
    tasks: [{ id: "t6", title: "Send product brochure", assignee: "Sarah M.", dueDate: "2025-06-15", done: true, priority: "Low" }],
    communications: [{ id: "c7", type: "call", content: "Introduction call. Explained platform capabilities.", author: "Sarah M.", timestamp: "2025-06-03T11:00:00Z", direction: "out" }],
  },
  {
    id: "l7", company: "Retal Urban Dev.", contact: "Omar Al-Harbi", designation: "Project Director",
    phone: "+966 50 789 0123", email: "o.harbi@retal.com", industry: "Real Estate",
    city: "Riyadh", country: "KSA", value: 1600000, stage: "Incoming Lead", score: 58,
    assigned: "Ahmad S.", source: "Website Inquiry", priority: "Medium",
    lastContact: "2025-06-02", nextFollowUp: "2025-06-09",
    notes: "Inbound lead via website. Submitted contact form for construction module.",
    createdAt: "2025-06-02T09:00:00Z",
    temperature: "Cold",
    services: ["360 Virtual Tours", "Drone Documentation"],
    activities: [{ id: "a8", type: "note", text: "Inbound lead added to system", author: "System", timestamp: "2025-06-02T08:00:00Z" }],
    tasks: [{ id: "t7", title: "Initial outreach call", assignee: "Ahmad S.", dueDate: "2025-06-09", done: false, priority: "Medium" }],
    communications: [],
  },
  {
    id: "l8", company: "Seha Health", contact: "Layla Al-Mansoori", designation: "COO",
    phone: "+971 50 890 1234", email: "l.mansoori@seha.ae", industry: "Healthcare",
    city: "Jeddah", country: "UAE", value: 890000, stage: "Lost", score: 30,
    assigned: "Khalid O.", source: "Partner", priority: "Low",
    lastContact: "2025-06-01", nextFollowUp: "",
    notes: "Lost to competitor. Budget constraints cited. Follow up in Q4.",
    createdAt: "2025-03-15T09:00:00Z", competitor: "SAP",
    services: ["ERP Systems", "AI Development"],
    activities: [{ id: "a9", type: "stage_change", text: "Marked as Lost — competitor chosen", author: "Khalid O.", timestamp: "2025-06-01T14:00:00Z" }],
    tasks: [],
    communications: [{ id: "c8", type: "email", content: "Thank you for considering us. We'd love to reconnect in Q4.", author: "Khalid O.", timestamp: "2025-06-01T14:00:00Z", direction: "out" }],
  },
  {
    id: "l9", company: "Emirates NBD", contact: "Mariam Al-Mazrouei", designation: "Head of Ops",
    phone: "+971 50 901 2345", email: "m.mazrouei@emiratesnbd.com", industry: "Corporate Offices",
    city: "Dubai", country: "UAE", value: 1200000, stage: "Negotiation", score: 85,
    assigned: "Fatima G.", source: "LinkedIn", priority: "High",
    lastContact: "2025-05-31", nextFollowUp: "2025-06-10",
    notes: "Pricing negotiation in progress. Finance module focus.",
    createdAt: "2025-04-20T09:00:00Z",
    temperature: "Hot", urgency: "High", decisionMakerIdentified: true,
    services: ["SaaS Platform Development", "AI Development", "Custom Software Development"],
    activities: [{ id: "a10", type: "note", text: "Counter-proposal submitted", author: "Fatima G.", timestamp: "2025-05-31T16:00:00Z" }],
    tasks: [{ id: "t8", title: "Address legal review feedback", assignee: "Fatima G.", dueDate: "2025-06-10", done: false, priority: "High" }],
    communications: [{ id: "c9", type: "email", content: "Counter-proposal sent with revised SLA terms.", author: "Fatima G.", timestamp: "2025-05-31T16:00:00Z", direction: "out" }],
  },
  {
    id: "l10", company: "Misk Foundation", contact: "Tariq Al-Dosari", designation: "Tech Director",
    phone: "+966 50 012 3456", email: "t.dosari@misk.org", industry: "Education",
    city: "Riyadh", country: "KSA", value: 680000, stage: "Qualified", score: 72,
    assigned: "Sarah M.", source: "Exhibition/Event", priority: "Medium",
    lastContact: "2025-05-30", nextFollowUp: "2025-06-12",
    notes: "Met at Saudi Vision 2030 summit. Educational AI tools interest.",
    createdAt: "2025-05-20T09:00:00Z",
    temperature: "Warm", branches: 3,
    services: ["AI Development", "Mobile App Development", "Website Development"],
    activities: [{ id: "a11", type: "meeting", text: "Discovery meeting at Vision 2030 Summit", author: "Sarah M.", timestamp: "2025-05-30T10:00:00Z" }],
    tasks: [{ id: "t9", title: "Send education sector case studies", assignee: "Sarah M.", dueDate: "2025-06-12", done: false, priority: "Medium" }],
    communications: [{ id: "c10", type: "meeting", content: "30-min meeting at summit. Explored ed-tech AI applications.", author: "Sarah M.", timestamp: "2025-05-30T10:00:00Z", direction: "out" }],
  },
  {
    id: "l11", company: "Dar Al Arkan", contact: "Faisal Al-Rasheed", designation: "Sales Director",
    phone: "+966 50 111 2222", email: "f.rasheed@daralarkan.com", industry: "Luxury Real Estate",
    city: "Riyadh", country: "KSA", value: 1450000, stage: "Incoming Lead", score: 62,
    assigned: "Ahmad S.", source: "Referral", priority: "Medium",
    lastContact: "2025-06-01", nextFollowUp: "2025-06-10",
    notes: "Referred by Aldar Properties. Real estate sales module interest.",
    createdAt: "2025-06-01T09:00:00Z",
    temperature: "Warm",
    services: ["Real Estate Ecosystem", "360 Virtual Tours", "Lead Management System"],
    activities: [{ id: "a12", type: "note", text: "Referred by Aldar Properties — added to pipeline", author: "System", timestamp: "2025-06-01T08:00:00Z" }],
    tasks: [{ id: "t10", title: "Initial discovery call", assignee: "Ahmad S.", dueDate: "2025-06-10", done: false, priority: "Medium" }],
    communications: [],
  },
  {
    id: "l12", company: "STC Solutions", contact: "Hessa Al-Qasimi", designation: "VP Technology",
    phone: "+966 50 333 4444", email: "h.qasimi@stc.com", industry: "Telecom",
    city: "Riyadh", country: "KSA", value: 2800000, stage: "Discovery Meeting", score: 83,
    assigned: "Fatima G.", source: "LinkedIn", priority: "High",
    lastContact: "2025-06-06", nextFollowUp: "2025-06-13",
    notes: "STC enterprise deal. Meeting scheduled with C-suite on June 13.",
    createdAt: "2025-05-05T09:00:00Z",
    temperature: "Hot", urgency: "High", vip: true, decisionMakerIdentified: true,
    services: ["SaaS Platform Development", "AI Development", "API Development"],
    activities: [{ id: "a13", type: "meeting", text: "C-suite meeting confirmed for June 13", author: "Fatima G.", timestamp: "2025-06-06T09:00:00Z" }],
    tasks: [{ id: "t11", title: "Prepare executive deck", assignee: "Fatima G.", dueDate: "2025-06-12", done: false, priority: "High" }],
    communications: [{ id: "c11", type: "email", content: "Meeting confirmed for June 13 at STC HQ.", author: "Fatima G.", timestamp: "2025-06-06T09:00:00Z", direction: "out" }],
  },
  {
    id: "l13", company: "KFSHRC Hospital", contact: "Dr. Layla Al-Mansouri", designation: "Chief Digital Officer",
    phone: "+966 50 555 1234", email: "l.mansouri@kfshrc.org", industry: "Hospitals",
    city: "Riyadh", country: "KSA", value: 890000, stage: "Follow-Up Later", score: 67,
    assigned: "Khalid O.", source: "Exhibition/Event", priority: "Medium",
    lastContact: "2025-06-04", nextFollowUp: "2025-06-14",
    notes: "Met at GITEX. Sent initial deck. Awaiting budget approval from board.",
    createdAt: "2025-05-15T09:00:00Z",
    temperature: "Warm", branches: 6,
    services: ["AI Development", "Custom Software Development", "AI Chatbots"],
    activities: [
      { id: "a14", type: "email", text: "Follow-up email sent with proposal deck", author: "Khalid O.", timestamp: "2025-06-04T09:00:00Z" },
      { id: "a15", type: "stage_change", text: "Moved to Follow-Up Later", author: "Khalid O.", timestamp: "2025-06-04T09:05:00Z" },
    ],
    tasks: [{ id: "t12", title: "Call Dr. Layla re: board approval timeline", assignee: "Khalid O.", dueDate: "2025-06-14", done: false, priority: "Medium" }],
    communications: [{ id: "c12", type: "email", content: "Sent healthcare AI automation proposal with ROI breakdown.", author: "Khalid O.", timestamp: "2025-06-04T09:00:00Z", direction: "out" }],
  },
  {
    id: "l14", company: "Gulf Petrochem", contact: "Samir Al-Hajri", designation: "GM Operations",
    phone: "+971 50 678 9012", email: "s.hajri@gulfpetrochem.com", industry: "Oil & Gas",
    city: "Dubai", country: "UAE", value: 1750000, stage: "Client Review", score: 74,
    assigned: "Ahmad S.", source: "Referral", priority: "High",
    lastContact: "2025-06-03", nextFollowUp: "2025-06-16",
    notes: "Referred by Saudi Aramco. Proposal revised twice. Very close to signing.",
    createdAt: "2025-04-20T09:00:00Z",
    temperature: "Hot", urgency: "High", competitor: "Oracle", decisionMakerIdentified: true,
    services: ["ERP Systems", "SAP Services", "Automation Systems"],
    activities: [
      { id: "a16", type: "call", text: "15-min call — revised pricing discussed", author: "Ahmad S.", timestamp: "2025-06-03T11:00:00Z" },
      { id: "a17", type: "stage_change", text: "Moved to Client Review", author: "Ahmad S.", timestamp: "2025-06-03T11:10:00Z" },
    ],
    tasks: [
      { id: "t13", title: "Send revised proposal v3", assignee: "Ahmad S.", dueDate: "2025-06-12", done: false, priority: "High" },
      { id: "t14", title: "Schedule closing call", assignee: "Ahmad S.", dueDate: "2025-06-16", done: false, priority: "High" },
    ],
    communications: [{ id: "c13", type: "call", content: "Discussed revised pricing. Samir confirmed interest.", author: "Ahmad S.", timestamp: "2025-06-03T11:00:00Z", direction: "out" }],
  },
  {
    id: "l15", company: "Rotana Hotels", contact: "Nadia Al-Farsi", designation: "VP Revenue",
    phone: "+971 50 321 5678", email: "n.farsi@rotana.com", industry: "Hotels",
    city: "Dubai", country: "UAE", value: 640000, stage: "Waiting for Approval", score: 81,
    assigned: "Sarah M.", source: "LinkedIn", priority: "High",
    lastContact: "2025-06-07", nextFollowUp: "2025-06-11",
    notes: "Final stage before deal closes. Contract draft sent. Procurement reviewing.",
    createdAt: "2025-04-10T09:00:00Z",
    temperature: "Hot", urgency: "Critical", decisionMakerIdentified: true, branches: 12,
    services: ["360 Virtual Tours", "VR Experiences", "Property Management System"],
    activities: [
      { id: "a18", type: "email", text: "Contract draft sent to procurement team", author: "Sarah M.", timestamp: "2025-06-07T10:00:00Z" },
      { id: "a19", type: "stage_change", text: "Moved to Waiting for Approval — contract under review", author: "Sarah M.", timestamp: "2025-06-07T10:05:00Z" },
    ],
    tasks: [{ id: "t15", title: "Follow up on contract review status", assignee: "Sarah M.", dueDate: "2025-06-11", done: false, priority: "High" }],
    communications: [
      { id: "c14", type: "email", content: "Contract draft sent. Awaiting procurement sign-off.", author: "Sarah M.", timestamp: "2025-06-07T10:00:00Z", direction: "out" },
      { id: "c15", type: "whatsapp", content: "Quick check-in: is the team reviewing the contract this week?", author: "Sarah M.", timestamp: "2025-06-08T09:00:00Z", direction: "out" },
    ],
  },
];

// ── Seed Projects ─────────────────────────────────────────────────────────────
const INITIAL_PROJECTS: Project[] = [
  {
    id: "p1", name: "Saudi Aramco AI Workforce", client: "Saudi Aramco",
    type: "AI Development", industry: "Oil & Gas", stage: "Development",
    health: "Healthy", priority: "High", progress: 68,
    startDate: "2025-04-01", deadline: "2025-07-15", daysRemaining: 36,
    team: ["AS", "SM", "KO"], value: 2400000,
    tags: ["AI Development", "Automation Systems"],
    description: "Full-scale AI workforce automation platform for operations division.",
    createdAt: "2025-04-01T09:00:00Z", activities: [], tasks: [
      { id: "pt1", title: "Complete ML model training", assignee: "Ahmad S.", dueDate: "2025-06-20", done: false, priority: "High" },
      { id: "pt2", title: "API integration with SAP", assignee: "Khalid O.", dueDate: "2025-06-25", done: true, priority: "High" },
    ],
  },
  {
    id: "p2", name: "Al-Marai CRM Implementation", client: "Al-Marai Group",
    type: "CRM", industry: "Hospitality", stage: "QA Testing",
    health: "At Risk", priority: "High", progress: 85,
    startDate: "2025-03-10", deadline: "2025-06-28", daysRemaining: 19,
    team: ["SM", "FG"], value: 1850000,
    tags: ["CRM", "SaaS Platform"],
    description: "Enterprise CRM with sales pipeline and customer intelligence modules.",
    createdAt: "2025-03-10T09:00:00Z", activities: [], tasks: [
      { id: "pt3", title: "Fix data migration bug", assignee: "Sarah M.", dueDate: "2025-06-15", done: false, priority: "High" },
    ],
  },
  {
    id: "p3", name: "NEOM Virtual Tour Suite", client: "NEOM Corp",
    type: "360 Virtual Tour", industry: "Smart Cities", stage: "Planning",
    health: "Healthy", priority: "High", progress: 15,
    startDate: "2025-06-01", deadline: "2025-08-01", daysRemaining: 53,
    team: ["AS", "KO"], value: 3200000,
    tags: ["360 Virtual Tours", "VR Experience", "Digital Twins"],
    description: "Immersive virtual tour ecosystem for NEOM's flagship smart city zones.",
    createdAt: "2025-06-01T09:00:00Z", activities: [], tasks: [
      { id: "pt4", title: "Site survey & drone footage", assignee: "Khalid O.", dueDate: "2025-06-18", done: false, priority: "High" },
    ],
  },
  {
    id: "p4", name: "Olayan Analytics Dashboard", client: "Olayan Group",
    type: "Custom Software", industry: "Retail", stage: "Client Review",
    health: "Healthy", priority: "Medium", progress: 92,
    startDate: "2025-03-20", deadline: "2025-06-20", daysRemaining: 11,
    team: ["FG", "SM"], value: 720000,
    tags: ["Business Intelligence Dashboards", "Custom Software Development"],
    description: "Executive analytics dashboard with retail performance KPIs.",
    createdAt: "2025-03-20T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p5", name: "Retal Drone Documentation", client: "Retal Urban Dev.",
    type: "Drone Documentation", industry: "Real Estate", stage: "Production",
    health: "Delayed", priority: "Medium", progress: 45,
    startDate: "2025-04-15", deadline: "2025-07-30", daysRemaining: 51,
    team: ["KO", "AS"], value: 1600000,
    tags: ["Drone Documentation", "Construction Monitoring"],
    description: "Full site aerial documentation and construction monitoring system.",
    createdAt: "2025-04-15T09:00:00Z", activities: [], tasks: [
      { id: "pt5", title: "Phase 2 drone scan", assignee: "Ahmad S.", dueDate: "2025-06-20", done: false, priority: "High" },
    ],
  },
  {
    id: "p6", name: "Emirates NBD Digital Transform", client: "Emirates NBD",
    type: "AI Development", industry: "Corporate Offices", stage: "Discovery",
    health: "Healthy", priority: "Low", progress: 5,
    startDate: "2025-06-05", deadline: "2025-09-01", daysRemaining: 84,
    team: ["SM"], value: 1200000,
    tags: ["AI Development", "Digital Twins"],
    description: "Digital transformation initiative for operations and customer service.",
    createdAt: "2025-06-05T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p7", name: "Misk Foundation Portal", client: "Misk Foundation",
    type: "Website Development", industry: "Education", stage: "Completed",
    health: "Completed", priority: "Low", progress: 100,
    startDate: "2025-02-01", deadline: "2025-06-01", daysRemaining: 0,
    team: ["FG", "KO"], value: 680000,
    tags: ["Website Development", "Mobile App"],
    description: "Educational portal with AI-driven personalized learning modules.",
    createdAt: "2025-02-01T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p8", name: "Aldar 360 Property Tours", client: "Aldar Properties",
    type: "360 Virtual Tour", industry: "Luxury Real Estate", stage: "Support & Maintenance",
    health: "Completed", priority: "Medium", progress: 100,
    startDate: "2025-01-10", deadline: "2025-05-15", daysRemaining: 0,
    team: ["AS", "SM", "FG"], value: 980000,
    tags: ["360 Virtual Tours", "Real Estate Ecosystem"],
    description: "Interactive 360° property showcasing platform for UAE developments.",
    createdAt: "2025-01-10T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p9", name: "KFSHRC Hospital AI System", client: "KFSHRC",
    type: "AI Development", industry: "Hospitals", stage: "Development",
    health: "At Risk", priority: "High", progress: 38,
    startDate: "2025-05-01", deadline: "2025-07-20", daysRemaining: 41,
    team: ["AS", "FG"], value: 1400000,
    tags: ["AI Development", "Custom Software Development"],
    description: "AI-powered patient intake and clinical workflow automation.",
    createdAt: "2025-05-01T09:00:00Z", activities: [], tasks: [
      { id: "pt6", title: "HIPAA compliance review", assignee: "Fatima G.", dueDate: "2025-06-18", done: false, priority: "High" },
    ],
  },
  {
    id: "p10", name: "STC 5G Digital Platform", client: "STC Solutions",
    type: "SaaS Platform", industry: "Telecom", stage: "Resource Allocation",
    health: "Healthy", priority: "High", progress: 10,
    startDate: "2025-06-08", deadline: "2025-10-01", daysRemaining: 114,
    team: ["SM", "KO"], value: 2800000,
    tags: ["SaaS Platform Development", "API Development"],
    description: "Enterprise SaaS platform for STC's 5G business analytics suite.",
    createdAt: "2025-06-08T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p11", name: "Rotana Hotels VR Experience", client: "Rotana Hotels",
    type: "VR Experience", industry: "Hotels", stage: "Internal Review",
    health: "At Risk", priority: "High", progress: 78,
    startDate: "2025-04-20", deadline: "2025-06-18", daysRemaining: 9,
    team: ["AS", "FG"], value: 640000,
    tags: ["VR Experience", "360 Virtual Tours"],
    description: "Immersive VR hotel room and amenity preview for booking platform.",
    createdAt: "2025-04-20T09:00:00Z", activities: [], tasks: [
      { id: "pt7", title: "VR optimization for mobile", assignee: "Ahmad S.", dueDate: "2025-06-14", done: false, priority: "High" },
    ],
  },
  {
    id: "p12", name: "Gulf Petrochem ERP Integration", client: "Gulf Petrochem",
    type: "ERP", industry: "Oil & Gas", stage: "Client Approval",
    health: "Healthy", priority: "High", progress: 22,
    startDate: "2025-05-25", deadline: "2025-08-25", daysRemaining: 77,
    team: ["KO", "SM"], value: 1750000,
    tags: ["ERP Systems", "SAP Services"],
    description: "Full SAP ERP integration with custom reporting and automation.",
    createdAt: "2025-05-25T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p13", name: "Dar Al Arkan Digital Portal", client: "Dar Al Arkan",
    type: "Website Development", industry: "Luxury Real Estate", stage: "Revision",
    health: "Delayed", priority: "Medium", progress: 70,
    startDate: "2025-04-01", deadline: "2025-06-25", daysRemaining: 16,
    team: ["FG", "AS"], value: 520000,
    tags: ["Website Development", "Real Estate Ecosystem"],
    description: "Premium real estate portal with AI-powered property recommendations.",
    createdAt: "2025-04-01T09:00:00Z", activities: [], tasks: [
      { id: "pt8", title: "Apply client revision feedback", assignee: "Fatima G.", dueDate: "2025-06-14", done: false, priority: "Medium" },
    ],
  },
  {
    id: "p14", name: "Hilton Jeddah Virtual Tour", client: "Hilton Hotels",
    type: "360 Virtual Tour", industry: "Hotels", stage: "Deployment",
    health: "Healthy", priority: "Medium", progress: 95,
    startDate: "2025-04-10", deadline: "2025-06-15", daysRemaining: 6,
    team: ["SM", "KO"], value: 380000,
    tags: ["360 Virtual Tours"],
    description: "Interactive virtual tour of Hilton Jeddah's facilities and suites.",
    createdAt: "2025-04-10T09:00:00Z", activities: [], tasks: [
      { id: "pt9", title: "Final CDN deployment", assignee: "Khalid O.", dueDate: "2025-06-12", done: false, priority: "High" },
    ],
  },
  {
    id: "p15", name: "SABIC Smart Factory IoT", client: "SABIC",
    type: "Custom Software", industry: "Industrial", stage: "On Hold",
    health: "At Risk", priority: "Medium", progress: 30,
    startDate: "2025-03-01", deadline: "2025-08-01", daysRemaining: 53,
    team: ["AS"], value: 2100000,
    tags: ["Automation Systems", "Custom Software Development"],
    description: "IoT-driven smart factory monitoring and predictive maintenance system.",
    createdAt: "2025-03-01T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p16", name: "NEOM AI Innovation Hub", client: "NEOM Corp",
    type: "AI Development", industry: "Smart Cities", stage: "Critical",
    health: "Critical", priority: "High", progress: 55,
    startDate: "2025-02-15", deadline: "2025-06-20", daysRemaining: 11,
    team: ["AS", "SM", "KO", "FG"], value: 4500000,
    tags: ["AI Development", "Digital Twins", "AR Experiences"],
    description: "Critical AI innovation hub platform — board deadline approaching.",
    createdAt: "2025-02-15T09:00:00Z", activities: [], tasks: [
      { id: "pt10", title: "Emergency board demo prep", assignee: "Ahmad S.", dueDate: "2025-06-12", done: false, priority: "High" },
    ],
  },
];

// ── Seed Roles ────────────────────────────────────────────────────────────────
const INITIAL_ROLES: Role[] = [
  { id: "r1", name: "Super Admin",       department: "Executive",    description: "Full system access. Unrestricted control over all modules and data.", level: 1, scope: "Global",          permissions: perms(1), memberCount: 1, color: "text-purple-400" },
  { id: "r2", name: "CEO",               department: "Executive",    description: "Executive-level access with strategic and financial visibility.",     level: 1, scope: "Global",          permissions: perms(1), memberCount: 1, color: "text-amber-400"  },
  { id: "r3", name: "Operations Director",department: "Operations",  description: "Cross-department oversight. Can manage teams, projects, and reports.", level: 2, scope: "Global",        permissions: perms(2), memberCount: 2, color: "text-blue-400"   },
  { id: "r4", name: "Sales Manager",     department: "Sales",        description: "Full CRM access, lead assignment, and sales analytics.",              level: 3, scope: "Department",     permissions: perms(3), memberCount: 3, color: "text-cyan-400"   },
  { id: "r5", name: "Marketing Manager", department: "Marketing",    description: "Campaign management, analytics access, and content creation.",        level: 3, scope: "Department",     permissions: perms(3), memberCount: 2, color: "text-green-400"  },
  { id: "r6", name: "Team Lead",         department: "Sales",        description: "Leads management for assigned team. View and edit assigned records.", level: 4, scope: "Assigned Only",  permissions: perms(4), memberCount: 4, color: "text-sky-400"    },
  { id: "r7", name: "Sales Executive",   department: "Sales",        description: "Create and manage assigned leads. Standard CRM operations.",         level: 5, scope: "Assigned Only",  permissions: perms(5), memberCount: 6, color: "text-white"      },
  { id: "r8", name: "External Partner",  department: "Partner",      description: "Limited view access for referral partners and contractors.",          level: 5, scope: "Assigned Only",  permissions: { ...perms(5), crm: { view: false, create: false, edit: false, delete: false, export: false, assign: false } }, memberCount: 3, color: "text-white/50" },
];

// ── Seed Strategy ─────────────────────────────────────────────────────────────
const INITIAL_TARGET_INDUSTRIES: TargetIndustry[] = [
  { id: "ti1", name: "Luxury Real Estate",       city: "Riyadh",   marketSize: "SAR 45B", opportunityScore: 94, competition: "Medium", projectedRevenue: "SAR 8.2M",  importance: "Critical", manager: "Ahmad S.",   budget: "SAR 180K",  roi: "4,455%", status: "Active"   },
  { id: "ti2", name: "Construction Monitoring",  city: "NEOM",     marketSize: "SAR 120B",opportunityScore: 91, competition: "Low",    projectedRevenue: "SAR 14.5M", importance: "Critical", manager: "Fatima G.", budget: "SAR 250K",  roi: "5,700%", status: "Active"   },
  { id: "ti3", name: "Hotels & Hospitality",     city: "Jeddah",   marketSize: "SAR 28B", opportunityScore: 85, competition: "Medium", projectedRevenue: "SAR 5.8M",  importance: "High",     manager: "Sarah M.",  budget: "SAR 120K",  roi: "4,733%", status: "Active"   },
  { id: "ti4", name: "Healthcare AI",            city: "Riyadh",   marketSize: "SAR 55B", opportunityScore: 88, competition: "Low",    projectedRevenue: "SAR 9.4M",  importance: "High",     manager: "Khalid O.", budget: "SAR 160K",  roi: "5,775%", status: "Planning" },
  { id: "ti5", name: "Smart Cities / Gov",       city: "Riyadh",   marketSize: "SAR 200B",opportunityScore: 96, competition: "Low",    projectedRevenue: "SAR 22M",   importance: "Critical", manager: "Ahmad S.",   budget: "SAR 400K",  roi: "5,400%", status: "Active"   },
  { id: "ti6", name: "Oil & Gas Automation",     city: "Dhahran",  marketSize: "SAR 80B", opportunityScore: 82, competition: "High",   projectedRevenue: "SAR 11M",   importance: "High",     manager: "Fatima G.", budget: "SAR 200K",  roi: "5,400%", status: "Planning" },
  { id: "ti7", name: "Retail & E-commerce",      city: "Riyadh",   marketSize: "SAR 35B", opportunityScore: 74, competition: "High",   projectedRevenue: "SAR 4.2M",  importance: "Medium",   manager: "Sarah M.",  budget: "SAR 90K",   roi: "4,567%", status: "On Hold"  },
  { id: "ti8", name: "Education Technology",     city: "Riyadh",   marketSize: "SAR 18B", opportunityScore: 79, competition: "Medium", projectedRevenue: "SAR 3.8M",  importance: "Medium",   manager: "Khalid O.", budget: "SAR 80K",   roi: "4,650%", status: "Planning" },
];

const INITIAL_MONTHLY_GOALS: MonthlyGoal[] = [
  { id: "mg1", month: "January 2025",  leadTarget: 40, leadActual: 38, proposalTarget: 15, proposalActual: 14, clientTarget: 5, clientActual: 4 },
  { id: "mg2", month: "February 2025", leadTarget: 45, leadActual: 48, proposalTarget: 18, proposalActual: 19, clientTarget: 6, clientActual: 7 },
  { id: "mg3", month: "March 2025",    leadTarget: 50, leadActual: 52, proposalTarget: 20, proposalActual: 22, clientTarget: 7, clientActual: 7 },
  { id: "mg4", month: "April 2025",    leadTarget: 55, leadActual: 49, proposalTarget: 22, proposalActual: 18, clientTarget: 8, clientActual: 6 },
  { id: "mg5", month: "May 2025",      leadTarget: 60, leadActual: 61, proposalTarget: 24, proposalActual: 25, clientTarget: 8, clientActual: 9 },
  { id: "mg6", month: "June 2025",     leadTarget: 65, leadActual: 34, proposalTarget: 26, proposalActual: 15, clientTarget: 9, clientActual: 4 },
];

const INITIAL_STRATEGY_CARDS: StrategyCard[] = [
  { id: "sc1", title: "Luxury Real Estate Blitz — Riyadh",   quarter: "Q1", category: "Industry",    description: "Target top 20 luxury real estate developers in Riyadh for 360 tours and digital twin packages.", owner: "Ahmad S.",   status: "Done"       },
  { id: "sc2", title: "NEOM Partnership Locked",             quarter: "Q1", category: "Partnership", description: "Secure NEOM Corp as anchor client for smart city digital documentation.", owner: "Ahmad S.",   status: "Done"       },
  { id: "sc3", title: "LinkedIn Demand Generation",          quarter: "Q2", category: "Marketing",   description: "Launch targeted LinkedIn campaign for GCC C-suite decision makers.", owner: "Sarah M.",  status: "In Progress"},
  { id: "sc4", title: "AI Product Launch — Healthcare",      quarter: "Q2", category: "Tech",        description: "Launch X360 AI healthcare module targeting KSA hospitals.", owner: "Fatima G.", status: "In Progress"},
  { id: "sc5", title: "UAE Market Entry — Dubai",            quarter: "Q3", category: "Expansion",   description: "Open Dubai operations hub. Target hospitality and real estate sector.", owner: "Khalid O.", status: "Planned"    },
  { id: "sc6", title: "Government Sector Push",              quarter: "Q3", category: "Government",  description: "Attend GITEX Government, tender for 3 Saudi ministry digital transformation projects.", owner: "Ahmad S.",   status: "Planned"    },
  { id: "sc7", title: "Hire 5 Senior Developers",            quarter: "Q4", category: "HR",          description: "Scale tech team for SaaS platform and AI product roadmap delivery.", owner: "Fatima G.", status: "Planned"    },
  { id: "sc8", title: "SaaS Platform Public Launch",         quarter: "Q4", category: "Tech",        description: "Public launch of X360 SaaS platform with self-serve onboarding.", owner: "Khalid O.", status: "Planned"    },
];

const INITIAL_CAMPAIGNS: Campaign[] = [
  { id: "cam1", name: "Real Estate Leads Q2",    platform: "LinkedIn",            budget: "SAR 45K",  audience: "Real Estate Directors — KSA", expectedLeads: 80,  conversionRate: "12%", roi: "680%",  manager: "Sarah M.",  status: "Active"  },
  { id: "cam2", name: "NEOM Smart City Outreach",platform: "Direct Contact",      budget: "SAR 20K",  audience: "Gov & Smart City Heads",       expectedLeads: 25,  conversionRate: "28%", roi: "1,200%",manager: "Ahmad S.",  status: "Active"  },
  { id: "cam3", name: "Google AI/Tech Ads",       platform: "Google Ads",          budget: "SAR 60K",  audience: "Tech Decision Makers — GCC",  expectedLeads: 120, conversionRate: "8%",  roi: "420%",  manager: "Fatima G.", status: "Active"  },
  { id: "cam4", name: "GITEX Exhibition 2025",    platform: "Exhibitions",         budget: "SAR 150K", audience: "Enterprise CXO — GCC",        expectedLeads: 200, conversionRate: "15%", roi: "900%",  manager: "Khalid O.", status: "Planned" },
  { id: "cam5", name: "Meta Hospitality Retarget",platform: "Meta Ads",            budget: "SAR 30K",  audience: "Hotel GMs — Dubai & Jeddah",  expectedLeads: 60,  conversionRate: "10%", roi: "540%",  manager: "Sarah M.",  status: "Ended"   },
];

const INITIAL_EXPANSION_TARGETS: ExpansionTarget[] = [
  { id: "ex1", city: "Riyadh",  country: "KSA", launchDate: "Active",     investment: "SAR 2M",   readiness: 100, status: "Active"   },
  { id: "ex2", city: "Jeddah",  country: "KSA", launchDate: "Q3 2025",    investment: "SAR 800K", readiness: 65,  status: "Planning" },
  { id: "ex3", city: "NEOM",    country: "KSA", launchDate: "Q3 2025",    investment: "SAR 1.2M", readiness: 55,  status: "Planning" },
  { id: "ex4", city: "Dubai",   country: "UAE", launchDate: "Q4 2025",    investment: "SAR 3M",   readiness: 40,  status: "Research" },
  { id: "ex5", city: "Abu Dhabi",country: "UAE", launchDate: "Q1 2026",   investment: "SAR 2.5M", readiness: 25,  status: "Research" },
  { id: "ex6", city: "Istanbul",country: "Turkey", launchDate: "Q2 2026", investment: "SAR 4M",   readiness: 15,  status: "Research" },
];

// ── Seed Notifications ────────────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "lead",     title: "New inbound lead",     body: "Retal Urban Dev. submitted a contact form",          read: false, timestamp: "2025-06-09T08:00:00Z", leadId: "l7"  },
  { id: "n2", type: "proposal", title: "Proposal viewed",      body: "Al-Marai Group viewed your proposal",                 read: false, timestamp: "2025-06-09T07:30:00Z", leadId: "l2"  },
  { id: "n3", type: "task",     title: "Task overdue",         body: "Initial outreach call for Retal Urban Dev.",          read: false, timestamp: "2025-06-09T07:00:00Z"                },
  { id: "n4", type: "meeting",  title: "Meeting in 2 hours",   body: "Olayan Group demo — June 11 at 10am",                 read: true,  timestamp: "2025-06-09T06:00:00Z"                },
  { id: "n5", type: "system",   title: "Critical project alert", body: "NEOM AI Innovation Hub deadline in 11 days",        read: false, timestamp: "2025-06-09T05:30:00Z"                },
];

// ── Store Interface ───────────────────────────────────────────────────────────
interface X360Store {
  leads: Lead[];
  projects: Project[];
  roles: Role[];
  targetIndustries: TargetIndustry[];
  monthlyGoals: MonthlyGoal[];
  strategyCards: StrategyCard[];
  campaigns: Campaign[];
  expansionTargets: ExpansionTarget[];
  notifications: Notification[];

  // Lead CRUD
  addLead: (data: Omit<Lead, "id" | "createdAt" | "activities" | "tasks" | "communications">) => string;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  moveLead: (id: string, stage: LeadStage) => void;
  addActivity: (leadId: string, act: Omit<Activity, "id" | "timestamp">) => void;
  addTask: (leadId: string, task: Omit<Task, "id">) => void;
  toggleTask: (leadId: string, taskId: string) => void;
  deleteTask: (leadId: string, taskId: string) => void;
  addCommunication: (leadId: string, comm: Omit<Communication, "id" | "timestamp">) => void;
  updateNotes: (leadId: string, notes: string) => void;

  // Project CRUD
  addProject: (data: Omit<Project, "id" | "createdAt" | "activities" | "tasks">) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  moveProject: (id: string, stage: ProjectStage) => void;
  toggleProjectTask: (projectId: string, taskId: string) => void;

  // Roles
  addRole: (role: Omit<Role, "id">) => void;
  updateRole: (id: string, updates: Partial<Role>) => void;
  deleteRole: (id: string) => void;

  // Stage label overrides (display only — stage keys stay the same)
  leadStageLabels: Record<string, string>;
  projectStageLabels: Record<string, string>;
  renameLeadStage: (stage: string, label: string) => void;
  renameProjectStage: (stage: string, label: string) => void;

  // Strategy
  addTargetIndustry: (item: Omit<TargetIndustry, "id">) => void;
  updateTargetIndustry: (id: string, updates: Partial<TargetIndustry>) => void;
  deleteTargetIndustry: (id: string) => void;
  addStrategyCard: (card: Omit<StrategyCard, "id">) => void;
  updateStrategyCard: (id: string, updates: Partial<StrategyCard>) => void;
  deleteStrategyCard: (id: string) => void;
  addCampaign: (campaign: Omit<Campaign, "id">) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  addMonthlyGoal: (goal: Omit<MonthlyGoal, "id">) => void;
  addExpansionTarget: (target: Omit<ExpansionTarget, "id">) => void;

  // Virtual Tours
  virtualTours: VirtualTour[];
  addVirtualTour: (t: Omit<VirtualTour, "id" | "createdAt" | "views" | "sessions" | "lastView">) => void;
  updateVirtualTour: (id: string, updates: Partial<VirtualTour>) => void;
  deleteVirtualTour: (id: string) => void;

  // Documents
  documents: Document[];
  addDocument: (doc: Omit<Document, "id" | "createdAt">) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;

  // Proposals
  proposals: Proposal[];
  addProposal: (p: Omit<Proposal, "id" | "createdAt" | "views">) => void;
  updateProposal: (id: string, updates: Partial<Proposal>) => void;
  deleteProposal: (id: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  clearNotification: (id: string) => void;
}

const INITIAL_VIRTUAL_TOURS: VirtualTour[] = [
  { id: "vt01", name: "Al-Nakheel Compound",     client: "Retal Urban Dev.",  location: "Riyadh",    type: "Residential",  status: "Live",    views: 12847, sessions: 4201, lastView: "3m ago",  created: "2025-04-10", expiry: "2026-04-10", qr: true,  url: "https://tour.x360.sa/al-nakheel",     notes: "Flagship residential project. QR codes distributed at sales centre.", createdAt: "2025-04-10T08:00:00Z" },
  { id: "vt02", name: "NEOM Visitor Experience",  client: "NEOM Corp",         location: "NEOM",      type: "Commercial",   status: "Live",    views: 34210, sessions: 9800, lastView: "1m ago",  created: "2025-03-20", expiry: "2026-03-20", qr: true,  url: "https://tour.x360.sa/neom",           notes: "High-traffic tour. Shared at global investor events.",               createdAt: "2025-03-20T10:00:00Z" },
  { id: "vt03", name: "Aldar Pearl Tower",        client: "Aldar Properties",  location: "Abu Dhabi", type: "Luxury Tower", status: "Live",    views: 8920,  sessions: 3100, lastView: "12m ago", created: "2025-05-01", expiry: "2026-05-01", qr: false, url: "https://tour.x360.sa/aldar-pearl",    notes: "Luxury residential. Embedded on Aldar website.",                     createdAt: "2025-05-01T09:30:00Z" },
  { id: "vt04", name: "Olayan Retail Hub",        client: "Olayan Group",      location: "Jeddah",    type: "Retail",       status: "Pending", views: 0,     sessions: 0,    lastView: "—",       created: "2025-06-05", expiry: "2026-06-05", qr: false, url: "",                                    notes: "Awaiting final walkthrough footage upload.",                         createdAt: "2025-06-05T11:00:00Z" },
  { id: "vt05", name: "Saudi Aramco HQ Lobby",   client: "Saudi Aramco",      location: "Dhahran",   type: "Corporate",    status: "Live",    views: 5340,  sessions: 1890, lastView: "45m ago", created: "2025-02-14", expiry: "2025-12-31", qr: true,  url: "https://tour.x360.sa/aramco-hq",      notes: "Corporate visitor tour. Renew before Dec 31.",                       createdAt: "2025-02-14T08:00:00Z" },
  { id: "vt06", name: "Misk Foundation Campus",  client: "Misk Foundation",   location: "Riyadh",    type: "Education",    status: "Expired", views: 22100, sessions: 7600, lastView: "3d ago",  created: "2024-06-01", expiry: "2025-06-01", qr: false, url: "https://tour.x360.sa/misk",           notes: "Expired. Client may request renewal for Q3 2025.",                   createdAt: "2024-06-01T10:00:00Z" },
];

const INITIAL_DOCUMENTS: Document[] = [
  { id: "d01", name: "Saudi Aramco — Master Contract Q2",    type: "PDF",  size: "4.2 MB",  folder: "Contracts", modified: "2025-06-08", owner: "Ahmad S.",  tags: ["contract","aramco","q2"],        notes: "Executed copy. Signed by both parties.", createdAt: "2025-06-08T09:00:00Z" },
  { id: "d02", name: "Al-Marai CRM Proposal v3",            type: "PDF",  size: "2.8 MB",  folder: "Proposals", modified: "2025-06-07", owner: "Sarah M.",  tags: ["proposal","crm","al-marai"],    notes: "Final revision after client feedback.",  createdAt: "2025-06-07T11:30:00Z" },
  { id: "d03", name: "NEOM Virtual Tour Scope",             type: "DOCX", size: "1.1 MB",  folder: "Proposals", modified: "2025-06-06", owner: "Ahmad S.",  tags: ["neom","tour","scope"],          notes: "Awaiting legal clearance.",              createdAt: "2025-06-06T10:00:00Z" },
  { id: "d04", name: "INV-2094 Saudi Aramco",               type: "PDF",  size: "0.4 MB",  folder: "Invoices",  modified: "2025-06-05", owner: "Mariam J.", tags: ["invoice","aramco"],             notes: "",                                       createdAt: "2025-06-05T14:00:00Z" },
  { id: "d05", name: "Al-Nakheel Tower Drone Report June",  type: "PDF",  size: "18.4 MB", folder: "Reports",   modified: "2025-06-04", owner: "Khalid O.", tags: ["drone","construction","report"], notes: "Includes 3D mapping data.",              createdAt: "2025-06-04T08:00:00Z" },
  { id: "d06", name: "Olayan Group NDA 2025",               type: "PDF",  size: "0.6 MB",  folder: "NDAs",      modified: "2025-06-03", owner: "Ahmad S.",  tags: ["nda","olayan","legal"],         notes: "Mutual NDA. Valid until Dec 2026.",      createdAt: "2025-06-03T16:00:00Z" },
  { id: "d07", name: "Site Photos — Al-Nakheel B Level 18", type: "ZIP",  size: "342 MB",  folder: "Photos",    modified: "2025-06-02", owner: "Tariq D.",  tags: ["photos","construction","b18"],  notes: "Drone + ground photos. 120 files.",      createdAt: "2025-06-02T13:00:00Z" },
  { id: "d08", name: "X360 Q2 2025 Performance Report",     type: "PPTX", size: "8.6 MB",  folder: "Reports",   modified: "2025-06-01", owner: "Layla M.",  tags: ["report","q2","performance"],    notes: "Presented to board on June 5.",          createdAt: "2025-06-01T10:30:00Z" },
];

const INITIAL_PROPOSALS: Proposal[] = [
  { id: "P-1048", client: "Saudi Aramco",     service: "AI Workforce Automation + Construction Monitoring", status: "Negotiation", sent: "2025-06-01", viewed: "2025-06-02", expires: "2025-06-30", rep: "Ahmad S.",   views: 12, value: 850000,  notes: "Client requesting revised SLA terms. Follow up by June 15.", createdAt: "2025-05-28T10:00:00Z" },
  { id: "P-1047", client: "Al-Marai Group",   service: "Full CRM + WhatsApp Automation Suite",             status: "Accepted",    sent: "2025-05-28", viewed: "2025-05-29", expires: "2025-06-28", rep: "Sarah M.",  views: 8,  value: 320000,  notes: "Contract signed. Kick-off meeting scheduled for June 20.",  createdAt: "2025-05-25T08:30:00Z" },
  { id: "P-1046", client: "NEOM Corp",        service: "Virtual Tour Management + AI Agents",              status: "Sent",        sent: "2025-05-25", viewed: "2025-05-26", expires: "2025-06-24", rep: "Ahmad S.",   views: 5,  value: 1200000, notes: "Awaiting procurement approval.",                            createdAt: "2025-05-22T14:00:00Z" },
  { id: "P-1045", client: "Olayan Group",     service: "Enterprise CRM + Analytics Dashboard",             status: "Viewed",      sent: "2025-05-20", viewed: "2025-06-07", expires: "2025-06-19", rep: "Fatima G.", views: 23, value: 480000,  notes: "High engagement — 23 views. Schedule demo call.",           createdAt: "2025-05-18T09:00:00Z" },
  { id: "P-1044", client: "Emirates NBD",     service: "Digital Transformation Package",                  status: "Draft",       sent: null,         viewed: null,         expires: "2025-07-01", rep: "Sarah M.",  views: 0,  value: 750000,  notes: "Awaiting legal review before sending.",                    createdAt: "2025-06-01T11:00:00Z" },
  { id: "P-1043", client: "Seha Health",      service: "Healthcare AI Workflows",                         status: "Rejected",    sent: "2025-05-10", viewed: "2025-05-11", expires: "2025-06-09", rep: "Khalid O.", views: 4,  value: 290000,  notes: "Budget constraints cited. Re-approach Q3.",                createdAt: "2025-05-08T10:00:00Z" },
  { id: "P-1042", client: "Aldar Properties", service: "Real Estate Virtual Tours Premium",               status: "Accepted",    sent: "2025-05-05", viewed: "2025-05-06", expires: "2025-06-04", rep: "Khalid O.", views: 18, value: 560000,  notes: "Contract finalized. Project onboarding in progress.",       createdAt: "2025-05-03T13:00:00Z" },
];

export const useStore = create<X360Store>()(
  persist(
    (set, get) => ({
      leads:              INITIAL_LEADS,
      projects:           INITIAL_PROJECTS,
      roles:              INITIAL_ROLES,
      virtualTours:       INITIAL_VIRTUAL_TOURS,
      documents:          INITIAL_DOCUMENTS,
      proposals:          INITIAL_PROPOSALS,
      leadStageLabels:    {},
      projectStageLabels: {},
      targetIndustries:   INITIAL_TARGET_INDUSTRIES,
      monthlyGoals:       INITIAL_MONTHLY_GOALS,
      strategyCards:      INITIAL_STRATEGY_CARDS,
      campaigns:          INITIAL_CAMPAIGNS,
      expansionTargets:   INITIAL_EXPANSION_TARGETS,
      notifications:      INITIAL_NOTIFICATIONS,

      // ── Lead operations ─────────────────────────────────────────────────────
      addLead: (data) => {
        const id = `l${uid()}`;
        const lead: Lead = {
          ...data, id, createdAt: now(),
          activities: [{ id: uid(), type: "note", text: "Lead created", author: "System", timestamp: now() }],
          tasks: [], communications: [],
        };
        set((s) => ({
          leads: [lead, ...s.leads],
          notifications: [
            { id: uid(), type: "lead", title: "New lead added", body: `${data.company} — ${data.contact}`, read: false, timestamp: now(), leadId: id },
            ...s.notifications,
          ],
        }));
        return id;
      },

      updateLead: (id, updates) =>
        set((s) => ({ leads: s.leads.map((l) => (l.id === id ? { ...l, ...updates } : l)) })),

      deleteLead: (id) =>
        set((s) => ({ leads: s.leads.filter((l) => l.id !== id) })),

      moveLead: (id, stage) =>
        set((s) => ({
          leads: s.leads.map((l) =>
            l.id === id
              ? { ...l, stage, activities: [{ id: uid(), type: "stage_change" as const, text: `Moved to ${stage}`, author: "User", timestamp: now() }, ...l.activities] }
              : l
          ),
        })),

      addActivity: (leadId, act) =>
        set((s) => ({
          leads: s.leads.map((l) =>
            l.id === leadId ? { ...l, activities: [{ ...act, id: uid(), timestamp: now() }, ...l.activities] } : l
          ),
        })),

      addTask: (leadId, task) =>
        set((s) => ({
          leads: s.leads.map((l) =>
            l.id === leadId ? { ...l, tasks: [...l.tasks, { ...task, id: uid() }] } : l
          ),
        })),

      toggleTask: (leadId, taskId) =>
        set((s) => ({
          leads: s.leads.map((l) =>
            l.id === leadId ? { ...l, tasks: l.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) } : l
          ),
        })),

      deleteTask: (leadId, taskId) =>
        set((s) => ({
          leads: s.leads.map((l) => l.id === leadId ? { ...l, tasks: l.tasks.filter((t) => t.id !== taskId) } : l),
        })),

      addCommunication: (leadId, comm) =>
        set((s) => ({
          leads: s.leads.map((l) =>
            l.id === leadId ? { ...l, communications: [{ ...comm, id: uid(), timestamp: now() }, ...l.communications] } : l
          ),
        })),

      updateNotes: (leadId, notes) =>
        set((s) => ({ leads: s.leads.map((l) => (l.id === leadId ? { ...l, notes } : l)) })),

      // ── Project operations ───────────────────────────────────────────────────
      addProject: (data) => {
        const id = `p${uid()}`;
        const project: Project = { ...data, id, createdAt: now(), activities: [], tasks: [] };
        set((s) => ({ projects: [project, ...s.projects] }));
        return id;
      },

      updateProject: (id, updates) =>
        set((s) => ({ projects: s.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)) })),

      deleteProject: (id) =>
        set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),

      moveProject: (id, stage) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id
              ? { ...p, stage, activities: [{ id: uid(), type: "stage_change" as const, text: `Moved to ${stage}`, author: "User", timestamp: now() }, ...p.activities] }
              : p
          ),
        })),

      toggleProjectTask: (projectId, taskId) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === projectId ? { ...p, tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) } : p
          ),
        })),

      // ── Stage label operations ───────────────────────────────────────────────
      renameLeadStage: (stage, label) =>
        set((s) => ({ leadStageLabels: { ...s.leadStageLabels, [stage]: label } })),

      renameProjectStage: (stage, label) =>
        set((s) => ({ projectStageLabels: { ...s.projectStageLabels, [stage]: label } })),

      // ── Role operations ──────────────────────────────────────────────────────
      addRole: (role) =>
        set((s) => ({ roles: [...s.roles, { ...role, id: `r${uid()}` }] })),

      updateRole: (id, updates) =>
        set((s) => ({ roles: s.roles.map((r) => (r.id === id ? { ...r, ...updates } : r)) })),

      deleteRole: (id) =>
        set((s) => ({ roles: s.roles.filter((r) => r.id !== id) })),

      // ── Strategy operations ──────────────────────────────────────────────────
      addTargetIndustry: (item) =>
        set((s) => ({ targetIndustries: [...s.targetIndustries, { ...item, id: `ti${uid()}` }] })),

      updateTargetIndustry: (id, updates) =>
        set((s) => ({ targetIndustries: s.targetIndustries.map((i) => (i.id === id ? { ...i, ...updates } : i)) })),

      deleteTargetIndustry: (id) =>
        set((s) => ({ targetIndustries: s.targetIndustries.filter((i) => i.id !== id) })),

      addStrategyCard: (card) =>
        set((s) => ({ strategyCards: [...s.strategyCards, { ...card, id: `sc${uid()}` }] })),

      updateStrategyCard: (id, updates) =>
        set((s) => ({ strategyCards: s.strategyCards.map((c) => (c.id === id ? { ...c, ...updates } : c)) })),

      deleteStrategyCard: (id) =>
        set((s) => ({ strategyCards: s.strategyCards.filter((c) => c.id !== id) })),

      addCampaign: (campaign) =>
        set((s) => ({ campaigns: [...s.campaigns, { ...campaign, id: `cam${uid()}` }] })),

      updateCampaign: (id, updates) =>
        set((s) => ({ campaigns: s.campaigns.map((c) => (c.id === id ? { ...c, ...updates } : c)) })),

      addMonthlyGoal: (goal) =>
        set((s) => ({ monthlyGoals: [...s.monthlyGoals, { ...goal, id: `mg${uid()}` }] })),

      addExpansionTarget: (target) =>
        set((s) => ({ expansionTargets: [...s.expansionTargets, { ...target, id: `ex${uid()}` }] })),

      // ── Virtual Tour operations ───────────────────────────────────────────────
      addVirtualTour: (t) =>
        set((s) => ({ virtualTours: [{ ...t, id: `vt${uid()}`, views: 0, sessions: 0, lastView: "—", createdAt: now() }, ...s.virtualTours] })),
      updateVirtualTour: (id, updates) =>
        set((s) => ({ virtualTours: s.virtualTours.map((t) => (t.id === id ? { ...t, ...updates } : t)) })),
      deleteVirtualTour: (id) =>
        set((s) => ({ virtualTours: s.virtualTours.filter((t) => t.id !== id) })),

      // ── Document operations ──────────────────────────────────────────────────
      addDocument: (doc) =>
        set((s) => ({ documents: [{ ...doc, id: `d${uid()}`, createdAt: now() }, ...s.documents] })),
      updateDocument: (id, updates) =>
        set((s) => ({ documents: s.documents.map((d) => (d.id === id ? { ...d, ...updates } : d)) })),
      deleteDocument: (id) =>
        set((s) => ({ documents: s.documents.filter((d) => d.id !== id) })),

      // ── Proposal operations ──────────────────────────────────────────────────
      addProposal: (p) => {
        const nextNum = Math.max(1048, ...get().proposals.map(x => parseInt(x.id.replace("P-",""),10) || 0)) + 1;
        set((s) => ({ proposals: [{ ...p, id: `P-${nextNum}`, views: 0, createdAt: new Date().toISOString() }, ...s.proposals] }));
      },
      updateProposal: (id, updates) =>
        set((s) => ({ proposals: s.proposals.map((p) => (p.id === id ? { ...p, ...updates } : p)) })),
      deleteProposal: (id) =>
        set((s) => ({ proposals: s.proposals.filter((p) => p.id !== id) })),

      // ── Notification operations ──────────────────────────────────────────────
      markNotificationRead: (id) =>
        set((s) => ({ notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) })),

      markAllRead: () =>
        set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),

      clearNotification: (id) =>
        set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
    }),
    { name: "x360-store-v2" }
  )
);
