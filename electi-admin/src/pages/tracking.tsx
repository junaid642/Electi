import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Info, Save } from "lucide-react";

export default function Tracking() {
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(false);
  const [activeStatus, setActiveStatus] = useState({
    gtm: true,
    ga4: true,
    meta: false,
    linkedin: false,
    tiktok: false,
    snapchat: false
  });

  const handleSave = () => {
    toast({
      title: "Configuration Saved",
      description: "Tracking tags and pixels have been updated successfully.",
    });
  };

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      toast({
        title: "Validation Complete",
        description: "All active tags are firing correctly.",
      });
    }, 1500);
  };

  const Toggle = ({ active, onChange }: { active: boolean, onChange: (v: boolean) => void }) => (
    <button 
      onClick={() => onChange(!active)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${active ? 'bg-primary' : 'bg-white/10'}`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-black transition-transform ${active ? 'translate-x-4' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-display tracking-wide text-white">TRACKING & TAG MANAGER</h1>
        <p className="text-white/40 mt-2 text-sm">Configure analytics, pixels, and marketing tags.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-card p-6 space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5 pb-4 mb-4">Core Analytics</h3>
            
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <Label className="text-white/70">Google Tag Manager ID</Label>
                  <Input 
                    placeholder="GTM-XXXXXXX" 
                    defaultValue="GTM-N843X1A"
                    className="bg-white/[0.04] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 font-mono text-sm"
                  />
                </div>
                <div className="pt-8">
                  <Toggle active={activeStatus.gtm} onChange={(v) => setActiveStatus(prev => ({...prev, gtm: v}))} />
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <Label className="text-white/70">Google Analytics 4 Measurement ID</Label>
                  <Input 
                    placeholder="G-XXXXXXXXXX" 
                    defaultValue="G-4XL912ABQ"
                    className="bg-white/[0.04] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 font-mono text-sm"
                  />
                </div>
                <div className="pt-8">
                  <Toggle active={activeStatus.ga4} onChange={(v) => setActiveStatus(prev => ({...prev, ga4: v}))} />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5 pb-4 mb-4">Marketing Pixels</h3>
            
            <div className="space-y-4">
              {[
                { id: 'meta', label: 'Meta (Facebook) Pixel ID', placeholder: '123456789012345' },
                { id: 'linkedin', label: 'LinkedIn Insight Tag ID', placeholder: '123456' },
                { id: 'tiktok', label: 'TikTok Pixel ID', placeholder: 'C1234567890' },
                { id: 'snapchat', label: 'Snapchat Pixel ID', placeholder: 'xxxx-xxxx-xxxx' },
              ].map(pixel => (
                <div key={pixel.id} className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <Label className="text-white/70">{pixel.label}</Label>
                    <Input 
                      placeholder={pixel.placeholder} 
                      className="bg-white/[0.04] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 font-mono text-sm text-white/60"
                    />
                  </div>
                  <div className="pt-8">
                    <Toggle 
                      active={activeStatus[pixel.id as keyof typeof activeStatus]} 
                      onChange={(v) => setActiveStatus(prev => ({...prev, [pixel.id]: v}))} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5 pb-4 mb-4">Custom Scripts</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-white/70">Head Scripts</Label>
                  <span className="text-[10px] text-white/30 font-mono">&lt;head&gt;</span>
                </div>
                <Textarea 
                  placeholder="<!-- Inject scripts here -->"
                  className="bg-white/[0.04] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 font-mono text-xs h-32 text-white/60"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-white/70">Body Scripts</Label>
                  <span className="text-[10px] text-white/30 font-mono">&lt;body&gt;</span>
                </div>
                <Textarea 
                  placeholder="<!-- Inject scripts here -->"
                  className="bg-white/[0.04] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 font-mono text-xs h-32 text-white/60"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSave}
            className="w-full md:w-auto px-8 bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 sticky top-24">
            <h3 className="text-[10px] uppercase tracking-widest text-white/30 mb-6">Status</h3>
            
            <div className="space-y-4 mb-8">
              {Object.entries(activeStatus).map(([key, active]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-white/70 uppercase tracking-wider">{key}</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-white/20'}`} />
                    <span className="text-[10px] uppercase tracking-widest text-white/40">{active ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-primary/80 leading-relaxed">
                  Changes to tracking codes may take up to 5 minutes to propagate across the CDN.
                </p>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-white/10 text-white hover:bg-white/5 hover:text-white"
              onClick={handleValidate}
              disabled={isValidating}
            >
              {isValidating ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Validating...
                </div>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Validate Tags
                </>
              )}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
