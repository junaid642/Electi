"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Building2, FileText, Tag, Users2,
  ChevronRight, ChevronLeft, Check,
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import type { ProjectStage, Priority, ProjectHealth } from "@/lib/types";

// ── Options ───────────────────────────────────────────────────────────────────
const STAGES: ProjectStage[] = [
  "Planning","Discovery","Client Approval","Resource Allocation",
  "Production","Development","QA Testing","Internal Review",
  "Client Review","Revision","Deployment",
  "Support & Maintenance","Completed","Delayed","On Hold","Critical",
];
const PRIORITIES: Priority[] = ["High","Medium","Low"];
const HEALTH_OPTIONS: ProjectHealth[] = ["Healthy","At Risk","Delayed","Critical","Completed"];

const PROJECT_TYPES = [
  "360 Virtual Tour","AI Development","Website Development","Mobile App",
  "CRM","ERP","VR Experience","Drone Documentation","SaaS Platform",
  "Digital Twins","AR Experience","3D Visualization","Custom Software",
  "Business Intelligence","Enterprise Portal","API Development","Branding & Media",
];

const INDUSTRIES = [
  "Real Estate","Luxury Real Estate","Hospitality","Hotels","Resorts",
  "Construction","Engineering","Architecture","Interior Design",
  "Government","Museums","Education","Healthcare","Retail","Automotive",
  "Industrial","Oil & Gas","Smart Cities","Events","Exhibition","Tourism",
  "Technology","AI Companies","Startups","Enterprise","Telecom","Defense",
];

const TEAM_MEMBERS = ["AS","SM","KO","FG","OT","NK","YA","RA","HK","MA"];
const FULL_NAMES: Record<string,string> = {
  AS: "Ahmad S.", SM: "Sarah M.", KO: "Khalid O.", FG: "Fatima G.",
  OT: "Omar T.", NK: "Nadia K.", YA: "Yousef A.", RA: "Rania A.",
  HK: "Hessa K.", MA: "Mohammed A.",
};

const TAGS = [
  "360 Virtual Tour","AI Development","Website Development","Mobile App",
  "CRM","ERP","VR Experience","Drone Documentation","SaaS Platform",
];

// ── Schema ────────────────────────────────────────────────────────────────────
const schema = z.object({
  name:        z.string().min(2, "Required"),
  client:      z.string().min(2, "Required"),
  type:        z.string().min(1, "Required"),
  industry:    z.string().min(1, "Required"),
  description: z.string().optional(),
  stage:       z.string().min(1) as z.ZodType<ProjectStage>,
  health:      z.string().min(1) as z.ZodType<ProjectHealth>,
  priority:    z.string().min(1) as z.ZodType<Priority>,
  progress:    z.coerce.number().min(0).max(100),
  value:       z.coerce.number().min(0),
  startDate:   z.string().min(1, "Required"),
  deadline:    z.string().min(1, "Required"),
});
type FormData = z.infer<typeof schema>;

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/80 placeholder-white/22 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-colors";
const selectCls = inputCls + " cursor-pointer";

const Field = ({ label, error, icon: Icon, children }: {
  label: string; error?: string; icon?: React.ElementType; children: React.ReactNode;
}) => (
  <div>
    <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-1 flex items-center gap-1">
      {Icon && <Icon className="w-2.5 h-2.5" />}{label}
    </label>
    {children}
    {error && <p className="text-[10px] text-red-400 mt-0.5">{error}</p>}
  </div>
);

const TABS = [
  { label: "Project Details", icon: Building2 },
  { label: "Setup & Timeline", icon: FileText  },
  { label: "Tags & Team",      icon: Tag       },
];

interface Props { open: boolean; onClose: () => void; defaultStage?: ProjectStage; }

