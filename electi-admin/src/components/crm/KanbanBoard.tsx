import { useState, useRef, useEffect } from "react";
import {
  DndContext, DragOverlay, rectIntersection,
  useDraggable, useDroppable,
  type DragEndEvent, type DragStartEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Building2, Phone, Mail, MessageCircle, Star, Plus, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { useCrm } from "@/lib/crm-store";
import { STAGES, STAGE_COLOR } from "@/lib/crm-types";
import type { CrmLead, LeadStage } from "@/lib/crm-types";
import { useToast } from "@/hooks/use-toast";

const STAGE_DOT: Record<string, string> = {
  "Incoming Lead": "bg-blue-400", "Initial Contact": "bg-cyan-400",
  "Qualified": "bg-purple-400", "Discovery Meeting": "bg-amber-400",
  "Demo Scheduled": "bg-yellow-400", "Proposal Preparation": "bg-slate-400",
  "Proposal Sent": "bg-orange-400", "Client Review": "bg-sky-400",
  "Negotiation": "bg-amber-500", "Waiting for Approval": "bg-violet-400",
  "Legal / Procurement": "bg-indigo-400", "Won": "bg-green-400",
  "Lost": "bg-red-400", "Follow-Up Later": "bg-teal-400",
  "Strategic Opportunity": "bg-fuchsia-400", "Partnership Potential": "bg-pink-400",
};

interface Props {
  onLeadClick: (lead: CrmLead) => void;
  onAddLead: (stage?: LeadStage) => void;
}

export default function KanbanBoard({ onLeadClick, onAddLead }: Props) {
  const { leads, moveLead, stageLabels, renameStage } = useCrm();
  const { toast } = useToast();
  const [activeId, setActiveId] = useState<string | null>(null);

  const byStage = STAGES.reduce<Record<string, CrmLead[]>>((acc, stage) => {
    acc[stage] = leads.filter((l) => l.stage === stage);
    return acc;
  }, {});

  const activeLead = activeId ? leads.find((l) => l.id === activeId) ?? null : null;

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(String(active.id));
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over) return;
    const targetStage = String(over.id) as LeadStage;
    if (!STAGES.includes(targetStage)) return;
    const lead = leads.find((l) => l.id === String(active.id));
    if (lead && lead.stage !== targetStage) {
      moveLead(String(active.id), targetStage);
      toast({ title: `${lead.company} → ${targetStage}` });
    }
  }

  function handleMoveCard(lead: CrmLead, direction: "prev" | "next") {
    const idx = STAGES.indexOf(lead.stage);
    const nextIdx = direction === "next" ? idx + 1 : idx - 1;
    if (nextIdx < 0 || nextIdx >= STAGES.length) return;
    moveLead(lead.id, STAGES[nextIdx]);
    toast({ title: `${lead.company} → ${STAGES[nextIdx]}` });
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={rectIntersection}>
      <div className="flex gap-3 overflow-x-auto pb-4 min-h-[60vh]" style={{ scrollSnapType: "x mandatory" }}>
        {STAGES.map((stage, i) => (
          <KanbanColumn
            key={stage}
            stage={stage}
            displayLabel={stageLabels[stage] ?? stage}
            leads={byStage[stage] ?? []}
            onLeadClick={onLeadClick}
            onAddLead={() => onAddLead(stage)}
            onMoveCard={handleMoveCard}
            onRenameStage={renameStage}
            stageIndex={i}
            totalStages={STAGES.length}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
        {activeLead ? <OverlayCard lead={activeLead} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

function KanbanColumn({
  stage, displayLabel, leads, onLeadClick, onAddLead, onMoveCard, onRenameStage, stageIndex, totalStages,
}: {
  stage: LeadStage; displayLabel: string; leads: CrmLead[]; onLeadClick: (l: CrmLead) => void;
  onAddLead: () => void; onMoveCard: (l: CrmLead, d: "prev" | "next") => void;
  onRenameStage: (stage: string, label: string) => void;
  stageIndex: number; totalStages: number;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const dot = STAGE_DOT[stage] ?? "bg-white/40";
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(displayLabel);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) inputRef.current?.select(); }, [editing]);

  function startEdit() {
    setDraft(displayLabel);
    setEditing(true);
  }

  function commit() {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== stage) onRenameStage(stage, trimmed);
    else if (!trimmed) onRenameStage(stage, stage);
    setEditing(false);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); commit(); }
    if (e.key === "Escape") { setEditing(false); }
  }

  return (
    <div
      ref={setNodeRef}
      className="flex-shrink-0 flex flex-col rounded-xl border border-white/[0.06] transition-all duration-150"
      style={{
        width: 240, scrollSnapAlign: "start",
        background: isOver ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
        borderColor: isOver ? "rgba(255,255,255,0.14)" : undefined,
      }}
    >
      <div className="px-3 py-2.5 border-b border-white/[0.05] flex items-center gap-2 group/header">
        <div className={`w-2 h-2 rounded-full ${dot} shrink-0`} />
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={onKey}
            className="flex-1 min-w-0 bg-white/[0.06] border border-white/[0.15] rounded px-1.5 py-0.5 text-[10px] font-bold text-white/85 uppercase tracking-[0.10em] outline-none focus:border-white/30"
            style={{ width: "100%" }}
          />
        ) : (
          <button
            onClick={startEdit}
            title="Click to rename"
            className="flex-1 min-w-0 flex items-center gap-1.5 text-left group/label"
          >
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.12em] truncate group-hover/label:text-white/90 transition-colors">
              {displayLabel}
            </p>
            <Pencil className="w-2.5 h-2.5 text-white/20 shrink-0 opacity-0 group-hover/header:opacity-100 transition-opacity" />
          </button>
        )}
        <div className="w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0">
          <span className="text-[9px] font-bold text-white/50">{leads.length}</span>
        </div>
      </div>
      <div className="flex-1 p-2 space-y-2 overflow-y-auto min-h-[100px]">
        {leads.map((lead) => (
          <DraggableCard
            key={lead.id}
            lead={lead}
            onClick={() => onLeadClick(lead)}
            onMoveCard={onMoveCard}
            canMovePrev={stageIndex > 0}
            canMoveNext={stageIndex < totalStages - 1}
          />
        ))}
        {leads.length === 0 && (
          <div className={`flex items-center justify-center h-16 border border-dashed rounded-lg transition-colors ${isOver ? "border-white/[0.12]" : "border-white/[0.05]"}`}>
            <p className="text-[9px] text-white/20">Drop here</p>
          </div>
        )}
      </div>
      <div className="p-2 border-t border-white/[0.04]">
        <button onClick={onAddLead} className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[10px] text-white/28 hover:text-white/55 hover:bg-white/[0.03] rounded-lg transition-colors">
          <Plus className="w-3 h-3" /> Add lead
        </button>
      </div>
    </div>
  );
}

