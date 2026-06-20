"use client";
import { useState } from "react";
import {
  FolderOpen, FileText, Search, Upload, Grid, List,
  File, Image, FileCheck, Trash2, StickyNote, Tag,
  Download, User, Calendar,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import UploadDocumentModal from "@/components/documents/UploadDocumentModal";
import type { Document, DocFolder } from "@/lib/types";

// ── Constants ─────────────────────────────────────────────────────────────────
const FOLDER_META: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  Contracts: { color: "text-blue-400",   bg: "bg-blue-500/10",   icon: FileCheck },
  Proposals: { color: "text-amber-400",  bg: "bg-amber-500/10",  icon: FileText  },
  Invoices:  { color: "text-green-400",  bg: "bg-green-500/10",  icon: FileText  },
  Photos:    { color: "text-purple-400", bg: "bg-purple-500/10", icon: Image     },
  Reports:   { color: "text-cyan-400",   bg: "bg-cyan-500/10",   icon: FileText  },
  NDAs:      { color: "text-red-400",    bg: "bg-red-500/10",    icon: FileCheck },
  Other:     { color: "text-white/40",   bg: "bg-white/[0.06]",  icon: File      },
};

const FILE_ICON_COLOR: Record<string, string> = {
  PDF: "text-red-400", DOCX: "text-blue-400", PPTX: "text-amber-400",
  XLSX: "text-green-400", ZIP: "text-purple-400", JPG: "text-pink-400",
  PNG: "text-pink-400", MP4: "text-cyan-400",
};

const ALL_FOLDERS: (DocFolder | "All")[] = ["All", "Contracts", "Proposals", "Invoices", "Photos", "Reports", "NDAs", "Other"];

