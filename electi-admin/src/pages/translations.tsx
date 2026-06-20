import { useListTranslations, useBulkUpsertTranslations, getListTranslationsQueryKey } from "@workspace/api-client-react";
import type { Translation } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Search, Save, Globe, Languages, ChevronDown, ChevronRight,
  CheckCircle2, Clock, AlertCircle, RefreshCw
} from "lucide-react";

const PAGE_LABELS: Record<string, string> = {
  global: "Global (Shared)",
  home:   "Homepage",
  agents: "Agents",
  industries: "Industries",
};

const SECTION_LABELS: Record<string, string> = {
  splash:           "Splash Screen",
  navbar:           "Navigation Bar",
  footer:           "Footer",
  cta:              "CTA Buttons",
  agent_links:      "Agent Quick-links",
  industry_links:   "Industry Quick-links",
  hero:             "Hero Section",
  phone_showcase:   "Phone Showcase",
  how_it_works:     "How It Works",
  enterprise:       "Enterprise Section",
  agents_section:   "Agents Section",
  process:          "Process Steps",
  industries_section: "Industries Section",
  testimonials:     "Testimonials",
  cta_section:      "CTA Section",
  template:         "Page Template",
};

const STATUS_CONFIG = {
  published:         { label: "Live",        color: "text-green-400",  bg: "bg-green-400/10 border-green-400/20",  icon: CheckCircle2 },
  draft:             { label: "Draft",       color: "text-white/40",   bg: "bg-white/5 border-white/10",           icon: Clock },
  needs_translation: { label: "Needs AR",    color: "text-amber-400",  bg: "bg-amber-400/10 border-amber-400/20",  icon: AlertCircle },
};

type EditMap = Record<string, { enContent: string; arContent: string; status: string }>;

