import { useListSeoSettings } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Link, useLocation } from "wouter";
import { Settings, Globe, Plus } from "lucide-react";
import { useState } from "react";

const PAGE_GROUPS: { label: string; pages: string[] }[] = [
  {
    label: "Core Pages",
    pages: ["home", "about", "pricing", "contact", "careers", "blog", "how-it-works", "faq", "ai-discovery", "letsconnect"],
  },
  {
    label: "Agents",
    pages: ["agents", "agents/personal", "agents/billing", "agents/legal", "agents/sales"],
  },
  {
    label: "Industries",
    pages: [
      "industries",
      "industries/healthcare",
      "industries/hospitality",
      "industries/construction",
      "industries/retail",
      "industries/corporate",
      "industries/real-estate",
    ],
  },
  {
    label: "Authority / SEO Landing Pages",
    pages: [
      "ai-agents",
      "personal-ai-agents",
      "business-ai-agents",
      "ai-customer-support-agents",
      "enterprise-ai-solutions",
      "ai-hr-agents",
      "ai-sales-agents",
      "ai-voice-agents",
      "ai-workflow-automation",
    ],
  },
  {
    label: "Multilingual & Voice Authority Pages",
    pages: [
      "arabic-ai-agents",
      "english-ai-agents",
      "multilingual-ai-agents",
      "arabic-ai-customer-support",
      "arabic-ai-sales-agents",
      "arabic-ai-receptionists",
      "arabic-voice-ai",
      "ai-call-center",
    ],
  },
  {
    label: "AI Agent Marketplace",
    pages: [
      "marketplace",
      "marketplace/ai-receptionist",
      "marketplace/ai-sales-agent",
      "marketplace/ai-customer-support",
      "marketplace/ai-hr-agent",
      "marketplace/ai-recruitment",
      "marketplace/ai-whatsapp",
      "marketplace/ai-knowledge-base",
      "marketplace/ai-property",
      "marketplace/ai-hospitality",
      "marketplace/ai-healthcare",
      "marketplace/ai-education",
      "marketplace/ai-retail",
      "marketplace/ai-lead-qualification",
    ],
  },
  {
    label: "Conversion Tools",
    pages: ["build-your-agent", "roi-calculator"],
  },
  {
    label: "Comparison Pages",
    pages: [
      "compare/ai-agent-vs-chatbot",
      "compare/ai-receptionist-vs-human",
      "compare/ai-support-vs-traditional",
      "compare/ai-sales-vs-call-center",
      "compare/ai-vs-manual",
    ],
  },
  {
    label: "Location Pages",
    pages: ["riyadh", "jeddah"],
  },
  {
    label: "Legal & Utility",
    pages: ["terms-of-use", "privacy", "login", "google"],
  },
  {
    label: "E-E-A-T Trust & Compliance",
    pages: ["security", "compliance", "technology", "data-protection", "cookie-policy"],
  },
  {
    label: "Integrations & Partners",
    pages: [
      "integrations",
      "partners",
      "integrations/openai",
      "integrations/anthropic",
      "integrations/google-gemini",
      "integrations/microsoft-copilot",
      "integrations/whatsapp-business",
      "integrations/microsoft-teams",
      "integrations/slack",
      "integrations/salesforce",
      "integrations/hubspot",
      "integrations/zoho",
      "integrations/odoo",
      "integrations/sap",
      "integrations/oracle",
      "integrations/shopify",
      "integrations/woocommerce",
      "integrations/gmail",
      "integrations/outlook",
      "integrations/google-workspace",
      "integrations/microsoft-365",
    ],
  },
  {
    label: "City Authority Pages",
    pages: [
      "ai-agents-riyadh",
      "ai-agents-jeddah",
      "business-ai-agents-riyadh",
      "business-ai-agents-jeddah",
      "ai-receptionist-riyadh",
      "ai-receptionist-jeddah",
      "ai-customer-support-riyadh",
      "ai-customer-support-jeddah",
      "ai-sales-agents-riyadh",
      "ai-sales-agents-jeddah",
    ],
  },
  {
    label: "Case Studies",
    pages: [
      "case-studies",
      "case-studies/ai-customer-support",
      "case-studies/ai-sales-agent",
      "case-studies/ai-receptionist",
      "case-studies/ai-hr-agent",
      "case-studies/ai-workflow-automation",
      "case-studies/ai-voice-agents",
    ],
  },
  {
    label: "Research Center",
    pages: [
      "resources",
      "resources/downloads",
      "resources/state-of-ai-in-saudi-arabia",
      "resources/future-of-ai-agents-saudi-arabia",
      "resources/ai-agents-for-saudi-businesses",
      "resources/ai-agents-vs-traditional-employees",
      "resources/ai-customer-service-trends-saudi-arabia",
      "resources/ai-in-hospitality",
      "resources/ai-in-healthcare",
      "resources/ai-in-real-estate",
      "resources/ai-in-government",
      "resources/ai-in-education",
    ],
  },
];

