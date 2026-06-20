export type Priority = "High" | "Medium" | "Low";

export type ProjectStage =
  | "Planning" | "Discovery" | "Client Approval" | "Resource Allocation"
  | "Production" | "Development" | "QA Testing" | "Internal Review"
  | "Client Review" | "Revision" | "Deployment"
  | "Support & Maintenance" | "Completed" | "Delayed" | "On Hold" | "Critical";

export type ProjectHealth = "Healthy" | "At Risk" | "Delayed" | "Critical" | "Completed";

export interface ProjectTask {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  priority: Priority;
  done: boolean;
}

export interface ProjectActivity {
  id: string;
  type: string;
  text: string;
  author: string;
  timestamp: string;
}

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
  activities: ProjectActivity[];
  tasks: ProjectTask[];
}

export const KANBAN_STAGES: ProjectStage[] = [
  "Planning","Discovery","Client Approval","Resource Allocation",
  "Production","Development","QA Testing","Internal Review",
  "Client Review","Revision","Deployment",
  "Support & Maintenance","Completed","Delayed","On Hold","Critical",
];