export default function Translations() {
  const { data: allRows, isLoading } = useListTranslations();
  const bulkUpsert = useBulkUpsertTranslations();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState<string>("global");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["navbar", "hero", "splash"]));
  const [edits, setEdits] = useState<EditMap>({});
  const [isSaving, setIsSaving] = useState(false);

  const pages = useMemo(() => {
    if (!allRows) return [];
    return [...new Set(allRows.map(r => r.page))].sort((a, b) => {
      const order = ["global", "home", "agents", "industries"];
      return (order.indexOf(a) ?? 99) - (order.indexOf(b) ?? 99);
    });
  }, [allRows]);

  const filtered = useMemo(() => {
    if (!allRows) return [];
    let rows = allRows.filter(r => r.page === activePage);
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r =>
        r.key.toLowerCase().includes(q) ||
        (r.enContent || "").toLowerCase().includes(q) ||
        (r.arContent || "").toLowerCase().includes(q)
      );
    }
    return rows;
  }, [allRows, activePage, search]);

  const grouped = useMemo(() => {
    const map: Record<string, Translation[]> = {};
    for (const row of filtered) {
      if (!map[row.section]) map[row.section] = [];
      map[row.section].push(row);
    }
    return map;
  }, [filtered]);

  const stats = useMemo(() => {
    if (!allRows) return { total: 0, published: 0, needsAr: 0 };
    const pageRows = allRows.filter(r => r.page === activePage);
    return {
      total:     pageRows.length,
      published: pageRows.filter(r => r.status === "published").length,
      needsAr:   pageRows.filter(r => !r.arContent).length,
    };
  }, [allRows, activePage]);

  const getVal = useCallback((row: Translation, field: "enContent" | "arContent" | "status") => {
    const key = `${row.page}||${row.section}||${row.key}`;
    if (edits[key]?.[field] !== undefined) return edits[key][field];
    return (row[field] ?? "") as string;
  }, [edits]);

  const setVal = useCallback((row: Translation, field: "enContent" | "arContent", val: string) => {
    const key = `${row.page}||${row.section}||${row.key}`;
    setEdits(prev => ({
      ...prev,
      [key]: {
        enContent: prev[key]?.enContent ?? (row.enContent ?? ""),
        arContent: prev[key]?.arContent ?? (row.arContent ?? ""),
        status:    prev[key]?.status    ?? row.status,
        [field]:   val,
      },
    }));
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(section) ? next.delete(section) : next.add(section);
      return next;
    });
  };

  const dirtyCount = Object.keys(edits).length;

  const handleSave = async () => {
    if (dirtyCount === 0) return;
    setIsSaving(true);
    const items = Object.entries(edits).map(([compoundKey, vals]) => {
      const [page, section, key] = compoundKey.split("||");
      return { page, section, key, enContent: vals.enContent, arContent: vals.arContent, status: vals.status };
    });
    bulkUpsert.mutate(
      { data: { items } },
      {
        onSuccess: (result) => {
          queryClient.invalidateQueries({ queryKey: getListTranslationsQueryKey() });
          setEdits({});
          setIsSaving(false);
          toast({ title: `${result.count} strings committed`, description: "Live website will reflect changes on next load." });
        },
        onError: () => {
          setIsSaving(false);
          toast({ title: "Save failed", variant: "destructive" });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white/30 gap-3">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-widest">Initialising Language Matrix...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pb-8 gap-0 -mx-6 md:-mx-8 -mt-6">
      {/* Top bar */}
      <div className="sticky top-14 z-30 bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.05] px-6 md:px-8 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-wide text-white flex items-center gap-3">
            <Languages className="w-5 h-5 text-primary" />
            LANGUAGE MATRIX
          </h1>
          <p className="text-white/30 text-[11px] mt-0.5 font-mono uppercase tracking-widest">
            Bilingual content control — {stats.total} strings · {stats.needsAr} missing Arabic
          </p>
        </div>
        <div className="flex items-center gap-3">
          {dirtyCount > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] font-mono text-amber-400/80 uppercase tracking-widest"
            >
              {dirtyCount} unsaved
            </motion.span>
          )}
          <Button
            onClick={handleSave}
            disabled={dirtyCount === 0 || isSaving}
            className="bg-primary hover:bg-primary/90 text-black font-semibold h-9 px-5 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-xs"
          >
            <Save className="w-3.5 h-3.5 mr-2" />
            {isSaving ? "COMMITTING..." : `PUBLISH ${dirtyCount > 0 ? `(${dirtyCount})` : ""}`}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 112px)" }}>
        {/* Left sidebar — page selector */}
        <div className="w-44 flex-shrink-0 border-r border-white/[0.05] bg-[#020202] flex flex-col overflow-y-auto">
          <div className="px-3 py-3 text-[9px] uppercase tracking-[0.2em] text-white/20">Pages</div>
          {pages.map(page => {
            const isActive = page === activePage;
            const pageRows = allRows?.filter(r => r.page === page) ?? [];
            const missing  = pageRows.filter(r => !r.arContent).length;
            return (
              <button
                key={page}
                onClick={() => { setActivePage(page); setSearch(""); }}
                className={`flex items-center justify-between px-3 py-2.5 text-sm transition-all duration-150 border-l-2 ${isActive ? "bg-primary/[0.08] text-white border-primary" : "text-white/40 border-transparent hover:bg-white/[0.03] hover:text-white/70"}`}
              >
                <span className="font-display text-xs">{PAGE_LABELS[page] || page}</span>
                {missing > 0 && (
                  <span className="text-[9px] font-mono text-amber-400/60 bg-amber-400/[0.08] px-1.5 py-0.5 rounded">{missing}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main editing area */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search strings..."
              className="pl-10 bg-white/[0.03] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 h-10 text-sm font-mono placeholder:text-white/20"
            />
          </div>

          {/* Section groups */}
          <div className="space-y-3">
            {Object.entries(grouped).map(([section, rows]) => {
              const isOpen = expandedSections.has(section);
              const sectionDirty = rows.filter(r => edits[`${r.page}||${r.section}||${r.key}`]).length;
              const missingAr = rows.filter(r => !r.arContent && !edits[`${r.page}||${r.section}||${r.key}`]?.arContent).length;

              return (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card overflow-hidden"
                >
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(section)}
                    className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-white/40" /> : <ChevronRight className="w-3.5 h-3.5 text-white/40" />}
                      <span className="font-display text-sm font-medium text-white/80 uppercase tracking-wider">
                        {SECTION_LABELS[section] || section}
                      </span>
                      <span className="text-[10px] font-mono text-white/20">{rows.length} strings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {sectionDirty > 0 && (
                        <span className="text-[9px] font-mono text-amber-400/70 bg-amber-400/[0.08] px-2 py-0.5 rounded">
                          {sectionDirty} edited
                        </span>
                      )}
                      {missingAr > 0 && (
                        <span className="text-[9px] font-mono text-red-400/60 bg-red-400/[0.06] px-2 py-0.5 rounded">
                          {missingAr} missing AR
                        </span>
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {/* Column headers */}
                        <div className="grid grid-cols-[180px_1fr_1fr_100px] gap-px border-t border-white/[0.04] bg-white/[0.03]">
                          <div className="px-5 py-2 text-[9px] uppercase tracking-widest text-white/20 bg-[#020202]">Key</div>
                          <div className="px-4 py-2 text-[9px] uppercase tracking-widest text-white/20 bg-[#020202] flex items-center gap-2">
                            <Globe className="w-3 h-3" /> English
                          </div>
                          <div className="px-4 py-2 text-[9px] uppercase tracking-widest text-white/20 bg-[#020202] flex items-center gap-2" dir="ltr">
                            <span className="text-xs">ع</span> Arabic
                          </div>
                          <div className="px-4 py-2 text-[9px] uppercase tracking-widest text-white/20 bg-[#020202]">Status</div>
                        </div>

                        {/* Rows */}
                        {rows.map((row) => {
                          const rowKey = `${row.page}||${row.section}||${row.key}`;
                          const isDirty = !!edits[rowKey];
                          const en = getVal(row, "enContent");
                          const ar = getVal(row, "arContent");
                          const status = getVal(row, "status");
                          const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.draft;
                          const StatusIcon = cfg.icon;
                          const isMultiline = (en.length > 80) || (ar.length > 80);

                          return (
                            <div
                              key={rowKey}
                              className={`grid grid-cols-[180px_1fr_1fr_100px] gap-px border-t border-white/[0.03] ${isDirty ? "bg-primary/[0.02]" : ""}`}
                            >
                              {/* Key */}
                              <div className="px-5 py-3 flex items-start pt-4">
                                <div>
                                  <div className="font-mono text-[10px] text-white/50 break-all leading-relaxed">{row.key}</div>
                                  {isDirty && <div className="w-1 h-1 rounded-full bg-amber-400 mt-1.5" />}
                                </div>
                              </div>

                              {/* English */}
                              <div className="px-3 py-2" dir="ltr">
                                {isMultiline ? (
                                  <Textarea
                                    value={en}
                                    onChange={e => setVal(row, "enContent", e.target.value)}
                                    className="bg-transparent border-white/[0.06] focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-sm text-white/80 resize-none min-h-[70px] font-sans leading-relaxed"
                                    dir="ltr"
                                  />
                                ) : (
                                  <Input
                                    value={en}
                                    onChange={e => setVal(row, "enContent", e.target.value)}
                                    className="bg-transparent border-white/[0.06] focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-sm text-white/80 h-9"
                                    dir="ltr"
                                  />
                                )}
                              </div>

                              {/* Arabic */}
                              <div className="px-3 py-2" dir="rtl">
                                {isMultiline ? (
                                  <Textarea
                                    value={ar}
                                    onChange={e => setVal(row, "arContent", e.target.value)}
                                    className="bg-transparent border-white/[0.06] focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-sm text-white/80 resize-none min-h-[70px] font-sans leading-relaxed text-right"
                                    dir="rtl"
                                    placeholder="أدخل الترجمة..."
                                  />
                                ) : (
                                  <Input
                                    value={ar}
                                    onChange={e => setVal(row, "arContent", e.target.value)}
                                    className="bg-transparent border-white/[0.06] focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-sm text-white/80 h-9 text-right"
                                    dir="rtl"
                                    placeholder="أدخل..."
                                  />
                                )}
                              </div>

                              {/* Status */}
                              <div className="px-3 py-3 flex items-center justify-center">
                                <button
                                  onClick={() => {
                                    const statuses: Array<keyof typeof STATUS_CONFIG> = ["published", "draft", "needs_translation"];
                                    const idx = statuses.indexOf(status as keyof typeof STATUS_CONFIG);
                                    const next = statuses[(idx + 1) % statuses.length];
                                    setEdits(prev => ({
                                      ...prev,
                                      [rowKey]: {
                                        enContent: prev[rowKey]?.enContent ?? (row.enContent ?? ""),
                                        arContent: prev[rowKey]?.arContent ?? (row.arContent ?? ""),
                                        status:    next,
                                      },
                                    }));
                                  }}
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] uppercase tracking-widest border transition-colors hover:opacity-80 ${cfg.bg} ${cfg.color}`}
                                >
                                  <StatusIcon className="w-2.5 h-2.5" />
                                  {cfg.label}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
            {Object.keys(grouped).length === 0 && (
              <div className="text-center py-20 text-white/20">
                <RefreshCw className="w-8 h-8 mx-auto mb-3 opacity-30" />
                <p className="text-[11px] uppercase tracking-widest">No strings match your search</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
