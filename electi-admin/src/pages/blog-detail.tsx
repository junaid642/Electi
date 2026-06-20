import { useGetBlogPost, useUpdateBlogPost, getGetBlogPostQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Image as ImageIcon, Layout } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function BlogEditor() {
  const { id } = useParams();
  const postId = Number(id);
  
  const { data: post, isLoading } = useGetBlogPost(postId, { query: { enabled: !!postId, queryKey: getGetBlogPostQueryKey(postId) } });
  const updatePost = useUpdateBlogPost();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "", slug: "", content: "", excerpt: "", coverImage: "", category: "", tags: "", status: ""
  });

  const initializedForId = useRef<number | null>(null);

  useEffect(() => {
    if (post && initializedForId.current !== postId) {
      initializedForId.current = postId;
      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content || "",
        excerpt: post.excerpt || "",
        coverImage: post.coverImage || "",
        category: post.category || "",
        tags: post.tags || "",
        status: post.status
      });
    }
  }, [post, postId]);

  const handleSave = () => {
    updatePost.mutate(
      { id: postId, data: formData },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(getGetBlogPostQueryKey(postId), data);
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-white/30 gap-3">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-widest">Loading Editor...</span>
      </div>
    );
  }
  
  if (!post) return <div className="text-white/50 text-center py-20">Record not found</div>;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <div className="flex items-center justify-between sticky top-14 bg-[#050505]/90 backdrop-blur-xl z-20 py-4 border-b border-white/[0.05] -mx-6 px-6 md:-mx-8 md:px-8 -mt-6 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/blog">
            <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10 rounded-full w-10 h-10">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <h2 className="text-xs font-mono text-white/40 bg-white/5 px-3 py-1 rounded border border-white/5 tracking-wider truncate max-w-[200px] md:max-w-md">/{formData.slug}</h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}>
            <SelectTrigger className="w-[140px] bg-white/[0.04] border-white/[0.08] text-[10px] uppercase tracking-widest h-10 focus:ring-primary/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#050505] border-white/10 text-white">
              <SelectItem value="draft">DRAFT</SelectItem>
              <SelectItem value="published">LIVE</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleSave} 
            className="bg-primary hover:bg-primary/90 text-black font-semibold h-10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all uppercase tracking-wider text-xs px-6"
            disabled={updatePost.isPending}
          >
            <Save className="h-4 w-4 mr-2" />
            {updatePost.isPending ? "COMMITTING..." : "COMMIT"}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card border-none bg-transparent lg:border-white/[0.06] lg:bg-white/[0.01] shadow-none lg:p-8">
            <div className="space-y-8">
              <div className="space-y-2">
                <Input 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  placeholder="Subject Title"
                  className="text-4xl md:text-5xl font-bold font-display tracking-tight h-auto py-4 px-0 border-0 bg-transparent focus-visible:ring-0 rounded-none border-b border-white/10 placeholder:text-white/20 text-white"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Markdown Body</label>
                  <span className="text-[10px] text-white/20 font-mono">{formData.content.length} bytes</span>
                </div>
                <Textarea 
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="bg-black/40 border-white/[0.05] min-h-[600px] font-mono text-sm leading-relaxed resize-y p-6 text-white/80 focus:ring-primary/30 shadow-inner rounded-xl"
                  placeholder="Begin transmission..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-2 mb-6 border-b border-white/[0.04] pb-4">
              <Layout className="w-3.5 h-3.5 text-primary" /> Meta Parameters
            </h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Route Vector</label>
                <Input 
                  value={formData.slug} 
                  onChange={e => setFormData({...formData, slug: e.target.value})} 
                  className="bg-white/[0.02] border-white/[0.08] h-10 font-mono text-xs focus:ring-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Category</label>
                <Input 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})} 
                  className="bg-white/[0.02] border-white/[0.08] h-10 text-sm focus:ring-primary/50"
                  placeholder="e.g. Analysis"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Tags</label>
                <Input 
                  value={formData.tags} 
                  onChange={e => setFormData({...formData, tags: e.target.value})} 
                  className="bg-white/[0.02] border-white/[0.08] h-10 text-sm focus:ring-primary/50 font-mono text-xs"
                  placeholder="csv format"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Brief Summary</label>
                <Textarea 
                  value={formData.excerpt} 
                  onChange={e => setFormData({...formData, excerpt: e.target.value})} 
                  className="bg-white/[0.02] border-white/[0.08] min-h-[100px] text-sm focus:ring-primary/50 leading-relaxed"
                  placeholder="SEO and preview context..."
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-2 mb-6 border-b border-white/[0.04] pb-4">
              <ImageIcon className="w-3.5 h-3.5 text-primary" /> Visual Asset
            </h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Source URL</label>
                <Input 
                  value={formData.coverImage} 
                  onChange={e => setFormData({...formData, coverImage: e.target.value})} 
                  className="bg-white/[0.02] border-white/[0.08] h-10 text-sm font-mono text-xs focus:ring-primary/50"
                  placeholder="https://"
                />
              </div>
              {formData.coverImage ? (
                <div className="aspect-video w-full rounded-lg border border-white/[0.08] overflow-hidden relative shadow-inner">
                  <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-video w-full rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center text-white/20 bg-white/[0.01]">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-[10px] uppercase tracking-widest">No Asset Loaded</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
