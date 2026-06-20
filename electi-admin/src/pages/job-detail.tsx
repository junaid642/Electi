import { useGetJob, useUpdateJob, useListApplications, getGetJobQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

export default function JobDetail() {
  const { id } = useParams();
  const jobId = Number(id);
  
  const { data: job, isLoading: jobLoading } = useGetJob(jobId, { query: { enabled: !!jobId, queryKey: getGetJobQueryKey(jobId) } });
  const { data: applications, isLoading: appsLoading } = useListApplications({ jobId });
  
  const updateJob = useUpdateJob();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "", department: "", location: "", type: "", status: "", description: "", requirements: ""
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        status: job.status,
        description: job.description || "",
        requirements: job.requirements || ""
      });
    }
  }, [job]);

  const handleSave = () => {
    updateJob.mutate(
      { id: jobId, data: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetJobQueryKey(jobId) });
        }
      }
    );
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
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider border border-white/5 ${style.bg} ${style.text} ${style.shadow}`}>
        {statusStr}
      </span>
    );
  };

  if (jobLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white/30 gap-3">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-widest">Loading Telemetry...</span>
      </div>
    );
  }
  
  if (!job) return <div className="text-white/50 text-center py-20">Position not found</div>;

  const hasChanges = Object.keys(formData).some((key) => formData[key as keyof typeof formData] !== (job as any)[key] && !(formData[key as keyof typeof formData] === "" && !(job as any)[key]));

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between sticky top-14 bg-[#050505]/90 backdrop-blur-xl z-20 py-4 border-b border-white/[0.05] -mx-6 px-6 md:-mx-8 md:px-8 -mt-6 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/jobs">
            <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10 rounded-full w-10 h-10">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold font-display tracking-wide text-white">{job.title}</h2>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1">ID: POS-{job.id.toString().padStart(4, '0')}</p>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          className="bg-primary hover:bg-primary/90 text-black font-semibold h-10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-xs px-6"
          disabled={updateJob.isPending || !hasChanges}
        >
          <Save className="h-4 w-4 mr-2" />
          {updateJob.isPending ? "COMMITTING..." : "COMMIT"}
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-white/30 mb-6 border-b border-white/[0.04] pb-4">Job Parameters</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Designation</label>
                <Input 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  className="bg-white/[0.02] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Sector</label>
                <Input 
                  value={formData.department} 
                  onChange={e => setFormData({...formData, department: e.target.value})} 
                  className="bg-white/[0.02] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Coordinates</label>
                <Input 
                  value={formData.location} 
                  onChange={e => setFormData({...formData, location: e.target.value})} 
                  className="bg-white/[0.02] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-mono h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Classification</label>
                <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v})}>
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

          <div className="glass-card p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-white/30 mb-6 border-b border-white/[0.04] pb-4">Requisition Details</h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Mission Description</label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-white/[0.02] border-white/[0.08] min-h-[200px] font-mono text-sm focus:ring-primary/50 leading-relaxed"
                  placeholder="Enter detailed description..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Operational Requirements</label>
                <Textarea 
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  className="bg-white/[0.02] border-white/[0.08] min-h-[200px] font-mono text-sm focus:ring-primary/50 leading-relaxed"
                  placeholder="Enter operational requirements..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-white/30 mb-6 border-b border-white/[0.04] pb-4">State Control</h2>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Status</label>
              <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}>
                <SelectTrigger className="bg-white/[0.02] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all h-12 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#050505] border-white/10 text-white">
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6 border-b border-white/[0.04] pb-4">
              <h2 className="text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-2">
                <Users className="h-3.5 w-3.5" />
                Active Candidates
              </h2>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/70">
                {applications?.length || 0}
              </span>
            </div>
            
            <div className="space-y-3">
              {appsLoading ? (
                <div className="text-center py-6 text-white/30 text-xs">Scanning registry...</div>
              ) : applications?.length === 0 ? (
                <div className="text-center py-8 bg-white/[0.01] rounded border border-white/[0.04] text-white/30 text-xs italic">
                  No applicants registered
                </div>
              ) : (
                <div className="space-y-2">
                  {applications?.map((app) => (
                    <div key={app.id} className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg hover:border-white/10 transition-colors flex items-center justify-between">
                      <div className="overflow-hidden mr-3">
                        <div className="font-medium text-sm text-white/90 truncate">{app.name}</div>
                        <div className="text-[10px] text-white/40 font-mono truncate">{app.email}</div>
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(app.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {applications && applications.length > 0 && (
                <Button variant="outline" className="w-full mt-6 bg-white/[0.02] border-white/10 hover:bg-white/5 text-xs tracking-widest uppercase h-10" asChild>
                  <Link href={`/applications?jobId=${jobId}`}>VIEW FULL ROSTER</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
