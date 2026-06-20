import { useListBlogPosts, useDeleteBlogPost, useCreateBlogPost, getListBlogPostsQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Link } from "wouter";
import { Edit2, Trash2, Plus, Globe, FileEdit } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function Blog() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data: posts, isLoading } = useListBlogPosts({ status: statusFilter === "all" ? undefined : statusFilter });
  const deletePost = useDeleteBlogPost();
  const createPost = useCreateBlogPost();
  const queryClient = useQueryClient();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleCreate = () => {
    const slug = generateSlug(newTitle);
    createPost.mutate({ data: { title: newTitle, slug, status: "draft" } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListBlogPostsQueryKey() });
        setIsCreateOpen(false);
        setNewTitle("");
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Confirm deletion of this broadcast?")) {
      deletePost.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getListBlogPostsQueryKey() })
      });
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider border border-green-500/20 bg-green-500/10 text-green-400 shadow-[0_0_8px_rgba(34,197,94,0.3)]">
          <Globe className="w-3 h-3 mr-1.5 opacity-70" /> Live
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider border border-white/10 bg-white/5 text-white/50">
        <FileEdit className="w-3 h-3 mr-1.5 opacity-70" /> Draft
      </span>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-wide text-white">CONTENT SYSTEM</h1>
          <p className="text-white/40 mt-2 text-sm">Manage public broadcasts and platform insights.</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-black font-semibold h-10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-xs px-6">
              NEW BROADCAST +
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[500px] bg-[#050505]/95 text-white">
            <DialogHeader className="border-b border-white/[0.04] pb-4 mb-4">
              <DialogTitle className="font-display tracking-widest text-lg">INITIALIZE DRAFT</DialogTitle>
            </DialogHeader>
            <div className="py-2 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Title Directive</label>
                <Input 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                  placeholder="e.g. The Future of Enterprise AI" 
                  className="bg-white/[0.02] border-white/[0.08] focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-display text-lg h-14 placeholder:text-white/20"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Generated Route</label>
                <div className="font-mono text-xs text-primary/70 bg-primary/[0.03] p-4 rounded-lg border border-primary/10 break-all">
                  /blog/{generateSlug(newTitle) || 'route-pending'}
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6 border-t border-white/[0.04] pt-4">
              <Button 
                onClick={handleCreate} 
                disabled={!newTitle || createPost.isPending} 
                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-12 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-sm"
              >
                {createPost.isPending ? "INITIALIZING..." : "CREATE & PROCEED TO EDITOR"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex mb-6 max-w-[240px]">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-white/[0.04] border-white/[0.08] h-12 text-sm focus:ring-primary/50 uppercase tracking-widest text-[11px]">
            <SelectValue placeholder="FILTER STATE" />
          </SelectTrigger>
          <SelectContent className="bg-[#050505] border-white/10 text-white">
            <SelectItem value="all">ALL STATES</SelectItem>
            <SelectItem value="published">LIVE</SelectItem>
            <SelectItem value="draft">DRAFTS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/[0.06] hover:bg-transparent">
              <TableHead className="w-[50%] text-[10px] uppercase tracking-[0.2em] text-white/25 font-normal h-12">Title / Route</TableHead>
              <TableHead className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-normal h-12">Vector</TableHead>
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
                    <span className="text-[10px] uppercase tracking-widest">Scanning Repository...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : posts?.length === 0 ? (
              <TableRow className="border-b border-white/[0.04] hover:bg-transparent">
                <TableCell colSpan={5} className="h-48 text-center">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-white/30">No broadcasts found</span>
                </TableCell>
              </TableRow>
            ) : (
              posts?.map((post) => (
                <TableRow key={post.id} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors group">
                  <TableCell className="py-4">
                    <Link href={`/blog/${post.id}`} className="font-display font-medium text-lg text-white/90 group-hover:text-primary transition-colors block">
                      {post.title}
                    </Link>
                    <div className="text-[11px] text-white/30 font-mono mt-1">/{post.slug}</div>
                  </TableCell>
                  <TableCell>
                    {post.category ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] uppercase tracking-widest bg-white/[0.05] text-white/60 border border-white/5">
                        {post.category}
                      </span>
                    ) : (
                      <span className="text-white/20">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(post.status)}
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-white/30">
                    {post.publishedAt ? (
                      format(new Date(post.publishedAt), 'yyyy-MM-dd')
                    ) : (
                      <span className="opacity-50">Init {format(new Date(post.createdAt), 'MM-dd')}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-primary hover:bg-primary/10 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors" onClick={() => handleDelete(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
