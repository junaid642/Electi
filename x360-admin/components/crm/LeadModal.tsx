"use client";
import { useState, useRef } from "react";
import {
  Phone, Mail, MessageCircle, Star, Building2, MapPin, Calendar,
  Clock, User, Briefcase, Plus, CheckCircle, Circle, Trash2,
  FileText, Activity, Bot, Users, Edit3, Save,
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { STAGE_COLOR } from "@/lib/utils";
import type { Lead, CommType, Priority } from "@/lib/types";

const TABS = ["Overview","Communication","Proposals","Files","Tasks","Timeline","Notes","AI Insights","Activity"] as const;
type Tab = typeof TABS[number];

const TAB_ICONS = {
  Overview: Building2, Communication: MessageCircle, Proposals: FileText,
  Files: Briefcase, Tasks: CheckCircle, Timeline: Clock, Notes: Edit3,
  "AI Insights": Bot, Activity: Activity,
};

interface Props { open: boolean; onClose: () => void; lead: Lead | null; onEdit?: () => void; }

export default function LeadModal({ open, onClose, lead, onEdit }: Props) {
  const [tab, setTab] = useState<Tab>("Overview");
  const { addTask, toggleTask, deleteTask, addCommunication, updateNotes } = useStore();
  const { toast } = useToast();

  if (!lead) return null;

  return (
    <Modal open={open} onClose={onClose} size="xl" className="h-[90vh]">
      {/* Lead Header */}
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-start justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-white/50" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[14px] font-700 text-white/92 font-display">{lead.company}</h2>
              <span className={`badge ${STAGE_COLOR[lead.stage] ?? "badge-white"}`}>{lead.stage}</span>
              <span className={`badge ${lead.priority === "High" ? "badge-red" : lead.priority === "Medium" ? "badge-amber" : "badge-white"}`}>{lead.priority}</span>
            </div>
            <p className="text-[11px] text-white/50 mt-0.5">{lead.contact} · {lead.designation}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ScoreGauge score={lead.score} />
          <button onClick={onEdit} className="px-3 py-1.5 glass-sm text-[11px] text-white/60 hover:text-white/85 flex items-center gap-1.5 rounded-lg transition-colors border border-white/[0.06]">
            <Edit3 className="w-3 h-3" /> Edit
          </button>
          <button onClick={onClose} className="w-7 h-7 glass-sm flex items-center justify-center text-white/40 hover:text-white/70 rounded-lg transition-colors text-lg leading-none">×</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 py-2 border-b border-white/[0.04] flex items-center gap-2 shrink-0 flex-wrap">
        <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 glass-sm text-[11px] text-green-400 hover:bg-green-500/10 rounded-lg transition-colors border border-green-500/20">
          <Phone className="w-3 h-3" /> {lead.phone}
        </a>
        <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 px-3 py-1.5 glass-sm text-[11px] text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors border border-blue-500/20">
          <Mail className="w-3 h-3" /> {lead.email}
        </a>
        <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 glass-sm text-[11px] text-green-300 hover:bg-green-500/10 rounded-lg transition-colors border border-green-500/15">
          <MessageCircle className="w-3 h-3" /> WhatsApp
        </a>
        <div className="ml-auto flex items-center gap-1 text-[10px] text-white/30">
          <MapPin className="w-2.5 h-2.5" />{lead.city}, {lead.country}
          <span className="ml-2">·</span>
          <Briefcase className="w-2.5 h-2.5 ml-1" />{lead.industry}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 border-b border-white/[0.04] flex items-center gap-0.5 overflow-x-auto shrink-0 scrollbar-none">
        {TABS.map((t) => {
          const Icon = TAB_ICONS[t];
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-[11px] font-500 border-b-2 whitespace-nowrap transition-colors ${
                tab === t ? "border-white/60 text-white/85" : "border-transparent text-white/35 hover:text-white/60"
              }`}
            >
              <Icon className="w-3 h-3" />
              {t}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {tab === "Overview" && <OverviewTab lead={lead} />}
        {tab === "Communication" && <CommTab lead={lead} addCommunication={addCommunication} toast={toast} />}
        {tab === "Proposals" && <ProposalsTab lead={lead} />}
        {tab === "Files" && <FilesTab />}
        {tab === "Tasks" && <TasksTab lead={lead} addTask={addTask} toggleTask={toggleTask} deleteTask={deleteTask} toast={toast} />}
        {tab === "Timeline" && <TimelineTab lead={lead} />}
        {tab === "Notes" && <NotesTab lead={lead} updateNotes={updateNotes} toast={toast} />}
        {tab === "AI Insights" && <AIInsightsTab lead={lead} />}
        {tab === "Activity" && <ActivityTab lead={lead} />}
      </div>
    </Modal>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 80 ? "text-green-400" : score >= 60 ? "text-amber-400" : "text-red-400";
  return (
    <div className="flex items-center gap-1.5 glass-sm px-2.5 py-1.5 rounded-lg">
      <Star className="w-3 h-3 text-amber-400" />
      <span className={`text-[13px] font-700 font-mono ${color}`}>{score}</span>
    </div>
  );
}

function OverviewTab({ lead }: { lead: Lead }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Lead Score",    value: `${lead.score}/100`, color: "text-amber-400" },
          { label: "Last Contact",  value: lead.lastContact || "—", color: "text-blue-400" },
          { label: "Next Follow-up",value: lead.nextFollowUp || "—", color: "text-purple-400" },
        ].map((k) => (
          <div key={k.label} className="glass p-3 rounded-xl">
            <p className="text-[9px] text-white/35 uppercase tracking-wide mb-1">{k.label}</p>
            <p className={`text-[14px] font-700 font-display ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="glass p-4 rounded-xl space-y-3">
        <p className="text-[10px] text-white/35 uppercase tracking-wide font-600">Contact Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { icon: User, label: "Contact",     value: `${lead.contact} — ${lead.designation}` },
            { icon: Building2, label: "Company", value: lead.company },
            { icon: Phone, label: "Phone",       value: lead.phone },
            { icon: Mail, label: "Email",        value: lead.email },
            { icon: MapPin, label: "Location",   value: `${lead.city}, ${lead.country}` },
            { icon: Briefcase, label: "Industry",value: lead.industry },
            { icon: Users, label: "Assigned To", value: lead.assigned },
            { icon: Activity, label: "Source",   value: lead.source },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon className="w-3.5 h-3.5 text-white/28 shrink-0" />
              <span className="text-[10px] text-white/35 w-18 shrink-0">{label}</span>
              <span className="text-[11px] text-white/72 truncate">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {lead.notes && (
        <div className="glass p-4 rounded-xl">
          <p className="text-[10px] text-white/35 uppercase tracking-wide font-600 mb-2">Notes</p>
          <p className="text-[12px] text-white/65 leading-relaxed">{lead.notes}</p>
        </div>
      )}
    </div>
  );
}

function CommTab({ lead, addCommunication, toast }: { lead: Lead; addCommunication: Function; toast: Function }) {
  const [type, setType] = useState<CommType>("note");
  const [content, setContent] = useState("");
  const TYPES: { value: CommType; label: string; color: string }[] = [
    { value: "note", label: "Note", color: "text-white/60" },
    { value: "call", label: "Call", color: "text-green-400" },
    { value: "email", label: "Email", color: "text-blue-400" },
    { value: "whatsapp", label: "WhatsApp", color: "text-green-300" },
    { value: "meeting", label: "Meeting", color: "text-purple-400" },
  ];
  const ICONS: Record<CommType, React.ReactNode> = {
    note: <Edit3 className="w-3 h-3" />,
    call: <Phone className="w-3 h-3" />,
    email: <Mail className="w-3 h-3" />,
    whatsapp: <MessageCircle className="w-3 h-3" />,
    meeting: <Calendar className="w-3 h-3" />,
  };

  function submit() {
    if (!content.trim()) return;
    addCommunication(lead.id, { type, content, author: "You", direction: "out" });
    toast(`${type.charAt(0).toUpperCase() + type.slice(1)} logged`);
    setContent("");
  }

  return (
    <div className="space-y-4">
      <div className="glass p-4 rounded-xl space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          {TYPES.map((t) => (
            <button key={t.value} onClick={() => setType(t.value)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-500 transition-colors flex items-center gap-1.5 ${type === t.value ? "bg-white/[0.1] " + t.color : "text-white/35 hover:bg-white/[0.05]"}`}>
              {ICONS[t.value]}{t.label}
            </button>
          ))}
        </div>
        <textarea value={content} onChange={e => setContent(e.target.value)}
          placeholder={`Log a ${type}…`}
          className="w-full bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 py-2.5 text-[12px] text-white/75 placeholder-white/22 outline-none resize-none h-24 focus:border-white/15 transition-colors" />
        <div className="flex justify-end">
          <button onClick={submit} className="px-4 py-1.5 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-white/75 text-[11px] rounded-lg transition-colors font-500">
            Log {type}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] text-white/30 uppercase tracking-wide font-600">History</p>
        {lead.communications.length === 0 && (
          <p className="text-[12px] text-white/28 text-center py-8">No communications logged yet</p>
        )}
        {lead.communications.map((c) => (
          <div key={c.id} className="glass-sm p-3 rounded-xl flex gap-3">
            <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
              {ICONS[c.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-600 text-white/60 capitalize">{c.type}</span>
                <span className="text-[9px] text-white/28">{new Date(c.timestamp).toLocaleDateString()}</span>
                <span className="text-[9px] text-white/20 ml-auto">{c.author}</span>
              </div>
              <p className="text-[11px] text-white/60 mt-0.5 leading-relaxed">{c.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProposalsTab({ lead }: { lead: Lead }) {
  const MOCK = [
    { id: "P-1042", title: "AI Platform — Full Suite", value: lead.value, status: "Sent", date: "2025-06-07" },
    { id: "P-1038", title: "AI Platform — Pilot (3 months)", value: Math.round(lead.value * 0.2), status: "Viewed", date: "2025-05-20" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-white/30 uppercase tracking-wide font-600">Linked Proposals</p>
        <button className="flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white/75 glass-sm px-2.5 py-1.5 rounded-lg transition-colors">
          <Plus className="w-3 h-3" /> New Proposal
        </button>
      </div>
      {MOCK.map((p) => (
        <div key={p.id} className="glass p-4 rounded-xl flex items-center gap-4">
          <FileText className="w-8 h-8 text-blue-400/60 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-600 text-white/80">{p.title}</p>
            <p className="text-[10px] text-white/35 mt-0.5">{p.id} · {p.date}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[12px] font-700 text-white/70 font-mono">SAR {(p.value/1000).toFixed(0)}K</p>
            <span className={`badge mt-1 ${p.status === "Sent" ? "badge-blue" : p.status === "Viewed" ? "badge-purple" : "badge-green"}`}>{p.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FilesTab() {
  const FILES = [
    { name: "Company_Profile.pdf", size: "2.4 MB", date: "2025-06-07", type: "pdf" },
    { name: "Technical_Requirements.docx", size: "890 KB", date: "2025-06-05", type: "doc" },
    { name: "Budget_Approval.xlsx", size: "120 KB", date: "2025-06-02", type: "xls" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-white/30 uppercase tracking-wide font-600">Attached Files</p>
        <button className="flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white/75 glass-sm px-2.5 py-1.5 rounded-lg transition-colors">
          <Plus className="w-3 h-3" /> Upload File
        </button>
      </div>
      {FILES.map((f) => (
        <div key={f.name} className="glass-sm p-3 rounded-xl flex items-center gap-3 hover:bg-white/[0.03] cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-white/75 truncate">{f.name}</p>
            <p className="text-[9px] text-white/28 mt-0.5">{f.size} · {f.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TasksTab({ lead, addTask, toggleTask, deleteTask, toast }: any) {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("Ahmad S.");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");

  function submit() {
    if (!title.trim()) return;
    addTask(lead.id, { title, assignee, dueDate, priority, done: false });
    toast("Task added");
    setTitle(""); setAdding(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-white/30 uppercase tracking-wide font-600">Tasks ({lead.tasks.length})</p>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white/75 glass-sm px-2.5 py-1.5 rounded-lg transition-colors">
          <Plus className="w-3 h-3" /> Add Task
        </button>
      </div>

      {adding && (
        <div className="glass p-3 rounded-xl space-y-2.5">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task description…"
            className="w-full bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-2 text-[12px] text-white/75 placeholder-white/22 outline-none" />
          <div className="grid grid-cols-3 gap-2">
            <select value={assignee} onChange={e => setAssignee(e.target.value)} className="bg-white/[0.04] border border-white/[0.07] rounded-lg px-2 py-1.5 text-[11px] text-white/65 outline-none">
              {["Ahmad S.","Sarah M.","Khalid O.","Fatima G."].map(s => <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>)}
            </select>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="bg-white/[0.04] border border-white/[0.07] rounded-lg px-2 py-1.5 text-[11px] text-white/65 outline-none" />
            <select value={priority} onChange={e => setPriority(e.target.value as Priority)} className="bg-white/[0.04] border border-white/[0.07] rounded-lg px-2 py-1.5 text-[11px] text-white/65 outline-none">
              {["High","Medium","Low"].map(p => <option key={p} value={p} className="bg-[#0a0a0a]">{p}</option>)}
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setAdding(false)} className="text-[11px] text-white/40 px-3 py-1.5 glass-sm rounded-lg">Cancel</button>
            <button onClick={submit} className="text-[11px] text-white/75 px-3 py-1.5 bg-white/[0.08] border border-white/[0.1] rounded-lg font-500">Add Task</button>
          </div>
        </div>
      )}

      {lead.tasks.length === 0 && !adding && (
        <p className="text-[12px] text-white/28 text-center py-8">No tasks yet</p>
      )}
      {lead.tasks.map((task: any) => (
        <div key={task.id} className={`glass-sm p-3 rounded-xl flex items-center gap-3 group ${task.done ? "opacity-50" : ""}`}>
          <button onClick={() => { toggleTask(lead.id, task.id); toast(task.done ? "Task reopened" : "Task completed"); }}>
            {task.done ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Circle className="w-4 h-4 text-white/25 hover:text-white/60 transition-colors" />}
          </button>
          <div className="flex-1 min-w-0">
            <p className={`text-[12px] text-white/72 ${task.done ? "line-through" : ""}`}>{task.title}</p>
            <p className="text-[9px] text-white/28 mt-0.5">{task.assignee}{task.dueDate ? ` · Due ${task.dueDate}` : ""}</p>
          </div>
          <span className={`badge text-[9px] ${task.priority === "High" ? "badge-red" : task.priority === "Medium" ? "badge-amber" : "badge-white"}`}>{task.priority}</span>
          <button onClick={() => { deleteTask(lead.id, task.id); toast("Task deleted"); }} className="opacity-0 group-hover:opacity-100 text-white/25 hover:text-red-400 transition-all ml-1">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}

function TimelineTab({ lead }: { lead: Lead }) {
  const events = [...lead.activities, ...lead.communications.map(c => ({ id: c.id, type: c.type, text: c.content, author: c.author, timestamp: c.timestamp }))].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const ICON_MAP: Record<string, React.ReactNode> = {
    note: <Edit3 className="w-3 h-3" />, call: <Phone className="w-3 h-3" />,
    email: <Mail className="w-3 h-3" />, meeting: <Calendar className="w-3 h-3" />,
    whatsapp: <MessageCircle className="w-3 h-3" />, stage_change: <Activity className="w-3 h-3" />,
    task: <CheckCircle className="w-3 h-3" />,
  };
  return (
    <div className="space-y-1">
      {events.map((e, i) => (
        <div key={e.id} className="flex gap-3 group">
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 shrink-0 mt-0.5">
              {ICON_MAP[e.type] ?? <Activity className="w-3 h-3" />}
            </div>
            {i < events.length - 1 && <div className="w-px flex-1 bg-white/[0.04] my-1" />}
          </div>
          <div className="pb-3 min-w-0 flex-1">
            <p className="text-[11px] text-white/65 leading-relaxed">{e.text}</p>
            <p className="text-[9px] text-white/28 mt-0.5">{e.author} · {new Date(e.timestamp).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function NotesTab({ lead, updateNotes, toast }: any) {
  const [notes, setNotes] = useState(lead.notes);
  const changed = notes !== lead.notes;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-white/30 uppercase tracking-wide font-600">Team Notes</p>
        {changed && (
          <button onClick={() => { updateNotes(lead.id, notes); toast("Notes saved"); }}
            className="flex items-center gap-1.5 text-[11px] text-white/70 bg-white/[0.08] border border-white/[0.1] px-3 py-1.5 rounded-lg transition-colors font-500">
            <Save className="w-3 h-3" /> Save
          </button>
        )}
      </div>
      <textarea value={notes} onChange={e => setNotes(e.target.value)}
        placeholder="Write internal notes about this lead…"
        className="w-full h-64 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-[12px] text-white/72 placeholder-white/22 outline-none resize-none focus:border-white/12 transition-colors leading-relaxed" />
    </div>
  );
}

function AIInsightsTab({ lead }: { lead: Lead }) {
  const insights = [
    { title: "Deal Probability", value: `${Math.min(98, lead.score + 3)}%`, color: "text-green-400", note: "Based on engagement score, industry fit, and stage progression." },
    { title: "Recommended Action", value: "Follow up within 48h", color: "text-blue-400", note: `${lead.contact} typically responds on ${["Mon","Tue","Wed","Thu"][Math.floor(lead.score % 4)]}-${["Wed","Thu","Fri","Mon"][Math.floor(lead.score % 4)]}.` },
    { title: "Competitor Risk", value: lead.score < 70 ? "High" : lead.score < 85 ? "Medium" : "Low", color: lead.score < 70 ? "text-red-400" : lead.score < 85 ? "text-amber-400" : "text-green-400", note: "3 known competitors active in this segment." },
    { title: "Deal Size Accuracy", value: `±${(10 - lead.score * 0.08).toFixed(0)}%`, color: "text-purple-400", note: "Estimated based on similar ${lead.industry} deals closed in last 6 months." },
  ];
  return (
    <div className="space-y-3">
      <div className="glass p-4 rounded-xl flex items-start gap-3">
        <Bot className="w-8 h-8 text-purple-400/70 shrink-0 mt-0.5" />
        <div>
          <p className="text-[12px] font-600 text-white/80">GPT-4o CRM Analysis</p>
          <p className="text-[11px] text-white/45 mt-1 leading-relaxed">
            {lead.company} is a <strong className="text-white/65">{lead.priority.toLowerCase()}-priority</strong> {lead.industry} lead in <strong className="text-white/65">{lead.stage}</strong> stage. 
            Engagement score of {lead.score}/100 indicates {lead.score >= 80 ? "strong buying intent" : lead.score >= 60 ? "moderate interest" : "early exploration"}. 
            Assigned to {lead.assigned} — recommend accelerating proposal timeline.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {insights.map((ins) => (
          <div key={ins.title} className="glass p-3 rounded-xl">
            <p className="text-[9px] text-white/30 uppercase tracking-wide">{ins.title}</p>
            <p className={`text-[18px] font-700 font-display mt-1 ${ins.color}`}>{ins.value}</p>
            <p className="text-[10px] text-white/38 mt-1 leading-relaxed">{ins.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityTab({ lead }: { lead: Lead }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-white/30 uppercase tracking-wide font-600">Activity Log ({lead.activities.length})</p>
      {lead.activities.map((a) => (
        <div key={a.id} className="glass-sm p-3 rounded-xl flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center shrink-0 mt-0.5">
            <Activity className="w-3 h-3 text-white/35" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-white/65">{a.text}</p>
            <p className="text-[9px] text-white/28 mt-0.5">{a.author} · {new Date(a.timestamp).toLocaleString()}</p>
          </div>
          <span className="text-[9px] text-white/22 capitalize glass-sm px-1.5 py-0.5 rounded">{a.type.replace("_", " ")}</span>
        </div>
      ))}
    </div>
  );
}
