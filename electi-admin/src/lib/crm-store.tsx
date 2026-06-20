import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { CrmLead, LeadStage, Priority, CommType } from "./crm-types";
import { STAGES } from "./crm-types";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function today() {
  return new Date().toISOString().split("T")[0];
}

const SEED_LEADS: CrmLead[] = [
  {
    id: uid(), company: "Al-Futtaim Group", contact: "Khalid Al-Futtaim", designation: "Chief Digital Officer",
    phone: "+966 50 123 4567", email: "khalid@alfuttaim.com", city: "Riyadh", country: "KSA",
    industry: "Retail", source: "LinkedIn", stage: "Demo Scheduled", priority: "High",
    assigned: "Mohammed A.", score: 82, value: 450000,
    temperature: "Hot", urgency: "High", lastContact: "2025-06-10", nextFollowUp: "2025-06-22",
    notes: "Very interested in AI Sales Agent + Customer Support bundle. Demo booked.",
    services: ["AI Sales Agent", "AI Customer Support Agent"],
    communications: [
      { id: uid(), type: "call", content: "Intro call — confirmed demo for next week.", author: "Mohammed A.", direction: "out", timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: uid(), type: "email", content: "Sent product deck and pricing overview.", author: "Mohammed A.", direction: "out", timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
    ],
    tasks: [
      { id: uid(), title: "Prepare AI Sales Agent demo environment", assignee: "Junaid K.", dueDate: "2025-06-20", priority: "High", done: false },
    ],
    activities: [
      { id: uid(), type: "stage_change", text: "Stage moved to Demo Scheduled.", author: "Mohammed A.", timestamp: new Date(Date.now() - 86400000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: uid(), company: "Saudi German Health", contact: "Dr. Maha Alzahrani", designation: "VP Technology",
    phone: "+966 55 987 6543", email: "maha@sghg.com", city: "Jeddah", country: "KSA",
    industry: "Healthcare", source: "Website Inquiry", stage: "Proposal Sent", priority: "High",
    assigned: "Abdulrhman S.", score: 74, value: 320000,
    temperature: "Warm", urgency: "Medium", lastContact: "2025-06-08", nextFollowUp: "2025-06-25",
    notes: "Interested in AI receptionist and patient support. Currently comparing 2 vendors.",
    services: ["AI Receptionist", "AI Healthcare Agent", "AI Voice Agent"],
    communications: [
      { id: uid(), type: "meeting", content: "Online discovery call. Shared requirements doc.", author: "Abdulrhman S.", direction: "out", timestamp: new Date(Date.now() - 86400000 * 5).toISOString() },
    ],
    tasks: [
      { id: uid(), title: "Follow up on proposal P-2042", assignee: "Abdulrhman S.", dueDate: "2025-06-25", priority: "High", done: false },
    ],
    activities: [
      { id: uid(), type: "stage_change", text: "Proposal sent via email.", author: "Abdulrhman S.", timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
    ],
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
  {
    id: uid(), company: "IHG Hotels & Resorts", contact: "Faisal Al-Harbi", designation: "Operations Director",
    phone: "+966 50 321 9876", email: "f.alharbi@ihg.com", city: "Riyadh", country: "KSA",
    industry: "Hospitality", source: "Exhibition / Event", stage: "Qualified", priority: "Medium",
    assigned: "Sarah M.", score: 61, value: 200000,
    temperature: "Warm", urgency: "Low", lastContact: "2025-06-05", nextFollowUp: "2025-06-28",
    notes: "Met at Cityscape Riyadh. Wants AI concierge + WhatsApp guest support.",
    services: ["AI Receptionist", "AI WhatsApp Agent", "AI Hospitality Agent"],
    communications: [
      { id: uid(), type: "whatsapp", content: "Sent intro message and brochure on WhatsApp.", author: "Sarah M.", direction: "out", timestamp: new Date(Date.now() - 86400000 * 6).toISOString() },
    ],
    tasks: [],
    activities: [],
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: uid(), company: "Riyadh Development Authority", contact: "Eng. Turki Al-Saud", designation: "Smart City Lead",
    phone: "+966 50 555 1234", email: "turki@rda.gov.sa", city: "Riyadh", country: "KSA",
    industry: "Government", source: "Direct Contact", stage: "Discovery Meeting", priority: "High",
    assigned: "Mohammed A.", score: 88, value: 900000,
    temperature: "Hot", urgency: "Critical", lastContact: "2025-06-12", nextFollowUp: "2025-06-18",
    notes: "RDA Smart City initiative. Looking for AI workflow automation + citizen support agents.",
    services: ["AI Workflow Automation", "AI Customer Support Agent", "Enterprise AI Platform"],
    vip: true, decisionMakerIdentified: true, expansionPotential: true,
    communications: [],
    tasks: [
      { id: uid(), title: "Prepare enterprise AI platform brief", assignee: "Mohammed A.", dueDate: "2025-06-18", priority: "High", done: false },
      { id: uid(), title: "Coordinate with legal team on NDA", assignee: "Fatima N.", dueDate: "2025-06-17", priority: "Medium", done: true },
    ],
    activities: [
      { id: uid(), type: "stage_change", text: "Discovery meeting booked for June 18.", author: "Mohammed A.", timestamp: new Date(Date.now() - 86400000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

interface CrmState {
  leads: CrmLead[];
  stageLabels: Record<string, string>;
}

type Action =
  | { type: "ADD_LEAD"; payload: Omit<CrmLead, "id" | "communications" | "tasks" | "activities" | "createdAt"> }
  | { type: "UPDATE_LEAD"; id: string; payload: Partial<CrmLead> }
  | { type: "DELETE_LEAD"; id: string }
  | { type: "MOVE_LEAD"; id: string; stage: LeadStage }
  | { type: "ADD_COMM"; leadId: string; comm: Omit<Communication, "id" | "timestamp"> }
  | { type: "ADD_TASK"; leadId: string; task: Omit<CrmTask, "id"> }
  | { type: "TOGGLE_TASK"; leadId: string; taskId: string }
  | { type: "DELETE_TASK"; leadId: string; taskId: string }
  | { type: "UPDATE_NOTES"; leadId: string; notes: string }
  | { type: "RENAME_STAGE"; stage: string; label: string };

import type { Communication, CrmTask } from "./crm-types";

function reducer(state: CrmState, action: Action): CrmState {
  switch (action.type) {
    case "ADD_LEAD":
      return {
        ...state,
        leads: [
          {
            ...action.payload,
            id: uid(),
            communications: [],
            tasks: [],
            activities: [{ id: uid(), type: "created", text: "Lead created.", author: "Admin", timestamp: new Date().toISOString() }],
            createdAt: new Date().toISOString(),
          },
          ...state.leads,
        ],
      };
    case "UPDATE_LEAD":
      return {
        ...state,
        leads: state.leads.map((l) => (l.id === action.id ? { ...l, ...action.payload } : l)),
      };
    case "DELETE_LEAD":
      return { ...state, leads: state.leads.filter((l) => l.id !== action.id) };
    case "MOVE_LEAD":
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.id
            ? {
                ...l,
                stage: action.stage,
                activities: [
                  ...l.activities,
                  { id: uid(), type: "stage_change", text: `Stage changed to ${action.stage}.`, author: "Admin", timestamp: new Date().toISOString() },
                ],
              }
            : l
        ),
      };
    case "ADD_COMM":
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId
            ? { ...l, communications: [...l.communications, { ...action.comm, id: uid(), timestamp: new Date().toISOString() }] }
            : l
        ),
      };
    case "ADD_TASK":
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId
            ? { ...l, tasks: [...l.tasks, { ...action.task, id: uid() }] }
            : l
        ),
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId
            ? { ...l, tasks: l.tasks.map((t) => (t.id === action.taskId ? { ...t, done: !t.done } : t)) }
            : l
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId
            ? { ...l, tasks: l.tasks.filter((t) => t.id !== action.taskId) }
            : l
        ),
      };
    case "UPDATE_NOTES":
      return {
        ...state,
        leads: state.leads.map((l) => (l.id === action.leadId ? { ...l, notes: action.notes } : l)),
      };
    case "RENAME_STAGE":
      return {
        ...state,
        stageLabels: { ...state.stageLabels, [action.stage]: action.label },
      };
    default:
      return state;
  }
}

const STORAGE_KEY = "electi-crm-v1";

function loadState(): CrmState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CrmState;
      return { ...parsed, stageLabels: parsed.stageLabels ?? {} };
    }
  } catch {}
  return { leads: SEED_LEADS, stageLabels: {} };
}

interface CrmContextValue {
  leads: CrmLead[];
  stageLabels: Record<string, string>;
  addLead: (payload: Omit<CrmLead, "id" | "communications" | "tasks" | "activities" | "createdAt">) => void;
  updateLead: (id: string, payload: Partial<CrmLead>) => void;
  deleteLead: (id: string) => void;
  moveLead: (id: string, stage: LeadStage) => void;
  addCommunication: (leadId: string, comm: Omit<Communication, "id" | "timestamp">) => void;
  addTask: (leadId: string, task: Omit<CrmTask, "id">) => void;
  toggleTask: (leadId: string, taskId: string) => void;
  deleteTask: (leadId: string, taskId: string) => void;
  updateNotes: (leadId: string, notes: string) => void;
  renameStage: (stage: string, label: string) => void;
}

const CrmContext = createContext<CrmContextValue | null>(null);

export function CrmProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const value: CrmContextValue = {
    leads: state.leads,
    stageLabels: state.stageLabels,
    addLead: (p) => dispatch({ type: "ADD_LEAD", payload: p }),
    updateLead: (id, p) => dispatch({ type: "UPDATE_LEAD", id, payload: p }),
    deleteLead: (id) => dispatch({ type: "DELETE_LEAD", id }),
    moveLead: (id, stage) => dispatch({ type: "MOVE_LEAD", id, stage }),
    addCommunication: (leadId, comm) => dispatch({ type: "ADD_COMM", leadId, comm }),
    addTask: (leadId, task) => dispatch({ type: "ADD_TASK", leadId, task }),
    toggleTask: (leadId, taskId) => dispatch({ type: "TOGGLE_TASK", leadId, taskId }),
    deleteTask: (leadId, taskId) => dispatch({ type: "DELETE_TASK", leadId, taskId }),
    updateNotes: (leadId, notes) => dispatch({ type: "UPDATE_NOTES", leadId, notes }),
    renameStage: (stage, label) => dispatch({ type: "RENAME_STAGE", stage, label }),
  };

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
}

export function useCrm() {
  const ctx = useContext(CrmContext);
  if (!ctx) throw new Error("useCrm must be used within CrmProvider");
  return ctx;
}
