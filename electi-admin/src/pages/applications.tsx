import { useListApplications, useUpdateApplication, useDeleteApplication, getListApplicationsQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Trash2, ExternalLink, Mail, Phone, Linkedin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Applications() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const jobIdParam = searchParams.get('jobId');
  
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data: applications, isLoading } = useListApplications({ 
    status: statusFilter === "all" ? undefined : statusFilter,
    jobId: jobIdParam ? Number(jobIdParam) : undefined
  });
  
  const updateApp = useUpdateApplication();
  const deleteApp = useDeleteApplication();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [notes, setNotes] = useState("");

  const handleDelete = (id: number) => {
    if (confirm("Confirm deletion of candidate profile?")) {
      deleteApp.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getListApplicationsQueryKey() })
      });
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    updateApp.mutate({ id, data: { status: newStatus } }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListApplicationsQueryKey() })
    });
  };

  const saveNotes = () => {
    if (!selectedApp) return;
    updateApp.mutate({ id: selectedApp.id, data: { notes } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListApplicationsQueryKey() });
        setSelectedApp({ ...selectedApp, notes });
      }
    });
  };

  const getStatusBadge = (statusStr: string) => {
    const config: Record<string, { bg: string, text: string, shadow: string }> = {
      new: { bg: 'bg-primary/10', text: 'text-primary', shadow: 'shadow-[0_0_8px_rgba(255,255,255,0.2)]' },
      reviewing: { bg: 'bg-blue-500/10', text: 'text-blue-400', shadow: 'shadow-[0_0_8px_rgba(59,130,246,0.4)]' },
      interviewing: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', shadow: 'shadow-[0_0_8px_rgba(234,179,8,0.4)]' },
      offered: { bg: 'bg-green-500/10', text: 'text-green-400', shadow: 'shadow-[0_0_8px_rgba(34,197,94,0.4)]' },
      rejected: { bg: 'bg-red-500/10', text: 'text-red-400', shadow: 'shadow-[0_0_8px_rgba(239,68,68,0.4)]' },
    };
    const style = config[statusStr] || { bg: 'bg-white/5', text: 'text-white/50', shadow: '' };
    
    return `${style.bg} ${style.text} ${style.shadow}`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || '?';
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-wide text-white">CANDIDATE PIPELINE</h1>
          <p className="text-white/40 mt-2 text-sm">
            {jobIdParam ? `Targeted scan for specific requisition` : 'Global talent registry overview'}
          </p>
        </div>
      </div>

      <div className="flex mb-6 max-w-[240px]">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-white/[0.04] border-white/[0.08] h-12 text-sm focus:ring-primary/50 uppercase tracking-widest text-[11px]">
            <SelectValue placeholder="FILTER STATUS" />
          </SelectTrigger>
          <SelectContent className="bg-[#050505] border-white/10 text-white">
            <SelectItem value="all">ALL CONDITIONS</SelectItem>
            <SelectItem value="new">NEW</SelectItem>
            <SelectItem value="reviewing">REVIEWING</SelectItem>
            <SelectItem value="interviewing">INTERVIEWING</SelectItem>
            <SelectItem value="offered">OFFERED</SelectItem>
            <SelectItem value="rejected">REJECTED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
              <TableHead className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-normal h-12">Subject</TableHead>
              <TableHead className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-normal h-12">Target Position</TableHead>
              <TableHead className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-normal h-12">State</TableHead>
              <TableHead className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-normal h-12">Timestamp</TableHead>
              <TableHead className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-normal h-12 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="border-b border-white/[0.04] hover:bg-transparent">
                <TableCell colSpan={5} className="h-32">
                  <div className="flex flex-col items-center justify-center text-white/30 gap-3">
                    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-[10px] uppercase tracking-widest">Scanning Registry...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : applications?.length === 0 ? (
              <TableRow className="border-b border-white/[0.04] hover:bg-transparent">
                <TableCell colSpan={5} className="h-48">
                  <div className="flex flex-col items-center justify-center text-white/30 gap-4">
                    <span className="text-[11px] uppercase tracking-[0.2em]">No profiles match criteria</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              applications?.map((app, i) => (
                <TableRow 
                  key={app.id} 
                  className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors cursor-pointer group"
                  onClick={() => { setSelectedApp(app); setNotes(app.notes || ""); }}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-medium text-sm shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.06)]">
                        {getInitials(app.name)}
                      </div>
                      <div>
                        <div className="font-medium text-white/90 text-sm group-hover:text-primary transition-colors">{app.name}</div>
                        <div className="text-[11px] text-white/40 font-mono mt-0.5">{app.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {app.jobTitle ? (
                      <span className="text-sm text-white/80">{app.jobTitle}</span>
                    ) : (
                      <span className="text-[11px] text-white/30 italic uppercase tracking-widest">General</span>
                    )}
                  </TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <Select 
                      value={app.status} 
                      onValueChange={(v) => handleStatusChange(app.id, v)}
                    >
                      <SelectTrigger className={`w-[140px] h-9 text-xs border border-white/5 uppercase tracking-wider rounded-full px-4 ${getStatusBadge(app.status)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#050505] border-white/10 text-white">
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="interviewing">Interviewing</SelectItem>
                        <SelectItem value="offered">Offered</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-white/30">
                    {format(new Date(app.createdAt), 'yyyy-MM-dd')}
                  </TableCell>
                  <TableCell className="text-right" onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/30 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all" onClick={() => handleDelete(app.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <SheetContent className="bg-[#0a0a0a] border-l border-white/[0.05] sm:max-w-md w-full p-0 flex flex-col h-full shadow-2xl">
          {selectedApp && (
            <>
              <div className="p-8 border-b border-white/[0.05] bg-white/[0.02]">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-medium text-xl shadow-[0_0_15px_rgba(255,255,255,0.08)] mb-6">
                  {getInitials(selectedApp.name)}
                </div>
                <SheetTitle className="text-3xl font-display text-white mb-2">{selectedApp.name}</SheetTitle>
                <div className="text-sm text-white/60 mb-1">
                  Target: <span className="text-white font-medium">{selectedApp.jobTitle || 'General Application'}</span>
                </div>
                <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                  Logged: {format(new Date(selectedApp.createdAt), 'yyyy-MM-dd HH:mm')}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="space-y-3 bg-white/[0.02] p-5 rounded-xl border border-white/[0.04]">
                  <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2">Comms Channels</div>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <Mail className="h-4 w-4 text-white/30" />
                    <a href={`mailto:${selectedApp.email}`} className="hover:text-primary transition-colors font-mono">{selectedApp.email}</a>
                  </div>
                  {selectedApp.phone && (
                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <Phone className="h-4 w-4 text-white/30" />
                      <a href={`tel:${selectedApp.phone}`} className="hover:text-primary transition-colors font-mono">{selectedApp.phone}</a>
                    </div>
                  )}
                  {selectedApp.linkedin && (
                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <Linkedin className="h-4 w-4 text-white/30" />
                      <a href={selectedApp.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                        LinkedIn Profile <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>

                {selectedApp.message && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase tracking-widest text-white/40 flex items-center gap-2 mb-3">
                      <MessageSquare className="h-3.5 w-3.5 text-primary" /> Transmission Body
                    </h4>
                    <div className="p-5 bg-black/40 rounded-xl border border-white/[0.03] text-sm text-white/60 leading-relaxed whitespace-pre-wrap font-mono shadow-inner">
                      {selectedApp.message}
                    </div>
                  </div>
                )}

                <div className="space-y-4 pt-4 border-t border-white/[0.05]">
                  <h4 className="text-[10px] uppercase tracking-widest text-white/40">Dossier Notes</h4>
                  <Textarea 
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Record tactical analysis..."
                    className="min-h-[150px] bg-white/[0.02] border-white/[0.08] focus:ring-primary/50 text-sm font-mono placeholder:text-white/20"
                  />
                  <Button 
                    onClick={saveNotes}
                    disabled={updateApp.isPending || notes === (selectedApp.notes || "")}
                    className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-12 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-sm"
                  >
                    {updateApp.isPending ? "COMMITTING..." : "COMMIT DOSSIER"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
