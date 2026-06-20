import { useGetSeoSetting, useUpsertSeoSetting, getGetSeoSettingQueryKey, getListSeoSettingsQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Globe, Share2, Search, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function SeoDetail() {
  const { page } = useParams();
  const decodedPage = decodeURIComponent(page || "");
  const { toast } = useToast();

  const {
    data: setting,
    isLoading,
    isError,
  } = useGetSeoSetting(decodedPage, {
    query: {
      enabled: !!decodedPage,
      queryKey: getGetSeoSettingQueryKey(decodedPage),
      retry: false,
    },
  });

  const upsertSeo = useUpsertSeoSetting();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    canonicalUrl: "",
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (setting && !initialized) {
      setFormData({
        metaTitle: setting.metaTitle || "",
        metaDescription: setting.metaDescription || "",
        keywords: setting.keywords || "",
        ogTitle: setting.ogTitle || "",
        ogDescription: setting.ogDescription || "",
        ogImage: setting.ogImage || "",
        canonicalUrl: setting.canonicalUrl || "",
      });
      setInitialized(true);
    }
  }, [setting, initialized]);

  const handleSave = () => {
    upsertSeo.mutate(
      { page: decodedPage, data: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetSeoSettingQueryKey(decodedPage) });
          queryClient.invalidateQueries({ queryKey: getListSeoSettingsQueryKey() });
          toast({ title: "Settings committed", description: `SEO for /${decodedPage} saved.` });
          setInitialized(false);
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white/30 gap-3">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-widest">Accessing Route Data...</span>
      </div>
    );
  }

  const isNewPage = isError || !setting;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Sticky header */}
      <div className="flex items-center justify-between sticky top-14 bg-[#050505]/90 backdrop-blur-xl z-20 py-4 border-b border-white/[0.05] -mx-6 px-6 md:-mx-8 md:px-8 -mt-6 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/seo">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/40 hover:text-white hover:bg-white/10 rounded-full w-10 h-10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold font-display tracking-wide text-white flex items-center gap-2">
              <span className="text-white/20">/</span>
              {decodedPage}
            </h2>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">
              {isNewPage ? "New Route — Settings will be created on save" : "Route Metadata Controls"}
            </p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-black font-semibold h-10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-xs px-6"
          disabled={upsertSeo.isPending}
        >
          <Save className="h-4 w-4 mr-2" />
          {upsertSeo.isPending ? "COMMITTING..." : "COMMIT SETTINGS"}
        </Button>
      </div>

      {/* New page notice */}
      {isNewPage && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/50 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
          <span className="text-[11px] leading-relaxed">
            No SEO record exists for <span className="font-mono text-white/70">/{decodedPage}</span> yet.
            Fill in the fields below and click <span className="uppercase tracking-wider font-semibold text-white/60">Commit Settings</span> to create it.
          </span>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Core tags */}
        <div className="glass-card p-6 h-fit">
          <h2 className="text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-2 mb-6 border-b border-white/[0.04] pb-4">
            <Search className="w-3.5 h-3.5 text-primary" /> Core Indexing Tags
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Target Title</label>
                <span className="font-mono text-[10px] text-white/30">{formData.metaTitle.length}/60 bytes</span>
              </div>
              <Input
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="bg-white/[0.02] border-white/[0.08] h-12 text-sm focus:ring-primary/50"
                placeholder="Electi AI | Enterprise Intelligence"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Target Description</label>
                <span className="font-mono text-[10px] text-white/30">{formData.metaDescription.length}/160 bytes</span>
              </div>
              <Textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="bg-white/[0.02] border-white/[0.08] min-h-[120px] text-sm focus:ring-primary/50 leading-relaxed"
                placeholder="Provide SERP summary..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Keywords Array</label>
              <Input
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="bg-white/[0.02] border-white/[0.08] h-12 text-sm focus:ring-primary/50 font-mono text-xs"
                placeholder="csv format"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Canonical Source</label>
              <Input
                value={formData.canonicalUrl}
                onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                className="bg-white/[0.02] border-white/[0.08] h-12 font-mono text-xs focus:ring-primary/50 text-white/60"
                placeholder="https://electi.ai/..."
              />
            </div>
          </div>
        </div>

        {/* Right: Social + Preview */}
        <div className="space-y-8">
          <div className="glass-card p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-2 mb-6 border-b border-white/[0.04] pb-4">
              <Share2 className="w-3.5 h-3.5 text-primary" /> Graph Protocol (Social)
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">OG Title Override</label>
                <Input
                  value={formData.ogTitle}
                  onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                  className="bg-white/[0.02] border-white/[0.08] h-12 text-sm focus:ring-primary/50"
                  placeholder="Defaults to Target Title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">OG Description Override</label>
                <Textarea
                  value={formData.ogDescription}
                  onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                  className="bg-white/[0.02] border-white/[0.08] min-h-[100px] text-sm focus:ring-primary/50 leading-relaxed"
                  placeholder="Defaults to Target Description"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">OG Asset URL</label>
                <Input
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  className="bg-white/[0.02] border-white/[0.08] h-12 font-mono text-xs focus:ring-primary/50"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          {/* Google SERP preview */}
          <div className="border border-white/[0.08] rounded-xl bg-white text-black overflow-hidden shadow-2xl relative">
            <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-4 py-2 flex items-center gap-2 text-xs font-mono text-[#70757a]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 uppercase tracking-widest text-[9px]">Live Simulation</span>
            </div>
            <div className="p-6 space-y-1.5 font-sans bg-white">
              <div className="flex items-center gap-2 text-[14px] text-[#202124] mb-1">
                <div className="w-7 h-7 rounded-full bg-[#f1f3f4] flex items-center justify-center border border-[#dadce0]">
                  <Globe className="w-4 h-4 text-[#5f6368]" />
                </div>
                <div className="flex flex-col">
                  <span className="leading-none mb-0.5">Electi AI</span>
                  <span className="text-[12px] text-[#4d5156] leading-none">
                    https://electi.ai › {decodedPage}
                  </span>
                </div>
              </div>
              <div className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer truncate">
                {formData.metaTitle || `Electi AI | /${decodedPage}`}
              </div>
              <div className="text-[14px] text-[#4d5156] line-clamp-2 leading-[1.58]">
                {formData.metaDescription ||
                  "We build intelligent systems that accelerate enterprise workflows. Secure, scalable, and tailored to your operations."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
