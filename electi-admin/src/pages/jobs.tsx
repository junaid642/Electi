import { useListJobs, useDeleteJob, useCreateJob, getListJobsQueryKey } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Link } from "wouter";
import { Edit2, Trash2, Search, Plus, MapPin, Building, Briefcase } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

export default function Jobs() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const { data: jobs, isLoading } = useListJobs({ status: statusFilter === "all" ? undefined : statusFilter });
  const deleteJob = useDeleteJob();
  const createJob = useCreateJob();
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newJob, setNewJob] = useState({ title: "", department: "", location: "", type: "full-time" });

  const filteredJobs = jobs?.filter(job => 
    job.title.toLowerCase().includes(search.toLowerCase()) || 
    job.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Confirm deletion of this position?")) {
      deleteJob.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListJobsQueryKey() });
        }
      });
    }
  };

  const handleCreate = () => {
    createJob.mutate({ data: { ...newJob, status: "draft" } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListJobsQueryKey() });
        setIsCreateOpen(false);
        setNewJob({ title: "", department: "", location: "", type: "full-time" });
      }
    });
  };

  const getStatusBadge = (statusStr: string) => {
    const config: Record<string, { bg: string, text: string, shadow: string }> = {
      published: { bg: 'bg-green-500/10', text: 'text-green-400', shadow: 'shadow-[0_0_8px_rgba(34,197,94,0.4)]' },
      draft: { bg: 'bg-white/5', text: 'text-white/50', shadow: '' },
      closed: { bg: 'bg-red-500/10', text: 'text-red-400', shadow: 'shadow-[0_0_8px_rgba(239,68,68,0.4)]' },
    };
    const style = config[statusStr] || { bg: 'bg-white/5', text: 'text-white/50', shadow: '' };
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border border-white/5 ${style.bg} ${style.text} ${style.shadow}`}>
        {statusStr}
      </span>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-wide text-white">TALENT PIPELINE</h1>
          <p className="text-white/40 mt-2 text-sm">Active requisition and positioning parameters.</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-black font-semibold h-10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-xs px-6">
              OPEN POSITION +
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[500px] bg-[#050505]/95 text-white">
            <DialogHeader className="border-b border-white/[0.04] pb-4 mb-4">
              <DialogTitle className="font-display tracking-widest text-lg">INITIALIZE REQUISITION</DialogTitle>
            </DialogHeader>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Designation</label>
                <Input 
                  value={newJob.title} 
                  onChange={e => setNewJob({...newJob, title: e.target.value})} 
                  placeholder="e.g. Lead Architect" 
                  className="bg-white/[0.02] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono h-12"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Sector</label>
                <Input 
                  value={newJob.department} 
                  onChange={e => setNewJob({...newJob, department: e.target.value})} 
                  placeholder="e.g. Engineering" 
                  className="bg-white/[0.02] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono h-12"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Coordinates</label>
                  <Input 
                    value={newJob.location} 
                    onChange={e => setNewJob({...newJob, location: e.target.value})} 
                    placeholder="e.g. Riyadh, SA" 
                    className="bg-white/[0.02] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono h-12"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Classification</label>
                  <Select value={newJob.type} onValueChange={(v) => setNewJob({...newJob, type: v})}>
                    <SelectTrigger className="bg-white/[0.02] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all h-12 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#050505] border-white/10 text-white">
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6 border-t border-white/[0.04] pt-4">
              <Button 
                onClick={handleCreate} 
                disabled={!newJob.title || !newJob.department || createJob.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-12 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-sm"
              >
                {createJob.isPending ? "INITIALIZING..." : "EXECUTE REQUISITION"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <Input 
            placeholder="SCAN POSITIONS..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 bg-white/[0.04] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono h-12 text-sm placeholder:text-white/20 uppercase"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-white/[0.04] border-white/[0.08] h-12 text-sm focus:ring-primary/50">
            <SelectValue placeholder="FILTER STATUS" />
          </SelectTrigger>
          <SelectContent className="bg-[#050505] border-white/10 text-white">
            <SelectItem value="all">ALL CONDITIONS</SelectItem>
            <SelectItem value="published">PUBLISHED</SelectItem>
            <SelectItem value="draft">DRAFT</SelectItem>
            <SelectItem value="closed">CLOSED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-48 text-white/30 gap-3">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-[10px] uppercase tracking-widest">Scanning Network...</span>
        </div>
      ) : filteredJobs?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-white/30 gap-4">
          <Briefcase className="w-12 h-12 opacity-20" />
          <span className="text-[11px] uppercase tracking-[0.2em]">No positions identified</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs?.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="glass-card h-full flex flex-col group transition-all duration-300 hover:border-white/20">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-[11px] uppercase tracking-widest text-white/40 font-medium">
                      {job.department}
                    </div>
                    {getStatusBadge(job.status)}
                  </div>
                  
                  <h3 className="font-display font-medium text-xl leading-tight text-white mb-6 group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-3 text-sm text-white/60">
                      <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-xs">{job.location}</span>
                      </div>
                      <div className="bg-white/5 px-2 py-1 rounded text-xs capitalize">
                        {job.type.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-white/[0.04] flex justify-between items-center bg-white/[0.01]">
                  <span className="font-mono text-[10px] text-white/30">
                    {format(new Date(job.createdAt), 'yyyy.MM.dd')}
                  </span>
                  <div className="flex gap-2">
                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-primary hover:bg-primary/10 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors" onClick={() => handleDelete(job.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
