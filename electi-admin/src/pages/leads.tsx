import { useState, useRef, useEffect } from "react";
import {
  DndContext, DragOverlay, rectIntersection,
  useDraggable, useDroppable,
  type DragEndEvent, type DragStartEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Plus, LayoutGrid, List, Search, Calendar,
  Clock, AlertTriangle, CheckCircle2, Zap,
  ChevronLeft, ChevronRight, Building2, Pencil,
} from "lucide-react";
import { useProjects } from "@/lib/project-store";
import { toast } from "@/hooks/use-toast";
import AddProjectModal from "@/components/projects/AddProjectModal";
import type { Project, ProjectStage, Priority } from "@/lib/project-types";
import { KANBAN_STAGES } from "@/lib/project-types";

// ── Stage config ──────────────────────────────────────────────────────────────
const STAGE_META: Record<string, { dot: string; count_bg: string; accent?: string }> = {
  "Planning":             { dot: "bg-slate-400",   count_bg: "bg-slate-500/10"   },
  "Discovery":            { dot: "bg-blue-400",    count_bg: "bg-blue-500/10"    },
  "Client Approval":      { dot: "bg-cyan-400",    count_bg: "bg-cyan-500/10"    },
  "Resource Allocation":  { dot: "bg-purple-400",  count_bg: "bg-purple-500/10"  },
  "Production":           { dot: "bg-amber-400",   count_bg: "bg-amber-500/10"   },
  "Development":          { dot: "bg-blue-500",    count_bg: "bg-blue-500/10",   accent: "border-blue-500/20"   },
  "QA Testing":           { dot: "bg-violet-400",  count_bg: "bg-violet-500/10", accent: "border-violet-500/20" },
  "Internal Review":      { dot: "bg-sky-400",     count_bg: "bg-sky-500/10",    accent: "border-sky-500/20"    },
  "Client Review":        { dot: "bg-indigo-400",  count_bg: "bg-indigo-500/10"  },
  "Revision":             { dot: "bg-orange-400",  count_bg: "bg-orange-500/10"  },
  "Deployment":           { dot: "bg-teal-400",    count_bg: "bg-teal-500/10"    },
  "Support & Maintenance":{ dot: "bg-cyan-300",    count_bg: "bg-cyan-500/10"    },
  "Completed":            { dot: "bg-green-400",   count_bg: "bg-green-500/10"   },
  "Delayed":              { dot: "bg-orange-500",  count_bg: "bg-orange-500/10", accent: "border-orange-500/20" },
  "On Hold":              { dot: "bg-white/30",    count_bg: "bg-white/10"       },
  "Critical":             { dot: "bg-red-500",     count_bg: "bg-red-500/10",    accent: "border-red-500/25"    },
};

const HEALTH_META: Record<string, { bg: string; text: string; dot: string }> = {
  "Healthy":   { bg: "bg-green-500/10",  text: "text-green-300",  dot: "bg-green-400"  },
  "At Risk":   { bg: "bg-amber-500/10",  text: "text-amber-300",  dot: "bg-amber-400"  },
  "Delayed":   { bg: "bg-orange-500/10", text: "text-orange-300", dot: "bg-orange-500" },
  "Critical":  { bg: "bg-red-500/10",    text: "text-red-300",    dot: "bg-red-500"    },
  "Completed": { bg: "bg-blue-500/10",   text: "text-blue-300",   dot: "bg-blue-400"   },
};

const PRIORITY_COLOR: Record<Priority, string> = {
  High: "badge-red", Medium: "badge-amber", Low: "badge-white",
};

const TAG_COLOR: Record<string, string> = {
  "360 Virtual Tour":    "bg-blue-500/15 text-blue-300",
  "AI Development":      "bg-purple-500/15 text-purple-300",
  "Website Development": "bg-cyan-500/15 text-cyan-300",
  "Mobile App":          "bg-green-500/15 text-green-300",
  "CRM":                 "bg-amber-500/15 text-amber-300",
  "ERP":                 "bg-orange-500/15 text-orange-300",
  "VR Experience":       "bg-violet-500/15 text-violet-300",
  "Drone Documentation": "bg-teal-500/15 text-teal-300",
  "SaaS Platform":       "bg-indigo-500/15 text-indigo-300",
};