// ── Detail Drawer ─────────────────────────────────────────────────────────────
function DocDrawer({ doc, onClose }: { doc: Document; onClose: () => void }) {
  const { updateDocument, deleteDocument } = useStore();
  const { toast } = useToast();
  const [editNotes, setEditNotes] = useState(false);
  const [notes, setNotes] = useState(doc.notes);
  const [confirmDel, setConfirmDel] = useState(false);

  function saveNotes() { updateDocument(doc.id, { notes }); setEditNotes(false); toast("Notes saved"); }
  function handleDelete() {
    if (!confirmDel) { setConfirmDel(true); return; }
    deleteDocument(doc.id); toast(`"${doc.name}" deleted`); onClose();
  }

  const meta = FOLDER_META[doc.folder] ?? FOLDER_META.Other;
  const IconComp = meta.icon;

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1 bg-black/50 backdrop-blur-sm" />
      <div
        className="w-[400px] bg-[#0a0a0a] border-l border-white/[0.06] flex flex-col h-full overflow-hidden shadow-[-20px_0_60px_rgba(0,0,0,0.6)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/[0.05]">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${meta.bg} flex items-center justify-center shrink-0`}>
              <IconComp className={`w-5 h-5 ${meta.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[13px] font-700 text-white/90 leading-tight">{doc.name}</h2>
              <p className="text-[10px] text-white/40 mt-1 font-mono">{doc.type} · {doc.size}</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors shrink-0">✕</button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Folder",   value: doc.folder,   icon: FolderOpen },
              { label: "Owner",    value: doc.owner,    icon: User },
              { label: "Modified", value: doc.modified, icon: Calendar },
              { label: "Size",     value: doc.size,     icon: Download },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass-sm rounded-lg p-3">
                <p className="text-[9px] text-white/28 uppercase tracking-wide mb-0.5 flex items-center gap-1">
                  <Icon className="w-2.5 h-2.5" />{label}
                </p>
                <p className="text-[11px] font-600 text-white/70">{value}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          {doc.tags.length > 0 && (
            <div>
              <p className="text-[9px] text-white/28 uppercase tracking-wide mb-2 flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" /> Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {doc.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] text-white/55">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] text-white/28 uppercase tracking-wide flex items-center gap-1">
                <StickyNote className="w-2.5 h-2.5" /> Notes
              </p>
              {!editNotes && (
                <button onClick={() => setEditNotes(true)} className="text-[9px] text-white/35 hover:text-white/60 transition-colors">Edit</button>
              )}
            </div>
            {editNotes ? (
              <div className="space-y-2">
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-3 py-2 text-[12px] text-white/75 resize-none outline-none focus:border-white/20 transition-colors" />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditNotes(false)} className="text-[10px] text-white/35 hover:text-white/60 px-3 py-1.5 rounded-lg glass-sm transition-colors">Cancel</button>
                  <button onClick={saveNotes} className="text-[10px] text-white/80 px-3 py-1.5 rounded-lg glass-sm border border-white/[0.1] hover:border-white/20 transition-colors">Save</button>
                </div>
              </div>
            ) : (
              <div className="glass-sm rounded-xl p-3 min-h-[56px]">
                <p className="text-[11px] text-white/50 leading-relaxed whitespace-pre-wrap">
                  {notes || <span className="italic text-white/22">No notes yet.</span>}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.05] flex gap-2">
          <button onClick={handleDelete}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] transition-colors ${
              confirmDel
                ? "bg-red-500/20 border border-red-500/40 text-red-400"
                : "glass-sm text-white/35 hover:text-red-400/70 border border-transparent hover:border-red-500/20"
            }`}>
            <Trash2 className="w-3 h-3" />
            {confirmDel ? "Confirm delete?" : "Delete"}
          </button>
          {confirmDel && (
            <button onClick={() => setConfirmDel(false)} className="text-[10px] text-white/35 hover:text-white/60 px-3 py-2 glass-sm rounded-lg transition-colors">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DocumentsPage() {
  const { documents } = useStore();
  const [search, setSearch]     = useState("");
  const [view, setView]         = useState<"grid" | "list">("list");
  const [folder, setFolder]     = useState<DocFolder | "All">("All");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadFolder, setUploadFolder] = useState<DocFolder | undefined>();
  const [selected, setSelected] = useState<Document | null>(null);

  const filtered = documents.filter(d => {
    const matchFolder = folder === "All" || d.folder === folder;
    const q = search.toLowerCase();
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q)) || d.folder.toLowerCase().includes(q);
    return matchFolder && matchSearch;
  });

  // Folder counts from live data
  const folderCounts = documents.reduce<Record<string, number>>((acc, d) => {
    acc[d.folder] = (acc[d.folder] ?? 0) + 1;
    return acc;
  }, {});

  function openUploadFor(f?: DocFolder) {
    setUploadFolder(f);
    setUploadOpen(true);
  }

  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* Toolbar */}
      <div className="glass p-3 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 glass-sm px-3 py-1.5 flex-1 max-w-80">
          <Search className="w-3 h-3 text-white/28 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search files, tags…"
            className="bg-transparent text-[11px] text-white/60 placeholder-white/20 outline-none flex-1" />
        </div>
        <div className="flex items-center glass-sm p-0.5 rounded-lg">
          <button onClick={() => setView("list")} className={`px-2 py-1 rounded text-[10px] transition-colors ${view === "list" ? "bg-white/[0.08] text-white/75" : "text-white/30 hover:text-white/55"}`}>
            <List className="w-3 h-3" />
          </button>
          <button onClick={() => setView("grid")} className={`px-2 py-1 rounded text-[10px] transition-colors ${view === "grid" ? "bg-white/[0.08] text-white/75" : "text-white/30 hover:text-white/55"}`}>
            <Grid className="w-3 h-3" />
          </button>
        </div>
        {/* Folder filters (compact) */}
        <div className="flex gap-1 flex-wrap">
          {ALL_FOLDERS.map(f => (
            <button key={f} onClick={() => setFolder(f)}
              className={`px-2.5 py-1 rounded-md text-[10px] transition-colors ${folder === f ? "bg-white/[0.1] text-white/80" : "text-white/35 hover:text-white/60 hover:bg-white/[0.04]"}`}>
              {f}
              {f !== "All" && <span className="ml-1 text-[8px] font-mono text-white/25">{folderCounts[f] ?? 0}</span>}
            </button>
          ))}
        </div>
        <button onClick={() => openUploadFor(folder !== "All" ? folder : undefined)}
          className="flex items-center gap-1.5 bg-white/[0.08] hover:bg-white/[0.13] border border-white/[0.1] text-white/80 text-[11px] px-3 py-1.5 rounded-lg transition-colors ml-auto shrink-0">
          <Upload className="w-3 h-3" /> Upload
        </button>
      </div>

      {/* Folder cards */}
      <div className="grid grid-cols-3 lg:grid-cols-7 gap-2">
        {(Object.keys(FOLDER_META) as DocFolder[]).map(f => {
          const meta = FOLDER_META[f];
          const Icon = meta.icon;
          const count = folderCounts[f] ?? 0;
          return (
            <button key={f} onClick={() => setFolder(folder === f ? "All" : f)}
              className={`glass p-3 text-left hover:bg-white/[0.04] transition-colors rounded-xl ${folder === f ? "ring-1 ring-white/20" : ""}`}>
              <div className={`w-8 h-8 rounded-lg ${meta.bg} flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${meta.color}`} />
              </div>
              <p className="text-[11px] font-500 text-white/72">{f}</p>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-[9px] text-white/28 font-mono">{count} files</p>
                <button onClick={e => { e.stopPropagation(); openUploadFor(f); }}
                  className="text-[8px] text-white/20 hover:text-white/50 transition-colors leading-none">+ Add</button>
              </div>
            </button>
          );
        })}
      </div>

      {/* Files */}
      {filtered.length === 0 ? (
        <div className="glass rounded-xl text-center py-16">
          <FolderOpen className="w-8 h-8 mx-auto text-white/15 mb-3" />
          <p className="text-[12px] text-white/28">No files found</p>
          <button onClick={() => openUploadFor()} className="mt-4 text-[10px] text-white/40 hover:text-white/65 underline transition-colors">Upload first document</button>
        </div>
      ) : view === "list" ? (
        <div className="glass overflow-hidden rounded-xl">
          <div className="px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between">
            <p className="text-[10px] text-white/38">
              {folder !== "All" ? `Folder: ${folder}` : "All files"} · <span className="font-mono">{filtered.length}</span> items
            </p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["Name", "Folder", "Type", "Size", "Modified", "Owner", ""].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-[9px] font-600 tracking-[0.14em] uppercase text-white/28">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} onClick={() => setSelected(d)}
                  className="border-b border-white/[0.03] hover:bg-white/[0.025] transition-colors cursor-pointer">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <File className={`w-3.5 h-3.5 shrink-0 ${FILE_ICON_COLOR[d.type] ?? "text-white/35"}`} />
                      <div>
                        <p className="text-[11px] font-500 text-white/75">{d.name}</p>
                        <div className="flex gap-1 mt-0.5">
                          {d.tags.slice(0, 2).map(t => <span key={t} className="badge badge-white text-[8px]">{t}</span>)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5"><span className="badge badge-white">{d.folder}</span></td>
                  <td className="px-3 py-2.5 text-[10px] font-600 text-white/50 font-mono">{d.type}</td>
                  <td className="px-3 py-2.5 text-[10px] text-white/38 font-mono">{d.size}</td>
                  <td className="px-3 py-2.5 text-[10px] text-white/28 font-mono">{d.modified}</td>
                  <td className="px-3 py-2.5 text-[10px] text-white/42">{d.owner}</td>
                  <td className="px-3 py-2.5">
                    <button onClick={e => { e.stopPropagation(); setSelected(d); }}
                      className="glass-sm px-2 py-1 text-[9px] text-white/35 hover:text-white/65 transition-colors rounded">Open</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map(d => (
            <div key={d.id} onClick={() => setSelected(d)}
              className="glass p-3 hover:bg-white/[0.03] transition-colors cursor-pointer space-y-2 rounded-xl">
              <div className={`w-10 h-10 rounded-xl ${FOLDER_META[d.folder]?.bg ?? "bg-white/[0.04]"} flex items-center justify-center`}>
                <File className={`w-5 h-5 ${FILE_ICON_COLOR[d.type] ?? "text-white/35"}`} />
              </div>
              <p className="text-[11px] font-500 text-white/72 leading-tight line-clamp-2">{d.name}</p>
              <div className="flex gap-1 flex-wrap">
                {d.tags.slice(0, 2).map(t => <span key={t} className="badge badge-white text-[8px]">{t}</span>)}
              </div>
              <div className="flex items-center justify-between text-[9px] text-white/28">
                <span className="font-mono">{d.size}</span>
                <span>{d.modified}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <UploadDocumentModal open={uploadOpen} onClose={() => setUploadOpen(false)} defaultFolder={uploadFolder} />
      {selected && (
        <DocDrawer
          key={selected.id}
          doc={documents.find(d => d.id === selected.id) ?? selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
