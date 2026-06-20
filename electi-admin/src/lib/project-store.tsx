import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { Project, ProjectStage, ProjectTask } from "./project-types";
import { KANBAN_STAGES } from "./project-types";

function uid() { return Math.random().toString(36).slice(2, 10); }

const SEED_PROJECTS: Project[] = [
  {
    id: "p1", name: "Saudi Aramco AI Workforce", client: "Saudi Aramco",
    type: "AI Development", industry: "Oil & Gas", stage: "Development",
    health: "Healthy", priority: "High", progress: 68,
    startDate: "2025-04-01", deadline: "2025-07-15", daysRemaining: 36,
    team: ["AS", "SM", "KO"], value: 2400000,
    tags: ["AI Development"],
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
    tags: ["360 Virtual Tour", "VR Experience"],
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
    tags: ["Business Intelligence"],
    description: "Executive analytics dashboard with retail performance KPIs.",
    createdAt: "2025-03-20T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p5", name: "Retal Drone Documentation", client: "Retal Urban Dev.",
    type: "Drone Documentation", industry: "Real Estate", stage: "Production",
    health: "Delayed", priority: "Medium", progress: 45,
    startDate: "2025-04-15", deadline: "2025-07-30", daysRemaining: 51,
    team: ["KO", "AS"], value: 1600000,
    tags: ["Drone Documentation"],
    description: "Full site aerial documentation and construction monitoring system.",
    createdAt: "2025-04-15T09:00:00Z", activities: [], tasks: [
      { id: "pt5", title: "Phase 2 drone scan", assignee: "Ahmad S.", dueDate: "2025-06-20", done: false, priority: "High" },
    ],
  },
  {
    id: "p6", name: "Emirates NBD Digital Transform", client: "Emirates NBD",
    type: "AI Development", industry: "Finance", stage: "Discovery",
    health: "Healthy", priority: "Low", progress: 5,
    startDate: "2025-06-05", deadline: "2025-09-01", daysRemaining: 84,
    team: ["SM"], value: 1200000,
    tags: ["AI Development"],
    description: "Digital transformation initiative for operations and customer service.",
    createdAt: "2025-06-05T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p7", name: "Misk Foundation Portal", client: "Misk Foundation",
    type: "Website Development", industry: "Education", stage: "Completed",
    health: "Completed", priority: "Low", progress: 100,
    startDate: "2025-02-01", deadline: "2025-06-01", daysRemaining: 0,
    team: ["FG", "KO"], value: 680000,
    tags: ["Website Development"],
    description: "Educational portal with AI-driven personalized learning modules.",
    createdAt: "2025-02-01T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p8", name: "Aldar 360 Property Tours", client: "Aldar Properties",
    type: "360 Virtual Tour", industry: "Real Estate", stage: "Support & Maintenance",
    health: "Completed", priority: "Medium", progress: 100,
    startDate: "2025-01-10", deadline: "2025-05-15", daysRemaining: 0,
    team: ["AS", "SM", "FG"], value: 980000,
    tags: ["360 Virtual Tour"],
    description: "Interactive 360° property showcasing platform for UAE developments.",
    createdAt: "2025-01-10T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p9", name: "KFSHRC Hospital AI System", client: "KFSHRC",
    type: "AI Development", industry: "Healthcare", stage: "Development",
    health: "At Risk", priority: "High", progress: 38,
    startDate: "2025-05-01", deadline: "2025-07-20", daysRemaining: 41,
    team: ["AS", "FG"], value: 1400000,
    tags: ["AI Development"],
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
    tags: ["SaaS Platform"],
    description: "Enterprise SaaS platform for STC's 5G business analytics suite.",
    createdAt: "2025-06-08T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p11", name: "Rotana Hotels VR Experience", client: "Rotana Hotels",
    type: "VR Experience", industry: "Hotels", stage: "Internal Review",
    health: "At Risk", priority: "High", progress: 78,
    startDate: "2025-04-20", deadline: "2025-06-18", daysRemaining: 9,
    team: ["AS", "FG"], value: 640000,
    tags: ["VR Experience"],
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
    tags: ["ERP"],
    description: "Full SAP ERP integration with custom reporting and automation.",
    createdAt: "2025-05-25T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p13", name: "Dar Al Arkan Digital Portal", client: "Dar Al Arkan",
    type: "Website Development", industry: "Real Estate", stage: "Revision",
    health: "Delayed", priority: "Medium", progress: 70,
    startDate: "2025-04-01", deadline: "2025-06-25", daysRemaining: 16,
    team: ["FG", "AS"], value: 520000,
    tags: ["Website Development"],
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
    tags: ["360 Virtual Tour"],
    description: "Interactive virtual tour of Hilton Jeddah's facilities and suites.",
    createdAt: "2025-04-10T09:00:00Z", activities: [], tasks: [],
  },
  {
    id: "p15", name: "SABIC Smart Factory Platform", client: "SABIC",
    type: "AI Development", industry: "Manufacturing", stage: "Critical",
    health: "Critical", priority: "High", progress: 55,
    startDate: "2025-03-01", deadline: "2025-06-10", daysRemaining: -10,
    team: ["AS", "KO", "SM"], value: 3500000,
    tags: ["AI Development"],
    description: "AI-driven smart factory monitoring and predictive maintenance.",
    createdAt: "2025-03-01T09:00:00Z", activities: [], tasks: [
      { id: "pt9", title: "Emergency deadline extension meeting", assignee: "Ahmad S.", dueDate: "2025-06-10", done: false, priority: "High" },
    ],
  },
];