function TagPill({ tag }: { tag: string }) {
  const cls = TAG_COLOR[tag] ?? "bg-white/[0.06] text-white/45";
  return <span className={`text-[8px] px-1.5 py-0.5 rounded font-500 ${cls}`}>{tag}</span>;
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project, onClick, listeners, onMoveCard, canMovePrev, canMoveNext,
}: {
  project: Project;
  onClick: () => void;
  listeners?: ReturnType<typeof useDraggable>["listeners"];
  onMoveCard: (p: Project, dir: "prev" | "next") => void;
  canMovePrev: boolean;
  canMoveNext: boolean;
}) {
  const h = HEALTH_META[project.health] ?? HEALTH_META["Healthy"];
  const isOverdue = project.daysRemaining <= 0 && project.health !== "Completed";
  const isUrgent  = project.daysRemaining <= 7 && project.health !== "Completed" && project.daysRemaining > 0;

  return (
    <div className="glass rounded-xl border border-white/[0.05] hover:border-white/[0.1] transition-all group select-none">
      <div className="px-3 pt-3 pb-2 cursor-grab active:cursor-grabbing" {...listeners}>
        <div className="flex items-start justify-between gap-1 mb-2">
          <p className="text-[11px] font-700 text-white/85 leading-tight flex-1">{project.name}</p>
          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-600 shrink-0 ${h.bg} ${h.text}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${h.dot}`} />
            {project.health}
          </div>
        </div>
        <p className="text-[10px] text-white/40 flex items-center gap-1 mb-2">
          <Building2 className="w-2.5 h-2.5" />{project.client}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {project.tags.slice(0, 2).map(t => <TagPill key={t} tag={t} />)}
          {project.tags.length > 2 && <span className="text-[8px] text-white/25">+{project.tags.length - 2}</span>}
        </div>
      </div>

      <div onClick={onClick} className="px-3 pb-3 cursor-pointer space-y-2">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-white/30">Progress</span>
            <span className={`text-[10px] font-700 ${project.progress >= 100 ? "text-green-400" : project.progress >= 75 ? "text-amber-400" : "text-white/55"}`}>{project.progress}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/[0.06]">
            <div
              className={`h-full rounded-full transition-all ${project.progress >= 100 ? "bg-green-400" : project.progress >= 75 ? "bg-amber-400" : "bg-blue-400"}`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1 text-[9px] ${isOverdue ? "text-red-400" : isUrgent ? "text-orange-400" : "text-white/35"}`}>
            {isOverdue ? <AlertTriangle className="w-3 h-3" /> : <Calendar className="w-2.5 h-2.5" />}
            {isOverdue ? "OVERDUE" : isUrgent ? `${project.daysRemaining}d left` : project.deadline}
          </div>
          <span className={`badge text-[8px] py-0 ${PRIORITY_COLOR[project.priority]}`}>{project.priority}</span>
        </div>
        <div className="flex items-center gap-1">
          {project.team.slice(0, 4).map(m => (
            <div key={m} className="w-5 h-5 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-[7px] font-700 text-white/60">{m}</div>
          ))}
          {project.team.length > 4 && <span className="text-[9px] text-white/25">+{project.team.length - 4}</span>}
        </div>
      </div>

      <div className="flex items-center gap-1 px-2 pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={e => { e.stopPropagation(); onMoveCard(project, "prev"); }}
          disabled={!canMovePrev}
          className="flex items-center justify-center w-6 h-6 rounded bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-20 transition-colors"
        >
          <ChevronLeft className="w-3 h-3 text-white/70" />
        </button>
        <div className="flex-1" />
        <button
          onClick={e => { e.stopPropagation(); onMoveCard(project, "next"); }}
          disabled={!canMoveNext}
          className="flex items-center justify-center w-6 h-6 rounded bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-20 transition-colors"
        >
          <ChevronRight className="w-3 h-3 text-white/70" />
        </button>
      </div>
    </div>
  );
}

