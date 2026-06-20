"use client";
import { useState, useRef, useEffect } from "react";
import {
  DndContext, DragOverlay, rectIntersection,
  useDraggable, useDroppable,
  type DragEndEvent, type DragStartEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Building2, Phone, Mail, MessageCircle, Star, Plus, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { useStore } from "@/lib/store";
import { STAGE_COLOR } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import type { Lead, LeadStage } from "@/lib/types";

const KANBAN_STAGES: LeadStage[] = [
  "Incoming Lead", "Initial Contact", "Qualified",
  "Discovery Meeting", "Demo Scheduled", "Proposal Preparation",
  "Proposal Sent", "Client Review", "Negotiation",
  "Waiting for Approval", "Legal / Procurement",
  "Won", "Lost", "Follow-Up Later",
  "Strategic Opportunity", "Partnership Potential",
];

const STAGE_META: Record<string, { dot: string; count_bg: string; accent?: string }> = {
  "Incoming Lead":         { dot: "bg-blue-400",    count_bg: "bg-blue-500/10" },
  "Initial Contact":       { dot: "bg-cyan-400",    count_bg: "bg-cyan-500/10" },
  "Qualified":             { dot: "bg-purple-400",  count_bg: "bg-purple-500/10" },
  "Discovery Meeting":     { dot: "bg-amber-400",   count_bg: "bg-amber-500/10" },
  "Demo Scheduled":        { dot: "bg-yellow-400",  count_bg: "bg-yellow-500/10" },
  "Proposal Preparation":  { dot: "bg-slate-400",   count_bg: "bg-slate-500/10" },
  "Proposal Sent":         { dot: "bg-orange-400",  count_bg: "bg-orange-500/10" },
  "Client Review":         { dot: "bg-sky-400",     count_bg: "bg-sky-500/10",    accent: "border-sky-500/20"     },
  "Negotiation":           { dot: "bg-amber-500",   count_bg: "bg-amber-500/10",  accent: "border-amber-500/20"   },
  "Waiting for Approval":  { dot: "bg-violet-400",  count_bg: "bg-violet-500/10", accent: "border-violet-500/20"  },
  "Legal / Procurement":   { dot: "bg-indigo-400",  count_bg: "bg-indigo-500/10" },
  "Won":                   { dot: "bg-green-400",   count_bg: "bg-green-500/10" },
  "Lost":                  { dot: "bg-red-400",     count_bg: "bg-red-500/10" },
  "Follow-Up Later":       { dot: "bg-teal-400",    count_bg: "bg-teal-500/10" },
  "Strategic Opportunity": { dot: "bg-fuchsia-400", count_bg: "bg-fuchsia-500/10", accent: "border-fuchsia-500/20" },
  "Partnership Potential": { dot: "bg-pink-400",    count_bg: "bg-pink-500/10",    accent: "border-pink-500/20"   },
};

interface KanbanProps {
  onLeadClick: (lead: Lead) => void;
  onAddLead: (stage?: LeadStage) => void;
}

export default function KanbanBoard({ onLeadClick, onAddLead }: KanbanProps) {
  const { leads, moveLead, leadStageLabels, renameLeadStage } = useStore();
  const { toast } = useToast();
  const [activeId, setActiveId] = useState<string | null>(null);

  const byStage = KANBAN_STAGES.reduce<Record<string, Lead[]>>((acc, stage) => {
    acc[stage] = leads.filter((l) => l.stage === stage);
    return acc;
  }, {});

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null;

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(String(active.id));
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over) return;
    const targetStage = String(over.id) as LeadStage;
    if (!KANBAN_STAGES.includes(targetStage)) return;
    const lead = leads.find((l) => l.id === String(active.id));
    if (lead && lead.stage !== targetStage) {
      moveLead(String(active.id), targetStage);
      toast(`${lead.company} → ${targetStage}`);
    }
  }

  function handleMoveCard(lead: Lead, direction: "prev" | "next") {
    const idx = KANBAN_STAGES.indexOf(lead.stage);
    const nextIdx = direction === "next" ? idx + 1 : idx - 1;
    if (nextIdx < 0 || nextIdx >= KANBAN_STAGES.length) return;
    const targetStage = KANBAN_STAGES[nextIdx];
    moveLead(lead.id, targetStage);
    toast(`${lead.company} → ${targetStage}`);
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <div className="flex gap-3 overflow-x-auto pb-4 min-h-[60vh]" style={{ scrollSnapType: "x mandatory" }}>
        {KANBAN_STAGES.map((stage, i) => (
          <KanbanColumn
            key={stage}
            stage={stage}
            displayLabel={leadStageLabels[stage] ?? stage}
            leads={byStage[stage] ?? []}
            onLeadClick={onLeadClick}
            onAddLead={() => onAddLead(stage)}
            onMoveCard={handleMoveCard}
            onRenameStage={renameLeadStage}
            isActive={activeId !== null}
            stageIndex={i}
            totalStages={KANBAN_STAGES.length}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
        {activeLead ? (
          <LeadCardOverlay lead={activeLead} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function KanbanColumn({
  stage, displayLabel, leads, onLeadClick, onAddLead, onMoveCard, onRenameStage, isActive, stageIndex, totalStages,
}: {
  stage: LeadStage; displayLabel: string;
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  onAddLead: () => void;
  onMoveCard: (lead: Lead, direction: "prev" | "next") => void;
  onRenameStage: (stage: string, label: string) => void;
  isActive: boolean;
  stageIndex: number;
  totalStages: number;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const meta = STAGE_META[stage];
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(displayLabel);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) inputRef.current?.select(); }, [editing]);

  function startEdit() { setDraft(displayLabel); setEditing(true); }

  function commit() {
    const trimmed = draft.trim();
    onRenameStage(stage, trimmed || stage);
    setEditing(false);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); commit(); }
    if (e.key === "Escape") setEditing(false);
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 flex flex-col rounded-xl border transition-all duration-150 ${meta.accent ?? ""}`}
      style={{
        width: "240px",
        scrollSnapAlign: "start",
        background: isOver ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        borderColor: isOver ? "rgba(255,255,255,0.12)" : undefined,
      }}
    >
      {/* Column Header */}
      <div className="px-3 py-2.5 border-b border-white/[0.05] flex items-center gap-2 group/header">
        <div className={`w-2 h-2 rounded-full ${meta.dot} shrink-0`} />
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={onKey}
            className="flex-1 min-w-0 bg-white/[0.06] border border-white/[0.15] rounded px-1.5 py-0.5 text-[10px] font-700 text-white/85 uppercase tracking-[0.10em] outline-none focus:border-white/30 font-display"
          />
        ) : (
          <button onClick={startEdit} title="Click to rename" className="flex-1 min-w-0 flex items-center gap-1.5 text-left group/label">
            <p className="text-[10px] font-700 text-white/70 uppercase tracking-[0.12em] truncate font-display group-hover/label:text-white/90 transition-colors">
              {displayLabel}
            </p>
            <Pencil className="w-2.5 h-2.5 text-white/20 shrink-0 opacity-0 group-hover/header:opacity-100 transition-opacity" />
          </button>
        )}
        <div className={`w-5 h-5 rounded-full ${meta.count_bg} flex items-center justify-center shrink-0`}>
          <span className="text-[9px] font-700 text-white/60">{leads.length}</span>
        </div>
      </div>


      {/* Cards */}
      <div className="flex-1 p-2 space-y-2 overflow-y-auto min-h-[120px]">
        {leads.map((lead) => (
          <DraggableLeadCard
            key={lead.id}
            lead={lead}
            onClick={() => onLeadClick(lead)}
            onMoveCard={onMoveCard}
            canMovePrev={stageIndex > 0}
            canMoveNext={stageIndex < totalStages - 1}
          />
        ))}
        {leads.length === 0 && (
          <div className={`flex items-center justify-center h-16 border border-dashed rounded-lg transition-colors ${isOver ? "border-white/[0.12] bg-white/[0.02]" : "border-white/[0.05]"}`}>
            <p className="text-[9px] text-white/18">Drop leads here</p>
          </div>
        )}
      </div>

      {/* Add button */}
      <div className="p-2 border-t border-white/[0.04]">
        <button onClick={onAddLead}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[10px] text-white/28 hover:text-white/55 hover:bg-white/[0.03] rounded-lg transition-colors">
          <Plus className="w-3 h-3" /> Add lead
        </button>
      </div>
    </div>
  );
}

function DraggableLeadCard({
  lead, onClick, onMoveCard, canMovePrev, canMoveNext,
}: {
  lead: Lead;
  onClick: () => void;
  onMoveCard: (lead: Lead, direction: "prev" | "next") => void;
  canMovePrev: boolean;
  canMoveNext: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: lead.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={`transition-opacity ${isDragging ? "opacity-40" : "opacity-100"}`}
      {...attributes}
    >
      <LeadCard
        lead={lead}
        onClick={onClick}
        listeners={listeners}
        onMoveCard={onMoveCard}
        canMovePrev={canMovePrev}
        canMoveNext={canMoveNext}
      />
    </div>
  );
}

function LeadCard({
  lead, onClick, listeners, onMoveCard, canMovePrev, canMoveNext,
}: {
  lead: Lead;
  onClick: () => void;
  listeners?: ReturnType<typeof useDraggable>["listeners"];
  onMoveCard: (lead: Lead, direction: "prev" | "next") => void;
  canMovePrev: boolean;
  canMoveNext: boolean;
}) {
  const scoreColor = lead.score >= 80 ? "text-green-400" : lead.score >= 60 ? "text-amber-400" : "text-red-400";

  return (
    <div className="glass rounded-xl p-3 cursor-pointer hover:bg-white/[0.04] transition-all group select-none border border-white/[0.05] hover:border-white/[0.09]">
      {/* Drag handle area */}
      <div className="flex items-start justify-between gap-1 mb-2" {...listeners}>
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <div className="w-5 h-5 rounded bg-white/[0.06] flex items-center justify-center shrink-0">
            <Building2 className="w-2.5 h-2.5 text-white/40" />
          </div>
          <p className="text-[11px] font-600 text-white/80 truncate leading-tight">{lead.company}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Star className="w-2.5 h-2.5 text-amber-400/60" />
          <span className={`text-[10px] font-700 font-mono ${scoreColor}`}>{lead.score}</span>
        </div>
      </div>

      {/* Contact + details - click to open modal */}
      <div onClick={onClick} className="space-y-1.5">
        <p className="text-[10px] text-white/45">{lead.contact}</p>
        <p className="text-[9px] text-white/28">{lead.designation}</p>

        <div className="flex items-center justify-between pt-1">
          <span className={`badge text-[8px] py-0 ${lead.priority === "High" ? "badge-red" : lead.priority === "Medium" ? "badge-amber" : "badge-white"}`}>{lead.priority}</span>
          <span className="text-[9px] text-white/28">{lead.industry}</span>
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[9px] text-white/28">{lead.assigned}</span>
          <span className="text-[9px] text-white/22">{lead.lastContact}</span>
        </div>
      </div>

      {/* Stage navigation + quick actions — appear on hover */}
      <div className="flex items-center gap-1 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* ← Prev stage */}
        <button
          onClick={(e) => { e.stopPropagation(); onMoveCard(lead, "prev"); }}
          disabled={!canMovePrev}
          title="Move to previous stage"
          className="flex items-center justify-center w-6 h-6 rounded bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-20 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          <ChevronLeft className="w-3 h-3 text-white/70" />
        </button>

        {/* Contact quick actions */}
        <a href={`tel:${lead.phone}`} onClick={e => e.stopPropagation()} className="flex-1 flex items-center justify-center py-1 rounded bg-green-500/10 hover:bg-green-500/20 transition-colors">
          <Phone className="w-2.5 h-2.5 text-green-400" />
        </a>
        <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} className="flex-1 flex items-center justify-center py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
          <Mail className="w-2.5 h-2.5 text-blue-400" />
        </a>
        <a href={`https://wa.me/${lead.phone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="flex-1 flex items-center justify-center py-1 rounded bg-green-500/10 hover:bg-green-500/20 transition-colors">
          <MessageCircle className="w-2.5 h-2.5 text-green-300" />
        </a>

        {/* → Next stage */}
        <button
          onClick={(e) => { e.stopPropagation(); onMoveCard(lead, "next"); }}
          disabled={!canMoveNext}
          title="Move to next stage"
          className="flex items-center justify-center w-6 h-6 rounded bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-20 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          <ChevronRight className="w-3 h-3 text-white/70" />
        </button>
      </div>
    </div>
  );
}

function LeadCardOverlay({ lead }: { lead: Lead }) {
  return (
    <div className="glass rounded-xl p-3 w-[240px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/[0.12] rotate-2 scale-105">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-5 h-5 rounded bg-white/[0.08] flex items-center justify-center">
          <Building2 className="w-2.5 h-2.5 text-white/50" />
        </div>
        <p className="text-[11px] font-600 text-white/85 truncate">{lead.company}</p>
      </div>
      <p className="text-[10px] text-white/45">{lead.contact}</p>
      <p className="text-[10px] font-600 text-white/60 font-mono mt-1.5">SAR {(lead.value / 1000).toFixed(0)}K</p>
    </div>
  );
}
