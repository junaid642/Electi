"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";
import GlowRule from "@/components/ui/GlowRule";

const ease = [0.22, 1, 0.36, 1] as const;

const CATEGORY_COLORS: Record<string, string> = {
  "Industry Insights": "bg-blue-500/15 text-blue-400 border-blue-500/25",
  "Technology":        "bg-violet-500/15 text-violet-400 border-violet-500/25",
  "Case Study":        "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "Company News":      "bg-amber-500/15 text-amber-400 border-amber-500/25",
  "Tips & Guides":     "bg-rose-500/15 text-rose-400 border-rose-500/25",
};

export interface InitialPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  author: string;
  date: string;
  coverImage?: string | null;
}

export default function BlogPostClient({ post }: { post: InitialPost | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const colorClass = post
    ? (CATEGORY_COLORS[post.category] ?? "bg-white/[0.08] text-white/50 border-white/[0.12]")
    : "";

  const coverUrl =
    post?.coverImage && post.coverImage.startsWith("/objects/")
      ? `/api/storage/blog-images/${post.coverImage.replace(/^\/objects\//, "")}`
      : post?.coverImage ?? null;

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-32 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease }}
        >
          <Link href="/blog" className="inline-flex items-center gap-2 text-[12px] text-white/35 hover:text-white/65 transition-colors mb-10 group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Blog
          </Link>
        </motion.div>

        {!post && (
          <div className="text-center py-20">
            <p className="text-[16px] text-white/40 mb-4">Post not found.</p>
            <Link href="/blog" className="text-[13px] text-white/50 underline underline-offset-4 hover:text-white/80">Return to Blog</Link>
          </div>
        )}

        {post && (
          <>
            {coverUrl && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease }}
                className="mb-8 rounded-2xl overflow-hidden border border-white/[0.07] h-56 sm:h-72"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverUrl} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.05, ease }}
            >
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-600 tracking-wide border ${colorClass}`}>
                {post.category.toUpperCase()}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="text-[32px] sm:text-[42px] font-800 tracking-tight leading-tight mt-4 mb-4"
              style={{
                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="flex items-center gap-4 text-[12px] text-white/30 mb-8"
            >
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
              <span className="text-white/15">·</span>
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author}</span>
            </motion.div>

            <GlowRule />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-10 text-[15px] text-white/55 leading-relaxed"
            >
              {post.content.trimStart().startsWith("<") ? (
                <div
                  className="space-y-4 [&>p]:mb-3 [&>h2]:text-white [&>h2]:font-bold [&>h2]:text-[20px] [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:text-white/80 [&>h3]:font-semibold [&>h3]:text-[17px] [&>h3]:mt-6 [&>h3]:mb-2 [&>blockquote]:border-l-2 [&>blockquote]:border-white/20 [&>blockquote]:pl-4 [&>blockquote]:text-white/40 [&>blockquote]:italic [&>pre]:bg-white/[0.05] [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:text-[12px] [&>pre]:font-mono [&>pre]:overflow-x-auto [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>strong]:text-white/75 [&>strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="space-y-5">
                  {post.content.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="mt-16 pt-8 border-t border-white/[0.06]"
            >
              <p className="text-[13px] text-white/30 mb-5">Ready to transform your business?</p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-700 text-[13px] hover:bg-white/90 transition-colors">
                Talk to X360 →
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