interface ProjectState {
  projects: Project[];
  stageLabels: Record<string, string>;
}

type Action =
  | { type: "ADD"; payload: Omit<Project, "id" | "createdAt" | "activities" | "tasks"> }
  | { type: "UPDATE"; id: string; payload: Partial<Project> }
  | { type: "DELETE"; id: string }
  | { type: "MOVE"; id: string; stage: ProjectStage }
  | { type: "TOGGLE_TASK"; projectId: string; taskId: string }
  | { type: "RENAME_STAGE"; stage: string; label: string };

function reducer(state: ProjectState, action: Action): ProjectState {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        projects: [
          { ...action.payload, id: uid(), createdAt: new Date().toISOString(), activities: [], tasks: [] },
          ...state.projects,
        ],
      };
    case "UPDATE":
      return { ...state, projects: state.projects.map(p => p.id === action.id ? { ...p, ...action.payload } : p) };
    case "DELETE":
      return { ...state, projects: state.projects.filter(p => p.id !== action.id) };
    case "MOVE":
      return { ...state, projects: state.projects.map(p => p.id === action.id ? { ...p, stage: action.stage } : p) };
    case "TOGGLE_TASK":
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.projectId
            ? { ...p, tasks: p.tasks.map(t => t.id === action.taskId ? { ...t, done: !t.done } : t) }
            : p
        ),
      };
    case "RENAME_STAGE":
      return { ...state, stageLabels: { ...state.stageLabels, [action.stage]: action.label } };
    default:
      return state;
  }
}

const STORAGE_KEY = "electi-projects-v1";

function loadState(): ProjectState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ProjectState;
      return { projects: parsed.projects ?? SEED_PROJECTS, stageLabels: parsed.stageLabels ?? {} };
    }
  } catch {}
  return { projects: SEED_PROJECTS, stageLabels: {} };
}

interface ProjectContextValue {
  projects: Project[];
  stageLabels: Record<string, string>;
  addProject: (data: Omit<Project, "id" | "createdAt" | "activities" | "tasks">) => void;
  updateProject: (id: string, payload: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  moveProject: (id: string, stage: ProjectStage) => void;
  toggleProjectTask: (projectId: string, taskId: string) => void;
  renameProjectStage: (stage: string, label: string) => void;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const value: ProjectContextValue = {
    projects: state.projects,
    stageLabels: state.stageLabels,
    addProject:          (data) => dispatch({ type: "ADD", payload: data }),
    updateProject:       (id, p) => dispatch({ type: "UPDATE", id, payload: p }),
    deleteProject:       (id) => dispatch({ type: "DELETE", id }),
    moveProject:         (id, stage) => dispatch({ type: "MOVE", id, stage }),
    toggleProjectTask:   (projectId, taskId) => dispatch({ type: "TOGGLE_TASK", projectId, taskId }),
    renameProjectStage:  (stage, label) => dispatch({ type: "RENAME_STAGE", stage, label }),
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
}

export { KANBAN_STAGES };
export type { Project, ProjectStage, ProjectTask };