function daysUntil(dateStr: string): number {
  if (!dateStr) return 0;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function AddProjectModal({ open, onClose, defaultStage = "Planning" }: Props) {
  const { addProject } = useStore();
  const { toast } = useToast();
  const [tab, setTab] = useState(0);
  const [team, setTeam] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "", client: "", type: "360 Virtual Tour", industry: "Real Estate",
      description: "", stage: defaultStage, health: "Healthy", priority: "Medium",
      progress: 0, value: 0,
      startDate: new Date().toISOString().slice(0, 10),
      deadline: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: "", client: "", type: "360 Virtual Tour", industry: "Real Estate",
        description: "", stage: defaultStage, health: "Healthy", priority: "Medium",
        progress: 0, value: 0,
        startDate: new Date().toISOString().slice(0, 10),
        deadline: "",
      });
      setTeam([]); setTags([]); setTab(0);
    }
  }, [open, defaultStage, reset]);

  const progress = watch("progress");

  const toggleTeam = (m: string) => setTeam(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  const toggleTag  = (t: string) => setTags(prev => prev.includes(t)  ? prev.filter(x => x !== t)  : [...prev, t]);

  const onSubmit = (data: FormData) => {
    addProject({
      ...data,
      team,
      tags,
      description: data.description ?? "",
      daysRemaining: daysUntil(data.deadline),
    });
    toast("Project created successfully");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Project" subtitle="Enterprise project intake form" size="xl">
      {/* Tab Bar */}
      <div className="flex border-b border-white/[0.05] px-5 pt-1">
        {TABS.map((t, i) => {
          const Icon = t.icon;
          return (
            <button
              key={i} type="button" onClick={() => setTab(i)}
              className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-600 uppercase tracking-wide border-b-2 transition-all -mb-px ${tab === i ? "border-white/60 text-white/80" : "border-transparent text-white/30 hover:text-white/55"}`}
            >
              <Icon className="w-3 h-3" />{t.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 space-y-3 min-h-[380px]">

          {/* ── TAB 0: Project Details ─────────────────────────────────────── */}
          {tab === 0 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Project Name *" error={errors.name?.message} icon={Building2}>
                  <input {...register("name")} className={inputCls} placeholder="NEOM Smart City Portal" />
                </Field>
                <Field label="Client Name *" error={errors.client?.message} icon={Building2}>
                  <input {...register("client")} className={inputCls} placeholder="NEOM Corp" />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Project Type *" error={errors.type?.message}>
                  <select {...register("type")} className={selectCls}>
                    {PROJECT_TYPES.map(t => <option key={t} value={t} className="bg-[#0a0a0a]">{t}</option>)}
                  </select>
                </Field>
                <Field label="Industry *" error={errors.industry?.message}>
                  <select {...register("industry")} className={selectCls}>
                    {INDUSTRIES.map(i => <option key={i} value={i} className="bg-[#0a0a0a]">{i}</option>)}
                  </select>
                </Field>
              </div>

              <Field label="Project Description">
                <textarea
                  {...register("description")}
                  className={inputCls + " resize-none h-36"}
                  placeholder="Describe the project scope, objectives, and key deliverables…"
                />
              </Field>
            </>
          )}

          {/* ── TAB 1: Setup & Timeline ───────────────────────────────────── */}
          {tab === 1 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Pipeline Stage *" error={errors.stage?.message}>
                  <select {...register("stage")} className={selectCls}>
                    {STAGES.map(s => <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>)}
                  </select>
                </Field>
                <Field label="Health Status *">
                  <select {...register("health")} className={selectCls}>
                    {HEALTH_OPTIONS.map(h => <option key={h} value={h} className="bg-[#0a0a0a]">{h}</option>)}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Priority *" error={errors.priority?.message}>
                  <select {...register("priority")} className={selectCls}>
                    {PRIORITIES.map(p => <option key={p} value={p} className="bg-[#0a0a0a]">{p}</option>)}
                  </select>
                </Field>
                <Field label="Contract Value (SAR)" error={errors.value?.message}>
                  <input {...register("value")} type="number" min="0" className={inputCls} placeholder="500000" />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Start Date *" error={errors.startDate?.message}>
                  <input {...register("startDate")} type="date" className={inputCls} />
                </Field>
                <Field label="Deadline *" error={errors.deadline?.message}>
                  <input {...register("deadline")} type="date" className={inputCls} />
                </Field>
              </div>

              <Field label={`Initial Progress — ${progress ?? 0}%`} error={errors.progress?.message}>
                <div className="flex items-center gap-3">
                  <input
                    {...register("progress")}
                    type="range" min="0" max="100"
                    className="flex-1 accent-white/60 h-1.5 cursor-pointer"
                  />
                  <span className="text-[11px] text-white/55 w-8 text-right">{progress ?? 0}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.06] mt-1">
                  <div className="h-full rounded-full bg-blue-400 transition-all" style={{ width: `${progress ?? 0}%` }} />
                </div>
              </Field>
            </>
          )}

          {/* ── TAB 2: Tags & Team ────────────────────────────────────────── */}
          {tab === 2 && (
            <>
              {/* Tags */}
              <div>
                <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-2">
                  Service Tags ({tags.length} selected)
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {TAGS.map(tag => (
                    <button
                      key={tag} type="button" onClick={() => toggleTag(tag)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] text-left transition-all border ${tags.includes(tag) ? "bg-white/[0.08] border-white/25 text-white/80" : "bg-white/[0.02] border-white/[0.05] text-white/40 hover:border-white/15 hover:text-white/60"}`}
                    >
                      <div className={`w-3 h-3 rounded flex items-center justify-center shrink-0 ${tags.includes(tag) ? "bg-white/30" : "bg-white/[0.05]"}`}>
                        {tags.includes(tag) && <Check className="w-2 h-2 text-white" />}
                      </div>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div>
                <label className="text-[9px] font-600 text-white/35 uppercase tracking-wide block mb-2">
                  <Users2 className="w-2.5 h-2.5 inline mr-1" />
                  Team Members ({team.length} selected)
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {TEAM_MEMBERS.map(m => (
                    <button
                      key={m} type="button" onClick={() => toggleTeam(m)}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[10px] text-left transition-all border ${team.includes(m) ? "bg-white/[0.08] border-white/25 text-white/80" : "bg-white/[0.02] border-white/[0.05] text-white/40 hover:border-white/15 hover:text-white/60"}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-700 shrink-0 ${team.includes(m) ? "bg-white/20 text-white/90" : "bg-white/[0.06] text-white/40"}`}>{m}</div>
                      {FULL_NAMES[m]}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-3 border-t border-white/[0.05]">
          <div className="flex gap-1">
            {TABS.map((_, i) => (
              <button key={i} type="button" onClick={() => setTab(i)}
                className={`h-1.5 rounded-full transition-all ${tab === i ? "bg-white/70 w-4" : "bg-white/20 w-1.5"}`} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {tab > 0 && (
              <button type="button" onClick={() => setTab(t => t - 1)}
                className="px-3 py-1.5 text-[11px] text-white/45 hover:text-white/70 glass-sm rounded-lg flex items-center gap-1 transition-colors">
                <ChevronLeft className="w-3 h-3" /> Back
              </button>
            )}
            {tab < TABS.length - 1 ? (
              <button type="button" onClick={() => setTab(t => t + 1)}
                className="px-4 py-1.5 text-[11px] font-600 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] text-white/80 rounded-lg flex items-center gap-1 transition-colors">
                Next <ChevronRight className="w-3 h-3" />
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting}
                className="px-5 py-1.5 text-[11px] font-600 bg-white/[0.1] hover:bg-white/[0.16] border border-white/[0.12] text-white/85 rounded-lg transition-colors disabled:opacity-50">
                {isSubmitting ? "Creating…" : "Create Project"}
              </button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
