"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Plus, Pencil, Trash2, X, Check, Loader2,
  Bold, Italic, Heading2, Quote, Code,
  Upload, Image as ImageIcon, Calendar, Search as SearchIcon, Tag,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  coverImage: string | null;
  category: string | null;
  tags: string | null;
  status: "published" | "draft" | "scheduled";
  publishedAt: string | null;
  scheduledAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  createdAt: string;
}

const CATEGORIES = [
  "Industry Insights", "Technology", "Case Study",
  "Company News", "Tips & Guides",
];

type FormState = {
  title: string; slug: string; excerpt: string; content: string;
  categories: string[];
  tags: string; coverImage: string;
  status: "published" | "draft" | "scheduled";
  scheduledAt: string;
  metaTitle: string; metaDescription: string; canonicalUrl: string;
};

const BLANK: FormState = {
  title: "", slug: "", excerpt: "", content: "",
  categories: [],
  tags: "", coverImage: "", status: "draft",
  scheduledAt: "",
  metaTitle: "", metaDescription: "", canonicalUrl: "",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function apiFetch(path: string, opts?: RequestInit) {
  const res = await fetch(path, { credentials: "include", ...opts });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ── Rich Editor ────────────────────────────────────────────────────────────────
function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const prevRef = useRef(value);

  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[240px] outline-none text-[13px] text-white/80 leading-relaxed p-3 " +
          "[&>p]:mb-3 [&>h2]:text-white [&>h2]:font-bold [&>h2]:text-[15px] [&>h2]:mt-4 [&>h2]:mb-2 " +
          "[&>blockquote]:border-l-2 [&>blockquote]:border-white/20 [&>blockquote]:pl-3 [&>blockquote]:text-white/45 [&>blockquote]:italic " +
          "[&>pre]:bg-white/[0.05] [&>pre]:rounded [&>pre]:p-3 [&>pre]:text-[11px] [&>pre]:font-mono " +
          "[&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-4",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      prevRef.current = html;
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== prevRef.current) {
      editor.commands.setContent(value || "");
      prevRef.current = value;
    }
  }, [editor, value]);

  const tb = [
    { icon: <Bold className="w-3.5 h-3.5" />, title: "Bold", act: () => editor?.chain().focus().toggleBold().run(), isOn: () => editor?.isActive("bold") ?? false },
    { icon: <Italic className="w-3.5 h-3.5" />, title: "Italic", act: () => editor?.chain().focus().toggleItalic().run(), isOn: () => editor?.isActive("italic") ?? false },
    { icon: <Heading2 className="w-3.5 h-3.5" />, title: "Heading 2", act: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), isOn: () => editor?.isActive("heading", { level: 2 }) ?? false },
    { icon: <Code className="w-3.5 h-3.5" />, title: "Code Block", act: () => editor?.chain().focus().toggleCodeBlock().run(), isOn: () => editor?.isActive("codeBlock") ?? false },
    { icon: <Quote className="w-3.5 h-3.5" />, title: "Blockquote", act: () => editor?.chain().focus().toggleBlockquote().run(), isOn: () => editor?.isActive("blockquote") ?? false },
  ];

  return (
    <div className="border border-white/[0.08] rounded-lg overflow-hidden bg-white/[0.04] focus-within:border-white/20 transition-colors">
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-white/[0.06] bg-white/[0.02]">
        {tb.map(btn => (
          <button key={btn.title} type="button" title={btn.title}
            onMouseDown={e => { e.preventDefault(); btn.act(); }}
            className={`p-1.5 rounded transition-colors ${btn.isOn() ? "text-white bg-white/10" : "text-white/35 hover:text-white/70 hover:bg-white/[0.06]"}`}>
            {btn.icon}
          </button>
        ))}
        <span className="ml-auto text-[9px] text-white/20 pr-1 font-mono">rich text</span>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

// ── Image Uploader ─────────────────────────────────────────────────────────────
function ImageUploader({ value, onChange }: { value: string; onChange: (path: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) { setError("Please choose an image file"); return; }
    if (file.size > 8 * 1024 * 1024) { setError("Image must be under 8 MB"); return; }
    setError(null);
    setUploading(true);
    try {
      // 1. Request presigned upload URL
      const { uploadURL, objectPath } = await apiFetch("/api/storage/blog-uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
      }) as { uploadURL: string; objectPath: string };

      // 2. Upload directly to GCS
      await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      // 3. Store the object path for the blog post
      onChange(objectPath);
    } catch {
      setError("Upload failed — try again");
    } finally {
      setUploading(false);
    }
  }

  const previewSrc = value.startsWith("/objects/")
    ? `/api/storage/blog-images/${value.replace(/^\/objects\//, "")}`
    : value || null;

  return (
    <div className="space-y-2">
      {previewSrc && (
        <div className="rounded-lg overflow-hidden border border-white/[0.06] h-24 bg-white/[0.02] relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewSrc} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <input type="hidden" value={value} readOnly />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) void handleFile(f); e.target.value = ""; }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white/55 hover:text-white/80 text-[11px] font-500 transition-colors disabled:opacity-50"
        >
          {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
          {uploading ? "Uploading…" : "Upload Image"}
        </button>
        <span className="text-white/20 text-[10px]">or</span>
        <input
          value={value.startsWith("/objects/") ? "" : value}
          onChange={e => onChange(e.target.value)}
          placeholder="Paste external URL…"
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[12px] text-white/75 placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
        />
      </div>
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

// ── Category Multi-select ──────────────────────────────────────────────────────
function CategorySelector({ value, onChange }: { value: string[]; onChange: (cats: string[]) => void }) {
  function toggle(cat: string) {
    onChange(value.includes(cat) ? value.filter(c => c !== cat) : [...value, cat]);
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          type="button"
          onClick={() => toggle(cat)}
          className={`px-2.5 py-1 rounded-md text-[10px] font-500 border transition-colors ${
            value.includes(cat)
              ? "bg-white/[0.12] text-white/90 border-white/20"
              : "bg-white/[0.03] text-white/40 border-white/[0.07] hover:text-white/65 hover:bg-white/[0.07]"
          }`}
        >
          {value.includes(cat) && <span className="mr-1">✓</span>}{cat}
        </button>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; editing: BlogPost | null }>({ open: false, editing: null });
  const [form, setForm] = useState(BLANK);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seoOpen, setSeoOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/api/admin/blog");
      setPosts(data as BlogPost[]);
    } catch {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const openCreate = () => {
    setForm(BLANK);
    setSeoOpen(false);
    setModal({ open: true, editing: null });
  };

  const openEdit = (p: BlogPost) => {
    setForm({
      title:           p.title,
      slug:            p.slug,
      excerpt:         p.excerpt ?? "",
      content:         p.content ?? "",
      categories:      p.category ? p.category.split(",").map(s => s.trim()).filter(Boolean) : [],
      tags:            p.tags ?? "",
      coverImage:      p.coverImage ?? "",
      status:          p.status === "scheduled" ? "scheduled" : p.status,
      scheduledAt:     p.scheduledAt ? p.scheduledAt.slice(0, 16) : "",
      metaTitle:       p.metaTitle ?? "",
      metaDescription: p.metaDescription ?? "",
      canonicalUrl:    p.canonicalUrl ?? "",
    });
    setSeoOpen(false);
    setModal({ open: true, editing: p });
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const body: Record<string, unknown> = {
        title:           form.title,
        slug:            form.slug.trim() || slugify(form.title),
        excerpt:         form.excerpt,
        content:         form.content,
        category:        form.categories.join(", "),
        tags:            form.tags,
        coverImage:      form.coverImage,
        status:          form.status,
        metaTitle:       form.metaTitle || undefined,
        metaDescription: form.metaDescription || undefined,
        canonicalUrl:    form.canonicalUrl || undefined,
      };
      if (form.scheduledAt) body["scheduledAt"] = new Date(form.scheduledAt).toISOString();

      if (modal.editing) {
        const updated = await apiFetch(`/api/admin/blog/${modal.editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }) as BlogPost;
        setPosts(ps => ps.map(p => p.id === modal.editing!.id ? updated : p));
      } else {
        const created = await apiFetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }) as BlogPost;
        setPosts(ps => [created, ...ps]);
      }
      setModal({ open: false, editing: null });
    } catch {
      setError("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiFetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      setPosts(ps => ps.filter(p => p.id !== id));
      setDeleteId(null);
    } catch { setError("Failed to delete post"); }
  };

  const toggleStatus = async (p: BlogPost) => {
    const newStatus = p.status === "published" ? "draft" : "published";
    try {
      const updated = await apiFetch(`/api/admin/blog/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }) as BlogPost;
      setPosts(ps => ps.map(x => x.id === p.id ? updated : x));
    } catch { setError("Failed to update status"); }
  };

  const published = posts.filter(p => p.status === "published").length;
  const drafts    = posts.filter(p => p.status === "draft").length;
  const scheduled = posts.filter(p => p.status === "scheduled").length;

  return (
    <div className="space-y-4 max-w-[1200px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-700 font-display text-white/90 tracking-tight">Content Hub</h1>
          <p className="text-[11px] text-white/35 mt-0.5">
            {loading ? "Loading…" : `${published} published · ${drafts} drafts${scheduled ? ` · ${scheduled} scheduled` : ""}`}
          </p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-[12px] font-600 hover:bg-white/90 transition-colors">
          <Plus className="w-3.5 h-3.5" /> New Post
        </button>
      </div>

      {error && (
        <div className="glass border border-red-500/20 rounded-lg px-4 py-2.5 text-[11px] text-red-400 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-white/30 hover:text-white/60"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      <div className="glass overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-2 text-white/25 text-[12px]">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading posts…
          </div>
        ) : (
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Title", "Categories", "Cover", "Status", "Scheduled / Published", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] font-600 tracking-widest text-white/30 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((p, i) => (
                <tr key={p.id} className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${i === posts.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-4 py-3 max-w-[220px]">
                    <p className="font-600 text-white/80 truncate">{p.title}</p>
                    <p className="text-[10px] text-white/30 truncate mt-0.5">/{p.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-white/45 text-[11px] max-w-[160px]">
                    {p.category
                      ? p.category.split(",").map(c => (
                          <span key={c} className="inline-block bg-white/[0.05] text-white/50 text-[9px] px-1.5 py-0.5 rounded mr-1 mb-0.5">{c.trim()}</span>
                        ))
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {p.coverImage ? (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400/70"><ImageIcon className="w-3 h-3" /> Yes</span>
                    ) : (
                      <span className="text-white/20 text-[10px]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => void toggleStatus(p)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-600 tracking-wide transition-all ${
                        p.status === "published"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25"
                          : p.status === "scheduled"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                          : "bg-white/[0.06] text-white/35 border border-white/[0.08] hover:bg-white/[0.1]"
                      }`}
                    >
                      {p.status === "published" ? "LIVE" : p.status === "scheduled" ? "SCHEDULED" : "DRAFT"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-white/35 font-mono text-[10px]">
                    {p.scheduledAt ? `⏱ ${p.scheduledAt.slice(0, 16)}` : p.publishedAt ? p.publishedAt.slice(0, 10) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-md text-white/30 hover:text-white/70 hover:bg-white/[0.05] transition-colors"><Pencil className="w-3 h-3" /></button>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-md text-white/30 hover:text-red-400/70 hover:bg-red-500/[0.06] transition-colors"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && posts.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-white/25 text-[12px]">No posts yet. Create your first post.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {modal.open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
              className="glass w-full max-w-2xl max-h-[94vh] overflow-y-auto p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[15px] font-700 text-white/90">{modal.editing ? "Edit Post" : "New Post"}</h2>
                <button onClick={() => setModal({ open: false, editing: null })} className="p-1.5 rounded-md text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-colors"><X className="w-4 h-4" /></button>
              </div>

              <div className="space-y-4">
                {/* Title + Slug */}
                <div>
                  <label className="label-xs">Title *</label>
                  <input
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))}
                    className="field-sm w-full"
                    placeholder="Post title…"
                  />
                </div>
                <div>
                  <label className="label-xs">Slug</label>
                  <input
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    className="field-sm w-full font-mono"
                    placeholder="auto-generated-from-title"
                  />
                </div>

                {/* Categories multi-select */}
                <div>
                  <label className="label-xs flex items-center gap-1.5 mb-2"><Tag className="w-3 h-3" /> Categories</label>
                  <CategorySelector
                    value={form.categories}
                    onChange={cats => setForm(f => ({ ...f, categories: cats }))}
                  />
                </div>

                {/* Tags + Status */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label-xs">Tags (comma-separated)</label>
                    <input
                      value={form.tags}
                      onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                      className="field-sm w-full"
                      placeholder="AI, Saudi Arabia"
                    />
                  </div>
                  <div>
                    <label className="label-xs">Status</label>
                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as FormState["status"] }))}
                      className="field-sm w-full">
                      <option value="draft" className="bg-[#1a1a1a]">Draft</option>
                      <option value="published" className="bg-[#1a1a1a]">Published (Live)</option>
                      <option value="scheduled" className="bg-[#1a1a1a]">Scheduled</option>
                    </select>
                  </div>
                </div>

                {/* Schedule date (only when scheduled) */}
                {form.status === "scheduled" && (
                  <div>
                    <label className="label-xs flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Publish Date & Time</label>
                    <input
                      type="datetime-local"
                      value={form.scheduledAt}
                      onChange={e => setForm(f => ({ ...f, scheduledAt: e.target.value }))}
                      className="field-sm w-full"
                    />
                  </div>
                )}

                {/* Cover Image upload */}
                <div>
                  <label className="label-xs flex items-center gap-1.5"><ImageIcon className="w-3 h-3" /> Cover Image</label>
                  <ImageUploader value={form.coverImage} onChange={path => setForm(f => ({ ...f, coverImage: path }))} />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="label-xs">Excerpt</label>
                  <textarea
                    value={form.excerpt}
                    onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                    rows={2}
                    className="field-sm w-full resize-none"
                    placeholder="Short summary shown in the blog listing…"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="label-xs">Content</label>
                  <RichEditor value={form.content} onChange={html => setForm(f => ({ ...f, content: html }))} />
                </div>

                {/* SEO accordion */}
                <div className="border border-white/[0.07] rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSeoOpen(o => !o)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-[11px] text-white/55 hover:text-white/75 hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="flex items-center gap-1.5"><SearchIcon className="w-3 h-3" /> SEO settings</span>
                    <span className="text-white/20">{seoOpen ? "▲" : "▼"}</span>
                  </button>
                  {seoOpen && (
                    <div className="px-3 pb-3 space-y-3 border-t border-white/[0.05]">
                      <div className="mt-3">
                        <label className="label-xs">Meta Title</label>
                        <input
                          value={form.metaTitle}
                          onChange={e => setForm(f => ({ ...f, metaTitle: e.target.value }))}
                          className="field-sm w-full"
                          placeholder="Override title for search engines…"
                          maxLength={70}
                        />
                        <p className="text-[9px] text-white/20 mt-0.5">{form.metaTitle.length}/70</p>
                      </div>
                      <div>
                        <label className="label-xs">Meta Description</label>
                        <textarea
                          value={form.metaDescription}
                          onChange={e => setForm(f => ({ ...f, metaDescription: e.target.value }))}
                          rows={2}
                          className="field-sm w-full resize-none"
                          placeholder="Shown in search results (max 160 chars)…"
                          maxLength={160}
                        />
                        <p className="text-[9px] text-white/20 mt-0.5">{form.metaDescription.length}/160</p>
                      </div>
                      <div>
                        <label className="label-xs">Canonical URL</label>
                        <input
                          value={form.canonicalUrl}
                          onChange={e => setForm(f => ({ ...f, canonicalUrl: e.target.value }))}
                          className="field-sm w-full"
                          placeholder="https://www.x-360.ai/blog/…"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button onClick={() => void handleSave()} disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black text-[12px] font-600 hover:bg-white/90 transition-colors disabled:opacity-50">
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    {modal.editing ? "Save Changes" : "Create Post"}
                  </button>
                  <button onClick={() => setModal({ open: false, editing: null })} className="px-4 py-2 rounded-lg text-[12px] text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-colors">Cancel</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              className="glass w-full max-w-sm p-6 rounded-2xl text-center">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-[14px] font-600 text-white/80 mb-1.5">Delete this post?</p>
              <p className="text-[12px] text-white/35 mb-5">This cannot be undone and will remove the post from the website.</p>
              <div className="flex items-center gap-3 justify-center">
                <button onClick={() => void handleDelete(deleteId)} className="px-4 py-2 rounded-lg bg-red-500/80 text-white text-[12px] font-600 hover:bg-red-500 transition-colors">Delete</button>
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg text-[12px] text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-colors">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