function DraggableCard({ lead, onClick, onMoveCard, canMovePrev, canMoveNext }: {
  lead: CrmLead; onClick: () => void; onMoveCard: (l: CrmLead, d: "prev" | "next") => void;
  canMovePrev: boolean; canMoveNext: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: lead.id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform) }}
      className={`transition-opacity ${isDragging ? "opacity-40" : "opacity-100"}`} {...attributes}>
      <LeadCard lead={lead} onClick={onClick} listeners={listeners}
        onMoveCard={onMoveCard} canMovePrev={canMovePrev} canMoveNext={canMoveNext} />
    </div>
  );
}

function LeadCard({ lead, onClick, listeners, onMoveCard, canMovePrev, canMoveNext }: {
  lead: CrmLead; onClick: () => void; listeners?: ReturnType<typeof useDraggable>["listeners"];
  onMoveCard: (l: CrmLead, d: "prev" | "next") => void; canMovePrev: boolean; canMoveNext: boolean;
}) {
  const scoreColor = lead.score >= 80 ? "text-green-400" : lead.score >= 60 ? "text-amber-400" : "text-red-400";
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 cursor-pointer hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group select-none">
      <div className="flex items-start justify-between gap-1 mb-2" {...listeners}>
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <div className="w-5 h-5 rounded bg-white/[0.06] flex items-center justify-center shrink-0">
            <Building2 className="w-2.5 h-2.5 text-white/40" />
          </div>
          <p className="text-[11px] font-semibold text-white/80 truncate leading-tight">{lead.company}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Star className="w-2.5 h-2.5 text-amber-400/60" />
          <span className={`text-[10px] font-bold font-mono ${scoreColor}`}>{lead.score}</span>
        </div>
      </div>
      <div onClick={onClick} className="space-y-1.5">
        <p className="text-[10px] text-white/45">{lead.contact}</p>
        <p className="text-[9px] text-white/28">{lead.designation}</p>
        <div className="flex items-center justify-between pt-1">
          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] border ${lead.priority === "High" ? "bg-red-500/15 text-red-300 border-red-500/20" : lead.priority === "Medium" ? "bg-amber-500/15 text-amber-300 border-amber-500/20" : "bg-white/5 text-white/40 border-white/10"}`}>{lead.priority}</span>
          <span className="text-[9px] text-white/28">{lead.industry}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-white/28">{lead.assigned}</span>
          <span className="text-[9px] text-white/22">{lead.lastContact}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={(e) => { e.stopPropagation(); onMoveCard(lead, "prev"); }} disabled={!canMovePrev}
          className="flex items-center justify-center w-6 h-6 rounded bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-20 disabled:cursor-not-allowed transition-colors shrink-0">
          <ChevronLeft className="w-3 h-3 text-white/70" />
        </button>
        <a href={`tel:${lead.phone}`} onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center py-1 rounded bg-green-500/10 hover:bg-green-500/20 transition-colors">
          <Phone className="w-2.5 h-2.5 text-green-400" />
        </a>
        <a href={`mailto:${lead.email}`} onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
          <Mail className="w-2.5 h-2.5 text-blue-400" />
        </a>
        <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center py-1 rounded bg-green-500/10 hover:bg-green-500/20 transition-colors">
          <MessageCircle className="w-2.5 h-2.5 text-green-300" />
        </a>
        <button onClick={(e) => { e.stopPropagation(); onMoveCard(lead, "next"); }} disabled={!canMoveNext}
          className="flex items-center justify-center w-6 h-6 rounded bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-20 disabled:cursor-not-allowed transition-colors shrink-0">
          <ChevronRight className="w-3 h-3 text-white/70" />
        </button>
      </div>
    </div>
  );
}

function OverlayCard({ lead }: { lead: CrmLead }) {
  return (
    <div className="bg-white/[0.06] border border-white/[0.16] rounded-xl p-3 w-[240px] shadow-[0_20px_60px_rgba(0,0,0,0.7)] rotate-2 scale-105">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-5 h-5 rounded bg-white/[0.08] flex items-center justify-center">
          <Building2 className="w-2.5 h-2.5 text-white/50" />
        </div>
        <p className="text-[11px] font-semibold text-white/85 truncate">{lead.company}</p>
      </div>
      <p className="text-[10px] text-white/45">{lead.contact}</p>
      <p className="text-[10px] font-bold text-white/60 font-mono mt-1.5">SAR {(lead.value / 1000).toFixed(0)}K</p>
    </div>
  );
}