const KNOWN_PAGES = PAGE_GROUPS.flatMap((g) => g.pages);

type PageRow = {
  id: number | null;
  page: string;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  canonicalUrl: string | null;
  updatedAt: string | null;
};

export default function SeoSettings() {
  const { data: settings, isLoading } = useListSeoSettings();
  const [, setLocation] = useLocation();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [customPage, setCustomPage] = useState("");

  const handleAddCustom = () => {
    const slug = customPage.trim().toLowerCase().replace(/^\/+/, "");
    if (!slug) return;
    setIsAddOpen(false);
    setCustomPage("");
    setLocation(`/seo/${encodeURIComponent(slug)}`);
  };

  const byPage = new Map<string, PageRow>();
  for (const s of settings ?? []) {
    byPage.set(s.page, {
      id: s.id,
      page: s.page,
      metaTitle: s.metaTitle ?? null,
      metaDescription: s.metaDescription ?? null,
      keywords: s.keywords ?? null,
      ogTitle: s.ogTitle ?? null,
      ogDescription: s.ogDescription ?? null,
      ogImage: s.ogImage ?? null,
      canonicalUrl: s.canonicalUrl ?? null,
      updatedAt: s.updatedAt ?? null,
    });
  }

  const knownSet = new Set(KNOWN_PAGES);
  const customRows: PageRow[] = (settings ?? [])
    .filter((s) => !knownSet.has(s.page))
    .map((s) => ({
      id: s.id,
      page: s.page,
      metaTitle: s.metaTitle ?? null,
      metaDescription: s.metaDescription ?? null,
      keywords: s.keywords ?? null,
      ogTitle: s.ogTitle ?? null,
      ogDescription: s.ogDescription ?? null,
      ogImage: s.ogImage ?? null,
      canonicalUrl: s.canonicalUrl ?? null,
      updatedAt: s.updatedAt ?? null,
    }))
    .sort((a, b) => a.page.localeCompare(b.page));

  const totalConfigured = (settings ?? []).filter((s) => s.metaTitle || s.metaDescription).length;

  const renderRow = (row: PageRow) => {
    const hasCustomMeta = !!row.metaTitle || !!row.metaDescription;
    const isSeeded = row.id !== null;
    return (
      <TableRow
        key={row.page}
        className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors group"
      >
        <TableCell className="py-4">
          <div className="flex items-center gap-3 font-mono text-sm text-primary/80">
            <Globe className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors flex-shrink-0" />
            <span className="truncate">/{row.page}</span>
          </div>
        </TableCell>
        <TableCell>
          {row.metaTitle ? (
            <div className="truncate max-w-sm font-medium text-white/90">{row.metaTitle}</div>
          ) : (
            <span className="text-white/20 italic text-sm">System Default</span>
          )}
        </TableCell>
        <TableCell>
          {hasCustomMeta ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-primary/20 bg-primary/10 text-primary shadow-[0_0_8px_rgba(255,255,255,0.1)]">
              Customized
            </span>
          ) : isSeeded ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-white/10 bg-white/5 text-white/40">
              Default
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-white/[0.06] bg-transparent text-white/20">
              Not Set
            </span>
          )}
        </TableCell>
        <TableCell className="text-right">
          <Link href={`/seo/${encodeURIComponent(row.page)}`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-4 text-[10px] uppercase tracking-widest text-white/50 hover:text-primary hover:bg-primary/10 transition-colors border border-white/5 opacity-50 group-hover:opacity-100 hover:border-primary/30"
            >
              <Settings className="h-3 w-3 mr-2" />
              Configure
            </Button>
          </Link>
        </TableCell>
      </TableRow>
    );
  };

  const renderGroupHeader = (label: string, count: number) => (
    <TableRow key={`group-${label}`} className="border-b border-white/[0.06] hover:bg-transparent">
      <TableCell colSpan={4} className="py-3 px-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/35 font-semibold">{label}</span>
          <span className="text-[10px] font-mono text-white/20">{count}</span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-wide text-white">SEO COMMAND</h1>
          <p className="text-white/40 mt-2 text-sm">
            Global index and metadata routing configuration.{" "}
            <span className="font-mono text-white/30">
              {totalConfigured}/{KNOWN_PAGES.length + customRows.length} pages configured
            </span>
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-black font-semibold h-10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-xs px-6">
              <Plus className="w-3.5 h-3.5 mr-2" />
              ADD PAGE
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[440px] bg-[#050505]/95 text-white">
            <DialogHeader className="border-b border-white/[0.04] pb-4 mb-4">
              <DialogTitle className="font-display tracking-widest text-lg">CONFIGURE CUSTOM ROUTE</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Page Route</label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white/30 text-sm">/</span>
                  <Input
                    value={customPage}
                    onChange={(e) => setCustomPage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddCustom()}
                    placeholder="e.g. careers or agents/personal"
                    className="bg-white/[0.02] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono h-12"
                    autoFocus
                  />
                </div>
                <p className="text-[10px] text-white/30 font-mono">
                  Matches a page on your Electi website. This will open the SEO editor for that route.
                </p>
              </div>
            </div>
            <DialogFooter className="mt-4 border-t border-white/[0.04] pt-4">
              <Button
                onClick={handleAddCustom}
                disabled={!customPage.trim()}
                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-11 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-sm"
              >
                OPEN SEO EDITOR
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
              <TableHead className="w-[30%] text-[10px] uppercase tracking-[0.2em] text-white/25 font-normal h-12">Route</TableHead>
              <TableHead className="w-[38%] text-[10px] uppercase tracking-[0.2em] text-white/25 font-normal h-12">Title</TableHead>
              <TableHead className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-normal h-12">Status</TableHead>
              <TableHead className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-normal h-12 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="border-b border-white/[0.04] hover:bg-transparent">
                <TableCell colSpan={4} className="h-32">
                  <div className="flex flex-col items-center justify-center text-white/30 gap-3">
                    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-[10px] uppercase tracking-widest">Scanning Routes...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {PAGE_GROUPS.map((group) => {
                  const rows = group.pages.map(
                    (p) =>
                      byPage.get(p) ?? {
                        id: null,
                        page: p,
                        metaTitle: null,
                        metaDescription: null,
                        keywords: null,
                        ogTitle: null,
                        ogDescription: null,
                        ogImage: null,
                        canonicalUrl: null,
                        updatedAt: null,
                      }
                  );
                  return [renderGroupHeader(group.label, group.pages.length), ...rows.map(renderRow)];
                })}

                {customRows.length > 0 && [
                  renderGroupHeader("Custom / Other", customRows.length),
                  ...customRows.map(renderRow),
                ]}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
