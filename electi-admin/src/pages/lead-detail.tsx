import { useGetLead, useUpdateLead, getGetLeadQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

export default function LeadDetail() {
  const { id } = useParams();
  const leadId = Number(id);
  const { data: lead, isLoading } = useGetLead(leadId, { query: { enabled: !!leadId, queryKey: getGetLeadQueryKey(leadId) } });
  const updateLead = useUpdateLead();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (lead) {
      setStatus(lead.status);
      setNotes(lead.notes || "");
    }
  }, [lead]);

  const handleSave = () => {
    updateLead.mutate(
      { id: leadId, data: { status, notes } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetLeadQueryKey(leadId) });
        }
      }
    );
  };

  const getStatusBadge = (statusStr: string) => {
    const config: Record<string, { bg: string, text: string, shadow: string }> = {
      new: { bg: 'bg-primary/10', text: 'text-primary', shadow: 'shadow-[0_0_8px_rgba(255,255,255,0.2)]' },
      contacted: { bg: 'bg-blue-500/10', text: 'text-blue-400', shadow: 'shadow-[0_0_8px_rgba(59,130,246,0.4)]' },
      qualified: { bg: 'bg-green-500/10', text: 'text-green-400', shadow: 'shadow-[0_0_8px_rgba(34,197,94,0.4)]' },
      lost: { bg: 'bg-red-500/10', text: 'text-red-400', shadow: 'shadow-[0_0_8px_rgba(239,68,68,0.4)]' },
    };
    const style = config[statusStr] || { bg: 'bg-white/5', text: 'text-white/50', shadow: '' };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] uppercase tracking-wider border border-white/5 ${style.bg} ${style.text} ${style.shadow}`}>
        {statusStr}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white/30 gap-3">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-widest">Loading Profile...</span>
      </div>
    );
  }
  
  if (!lead) return <div className="text-white/50 text-center py-20">Target not found</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/leads">
          <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10 rounded-full w-10 h-10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold font-display tracking-wide text-white">{lead.name}</h1>
          {getStatusBadge(lead.status)}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-white/30 mb-6 border-b border-white/[0.04] pb-4">Target Intel</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-lg">
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Email</div>
                <div className="font-mono text-sm text-white/90">{lead.email}</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-lg">
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Phone</div>
                <div className="font-mono text-sm text-white/90">{lead.phone || '-'}</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-lg">
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Entity</div>
                <div className="text-sm text-white/90">{lead.company || '-'}</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-lg">
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Acquisition Source</div>
                <div className="text-sm text-white/90">{lead.source || '-'}</div>
              </div>
              <div className="col-span-2 bg-white/[0.02] border border-white/[0.04] p-4 rounded-lg">
                <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Timestamp</div>
                <div className="font-mono text-sm text-white/50">{format(new Date(lead.createdAt), 'yyyy-MM-dd HH:mm:ss')}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2">Transmission</div>
              <div className="p-5 bg-[#050505] rounded-lg border border-white/[0.04] whitespace-pre-wrap font-mono text-sm text-white/70 leading-relaxed shadow-inner">
                {lead.message || <span className="italic text-white/20">No transmission body.</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-white/30 mb-6 border-b border-white/[0.04] pb-4">Operations</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Status Override</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-white/[0.02] border-white/[0.08] text-sm h-12 focus:ring-primary/50">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#050505] border-white/10 text-white">
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Internal Dossier</label>
                <Textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record tactical notes..."
                  className="bg-white/[0.02] border-white/[0.08] min-h-[150px] text-sm focus:ring-primary/50 placeholder:text-white/20 font-mono"
                />
              </div>

              <Button 
                onClick={handleSave} 
                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-12 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-sm"
                disabled={updateLead.isPending || (status === lead.status && notes === (lead.notes || ""))}
              >
                <Save className="h-4 w-4 mr-2" />
                {updateLead.isPending ? "COMMITTING..." : "COMMIT CHANGES"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