function DraggableProjectCard({ project, onClick, onMoveCard, canMovePrev, canMoveNext }: {
  project: Project; onClick: () => void;
  onMoveCard: (p: Project, dir: "prev" | "next") => void;
  canMovePrev: boolean; canMoveNext: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: project.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={`transition-opacity ${isDragging ? "opacity-40" : "opacity-100"}`}
      {...attributes}
    >
      <ProjectCard
        project={project} onClick={onClick} listeners={listeners}
        onMoveCard={onMoveCard} canMovePrev={canMovePrev} canMoveNext={canMoveNext}
      />
    </div>
  );
}

function ProjectCardOverlay({ project }: { project: Project }) {
  return (
    <div className="glass rounded-xl p-3 w-[220px] shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-white/[0.14] rotate-2 scale-105">
      <p className="text-[11px] font-700 text-white/85 mb-1">{project.name}</p>
      <p className="text-[10px] text-white/40">{project.client}</p>
      <div className="h-1 rounded-full bg-white/[0.06] mt-2">
        <div className="h-full rounded-full bg-blue-400" style={{ width: `${project.progress}%` }} />
      </div>
    </div>
  );
}

// ── Kanban Column ─────────────────────────────────────────────────────────────
function KanbanColumn({
  stage, displayLabel, projects, onProjectClick, onAddProject,
  onMoveCard, onRenameStage, stageIndex, totalStages,
}: {
  stage: ProjectStage; displayLabel: string; projects: Project[];
  onProjectClick: (p: Project) => void; onAddProject: () => void;
  onMoveCard: (p: Project, dir: "prev" | "next") => void;
  onRenameStage: (stage: string, label: string) => void;
  stageIndex: number; totalStages: number;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const meta = STAGE_META[stage];
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(displayLabel);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) inputRef.current?.select(); }, [editing]);

  function commit() {
    const t = draft.trim();
    onRenameStage(stage, t || stage);
    setEditing(false);
  }
  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); commit(); }
    if (e.key === "Escape") setEditing(false);
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 flex flex-col rounded-xl border transition-all duration-150 ${meta?.accent ?? ""}`}
      style={{
        width: "220px", scrollSnapAlign: "start",
        background: isOver ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        borderColor: isOver ? "rgba(255,255,255,0.12)" : undefined,
      }}
    >
      <div className="px-3 py-2.5 border-b border-white/[0.05] flex items-center gap-2 group/header">
        <div className={`w-2 h-2 rounded-full ${meta?.dot ?? "bg-white/30"} shrink-0`} />
        {editing ? (
          <input
            ref={inputRef} value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commit} onKeyDown={onKey}
            className="flex-1 min-w-0 bg-white/[0.06] border border-white/[0.15] rounded px-1.5 py-0.5 text-[9px] font-700 text-white/85 uppercase tracking-[0.10em] outline-none focus:border-white/30"
          />
        ) : (
          <button
            onClick={() => { setDraft(displayLabel); setEditing(true); }}
            title="Click to rename"
            className="flex-1 min-w-0 flex items-center gap-1.5 text-left group/label"
          >
            <p className="text-[9px] font-700 text-white/70 uppercase tracking-[0.1em] truncate group-hover/label:text-white/90 transition-colors">{displayLabel}</p>
            <Pencil className="w-2.5 h-2.5 text-white/20 shrink-0 opacity-0 group-hover/header:opacity-100 transition-opacity" />
          </button>
        )}
        <div className={`w-5 h-5 rounded-full ${meta?.count_bg ?? "bg-white/10"} flex items-center justify-center shrink-0`}>
          <span className="text-[9px] font-700 text-white/60">{projects.length}</span>
        </div>
      </div>

      <div className="flex-1 p-2 space-y-2 overflow-y-auto min-h-[100px]">
        {projects.map(p => (
          <DraggableProjectCard
            key={p.id} project={p} onClick={() => onProjectClick(p)}
            onMoveCard={onMoveCard}
            canMovePrev={stageIndex > 0}
            canMoveNext={stageIndex < totalStages - 1}
          />
        ))}
        {projects.length === 0 && (
          <div className={`flex items-center justify-center h-14 border border-dashed rounded-lg transition-colors ${isOver ? "border-white/[0.12] bg-white/[0.02]" : "border-white/[0.04]"}`}>
            <p className="text-[9px] text-white/18">Drop here</p>
          </div>
        )}
      </div>

      <div className="p-2 border-t border-white/[0.04]">
        <button
          onClick={onAddProject}
          className="w-full flex items-center justify-center gap-1 py-1.5 text-[9px] text-white/28 hover:text-white/55 hover:bg-white/[0.03] rounded-lg transition-colors"
        >
          <Plus className="w-3 h-3" /> Add project
        </button>
      </div>
    </div>
  );
}

// ── Detail Drawer ─────────────────────────────────────────────────────────────
function ProjectDetailDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [detailTab, setDetailTab] = useState(0);
  const { toggleProjectTask } = useProjects();
  if (!project) return null;
  const h = HEALTH_META[project.health] ?? HEALTH_META["Healthy"];
  const detailTabs = ["Overview", "Tasks", "Timeline", "AI Insights"];

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1 bg-black/60 backdrop-blur-sm" />
      <div
        className="w-[480px] bg-[#0a0a0a] border-l border-white/[0.06] flex flex-col h-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 border-b border-white/[0.05]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-[15px] font-700 text-white/90 leading-tight">{project.name}</h2>
              <p className="text-[11px] text-white/40 mt-1 flex items-center gap-1">
                <Building2 className="w-3 h-3" />{project.client} · {project.type}
              </p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors text-[11px]">✕</button>
          </div>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-600 ${h.bg} ${h.text}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${h.dot}`} />{project.health}
            </div>
            <span className={`badge text-[9px] py-0.5 ${PRIORITY_COLOR[project.priority]}`}>{project.priority} Priority</span>
            <span className="badge badge-white text-[9px] py-0.5">{project.stage}</span>
          </div>
        </div>

        <div className="px-5 py-3 border-b border-white/[0.05]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-white/35 uppercase tracking-wide">Overall Progress</span>
            <span className="text-[14px] font-700 text-white/80">{project.progress}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/[0.06]">
            <div
              className={`h-full rounded-full transition-all ${project.progress >= 100 ? "bg-green-400" : project.progress >= 75 ? "bg-amber-400" : "bg-blue-400"}`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-[10px] text-white/35">
            <span>Start: {project.startDate}</span>
            <span className={project.daysRemaining <= 0 ? "text-red-400 font-600" : project.daysRemaining <= 7 ? "text-orange-400 font-600" : ""}>
              {project.daysRemaining <= 0 ? "OVERDUE" : `${project.daysRemaining} days left`} · {project.deadline}
            </span>
          </div>
        </div>

        <div className="flex border-b border-white/[0.05]">
          {detailTabs.map((t, i) => (
            <button key={i} onClick={() => setDetailTab(i)}
              className={`flex-1 py-2.5 text-[9px] font-600 uppercase tracking-wide border-b-2 transition-all -mb-px ${detailTab === i ? "border-white/60 text-white/80" : "border-transparent text-white/28 hover:text-white/55"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {detailTab === 0 && (
            <div className="space-y-4">
              <p className="text-[12px] text-white/60 leading-relaxed">{project.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Value",     value: `SAR ${(project.value / 1000000).toFixed(1)}M` },
                  { label: "Industry",  value: project.industry },
                  { label: "Team Size", value: `${project.team.length} members` },
                  { label: "Tasks",     value: `${project.tasks.filter(t => t.done).length}/${project.tasks.length} done` },
                ].map(item => (
                  <div key={item.label} className="glass-sm rounded-lg p-3">
                    <p className="text-[9px] text-white/30 uppercase tracking-wide">{item.label}</p>
                    <p className="text-[12px] font-600 text-white/75 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[9px] text-white/35 uppercase tracking-wide mb-2">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(t => <TagPill key={t} tag={t} />)}
                </div>
              </div>
              <div>
                <p className="text-[9px] text-white/35 uppercase tracking-wide mb-2">Team</p>
                <div className="flex flex-wrap gap-2">
                  {project.team.map(m => (
                    <div key={m} className="flex items-center gap-1.5 glass-sm px-2 py-1 rounded-lg">
                      <div className="w-5 h-5 rounded-full bg-white/[0.1] flex items-center justify-center text-[8px] font-700 text-white/70">{m}</div>
                      <span className="text-[10px] text-white/60">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {detailTab === 1 && (
            <div className="space-y-2">
              {project.tasks.length === 0 ? (
                <p className="text-[11px] text-white/30 text-center py-8">No tasks yet</p>
              ) : project.tasks.map(t => (
                <div key={t.id} className="flex items-center gap-3 p-2.5 glass-sm rounded-lg">
                  <button
                    onClick={() => toggleProjectTask(project.id, t.id)}
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${t.done ? "bg-green-500/30 border border-green-500/50" : "border border-white/20 hover:border-white/40"}`}
                  >
                    {t.done && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                  </button>
                  <p className={`text-[11px] flex-1 ${t.done ? "line-through text-white/30" : "text-white/70"}`}>{t.title}</p>
                  <span className="text-[9px] text-white/30">{t.dueDate}</span>
                </div>
              ))}
            </div>
          )}

          {detailTab === 2 && (
            <div className="text-center py-8 text-white/25 text-[11px]">
              <Clock className="w-8 h-8 mx-auto mb-3 opacity-30" />
              Timeline view coming soon
            </div>
          )}

          {detailTab === 3 && (
            <div className="space-y-3">
              {[
                {
                  label: "Health Assessment",
                  text: project.health === "Healthy"
                    ? "Project is on track. No major risks detected."
                    : project.health === "At Risk"
                    ? "⚠️ Deadline approaching with current pace. Consider adding resources."
                    : project.health === "Critical"
                    ? "🚨 Critical — immediate intervention required to meet deadline."
                    : "Project is delayed. Reassess scope and timeline with client.",
                },
                {
                  label: "Completion Forecast",
                  text: `At current ${project.progress}% progress rate, project will ${project.daysRemaining > 0 ? `complete within ${project.daysRemaining} days` : "likely miss the deadline"}.`,
                },
                {
                  label: "Value at Risk",
                  text: `SAR ${(project.value / 1000000).toFixed(1)}M contract. ${project.health === "Healthy" ? "No financial risk detected." : "Late delivery may trigger penalty clauses."}`,
                },
              ].map(item => (
                <div key={item.label} className="glass-sm rounded-lg p-3">
                  <p className="text-[9px] text-white/35 uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="text-[11px] text-white/65 leading-relaxed">{item.text}</p>
                </div>
              ))}
              <div className="glass-sm rounded-lg p-3">
                <p className="text-[9px] text-white/35 uppercase tracking-wide mb-1 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5" /> AI Recommendation
                </p>
                <p className="text-[11px] text-white/65 leading-relaxed">
                  {project.health === "Critical" || project.health === "Delayed"
                    ? "Schedule an emergency standup and re-scope deliverables with the client."
                    : "Maintain current velocity. Consider early QA review for high-risk modules."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const { projects, moveProject, stageLabels, renameProjectStage } = useProjects();
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [search, setSearch] = useState("");
  const [healthFilter, setHealthFilter] = useState("All");
  const [addOpen, setAddOpen] = useState(false);
  const [defaultAddStage, setDefaultAddStage] = useState<ProjectStage>("Planning");

  function openAdd(stage: ProjectStage = "Planning") {
    setDefaultAddStage(stage);
    setAddOpen(true);
  }

  const filtered = projects.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase());
    const matchHealth = healthFilter === "All" || p.health === healthFilter;
    return matchSearch && matchHealth;
  });

  const byStage = KANBAN_STAGES.reduce<Record<string, Project[]>>((acc, s) => {
    acc[s] = filtered.filter(p => p.stage === s);
    return acc;
  }, {});

  const activeProject = activeId ? projects.find(p => p.id === activeId) : null;

  function handleDragStart({ active }: DragStartEvent) { setActiveId(String(active.id)); }
  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over) return;
    const targetStage = String(over.id) as ProjectStage;
    if (!KANBAN_STAGES.includes(targetStage)) return;
    const proj = projects.find(p => p.id === String(active.id));
    if (proj && proj.stage !== targetStage) {
      moveProject(String(active.id), targetStage);
      toast({ title: `${proj.name} → ${targetStage}` });
    }
  }
  function handleMoveCard(project: Project, direction: "prev" | "next") {
    const idx = KANBAN_STAGES.indexOf(project.stage);
    const nextIdx = direction === "next" ? idx + 1 : idx - 1;
    if (nextIdx < 0 || nextIdx >= KANBAN_STAGES.length) return;
    const targetStage = KANBAN_STAGES[nextIdx];
    moveProject(project.id, targetStage);
    toast({ title: `${project.name} → ${targetStage}` });
  }

  const total      = projects.length;
  const critical   = projects.filter(p => p.health === "Critical").length;
  const completed  = projects.filter(p => p.stage === "Completed").length;
  const atRisk     = projects.filter(p => p.health === "At Risk" || p.health === "Delayed").length;
  const totalValue = projects.reduce((s, p) => s + p.value, 0);

  const HEALTH_FILTERS = ["All", "Healthy", "At Risk", "Delayed", "Critical", "Completed"];

  return (
    <div className="space-y-4 max-w-[1600px]">
      {/* Stats bar */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total Projects",  value: total     },
          { label: "Completed",       value: completed  },
          { label: "At Risk",         value: atRisk     },
          { label: "Critical",        value: critical   },
          { label: "Portfolio Value", value: `SAR ${(totalValue / 1000000).toFixed(1)}M` },
        ].map(s => (
          <div key={s.label} className="glass p-3.5">
            <p className="text-[10px] text-white/35 uppercase tracking-wide">{s.label}</p>
            <p className="text-[20px] font-700 mt-0.5 text-white/85">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="glass p-3 flex items-center gap-3 flex-wrap">
        <div className="flex items-center glass-sm p-0.5 rounded-lg">
          <button onClick={() => setView("kanban")} className={`px-2.5 py-1 rounded-md text-[10px] transition-colors flex items-center gap-1 ${view === "kanban" ? "bg-white/[0.1] text-white/80" : "text-white/35 hover:text-white/60"}`}>
            <LayoutGrid className="w-3 h-3" /> Kanban
          </button>
          <button onClick={() => setView("list")} className={`px-2.5 py-1 rounded-md text-[10px] transition-colors flex items-center gap-1 ${view === "list" ? "bg-white/[0.1] text-white/80" : "text-white/35 hover:text-white/60"}`}>
            <List className="w-3 h-3" /> List
          </button>
        </div>

        <div className="flex items-center gap-1.5 glass-sm px-2.5 py-1.5 rounded-lg flex-1 max-w-[220px]">
          <Search className="w-3 h-3 text-white/28" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="bg-transparent text-[11px] text-white/60 outline-none flex-1 placeholder-white/20"
          />
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          {HEALTH_FILTERS.map(f => (
            <button key={f} onClick={() => setHealthFilter(f)}
              className={`px-2 py-1 rounded-lg text-[9px] font-600 uppercase tracking-wide transition-all border ${healthFilter === f ? "bg-white/[0.1] border-white/20 text-white/80" : "border-transparent text-white/30 hover:border-white/10 hover:text-white/55"}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="ml-auto">
          <button onClick={() => openAdd()} className="glass-sm px-3 py-1.5 text-[10px] text-white/50 hover:text-white/75 flex items-center gap-1.5 rounded-lg transition-colors border border-white/[0.08]">
            <Plus className="w-3 h-3" /> New Project
          </button>
        </div>
      </div>

      {/* Kanban view */}
      {view === "kanban" && (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={rectIntersection}>
          <div className="flex gap-3 overflow-x-auto pb-4 min-h-[60vh]" style={{ scrollSnapType: "x mandatory" }}>
            {KANBAN_STAGES.map((stage, idx) => (
              <KanbanColumn
                key={stage} stage={stage}
                displayLabel={stageLabels[stage] ?? stage}
                projects={byStage[stage] ?? []}
                onProjectClick={setSelectedProject}
                onAddProject={() => openAdd(stage)}
                onMoveCard={handleMoveCard}
                onRenameStage={renameProjectStage}
                stageIndex={idx} totalStages={KANBAN_STAGES.length}
              />
            ))}
          </div>
          <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
            {activeProject ? <ProjectCardOverlay project={activeProject} /> : null}
          </DragOverlay>
        </DndContext>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="glass overflow-hidden rounded-xl">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {["Project", "Client", "Type", "Stage", "Health", "Progress", "Deadline", "Priority", "Team"].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 text-[9px] font-600 tracking-[0.12em] uppercase text-white/28">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const h = HEALTH_META[p.health] ?? HEALTH_META["Healthy"];
                return (
                  <tr key={p.id} onClick={() => setSelectedProject(p)}
                    className="border-b border-white/[0.03] hover:bg-white/[0.025] transition-colors cursor-pointer">
                    <td className="px-3 py-2.5">
                      <p className="text-[11px] font-600 text-white/80">{p.name}</p>
                      <div className="flex flex-wrap gap-1 mt-1">{p.tags.slice(0, 1).map(t => <TagPill key={t} tag={t} />)}</div>
                    </td>
                    <td className="px-3 py-2.5 text-[10px] text-white/50">{p.client}</td>
                    <td className="px-3 py-2.5 text-[10px] text-white/45">{p.type}</td>
                    <td className="px-3 py-2.5"><span className="text-[9px] glass-sm px-1.5 py-0.5 rounded text-white/55">{p.stage}</span></td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full ${h.bg} ${h.text}`}>{p.health}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-white/[0.06]">
                          <div className={`h-full rounded-full ${p.progress >= 100 ? "bg-green-400" : "bg-blue-400"}`} style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="text-[10px] text-white/50">{p.progress}%</span>
                      </div>
                    </td>
                    <td className={`px-3 py-2.5 text-[10px] ${p.daysRemaining <= 0 ? "text-red-400 font-600" : p.daysRemaining <= 7 ? "text-orange-400" : "text-white/40"}`}>
                      {p.daysRemaining <= 0 ? "OVERDUE" : p.deadline}
                    </td>
                    <td className="px-3 py-2.5"><span className={`badge text-[8px] py-0 ${PRIORITY_COLOR[p.priority]}`}>{p.priority}</span></td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-0.5">
                        {p.team.slice(0, 3).map(m => (
                          <div key={m} className="w-5 h-5 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-[7px] font-700 text-white/60">{m}</div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedProject && <ProjectDetailDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />}
      <AddProjectModal open={addOpen} onClose={() => setAddOpen(false)} defaultStage={defaultAddStage} />
    </div>
  );
}
